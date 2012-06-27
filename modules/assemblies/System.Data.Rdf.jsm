/* ***** BEGIN LICENSE BLOCK *****
* Version: MPL 1.1/GPL 2.0/LGPL 2.1
*
* The contents of this file are subject to the Mozilla Public License Version
* 1.1 (the "License"); you may not use this file except in compliance with
* the License. You may obtain a copy of the License at
* http://www.mozilla.org/MPL/
*
* Software distributed under the License is distributed on an "AS IS" basis,
* WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
* for the specific language governing rights and limitations under the
* License.
*
* The Original Code is the Xulu .NET Javascript Framework.
*
* The Initial Developer of the Original Code is
* Neil Stansbury <neil.stansbury@redbacksystems.com>.
* Portions created by the Initial Developer are Copyright (C) 2009
* the Initial Developer. All Rights Reserved.
*
* Contributor(s):
*
* Alternatively, the contents of this file may be used under the terms of
* either the GNU General Public License Version 2 or later (the "GPL"), or
* the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
* in which case the provisions of the GPL or the LGPL are applicable instead
* of those above. If you wish to allow use of your version of this file only
* under the terms of either the GPL or the LGPL, and not to allow others to
* use your version of this file under the terms of the MPL, indicate your
* decision by deleting the provisions above and replace them with the notice
* and other provisions required by the GPL or the LGPL. If you do not delete
* the provisions above, a recipient may use your version of this file under
* the terms of any one of the MPL, the GPL or the LGPL.
*
* ***** END LICENSE BLOCK ***** */


var EXPORTED_SYMBOLS = ["Init","RdfDataConnection","RdfSqlConnection","RdfSqlTransaction","RdfSqlCommand","RdfSqlReader","RdfSqlAdapter","RdfSqlException"];

Components.utils.import( "resource://xulu/assemblies/System.jsm" );


System.Import( "System.Data" );
System.Import( "System.Data.Common" );
System.Import( "System.Data.SQLite" );

System.Import( "System.IO" );
System.Import( "System.Runtime.Serialization.Json" );


var Mozilla = System.Import("Mozilla.Components" );
var RdfService = Mozilla.Components.Service( "@mozilla.org/rdf/rdf-service;1", "nsIRDFService" );

//** RdfDataConnection - Mozilla in-memory backed datasource
function RdfDataConnection( connection )	{
}

//** RdfSqlConnection - SQL backed datasource
function RdfSqlConnection( connection ) {
	this.pConnectionState = System.Data.ConnectionState.Closed;
	this.pConnectionString = "";
	this.pConnectionTimeout = 0;
	this.SQLiteCnn = null;
	this.__RdfDataSource = null;
	this.pTransactionLevel = 0;
	
	if ( connection instanceof RdfSqlConnection )	{
		this.ConnectionString = connection.Database;
	}
	else {
		this.ConnectionString = connection;
	}
	
};
//** @base{SQLiteConnection}
RdfSqlConnection.prototype = {
	__proto__ : System.Data.SQLite.SQLiteConnection,
	
	CreateCommand : function(){
		return new System.Data.Rdf.RdfSqlCommand( "", this.SQLiteCnn );
	},
	Open : function(){
		try	{
			if ( this.pConnectionState != System.Data.ConnectionState.Closed )	{
				throw new System.InvalidOperationException( "Connection not Closed" );
			}
			var stream = new System.IO.MemoryStream();
			var buf = this.ConnectionString;
			stream.Write( buf, 0, buf.length );
			var serializer = new System.Runtime.Serialization.Json.DataContractJsonSerializer();
			var jso = serializer.ReadObject( stream )
			
			if ( jso.type == "sql-datasource" )	{
				this.SQLiteCnn = new System.Data.SQLite.SQLiteConnection( jso.datasource );
				this.SQLiteCnn.Open();
				this.__RdfDataSource = new RdfSqlDatasource( this.SQLiteCnn );
			}

			this.pConnectionState = System.Data.ConnectionState.Open;
		}
		catch( ex )	{
			throw ex;
		}
	},
	get ConnectionString(){
		return this.pConnectionString;
	},
	set ConnectionString( value ){	// eg. type : xml-datasource, datasource : path
		try {
			if ( value == null )	{
				throw new System.ArgumentNullException( "Argument was null" );
			}
			if ( this.pConnectionState != System.Data.ConnectionState.Closed )	{
				throw new System.InvalidOperationException( "Connection not Closed" );
			}
			this.pConnectionString = value;
		}
		catch( ex )	{
			throw new System.ArgumentException( ex.message, "ConnectionString", ex );
		}
	},
	get ConnectionTimeout(){
		return this.pConnectionTimeout;
	},
	get Database(){
		return this.__RdfDataSource.URI || "";
	},
	get State() {
		return this.pConnectionState;
	}
}


