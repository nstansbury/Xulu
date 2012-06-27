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


var EXPORTED_SYMBOLS = ["DbConnection","DbTransaction","DbCommand","DbCommandBuilder","DbDataRecord","DbDataReader","DataAdapter","DbDataAdapter","DbParameter","DbParameterCollection"];

Components.utils.import( "resource://xulu/assemblies/System.jsm" );


//** @base{Component}
DbConnection = {
	//** @returns{DbConnection}
	constructor : function(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get ConnectionString(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} value
	set ConnectionString( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Int32}
	get ConnectionTimeout(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get Database(){
		throw new NotImplementedException( arguments.callee.name );
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
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{DbTransaction}
	BeginTransaction : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{IsolationLevel} isolationLevel
	//** @returns{DbTransaction}
	BeginTransaction : function( isolationLevel ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Void}
	Close : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} databaseName
	//** @returns{Void}
	ChangeDatabase : function( databaseName ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{DbCommand}
	CreateCommand : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Transaction} transaction
	//** @returns{Void}
	EnlistTransaction : function( transaction ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{DataTable}
	GetSchema : function(  ){
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
	Open : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	}

}



//** @base{MarshalByRefObject}
DbTransaction = {
	
	__proto__ : System.Object.prototype,
	
	//** @returns{DbTransaction}
	constructor : function(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{DbConnection}
	get Connection(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{IsolationLevel}
	get IsolationLevel(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Void}
	Commit : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Void}
	Dispose : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Void}
	Rollback : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	}

}



//** @base{Component}
DbCommand = {
	//** @returns{DbCommand}
	constructor : function(){
		throw new NotImplementedException( arguments.callee.name );
	},

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

	//** @returns{DbConnection}
	get Connection(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{DbConnection} value
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

	//** @returns{DbParameterCollection}
	get Parameters(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{DbTransaction}
	get Transaction(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{DbTransaction} value
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
	Cancel : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{DbParameter}
	CreateParameter : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Int32}
	ExecuteNonQuery : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{DbDataReader}
	ExecuteReader : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{CommandBehavior} behavior
	//** @returns{DbDataReader}
	ExecuteReader : function( behavior ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Object}
	ExecuteScalar : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Void}
	Prepare : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	}

}


//** @base{Component}
DbCommandBuilder = {
	//** @returns{DbCommandBuilder}
	constructor : function(){
		throw new NotImplementedException( arguments.callee.name );
	},

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

	//** @returns{DbDataAdapter}
	get DataAdapter(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{DbDataAdapter} value
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

	//** @returns{DbCommand}
	GetInsertCommand : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Boolean} useColumnsForParameterNames
	//** @returns{DbCommand}
	GetInsertCommand : function( useColumnsForParameterNames ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{DbCommand}
	GetUpdateCommand : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Boolean} useColumnsForParameterNames
	//** @returns{DbCommand}
	GetUpdateCommand : function( useColumnsForParameterNames ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{DbCommand}
	GetDeleteCommand : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Boolean} useColumnsForParameterNames
	//** @returns{DbCommand}
	GetDeleteCommand : function( useColumnsForParameterNames ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} unquotedIdentifier
	//** @returns{String}
	QuoteIdentifier : function( unquotedIdentifier ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Void}
	RefreshSchema : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} quotedIdentifier
	//** @returns{String}
	UnquoteIdentifier : function( quotedIdentifier ){
		throw new NotImplementedException( arguments.callee.name );
	}

}



//** @base{Object}
DbDataRecord = {
	
	__proto__ : System.Object.prototype,
	
	//** @returns{DbDataRecord}
	constructor : function(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Int32}
	get FieldCount(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Object}
	get Item(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} i
	//** @returns{Boolean}
	GetBoolean : function( i ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} i
	//** @returns{Byte}
	GetByte : function( i ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} i
	//** @param{Int64} dataIndex
	//** @param{Array} buffer
	//** @param{Int32} bufferIndex
	//** @param{Int32} length
	//** @returns{Int64}
	GetBytes : function( i, dataIndex, buffer, bufferIndex, length ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} i
	//** @returns{Char}
	GetChar : function( i ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} i
	//** @param{Int64} dataIndex
	//** @param{Array} buffer
	//** @param{Int32} bufferIndex
	//** @param{Int32} length
	//** @returns{Int64}
	GetChars : function( i, dataIndex, buffer, bufferIndex, length ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} i
	//** @returns{IDataReader}
	GetData : function( i ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} i
	//** @returns{String}
	GetDataTypeName : function( i ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} i
	//** @returns{DateTime}
	GetDateTime : function( i ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} i
	//** @returns{Decimal}
	GetDecimal : function( i ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} i
	//** @returns{Double}
	GetDouble : function( i ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} i
	//** @returns{Type}
	GetFieldType : function( i ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} i
	//** @returns{Single}
	GetFloat : function( i ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} i
	//** @returns{Guid}
	GetGuid : function( i ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} i
	//** @returns{Int16}
	GetInt16 : function( i ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} i
	//** @returns{Int32}
	GetInt32 : function( i ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} i
	//** @returns{Int64}
	GetInt64 : function( i ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} i
	//** @returns{String}
	GetName : function( i ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} name
	//** @returns{Int32}
	GetOrdinal : function( name ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} i
	//** @returns{String}
	GetString : function( i ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} i
	//** @returns{Object}
	GetValue : function( i ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} values
	//** @returns{Int32}
	GetValues : function( values ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} i
	//** @returns{Boolean}
	IsDBNull : function( i ){
		throw new NotImplementedException( arguments.callee.name );
	}

}




//** @base{MarshalByRefObject}
DbDataReader = {
	
	__proto__ : System.Object.prototype,
	
	//** @returns{DbDataReader}
	constructor : function(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Int32}
	get Depth(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Int32}
	get FieldCount(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get HasRows(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsClosed(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Int32}
	get RecordsAffected(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Int32}
	get VisibleFieldCount(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Object}
	get Item(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Void}
	Close : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Void}
	Dispose : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} ordinal
	//** @returns{String}
	GetDataTypeName : function( ordinal ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{IEnumerator}
	GetEnumerator : function(  ){
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
	GetSchemaTable : function(  ){
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
		throw new NotImplementedException( arguments.callee.name );
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
	//** @returns{DbDataReader}
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
		throw new NotImplementedException( arguments.callee.name );
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
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} ordinal
	//** @returns{Int64}
	GetInt64 : function( ordinal ){
		throw new NotImplementedException( arguments.callee.name );
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
		throw new NotImplementedException( arguments.callee.name );
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
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	NextResult : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	Read : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	}

}




//** @base{Component}
function DataAdapter(){};
DataAdapter.prototype = {

	//** @returns{Boolean}
	get AcceptChangesDuringFill(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Boolean} value
	set AcceptChangesDuringFill( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get AcceptChangesDuringUpdate(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Boolean} value
	set AcceptChangesDuringUpdate( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get ContinueUpdateOnError(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Boolean} value
	set ContinueUpdateOnError( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{LoadOption}
	get FillLoadOption(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{LoadOption} value
	set FillLoadOption( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{MissingMappingAction}
	get MissingMappingAction(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{MissingMappingAction} value
	set MissingMappingAction( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{MissingSchemaAction}
	get MissingSchemaAction(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{MissingSchemaAction} value
	set MissingSchemaAction( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get ReturnProviderSpecificTypes(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Boolean} value
	set ReturnProviderSpecificTypes( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{DataTableMappingCollection}
	get TableMappings(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	ShouldSerializeAcceptChangesDuringFill : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Void}
	ResetFillLoadOption : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	ShouldSerializeFillLoadOption : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{DataSet} dataSet
	//** @param{SchemaType} schemaType
	//** @returns{Array}
	FillSchema : function( dataSet, schemaType ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{DataSet} dataSet
	//** @returns{Int32}
	Fill : function( dataSet ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Array}
	GetFillParameters : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{DataSet} dataSet
	//** @returns{Int32}
	Update : function( dataSet ){
		throw new NotImplementedException( arguments.callee.name );
	}

}




//** @base{DataAdapter}
DbDataAdapter = {
	
	__proto__ : DataAdapter,
	
	//** @returns{DbDataAdapter}
	constructor : function(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{DbCommand}
	get DeleteCommand(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{DbCommand} value
	set DeleteCommand( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{DbCommand}
	get InsertCommand(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{DbCommand} value
	set InsertCommand( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{DbCommand}
	get SelectCommand(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{DbCommand} value
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

	//** @returns{DbCommand}
	get UpdateCommand(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{DbCommand} value
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
	GetFillParameters : function(  ){
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



//** @base{MarshalByRefObject}
DbParameter = {
	
	__proto__ : System.Object.prototype,
	
	//** @returns{DbParameter}
	constructor : function(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{DbType}
	get DbType(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{DbType} value
	set DbType( value ){
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
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} value
	set ParameterName( value ){
		throw new NotImplementedException( arguments.callee.name );
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
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Object} value
	set Value( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Void}
	ResetDbType : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	}

}




//** @base{MarshalByRefObject}
DbParameterCollection = {
	
	__proto__ : System.Object.prototype,
	
	//** @returns{DbParameterCollection}
	constructor : function(){
		throw new NotImplementedException( arguments.callee.name );
	},

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

	//** @returns{DbParameter}
	get Item(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{DbParameter} value
	set Item( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Object} value
	//** @returns{Int32}
	Add : function( value ){
		throw new NotImplementedException( arguments.callee.name );
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
	Clear : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{IEnumerator}
	GetEnumerator : function(  ){
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

	//** @param{Object} value
	//** @returns{Void}
	Remove : function( value ){
		throw new NotImplementedException( arguments.callee.name );
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