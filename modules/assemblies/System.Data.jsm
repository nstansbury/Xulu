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


var EXPORTED_SYMBOLS = ["DbType","ParameterDirection","DataRowVersion","IsolationLevel","ConnectionState","DbException"];

Components.utils.import( "resource://xulu/assemblies/System.jsm" );
System.Import( "System.Data" );


	DbType = {
		"AnsiString" : 0,
		"AnsiStringFixedLength" : 0x16,
		"Binary" : 1,
		"Boolean" : 3,
		"Byte" : 2,
		"Currency" : 4,
		"Date" : 5,
		"DateTime" : 6,
		"Decimal" : 7,
		"Double" : 8,
		"Guid" : 9,
		"Int16" : 10,
		"Int32" : 11,
		"Int64" : 12,
		"Object" : 13,
		"SByte" : 14,
		"Single" : 15,
		"String" : 0x10,
		"StringFixedLength" : 0x17,
		"Time" : 0x11,
		"UInt16" : 0x12,
		"UInt32" : 0x13,
		"UInt64" : 20,
		"VarNumeric" : 0x15,
		"Xml" : 0x19
	};
	
	ParameterDirection = {
		"Input" : 1,
		"InputOutput" : 3,
		"Output" : 2,
		"ReturnValue" : 6
	};

	DataRowVersion = {
		"Current" : 0x200,
		"Default" : 0x600,
		"Original": 0x100,
		"Proposed" : 0x400
	};

	IsolationLevel = {
		"Chaos" : 0x10,
		"ReadCommitted" : 0x1000,
		"ReadUncommitted" : 0x100,
		"RepeatableRead" : 0x10000,
		"Serializable" : 0x100000,
		"Snapshot" : 0x1000000,
		"Unspecified" : -1
	};
	
	ConnectionState =	{
		"Broken" : 0x10,
		"Closed" : 0,
		"Connecting" : 2,
		"Executing" : 4,
		"Fetching" : 8,
		"Open" : 1
	};


//** @base{IDisposable}
IDbConnection = {
	//** @returns{IDbConnection}
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

	//** @returns{ConnectionState}
	get State(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{IDbTransaction}
	BeginTransaction : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{IsolationLevel} il
	//** @returns{IDbTransaction}
	BeginTransaction : function( il ){
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

	//** @returns{IDbCommand}
	CreateCommand : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Void}
	Open : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	}

}



//** @base{IDisposable}
IDbTransaction = {
	//** @returns{IDbTransaction}
	constructor : function(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{IDbConnection}
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
	Rollback : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	}

}


//** @base{IDisposable}
IDbCommand = {
	//** @returns{IDbCommand}
	constructor : function(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{IDbConnection}
	get Connection(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{IDbConnection} value
	set Connection( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{IDbTransaction}
	get Transaction(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{IDbTransaction} value
	set Transaction( value ){
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

	//** @returns{IDataParameterCollection}
	get Parameters(){
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
	Prepare : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Void}
	Cancel : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{IDbDataParameter}
	CreateParameter : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Int32}
	ExecuteNonQuery : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{IDataReader}
	ExecuteReader : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{CommandBehavior} behavior
	//** @returns{IDataReader}
	ExecuteReader : function( behavior ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Object}
	ExecuteScalar : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	}

}



//** @base{}
IDataParameter = {
	//** @returns{IDataParameter}
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

	//** @returns{String}
	get ParameterName(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} value
	set ParameterName( value ){
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
	}

}



//** @base{IList, ICollection, IEnumerable}
IDataParameterCollection = {
	//** @returns{IDataParameterCollection}
	constructor : function(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Object}
	get Item(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Object} value
	set Item( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} parameterName
	//** @returns{Boolean}
	Contains : function( parameterName ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} parameterName
	//** @returns{Int32}
	IndexOf : function( parameterName ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} parameterName
	//** @returns{Void}
	RemoveAt : function( parameterName ){
		throw new NotImplementedException( arguments.callee.name );
	}

}



//** @base{}
IDataRecord = {
	//** @returns{IDataRecord}
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
	//** @returns{String}
	GetName : function( i ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} i
	//** @returns{String}
	GetDataTypeName : function( i ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} i
	//** @returns{Type}
	GetFieldType : function( i ){
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

	//** @param{String} name
	//** @returns{Int32}
	GetOrdinal : function( name ){
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
	//** @param{Int64} fieldOffset
	//** @param{Array} buffer
	//** @param{Int32} bufferoffset
	//** @param{Int32} length
	//** @returns{Int64}
	GetBytes : function( i, fieldOffset, buffer, bufferoffset, length ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} i
	//** @returns{Char}
	GetChar : function( i ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} i
	//** @param{Int64} fieldoffset
	//** @param{Array} buffer
	//** @param{Int32} bufferoffset
	//** @param{Int32} length
	//** @returns{Int64}
	GetChars : function( i, fieldoffset, buffer, bufferoffset, length ){
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
	//** @returns{Single}
	GetFloat : function( i ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} i
	//** @returns{Double}
	GetDouble : function( i ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} i
	//** @returns{String}
	GetString : function( i ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} i
	//** @returns{Decimal}
	GetDecimal : function( i ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} i
	//** @returns{DateTime}
	GetDateTime : function( i ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} i
	//** @returns{IDataReader}
	GetData : function( i ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} i
	//** @returns{Boolean}
	IsDBNull : function( i ){
		throw new NotImplementedException( arguments.callee.name );
	}

}


//** @base{IDisposable, IDataRecord}
IDataReader = {
	//** @returns{IDataReader}
	constructor : function(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Int32}
	get Depth(){
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

	//** @returns{Void}
	Close : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{DataTable}
	GetSchemaTable : function(  ){
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




//** @base{}
IDataAdapter = {
	//** @returns{IDataAdapter}
	constructor : function(){
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

	//** @returns{ITableMappingCollection}
	get TableMappings(){
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


//** @base{IDataAdapter}
IDbDataAdapter = {
	//** @returns{IDbDataAdapter}
	constructor : function(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{IDbCommand}
	get SelectCommand(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{IDbCommand} value
	set SelectCommand( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{IDbCommand}
	get InsertCommand(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{IDbCommand} value
	set InsertCommand( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{IDbCommand}
	get UpdateCommand(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{IDbCommand} value
	set UpdateCommand( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{IDbCommand}
	get DeleteCommand(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{IDbCommand} value
	set DeleteCommand( value ){
		throw new NotImplementedException( arguments.callee.name );
	}

}

function DbException( message, innerException )	{
	var ex = new System.SystemException( message, innerException );
	ex.__proto__.__defineGetter__( "ErrorCode", function() { return this.HResult } );
	return ex;
};
	