// NB. This is incorrect and should be implemented as an RdfSqlCommandBuilder or an RdfSqlTemplateCommand

const pSQLRDFQueryJoin = '( SELECT subj.resource_name AS source, pred.resource_name AS property, '
												+'CASE '
													+'WHEN ( rdf_triples.is_object_literal ) == 1 '
														+'THEN ( SELECT rdf_triples.object ) '
													+'ELSE ( SELECT obj.resource_name ) '
												+'END AS target, is_object_literal AS is_literal '
											+'FROM rdf_triples '
											+'JOIN rdf_resources subj ON subject = subj.resource_id '
											+'JOIN rdf_resources pred ON predicate = pred.resource_id '
											+'LEFT JOIN rdf_resources obj ON object = obj.resource_id )';
									
function RdfSqlCommand( commandText, connection, transaction )	{
	this.pRealCommandText = commandText;
	System.Data.SQLite.SQLiteCommand.call( this, "", connection, transaction );
	
}
RdfSqlCommand.prototype = new System.Object( System.Data.SQLite.SQLiteCommand );
// Override the SQLiteCommand to wrap the subquery
RdfSqlCommand.prototype.__defineSetter__( "CommandText", function( value )	{
	if ( !value.indexOf( "rdf_triples" )	)	{
		throw new System.ArgumentException( "Invalid table name specified", "CommandText" )
	}
	this.pRealCommandText = value;
	// Replace the database table name with the RDF sub query
	this.__proto__.__lookupGetter__( "CommandText" ).call( this, value.replace( /rdf_triples/g, pSQLRDFQueryJoin ) );
} );
RdfSqlCommand.prototype.__defineGetter__( "CommandText", function( value )	{
	return this.pRealCommandText;
} );


// ==========================================================================================
const NS_OK = 0;
const NS_RDF_NO_VALUE = 0xa0002;
const NS_RDF_ASSERTION_REJECTED = 0xa0003;


// SQL Query Strings

const pSQLQueryArcLabelsIn = 'SELECT pred.resource_name, 0 AS is_literal'
													+' FROM rdf_triples'
													+' JOIN rdf_resources pred ON predicate = pred.resource_id'
													+' LEFT JOIN rdf_resources obj ON object = obj.resource_id'
														+' WHERE ( obj.resource_name = :node_value OR object = :node_value )';

const pSQLQueryArcLabelsOut = 'SELECT predicate, 0 AS is_literal'
														+' FROM rdf_triples'
														+' JOIN rdf_resources subj ON subject = subj.resource_id'
															+' WHERE subj.resource_name = :source_value';

const pSQLQueryAssert = 'INSERT INTO rdf_triples ( "subject", "predicate", "object", "is_object_literal" )'
											+' VALUES ( :subject_id, :predicate_id, :object_id, :is_literal )';
													
const pSQLQueryHasResource = 'SELECT resource_id FROM rdf_resources WHERE resource_name = :resource_value';
const pSQLQueryInsertResource = 'INSERT INTO rdf_resources( "resource_name") VALUES( :resource_value )';

const pSQLQueryChange = '';

const pSQLQueryGetAllResources = 'SELECT resource_name, 0 AS is_literal FROM rdf_resources';

const pSQLQueryGetSources = ' SELECT subj.resource_name, 0 AS is_literal'
													+' FROM rdf_triples'
													+' JOIN rdf_resources subj ON subject = subj.resource_id'
													+' JOIN rdf_resources pred ON predicate = pred.resource_id'
													+' LEFT JOIN rdf_resources obj ON object = obj.resource_id'
														+' WHERE pred.resource_name = :property_value'
															+' AND ( obj.resource_name = :target_value OR object = :target_value )';

const pSQLQueryGetTargets = 'SELECT'
													+' CASE' 
														+' WHEN ( rdf_triples.is_object_literal ) = 1'
															+' THEN ( SELECT rdf_triples.object )'
														+' ELSE ( SELECT obj.resource_name )'
													+' END AS "object_value", is_object_literal AS is_literal'
													+' FROM rdf_triples'
													+' JOIN rdf_resources subj ON subject = subj.resource_id'
													+' JOIN rdf_resources pred ON predicate = pred.resource_id'
													+' LEFT JOIN rdf_resources obj ON object = obj.resource_id'
														+' WHERE subj.resource_name = :source_value'
															+' AND pred.resource_name = :property_value';

