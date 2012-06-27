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


var EXPORTED_SYMBOLS = ["SQLiteConnection","SQLiteTransaction","SQLiteCommand","SQLiteReader","SQLiteException","SQLiteParameter","SQLiteParameterCollection"];

Components.utils.import( "resource://xulu/assemblies/System.jsm" );

System.Import( "System.Data" );
System.Import( "System.Data.Common" );
Mozilla = System.Import("Mozilla.Components", true);

var pStorageService = null;



//** @returns{SQLiteConnection}
function SQLiteConnection( connection )	{
	pStorageService = Mozilla.Components.Service( "@mozilla.org/storage/service;1", "mozIStorageService" );
	this.pConnectionState = System.Data.ConnectionState.Closed;
	this.pMozConnection = null;
	this.pConnectionString = "";
	this.pDatabaseFile = null;
	this.pTransactionLevel = 0;
	
	if ( typeof connection == "string" )	{
		this.ConnectionString = connection;
	}
	else if ( connection instanceof SQLiteConnection )	{
		this.ConnectionString = connection.Database;
	};
}
//** @base{DbConnection}
SQLiteConnection.prototype = {
	__proto__ : System.Data.Common.DbConnection,
	
	//** @returns{String}
	get ConnectionString(){
		return this.pConnectionString;
	},

	//** @param{String} value
	set ConnectionString( value ){
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

	//** @returns{Int32}
	get ConnectionTimeout(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get Database(){
		if ( this.pMozConnection.databaseFile && this.State == System.Data.ConnectionState.Open )	{
			return this.pMozConnection.databaseFile.path;
		}
		else	{
			return "";
		}
	},

	//** @returns{String}
	get DataSource(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get ServerVersion(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{ConnectionState}
	get State(){
		return this.pConnectionState;
	},

	//** @returns{SQLiteTransaction}
	BeginTransaction : function(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{IsolationLevel} isolationLevel
	//** @returns{SQLiteTransaction}
	BeginTransaction : function( isolationLevel ){
		if ( this.pConnectionState != System.Data.Common.ConnectionState.Open )	{
			throw new System.InvalidOperationException();
		}
		return new SQLiteTransaction( this, true );
	},

	//** @returns{Void}
	Close : function(){
		this.pConnectionState = System.Data.ConnectionState.Closed;
	},

	//** @param{String} databaseName
	//** @returns{Void}
	ChangeDatabase : function( databaseName ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{SQLiteCommand}
	CreateCommand : function(){
		return new System.Data.SQLite.SQLiteCommand( "", this );
	},

	//** @param{Transaction} transaction
	//** @returns{Void}
	EnlistTransaction : function( transaction ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{DataTable}
	GetSchema : function(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} collectionName
	//** @returns{DataTable}
	GetSchema : function( collectionName ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} collectionName
	//** @param{Array} restrictionValues
	//** @returns{DataTable}
	GetSchema : function( collectionName, restrictionValues ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Void}
	Open : function(){
		if ( this.pConnectionState != System.Data.ConnectionState.Closed )	{
			throw new System.InvalidOperationException( "Connection is not Closed" );
		}
		this.pConnectionState = System.Data.ConnectionState.Connecting;
		try {
			this.pDatabaseFile = Mozilla.Components.Instance( "@mozilla.org/file/local;1", "nsILocalFile" );
			this.pDatabaseFile.initWithPath( this.ConnectionString );
			this.pMozConnection = pStorageService.openDatabase( this.pDatabaseFile );
			if ( this.pMozConnection.connectionReady == true )	{
				this.pConnectionState = System.Data.ConnectionState.Open;
			}
			else	{
				throw new System.SystemException( "Database failed to open" );
			}
		}
		catch( ex )	{
			this.pConnectionState = System.Data.Common.ConnectionState.Closed
			throw new System.SystemException( ex.message, ex );
		}
	}

}

//** @returns{SQLiteTransaction}
function SQLiteTransaction()	{

}
//** @base{DbTransaction}
SQLiteTransaction = {
	__proto__ : System.Data.Common.DbTransaction,
	
	//** @returns{SQLiteConnection}
	get Connection(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{IsolationLevel}
	get IsolationLevel(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Void}
	Commit : function(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Void}
	Dispose : function(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Void}
	Rollback : function(){
		throw new NotImplementedException( arguments.callee.name );
	}

}


//** @returns{SQLiteCommand}
function SQLiteCommand( commandText, connection, transaction )	{
try{
		this.pCommandText = "";
		this.pConnection = null;
		this.pTransaction = null;
		this.pMozStatement = null;
		this.pMozResultsSet = null;
		this.pParameters = null;
		this.Connection = connection || null;
		this.Transaction = transaction || null;
		this.CommandText = commandText || "";
	}
	catch( ex )	{
		throw ex;
	}
}
//** @base{DbCommand}
SQLiteCommand.prototype = {
	__proto__ : System.Data.Common.DbCommand,
	
	//** @returns{String}
	get CommandText(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} value
	set CommandText( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Int32}
	get CommandTimeout(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} value
	set CommandTimeout( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{CommandType}
	get CommandType(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{CommandType} value
	set CommandType( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{SQLiteConnection}
	get Connection(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{SQLiteConnection} value
	set Connection( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get DesignTimeVisible(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Boolean} value
	set DesignTimeVisible( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{SQLiteParameterCollection}
	get Parameters(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{SQLiteTransaction}
	get Transaction(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{SQLiteTransaction} value
	set Transaction( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{UpdateRowSource}
	get UpdatedRowSource(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{UpdateRowSource} value
	set UpdatedRowSource( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Void}
	Cancel : function(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{SQLiteParameter}
	CreateParameter : function(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Int32}
	ExecuteNonQuery : function(){
		var reader = new SQLiteDataReader( this );
		reader.Read();
		while ( reader.NextResult() )	{};
		reader.Close();
		return reader.RecordsAffected;
	},

	//** @returns{SQLiteDataReader}
	ExecuteReader : function(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{CommandBehavior} behavior
	//** @returns{SQLiteDataReader}
	ExecuteReader : function( behavior ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Object}
	ExecuteScalar : function(){
		var reader = new SQLiteDataReader( this );
		reader.Read();
		try {
			var item = reader.GetString( 0 );
		}
		catch(e){}
		reader.Close();
		return item || null;
	},

	//** @returns{Void}
	Prepare : function(){
		throw new NotImplementedException( arguments.callee.name );
	}

}


//** @returns{SQLiteCommandBuilder}
function SQLiteCommandBuilder()	{

}

//** @base{DbCommandBuilder}
SQLiteCommandBuilder.prototype = {
	__proto__ : System.Data.Common.DbCommandBuilder,
	
	//** @returns{ConflictOption}
	get ConflictOption(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{ConflictOption} value
	set ConflictOption( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{CatalogLocation}
	get CatalogLocation(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{CatalogLocation} value
	set CatalogLocation( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get CatalogSeparator(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} value
	set CatalogSeparator( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{SQLiteDataAdapter}
	get DataAdapter(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{SQLiteDataAdapter} value
	set DataAdapter( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get QuotePrefix(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} value
	set QuotePrefix( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get QuoteSuffix(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} value
	set QuoteSuffix( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get SchemaSeparator(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} value
	set SchemaSeparator( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get SetAllValues(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Boolean} value
	set SetAllValues( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{SQLiteCommand}
	GetInsertCommand : function(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Boolean} useColumnsForParameterNames
	//** @returns{SQLiteCommand}
	GetInsertCommand : function( useColumnsForParameterNames ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{SQLiteCommand}
	GetUpdateCommand : function(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Boolean} useColumnsForParameterNames
	//** @returns{SQLiteCommand}
	GetUpdateCommand : function( useColumnsForParameterNames ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{SQLiteCommand}
	GetDeleteCommand : function(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Boolean} useColumnsForParameterNames
	//** @returns{SQLiteCommand}
	GetDeleteCommand : function( useColumnsForParameterNames ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} unquotedIdentifier
	//** @returns{String}
	QuoteIdentifier : function( unquotedIdentifier ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Void}
	RefreshSchema : function(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} quotedIdentifier
	//** @returns{String}
	UnquoteIdentifier : function( quotedIdentifier ){
		throw new NotImplementedException( arguments.callee.name );
	}

}


//** @returns{SQLiteDataReader}
function SQLiteDataReader( cmd, behaviour )	{
	if ( cmd == null )	{
		throw new System.ArgumentNullException( "'cmd' is null");
	}
	this.pCommand = cmd;
	this.pMozStorageValueArray = cmd.pMozStatement;
	this.pRecordsAffected = 0;
	this.pHasMoreResults = true;
	this.pCompletedSynchronously = true;
}
//** @base{DbDataReader}
SQLiteDataReader.prototype = {
	__proto__ : System.Data.Common.DbDataReader,
	
	//** @returns{Int32}
	get Depth(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Int32}
	get FieldCount(){
		return this.pCommand.pMozStatement.columnCount;
	},

	//** @returns{Boolean}
	get HasRows(){
		if ( this.pMozStorageValueArray.numEntries > 0 ) {
			return true;
		}
		else	{
			return false;
		}
	},

	//** @returns{Boolean}
	get IsClosed(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Int32}
	get RecordsAffected(){
		// NB. Intentionally doesn't return MozStorageValueArray.numEntries for compatibility
		return this.pRecordsAffected;
	},

	//** @returns{Int32}
	get VisibleFieldCount(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Object}
	get Item(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Object}
	get Item(){
		return this.pCommand.pMozStatement.row;
	},

	//** @returns{Void}
	Close : function(){
		this.pCommand.pMozStatement.reset();
	},

	//** @returns{Void}
	Dispose : function(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} ordinal
	//** @returns{String}
	GetDataTypeName : function( ordinal ){
		var dataType = this.pMozStorageValueArray.getTypeOfIndex( ordinal )
		switch ( dataType )	{	//VALUE_TYPE_NULL, VALUE_TYPE_INTEGER, VALUE_TYPE_FLOAT, VALUE_TYPE_TEXT, or VALUE_TYPE_BLOB
			case 0:
				return "Null";
			case 1:
				return "Int32";
			case 2:
				return "Int64";
			case 3:
				return "String";
			case 4:
				return "Bytes";
			default:
				return "Null";
		}
	},

	//** @returns{IEnumerator}
	GetEnumerator : function(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} ordinal
	//** @returns{Type}
	GetFieldType : function( ordinal ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} ordinal
	//** @returns{String}
	GetName : function( ordinal ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} name
	//** @returns{Int32}
	GetOrdinal : function( name ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{DataTable}
	GetSchemaTable : function(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} ordinal
	//** @returns{Boolean}
	GetBoolean : function( ordinal ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} ordinal
	//** @returns{Byte}
	GetByte : function( ordinal ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} ordinal
	//** @param{Int64} dataOffset
	//** @param{Array} buffer
	//** @param{Int32} bufferOffset
	//** @param{Int32} length
	//** @returns{Int64}
	GetBytes : function( ordinal, dataOffset, buffer, bufferOffset, length ){
		return this.pMozStorageValueArray.getBlob( ordinal, length, buffer );
	},

	//** @param{Int32} ordinal
	//** @returns{Char}
	GetChar : function( ordinal ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} ordinal
	//** @param{Int64} dataOffset
	//** @param{Array} buffer
	//** @param{Int32} bufferOffset
	//** @param{Int32} length
	//** @returns{Int64}
	GetChars : function( ordinal, dataOffset, buffer, bufferOffset, length ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} ordinal
	//** @returns{SQLiteDataReader}
	GetData : function( ordinal ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} ordinal
	//** @returns{DateTime}
	GetDateTime : function( ordinal ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} ordinal
	//** @returns{Decimal}
	GetDecimal : function( ordinal ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} ordinal
	//** @returns{Double}
	GetDouble : function( ordinal ){
		return Number( this.pMozStorageValueArray.getDouble( ordinal ) );
	},

	//** @param{Int32} ordinal
	//** @returns{Single}
	GetFloat : function( ordinal ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} ordinal
	//** @returns{Guid}
	GetGuid : function( ordinal ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} ordinal
	//** @returns{Int16}
	GetInt16 : function( ordinal ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} ordinal
	//** @returns{Int32}
	GetInt32 : function( ordinal ){
		return Number( this.pMozStorageValueArray.getInt32( ordinal ) );
	},

	//** @param{Int32} ordinal
	//** @returns{Int64}
	GetInt64 : function( ordinal ){
		return Number( this.pMozStorageValueArray.getInt64( ordinal ) );
	},

	//** @param{Int32} ordinal
	//** @returns{Type}
	GetProviderSpecificFieldType : function( ordinal ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} ordinal
	//** @returns{Object}
	GetProviderSpecificValue : function( ordinal ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} values
	//** @returns{Int32}
	GetProviderSpecificValues : function( values ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} ordinal
	//** @returns{String}
	GetString : function( ordinal ){
		return this.pMozStorageValueArray.getString( ordinal );
	},

	//** @param{Int32} ordinal
	//** @returns{Object}
	GetValue : function( ordinal ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} values
	//** @returns{Int32}
	GetValues : function( values ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} ordinal
	//** @returns{Boolean}
	IsDBNull : function( ordinal ){
		return this.pMozStorageValueArray.getIsNull( ordinal );
	},

	//** @returns{Boolean}
	NextResult : function(){
		try	{
			if ( this.pHasMoreResults == true )	{
				if ( this.pCompletedSynchronously == true )	{
					this.pHasMoreResults = this.pCommand.pMozStatement.executeStep();
				}
				else	{
					var MozStorageValueArray = this.pCommand.pMozResultsSet.getNextRow();
					if ( MozStorageValueArray )	{
						this.pMozStorageValueArray = MozStorageValueArray;
					}
					else	{
						this.pHasMoreResults = false;
					}
				}
				this.pRecordsAffected++;
			}
			if ( this.pHasMoreResults == false )	{
				this.pCommand.pMozStatement.reset();
			}
			return this.pHasMoreResults;
		}
		catch( ex )	{
			this.pCommand.pMozStatement.reset();
			throw ex;
		}
	},

	//** @returns{Boolean}
	Read : function(){
		this.pHasMoreResults = true;
		return this.NextResult();
	}

}



//** @returns{SQLiteDataAdapter}
function SQLiteDataAdapter()	{

}

//** @base{DbDataAdapter}
SQLiteDataAdapter.prototype = {
	__proto__ : System.Data.Common.DbDataAdapter,

	//** @returns{SQLiteCommand}
	get DeleteCommand(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{SQLiteCommand} value
	set DeleteCommand( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{SQLiteCommand}
	get InsertCommand(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{SQLiteCommand} value
	set InsertCommand( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{SQLiteCommand}
	get SelectCommand(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{SQLiteCommand} value
	set SelectCommand( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Int32}
	get UpdateBatchSize(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} value
	set UpdateBatchSize( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{SQLiteCommand}
	get UpdateCommand(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{SQLiteCommand} value
	set UpdateCommand( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{DataTable} dataTable
	//** @param{SchemaType} schemaType
	//** @returns{DataTable}
	FillSchema : function( dataTable, schemaType ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{DataSet} dataSet
	//** @param{SchemaType} schemaType
	//** @returns{Array}
	FillSchema : function( dataSet, schemaType ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{DataSet} dataSet
	//** @param{SchemaType} schemaType
	//** @param{String} srcTable
	//** @returns{Array}
	FillSchema : function( dataSet, schemaType, srcTable ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{DataSet} dataSet
	//** @returns{Int32}
	Fill : function( dataSet ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{DataSet} dataSet
	//** @param{String} srcTable
	//** @returns{Int32}
	Fill : function( dataSet, srcTable ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{DataSet} dataSet
	//** @param{Int32} startRecord
	//** @param{Int32} maxRecords
	//** @param{String} srcTable
	//** @returns{Int32}
	Fill : function( dataSet, startRecord, maxRecords, srcTable ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{DataTable} dataTable
	//** @returns{Int32}
	Fill : function( dataTable ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} startRecord
	//** @param{Int32} maxRecords
	//** @param{Array} dataTables
	//** @returns{Int32}
	Fill : function( startRecord, maxRecords, dataTables ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Array}
	GetFillParameters : function(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{DataSet} dataSet
	//** @returns{Int32}
	Update : function( dataSet ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} dataRows
	//** @returns{Int32}
	Update : function( dataRows ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{DataTable} dataTable
	//** @returns{Int32}
	Update : function( dataTable ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{DataSet} dataSet
	//** @param{String} srcTable
	//** @returns{Int32}
	Update : function( dataSet, srcTable ){
		throw new NotImplementedException( arguments.callee.name );
	}

}


//** @returns{SQLiteParameter}
function SQLiteParameter()	{
	this.pName = parameterName || "";
	this.pValue = value || null;
	this.pCommand = null;
}

//** @base{DbParameter}
SQLiteParameter.prototype = {
	__proto__ : System.Data.Common.DbParameter,

	//** @returns{SQLiteType}
	get SQLiteType(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{SQLiteType} value
	set SQLiteType( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{ParameterDirection}
	get Direction(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{ParameterDirection} value
	set Direction( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsNullable(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Boolean} value
	set IsNullable( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get ParameterName(){
		return this.pName;
	},

	//** @param{String} value
	set ParameterName( value ){
		this.pName = value;
	},

	//** @returns{Int32}
	get Size(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} value
	set Size( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get SourceColumn(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} value
	set SourceColumn( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get SourceColumnNullMapping(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Boolean} value
	set SourceColumnNullMapping( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{DataRowVersion}
	get SourceVersion(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{DataRowVersion} value
	set SourceVersion( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Object}
	get Value(){
		return this.pValue;
	},

	//** @param{Object} value
	set Value( value ){
		this.pValue = value;
		if ( this.pCommand )	{
			this.pCommand.pMozStatement.params[ this.ParameterName ] = this.Value;
		}
	},

	//** @returns{Void}
	ResetDbType : function(){
		throw new NotImplementedException( arguments.callee.name );
	}

}


//** @returns{SQLiteParameterCollection}
function SQLiteParameterCollection()	{
	this.pCommand = cmd;
	this.pCol = {};
}

//** @base{DbParameterCollection}
SQLiteParameterCollection.prototype = {
	__proto__ : System.Data.Common.DbParameterCollection,
	
	//** @returns{Int32}
	get Count(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsFixedSize(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsReadOnly(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsSynchronized(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Object}
	get SyncRoot(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{SQLiteParameter}
	get Item(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{SQLiteParameter} value
	set Item( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{SQLiteParameter}
	get Item(){
		return this.pCol;
	},

	//** @param{SQLiteParameter} value
	set Item( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Object} parameter
	//** @returns{Int32}
	Add : function( parameter ){
		if ( parameter == null )	{
			throw new System.ArgumentNullException( "Argument was null" );
		}
		try	{
			this.pCol[ parameter.ParameterName ] = parameter;
			parameter.pCommand = this.pCommand;
			if ( parameter.Value )	{
				this.pCommand.pMozStatement.params[ parameter.ParameterName ] = parameter.Value;
			}
		}
		catch( ex )	{
			throw ex;
		}
	},

	//** @param{Array} values
	//** @returns{Void}
	AddRange : function( values ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Object} value
	//** @returns{Boolean}
	Contains : function( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} value
	//** @returns{Boolean}
	Contains : function( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} array
	//** @param{Int32} index
	//** @returns{Void}
	CopyTo : function( array, index ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Void}
	Clear : function(){
		this.pCol = {};
	},

	//** @returns{IEnumerator}
	GetEnumerator : function(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Object} value
	//** @returns{Int32}
	IndexOf : function( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} parameterName
	//** @returns{Int32}
	IndexOf : function( parameterName ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} index
	//** @param{Object} value
	//** @returns{Void}
	Insert : function( index, value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Object} parameter
	//** @returns{Void}
	Remove : function( parameter ){
		if ( parameter == null )	{
			throw new System.ArgumentNullException( "Argument was null" );
		}
		try	{
			delete this.pCol[ parameter.ParameterName ];
		}
		catch( ex )	{
			throw new System.ArgumentException( ex.message, "Remove", ex );
		}
	},

	//** @param{Int32} index
	//** @returns{Void}
	RemoveAt : function( index ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} parameterName
	//** @returns{Void}
	RemoveAt : function( parameterName ){
		throw new NotImplementedException( arguments.callee.name );
	}

}