const pSQLQueryHasArcIn = 'SELECT COUNT( triple_id )'
												+' FROM rdf_triples'
												+' JOIN rdf_resources pred ON predicate = pred.resource_id'
												+' LEFT JOIN rdf_resources obj ON object = obj.resource_id'
													+' WHERE pred.resource_name = :arc_value'
														+' AND ( obj.resource_name = :node_value OR object = :node_value )';

const pSQLQueryHasArcOut = 'SELECT COUNT( triple_id )'
													+' FROM rdf_triples'
													+' JOIN rdf_resources subj ON subject = subj.resource_id'
													+' JOIN rdf_resources pred ON predicate = pred.resource_id'
														+' WHERE subj.resource_name = :source_value'
															+' AND pred.resource_name = :arc_value';

const pSQLQueryHasAssertion = 'SELECT COUNT( triple_id ) '
													+' FROM rdf_triples'
													+' JOIN rdf_resources subj ON subject = subj.resource_id'
													+' JOIN rdf_resources pred ON predicate = pred.resource_id'
													+' LEFT JOIN rdf_resources obj ON object = obj.resource_id'
														+' WHERE subj.resource_name = :source_value'
															+' AND pred.resource_name = :property_value'
																+' AND ( obj.resource_name = :target_value OR object = :target_value )';

const pSQLQueryMove = '';

const pSQLQueryUnAssert = 'DELETE '
												+'FROM rdf_triples '
													+'WHERE triple_id = :triple_id';


const pSQLQueryGetTripleID = 'SELECT  triple_id, subj.resource_name AS source, pred.resource_name AS property, '
												+'CASE '
													+'WHEN ( rdf_triples.is_object_literal ) == 1 '
															+'THEN ( SELECT rdf_triples.object ) '
														+'ELSE ( SELECT obj.resource_name ) '
													+'END AS target, is_object_literal AS is_literal '
													+'FROM rdf_triples '
														+'JOIN rdf_resources subj ON subject = subj.resource_id '
														+'JOIN rdf_resources pred ON predicate = pred.resource_id '
														+'LEFT JOIN rdf_resources obj ON object = obj.resource_id '
												+'WHERE source = :source_value AND property = :property_value AND target = :target_value AND is_literal = :is_literal';

// Returns the count of all assertions in a Seq/Bag/Alt collection
const pSQLQueryGetContainerItemCount = 'SELECT COUNT( triple_id ) '
														+'FROM rdf_triples '
															+'JOIN rdf_resources subj ON subject = subj.resource_id '
															+'JOIN rdf_resources pred ON predicate = pred.resource_id '
															+'LEFT JOIN rdf_resources obj ON object = obj.resource_id '
																+'WHERE subj.resource_name = :source_value '
																	+'AND pred.resource_name LIKE "http://www.w3.org/1999/02/22-rdf-syntax-ns#$_%" ESCAPE "$_"'
// ==========================================================================================

function RdfSqlDatasource( rdfSqlConnection )	{
	try	{
		this.pObservers = [];
		this.pConnection = rdfSqlConnection
		//this.pMemDs = Mozilla.Components.Instance( "@mozilla.org/rdf/datasource;1?name=in-memory-datasource","nsIRDFPurgeableDataSource" );
		this.pCmdArcLabelsIn = new System.Data.SQLite.SQLiteCommand( pSQLQueryArcLabelsIn, this.pConnection );
		this.pCmdArcLabelsOut = new System.Data.SQLite.SQLiteCommand( pSQLQueryArcLabelsOut, this.pConnection );
		this.pCmdAssert = new System.Data.SQLite.SQLiteCommand( pSQLQueryAssert, this.pConnection );
		//this.pCmdChange = new System.Data.SQLite.SQLiteCommand( pSQLQueryChange, this.pConnection );
		this.pCmdGetAllResources = new System.Data.SQLite.SQLiteCommand( pSQLQueryGetAllResources, this.pConnection );
		this.pCmdGetSources = new System.Data.SQLite.SQLiteCommand( pSQLQueryGetSources, this.pConnection );
		this.pCmdGetTargets = new System.Data.SQLite.SQLiteCommand( pSQLQueryGetTargets, this.pConnection );
		this.pCmdHasArcIn = new System.Data.SQLite.SQLiteCommand( pSQLQueryHasArcIn, this.pConnection );
		this.pCmdHasArcOut = new System.Data.SQLite.SQLiteCommand( pSQLQueryHasArcOut, this.pConnection );
		this.pCmdHasAssertion = new System.Data.SQLite.SQLiteCommand( pSQLQueryHasAssertion, this.pConnection );
		//this.pCmdMove = new System.Data.SQLite.SQLiteCommand( pSQLQueryMove, this.pConnection );
		this.pCmdUnAssert = new System.Data.SQLite.SQLiteCommand( pSQLQueryUnAssert, this.pConnection );
	
		this.pCmdHasResource = new System.Data.SQLite.SQLiteCommand( pSQLQueryHasResource, this.pConnection );
		this.pCmdInsertResource = new System.Data.SQLite.SQLiteCommand( pSQLQueryInsertResource, this.pConnection );
		
		this.pCmdGetTripleID = new System.Data.SQLite.SQLiteCommand( pSQLQueryGetTripleID, this.pConnection );
		this.pCmdGetContainerItemCount = new System.Data.SQLite.SQLiteCommand( pSQLQueryGetContainerItemCount, this.pConnection );
	}
	catch( ex )	{
		Console.WriteLine( ex );
		throw ex
	}
}
RdfSqlDatasource.prototype = {
	get URI()	{ Console.WriteLine( "URI" ); return this.connection.Database },
	AddObserver: function( aObserver ) {
		Console.WriteLine( "Add Observer" );
         this.pObservers.push( aObserver );
    },
	ArcLabelsIn: function( node ) {
		try {
			Console.WriteLine( "ArcLabelsIn: " +node.Value );
        
			if (  node instanceof Components.interfaces.nsIRDFResource )	{
				node.QueryInterface( Components.interfaces.nsIRDFResource );
			}
			else	{
				node.QueryInterface( Components.interfaces.nsIRDFLiteral );
			}
        
			this.pCmdArcLabelsIn.Parameters.Clear();
			this.pCmdArcLabelsIn.Parameters.Add( new System.Data.SQLite.SQLiteParameter( "node_value", node.Value ) );
			var reader = this.pCmdArcLabelsIn.ExecuteReader();
			return new ReaderEnumerator( reader );
		}
		catch ( ex )	{
			Console.WriteLine( ex );
			throw ex
		}
    },
    ArcLabelsOut: function( source ) {
		try {
			Console.WriteLine( "ArcLabelsOut: " +source.Value );

			this.pCmdArcLabelsOut.Parameters.Clear();
			this.pCmdArcLabelsOut.Parameters.Add( new System.Data.SQLite.SQLiteParameter( "source_value", source.Value ) );
			var reader = this.pCmdArcLabelsOut.ExecuteReader();
			return new ReaderEnumerator( reader );
		}
		catch( ex )	{
			Console.WriteLine( ex );
			throw ex
		}
	},
	Assert: function( source, property, target, truthValue )	{
		try{
			// No negative assertions permitted
			if ( truthValue == false )	{
				Components.returnCode = NS_RDF_ASSERTION_REJECTED;
				return;
			}
		
			// Mozilla RDF hacks
			if ( property.Value == "http://www.w3.org/1999/02/22-rdf-syntax-ns#nextVal" )	{
				Console.WriteLine( "Assert: " +source.Value +"\n" +property.Value );
				this.pRaiseEventAssert( source, property, target );
				Components.returnCode = NS_OK;
				return;
			}
		
			// Convert #instanceOf > #type
			// http://www.w3.org/1999/02/22-rdf-syntax-ns#instanceOf > http://www.w3.org/1999/02/22-rdf-syntax-ns#type
		
		
		
			// Conditional INSERTS don't work so this is very very longhand.....
		
			// Add in the parameters we're going to use
			this.pCmdHasResource.Parameters.Clear();
			this.pCmdHasResource.Parameters.Add( new System.Data.SQLite.SQLiteParameter( "resource_value" ) );
			this.pCmdInsertResource.Parameters.Clear();
			this.pCmdInsertResource.Parameters.Add( new System.Data.SQLite.SQLiteParameter( "resource_value" ) );
		
			// Does the source exist?
			this.pCmdHasResource.Parameters.Item[ "resource_value" ].Value = source.Value;
			var subj = this.pCmdHasResource.ExecuteScalar();
		
			if( subj == null )	{
				this.pCmdInsertResource.Parameters.Item[ "resource_value" ].Value = source.Value;
				this.pCmdInsertResource.ExecuteNonQuery();
				this.pCmdHasResource.Parameters.Item[ "resource_value" ].Value = source.Value;
				subj = this.pCmdHasResource.ExecuteScalar();
			}
			
			// Does the property exist?
			this.pCmdHasResource.Parameters.Item[ "resource_value" ].Value = property.Value;
			var pred = this.pCmdHasResource.ExecuteScalar();
		
			if( pred == null )	{
				this.pCmdInsertResource.Parameters.Item[ "resource_value" ].Value = property.Value;
				this.pCmdInsertResource.ExecuteNonQuery();
				this.pCmdHasResource.Parameters.Item[ "resource_value" ].Value = property.Value;
				pred = this.pCmdHasResource.ExecuteScalar();
			}
		
			// Is target resource or literal
			if (  target instanceof Components.interfaces.nsIRDFResource )	{
				target.QueryInterface( Components.interfaces.nsIRDFResource );
				this.pCmdHasResource.Parameters.Item[ "resource_value" ].Value = target.Value;
				var obj = this.pCmdHasResource.ExecuteScalar();
				if( obj == null )	{
					this.pCmdInsertResource.Parameters.Item[ "resource_value" ].Value = target.Value;
					this.pCmdInsertResource.ExecuteNonQuery();
					this.pCmdHasResource.Parameters.Item[ "resource_value" ].Value = target.Value;
					obj = this.pCmdHasResource.ExecuteScalar();
				}
				var isLiteral = "0";
			}
			else	{
				target.QueryInterface( Components.interfaces.nsIRDFLiteral );
				var obj = target.Value;
				var isLiteral = "1";
			}

			Console.WriteLine( "Assert: " +source.Value +"\n" +property.Value +"\n>" +target.Value +"<" );
		
			this.pCmdAssert.Parameters.Clear();
			this.pCmdAssert.Parameters.Add( new System.Data.SQLite.SQLiteParameter( "subject_id", subj ) );
			this.pCmdAssert.Parameters.Add( new System.Data.SQLite.SQLiteParameter( "predicate_id", pred ) );
			this.pCmdAssert.Parameters.Add( new System.Data.SQLite.SQLiteParameter( "object_id", obj ) );
			this.pCmdAssert.Parameters.Add( new System.Data.SQLite.SQLiteParameter( "is_literal", isLiteral ) );
			var res = this.pCmdAssert.ExecuteNonQuery();
			if ( res != 1 )	{
				Components.returnCode = NS_RDF_ASSERTION_REJECTED;
				throw "Assert Failed";
			}
			Components.returnCode = NS_OK;
			this.pRaiseEventAssert( source, property, target );
		}
		catch( ex )	{
			Console.WriteLine( ex );
			throw ex
		}
	},
	beginUpdateBatch : function()	{
	
	},
	Change: function( source, property, oldTarget, newTarget ) {
		Console.WriteLine( "Change" );
		Components.returnCode = NS_RDF_NO_VALUE;
		return null
	},
	endUpdateBatch : function()	{
	
	},
	GetAllResources: function() {
		try {
			Console.WriteLine( "GetAllResources" );
			var reader = this.pCmdGetAllResources.ExecuteReader();
			Components.returnCode = NS_OK;
			return new ReaderEnumerator( reader );
		}
		catch( ex )	{
			Console.WriteLine( ex );
			Components.returnCode = NS_RDF_NO_VALUE;
			return null
		}
	},
    GetSource: function( property, target, truthValue )		{
		try {
			if ( !truthValue )	{
				Components.returnCode = NS_RDF_NO_VALUE;
				return null;
			}
		
			if ( target instanceof Components.interfaces.nsIRDFResource )	{
				target.QueryInterface( Components.interfaces.nsIRDFResource )
			}
			else	{
				target.QueryInterface( Components.interfaces.nsIRDFLiteral )
			}

			this.pCmdGetSources.Parameters.Clear();
			this.pCmdGetSources.Parameters.Add( new System.Data.SQLite.SQLiteParameter( "property_value", property.Value ) );
			this.pCmdGetSources.Parameters.Add( new System.Data.SQLite.SQLiteParameter( "target_value", target.Value ) );
			var value = this.pCmdGetSources.ExecuteScalar();
			Console.WriteLine( "GetSources: " +property.value +"\n" +target.Value +"\nReturns: " +value );
			
			if ( value )	{
				Components.returnCode = NS_OK;
				return RdfService.GetResource( value );
			}
			else	{
				Components.returnCode = NS_RDF_NO_VALUE;
				return null;
			}
		}
		catch( ex )	{
			Console.WriteLine( ex );
			Components.returnCode = NS_RDF_NO_VALUE;
			throw ex;
		}
    },
    GetSources: function( property, target, truthValue ) {
		try {
			if ( !truthValue )	{
				Components.returnCode = NS_RDF_NO_VALUE;
				return new ArrayEnumerator( [] );
			}
			
			if ( target instanceof Components.interfaces.nsIRDFResource )	{
				target.QueryInterface( Components.interfaces.nsIRDFResource )
			}
			else	{
				target.QueryInterface( Components.interfaces.nsIRDFLiteral )
			}
		
			this.pCmdGetSources.Parameters.Clear();
			this.pCmdGetSources.Parameters.Add( new System.Data.SQLite.SQLiteParameter( "property_value", property.Value ) );
			this.pCmdGetSources.Parameters.Add( new System.Data.SQLite.SQLiteParameter( "target_value", target.Value ) );
			var reader = this.pCmdGetSources.ExecuteReader();
			Console.WriteLine( "GetSources: " +property.Value +"\n" +target.Value );
			Components.returnCode = NS_OK;
			return new ReaderEnumerator( reader );
		}
		catch( ex )	{
			Console.WriteLine( ex );
			throw ex;
		}
    },
    GetTarget: function( source, property, truthValue ) {
		try {
			if ( !truthValue )	{
				Components.returnCode = NS_RDF_NO_VALUE;
				return null;
			}
		
			// Not a valid property - return the next #_n count
			if ( property.Value == "http://www.w3.org/1999/02/22-rdf-syntax-ns#nextVal" )	{
			
				this.pCmdGetContainerItemCount.Parameters.Clear();
				this.pCmdGetContainerItemCount.Parameters.Add( new System.Data.SQLite.SQLiteParameter( "source_value", source.Value ) );
				var nextVal = this.pCmdGetContainerItemCount.ExecuteScalar();
				if ( nextVal )	{
					nextVal = Number( nextVal ) +1;
					Console.WriteLine( "GetTarget: " +source.Value +"\n" +property.Value +"\nReturns: " +nextVal );
					Components.returnCode = NS_OK;
					return RdfService.GetLiteral( nextVal.toString() ).QueryInterface( Components.interfaces.nsIRDFNode );
				}
				else	{
					Components.returnCode = NS_RDF_NO_VALUE;
					return null;
				}
			}
		
			this.pCmdGetTargets.Parameters.Clear();
			this.pCmdGetTargets.Parameters.Add( new System.Data.SQLite.SQLiteParameter( "property_value", property.Value ) );
			this.pCmdGetTargets.Parameters.Add( new System.Data.SQLite.SQLiteParameter( "source_value", source.Value ) );
			var reader = this.pCmdGetTargets.ExecuteReader();
			if ( reader.Read() && reader.HasRows )	{
				var value = reader.Item[ "object_value" ] || "";
				if ( Boolean( reader.Item[ "is_literal" ] ) )	{
					var node = RdfService.GetLiteral( value );
				}
				else	{
					var node = RdfService.GetResource( value );
				}
			
				Console.WriteLine( "GetTarget: " +source.Value +"\n" +property.Value +"\nReturns: " +value);
				
				Components.returnCode = NS_OK;
				return node.QueryInterface( Components.interfaces.nsIRDFNode );
			}
			else	{
				Components.returnCode = NS_RDF_NO_VALUE;
				return null;
			}
		}
		catch( ex )	{
			Console.WriteLine( ex );
			throw ex;
		}
    },
    GetTargets: function( source, property, truthValue ) {
		try {
			if ( !truthValue )	{
				Components.returnCode = NS_RDF_NO_VALUE;
				return null;
			}
		
			// Not a valid property - return the next #_n count
			if ( property.Value == "http://www.w3.org/1999/02/22-rdf-syntax-ns#nextVal" )	{
				this.pCmdGetContainerItemCount.Parameters.Clear();
				this.pCmdGetContainerItemCount.Parameters.Add( new System.Data.SQLite.SQLiteParameter( "source_value", source.Value ) );
				var nextVal = this.pCmdGetContainerItemCount.ExecuteScalar();
				if ( nextVal )	{
					nextVal = Number( nextVal ) +1;
					Console.WriteLine( "GetTargets nextVal: " +source.Value +"\n" +property.Value +"\nReturns: " +nextVal );
					var resource = RdfService.GetLiteral( nextVal.toString() ).QueryInterface( Components.interfaces.nsIRDFNode );
					Components.returnCode = NS_OK;
					return new ArrayEnumerator( [ resource ] );
				}
				else	{
					Components.returnCode = NS_RDF_NO_VALUE;
					return new ArrayEnumerator( [] );
				}
			}
		
			this.pCmdGetTargets.Parameters.Clear();
			this.pCmdGetTargets.Parameters.Add( new System.Data.SQLite.SQLiteParameter( "source_value", source.Value ) );
			this.pCmdGetTargets.Parameters.Add( new System.Data.SQLite.SQLiteParameter( "property_value", property.Value ) );
			var reader = this.pCmdGetTargets.ExecuteReader();
			
			Console.WriteLine( "GetTargets: " +source.Value +"\n" +property.Value );
			
			return new ReaderEnumerator( reader );
		}
		catch( ex )	{
			Console.WriteLine( ex );
			throw ex;
		}
    },
	hasArcIn: function( node, arc )	{
		try {
			if ( node instanceof Components.interfaces.nsIRDFResource )	{
				node.QueryInterface( Components.interfaces.nsIRDFResource )
			}
			else	{
				node.QueryInterface( Components.interfaces.nsIRDFLiteral )
			}
			
			this.pCmdHasArcIn.Parameters.Clear();
			this.pCmdHasArcIn.Parameters.Add( new System.Data.SQLite.SQLiteParameter( "node_value", node.Value ) );
			this.pCmdHasArcIn.Parameters.Add( new System.Data.SQLite.SQLiteParameter( "arc_value", arc.Value ) );
			var hasArcIn = this.pCmdHasArcIn.ExecuteScalar();
			
			Console.WriteLine( "hasArcIn: " +arc.Value +"\n" +node.Value +"\nReturns: " +hasArcIn );
			
			return  ( Number( hasArcIn ) > 0 );	
		}
		catch( ex )	{
			Console.WriteLine( ex );
			throw ex
		}
	},
    hasArcOut: function( source, arc )	{
		try {
			this.pCmdHasArcOut.Parameters.Clear();
			this.pCmdHasArcOut.Parameters.Add( new System.Data.SQLite.SQLiteParameter( "source_value", source.Value ) );
			this.pCmdHasArcOut.Parameters.Add( new System.Data.SQLite.SQLiteParameter( "arc_value", arc.Value ) );
			var hasArcOut = this.pCmdHasArcOut.ExecuteScalar();
		
			Console.WriteLine( "hasArcOut: " +source.Value +"\n" +arc.Value +"\nReturns: " +hasArcOut );
		
			return ( Number( hasArcOut ) > 0 );
		}
		catch( ex )	{
			Console.WriteLine( ex );
			throw ex;
		}
    },
	HasAssertion: function( source, property, target, truthValue ) {
		try {			
		
			if ( !truthValue )	{
				Components.returnCode = NS_RDF_NO_VALUE;
				return false;
			}
			
			if ( property.Value == "http://www.w3.org/1999/02/22-rdf-syntax-ns#nextVal" )	{
				Console.WriteLine( "HasAssertion: " +source.Value +"\n" +property.Value +"\nReturns: false" );
				Components.returnCode = Components.returnCode = NS_RDF_NO_VALUE;
				return false;
			}
		
			
			
			if ( target instanceof Components.interfaces.nsIRDFResource )	{
				target.QueryInterface( Components.interfaces.nsIRDFResource )
			}
			else	{
				target.QueryInterface( Components.interfaces.nsIRDFLiteral )
			}
			
			this.pCmdHasAssertion.Parameters.Clear();
			this.pCmdHasAssertion.Parameters.Add( new System.Data.SQLite.SQLiteParameter( "source_value", source.Value ) );
			this.pCmdHasAssertion.Parameters.Add( new System.Data.SQLite.SQLiteParameter( "property_value", property.Value ) );
			this.pCmdHasAssertion.Parameters.Add( new System.Data.SQLite.SQLiteParameter( "target_value", target.Value || "" ) );
			var hasAssertion = this.pCmdHasAssertion.ExecuteScalar();
			
			Console.WriteLine( "HasAssertion: " +source.Value +"\n" +property.Value +"\n" +target.Value +"\nReturns: " +hasAssertion );
			
			return ( Number( hasAssertion ) > 0 );
		}
		catch( ex )	{
			Console.WriteLine( ex );
			throw ex;
		}
    },
    Move: function( oldSource, newSource, property, target ) {
		Console.WriteLine( "Move" );
		Components.returnCode = NS_RDF_ASSERTION_REJECTED;
		return null;
	},
	Unassert: function( source, property, target )      {
		try {
			if ( property.Value == "http://www.w3.org/1999/02/22-rdf-syntax-ns#nextVal" )	{
				this.pRaiseEventUnassert( source, property, target );
				Components.returnCode = NS_OK;
				return;
			}
			
			if ( target instanceof Components.interfaces.nsIRDFResource )	{
				target.QueryInterface( Components.interfaces.nsIRDFResource )
				var is_Literal = 0;
			}
			else	{
				target.QueryInterface( Components.interfaces.nsIRDFLiteral )
				var is_Literal = 1;
			}
		
			Console.WriteLine( "UnAssert: " +source.Value +"\n" +property.Value +"\n" +target.Value );
		
			// Get the Triple ID first
			this.pCmdGetTripleID.Parameters.Clear();
			this.pCmdGetTripleID.Parameters.Add( new System.Data.SQLite.SQLiteParameter( "source_value", source.Value ) );
			this.pCmdGetTripleID.Parameters.Add( new System.Data.SQLite.SQLiteParameter( "property_value", property.Value ) );
			this.pCmdGetTripleID.Parameters.Add( new System.Data.SQLite.SQLiteParameter( "target_value", target.Value ) );
			this.pCmdGetTripleID.Parameters.Add( new System.Data.SQLite.SQLiteParameter( "is_Literal", is_Literal ) );
			var triple_id = this.pCmdGetTripleID.ExecuteScalar();
			
			if ( !triple_id )	{
				Components.returnCode = NS_RDF_ASSERTION_REJECTED;
				return;
			}
			else	{
				this.pCmdUnassert.Parameters.Clear();
				this.pCmdUnassert.Parameters.Add( new System.Data.SQLite.SQLiteParameter( "triple_id", triple_id ) );
				Components.returnCode = NS_OK;
				this.pRaiseEventUnassert( source, property, target );
			}
		}
		catch( ex )	{
			Components.returnCode = NS_RDF_ASSERTION_REJECTED;
			this.pRaiseEventUnassert( source, property, target );	
		}
	},
	Mark : function( source, property, target, truthValue )	{
	
	},
	Sweep : function()	{
	
	},
	pRaiseEventAssert: function( source, property, target ) {
		for ( var i = 0; i < this.pObservers.length; ++i )
			this.pObservers[i].onAssert( this, source, property, target );
    },
    pRaiseEventUnassert: function( source, property, target ) {
		for ( var i = 0; i < this.pObservers.length; ++i )
			this.pObservers[i].onUnassert( this, source, property, target );
    },
    pRaiseEventChange: function( source, property, oldTarget, newTarget ) {
		for ( var i = 0; i < this.pObservers.length; ++i )
			this.pObservers[i].onChange( this, source, property, oldTarget, newTarget );
    },
    pRaiseEventMove: function( oldSource, newSource, property, target ) {
		for ( var i = 0; i < this.pObservers.length; ++i )
			this.pObservers[i].onMove( this, oldSource, newSource, property, target );
    },
	pRemoveObserver: function( aObserver ) {
        for ( var i = 0; i < this.pObservers.length; ++i )	{
	        if ( aObserver == this.pObservers[i] )	{
	            this.pObservers.splice( i, 1 );
	            break;
			}
		}
	},
	QueryInterface : function( iid )	{
		if ( iid.equals( Components.interfaces.nsIRDFDataSource ) || iid.equals( Components.interfaces.nsIRDFPurgeableDataSource ) || iid.equals( Components.interfaces.nsISupports ) )	{
			return this;
		}
		else	{
			Components.returnCode = Components.results.NS_ERROR_NO_INTERFACE;
			return null;
		}
	}
};


function ReaderEnumerator( reader )	{
	this._reader = reader;
	this._hasMoreResults = reader.Read();
	Console.WriteLine( "Enum: " +this._hasMoreResults);
}
ReaderEnumerator.prototype = {
	getNext : function()	{
		try{
			if ( this._hasMoreResults )	{
				var value = this._reader.GetString( 0 );
				var isObjectLiteral = Boolean( this._reader.GetInt32( 1 ));
				Console.WriteLine( "getNext: " +value);
				if ( isObjectLiteral )		{
					var node = RdfService.GetLiteral( value );
				}
				else	{
					var node = RdfService.GetResource( value );
				}
				this._hasMoreResults = this._reader.NextResult();
				return node;
			}
			else	{
				this._reader.Close();
				return null;
			}
		}
		catch( ex )	{
			Console.WriteLine( ex );
			this._reader.Close();
			throw ex;
		}
	},
	hasMoreElements : function()	{
		if ( this._hasMoreResults == false )	{
			this._reader.Close();
		}
		return this._hasMoreResults;
	}
}

function ArrayEnumerator(array) {
    this.array = array;
    this.index = 0;
}
ArrayEnumerator.prototype = {
    hasMoreElements: function() { return this.index < this.array.length; },
    getNext: function () { return ( this.index < this.array.length ) ? this.array[this.index++] : null; }
}



function getProxyOnThread( aObject, aInterface ) {
    var proxyMgr = Components.classes["@mozilla.org/xpcomproxy;1"].getService(Components.interfaces.nsIProxyObjectManager);
    return proxyMgr.getProxyForObject( proxyMgr.NS_PROXY_TO_CURRENT_THREAD, aInterface, aObject, 5);
    // 5 == FORCE_PROXY_CREATION | INVOKE_SYNC
}


