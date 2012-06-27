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

System.Import( "System.Data.Common" );
Mozilla = System.Import("Mozilla.Components", true);

var pStorageService = null;

//** @returns{SQLiteConnection}connection
//** @returns{boolean}deferredLock
//** @returns{SQLiteTransaction}
function SQLiteTransaction( connection, deferredLock )	{
	if ( connection == null )	{
		throw new System.ArgumentNullException();
	}
	this.pConnection = connection;
	this.pMozConnection = connection.pMozConnection;
	try {
		if ( deferredLock )	{
			this.pMozConnection.beginTransaction()
		}
		else	{
			this.pMozConnection.beginTransactionAs(1)
		}
	}
	catch( ex )	{
		throw new System.SystemException( ex.message );
	}
	this.Connection.pTransactionLevel++;
}

//** @base{DbTransaction}
SQLiteTransaction.prototype = {
	__proto__ : System.Data.Common.DbTransaction,
	
	//** @returns{Void}
	Commit : function()	{
		if ( this.IsValid( true ) )	{
			this.pMozConnection.commitTransaction();
			this.Connection.pTransactionLevel--;
		}
	},
	
	//** @param{Boolean}throwError
	//** @returns{Boolean}
	IsValid : function( throwError )	{
		if ( this.Connection == null )		{
            if ( throwError )	{
                throw new ArgumentNullException( "No connection associated with this transaction" );
            }
            return false;
        }
        if ( this.Connection.pTransactionLevel == 0 )	{
            if (throwError)	{
                throw new SQLiteException( 0x15, "No transaction is active on this connection" );
            }
            return false;
        }
        if ( this.Connection.State == System.Data.Common.ConnectionState.Open )	{
            return true;
        }
        if ( throwError )	{
            throw new SQLiteException( 0x15, "Connection was closed" );
        }
        return false;
	},
	
	//** @returns{Void}
	Rollback : function()	{
		if ( this.IsValid( true ) )	{
			this.pMozConnection.rollbackTransaction();
			this.pConnection.pTransactionLevel--;
			this.pConnection = null;
		}
	},
	
	//** @returns{SQLiteConnection}
	get Connection()	{
		return this.pConnection;
	}
};


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
};

//** @base{DbCommand}
SQLiteCommand.prototype = {
	__proto__ : System.Data.Common.DbCommand,

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
	
	//** @returns{Int32}
	ExecuteNonQuery : function(){
		var reader = new SQLiteDataReader( this );
		reader.Read();
		while ( reader.NextResult() )	{};
		reader.Close();
		return reader.RecordsAffected;
	},
	
	//** @returns{AsyncResult}
	BeginExecuteNonQuery : function( callback, stateObject ){
		return BeginExecuteReader( callback, stateObject );
	},
	
	//** @param{AsyncResult} asyncResult
	//** @returns{Int32}
	EndExecuteNonQuery : function( asyncResult ){
		var reader = EndExecuteReader( asyncResult );
		while ( reader.NextResult() )	{};
		return reader.RecordsAffected;
	},
	
	//** @param{CommandBehavior} behavior
	//** @returns{SQLiteDataReader}
	ExecuteReader : function( behaviour )	{
		var reader = new SQLiteDataReader( this );
		return reader;
	},
	
	//** @param{Callback}callback
	//** @param{AsyncState}stateObject
	//** @param{CommandBehavior} behavior
	//** @returns{AsyncResult}
	BeginExecuteReader : function( callback, stateObject, behavior )	{
		
		var result = {
			pIsCompleted : false,
			pMozStorageError : null,
			get AsyncState()	{
				if ( this.pMozStorageError != null )	{
					throw new SQLiteException( pMozStorageError.result, pMozStorageError.message );
				}
				else	{
					return stateObject;
				}
			},
			get IsCompleted()	{
				return this.pIsCompleted;
			},
			get CompletedSynchronously()	{
				return false;
			},
			get AsyncWaitHandle()	{}			
		};
		
		var MozStorageStatementCallback = {
			AsyncCallback : callback,
			AsyncResult : result,
			Command : this,
			handleResult: function( aResultSet )	{
				this.Command.pMozResultsSet = aResultSet;
			},  
			handleError: function( aError )	{
				// Really we want to throw an error into the AsyncCallback itself rather than hoping AsyncState is called
				this.AsyncResult.pMozStorageError = aError;
			},  
			handleCompletion: function( aReason ) {  
				this.AsyncResult.pIsCompleted = true;
				this.AsyncCallback.EndInvoke( this.AsyncResult );
			}  
		};
		
		this.pMozStatement.executeAsync( MozStorageStatementCallback );
		this.pMozStatement.finalize();
		return result;
	},
	
	//** @param{AsyncResult} asyncResult
	//** @returns{SQLiteDataReader}
	EndExecuteReader : function( asyncResult )	{
		while( asyncResult.IsCompleted == false )	{}
		var reader = new SQLiteDataReader( this );
		reader.pCompletedSynchronously = false;
		return reader;
	},

	//** @returns{CommandType}
	get CommandText(){
		return this.pCommandText;
	},
	
	//** @param{CommandType} value
	set CommandText( value ){
		try {
			if ( this.Connection == null || this.Connection.pMozConnection == null )	{
				throw new System.InvalidOperationException( "Connection is Null" );
			}
			if (( value != null ) && ( value != "" ))	{
				this.pMozStatement = this.Connection.pMozConnection.createStatement( value );
			}
		}
		catch( ex )	{
			throw ex;
		}
	},
	
	//** @returns{SQLiteConnection}
	get Connection(){
		return this.pConnection;
	},
	
	//** @param{SQLiteConnection} value
	set Connection( value ){
		this.pConnection = value;
	},
	
	//** @returns{SQLiteTransaction}
	get Transaction(){
		return this.pTransaction;
	},
	
	//** @param{SQLiteTransaction} value
	set Transaction( value ){
		if ( value != null )	{
			this.pConnection = value.Connection;
			this.pTransaction = value;
		}
	},
	
	//** @returns{SQLiteParameterCollection}
	get Parameters(){
		if ( this.pParameters == null )		{
			this.pParameters = new System.Data.SQLite.SQLiteParameterCollection( this );
		}
		return this.pParameters;
	}
};


//** @param{SQLiteCommand} cmd
//** @returns{SQLiteParameterCollection}
function SQLiteParameterCollection( cmd )	{
	this.pCommand = cmd;
	this.pCol = {};
}

//** @base{DbParameterCollection}
SQLiteParameterCollection.prototype = {
	__proto__ : System.Data.Common.DbParameterCollection,
	
	//** @param{Object} parameter
	//** @returns{Int32}
	Add : function( parameter )	{
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
			throw new System.SystemException( ex.message, ex );
		}
	},
	
	//** @param{Object} parameter
	//** @returns{Void}
	Remove : function( parameter )	{
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
	
	//** @returns{Void}
	Clear : function()	{
		this.pCommand.pMozStatement.reset();
		this.pCol = {};
	},
	
	//** @returns{SQLiteParameter}
	get Item()	{
		return this.pCol;
	}
}


//** @returns{SQLiteParameter}
function SQLiteParameter( parameterName, value )	{
	this.pName = parameterName || "";
	this.pValue = value || null;
	this.pCommand = null;
}

//** @base{DbParameter}
SQLiteParameter.prototype = {
	__proto__ : System.Data.Common.DbParameter,
	
	//** @returns{String}
	get ParameterName()	{
		return this.pName;
	},
	
	//** @param{String} value
	set ParameterName( value )	{
		this.pName = value;
	},
	
	//** @returns{Object}
	get Value()	{
		return this.pValue;
	},
	
	//** @param{Object} value
	set Value( value )	{
		this.pValue = value;
		if ( this.pCommand )	{
			this.pCommand.pMozStatement.params[ this.ParameterName ] = this.Value;
		}
	}
}


//** @param{SQLiteCommand} cmd
//** @returns{SQLiteDataReader}
function SQLiteDataReader( cmd )	{
	if ( cmd == null )	{
		throw new System.ArgumentNullException( "'cmd' is null");
	}
	this.pCommand = cmd;
	this.pMozStorageValueArray = cmd.pMozStatement;
	this.pRecordsAffected = 0;
	this.pHasMoreResults = true;
	this.pCompletedSynchronously = true;
};
SQLiteDataReader.prototype = {
	__proto__ : System.Data.Common.DbDataReader,
	
	//** @param{Int32} ordinal
	//** @returns{String}
	GetDataTypeName : function( ordinal )	{
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
	
	//** @param{Int32} ordinal
	//** @returns{Int32}
	GetInt32 : function( ordinal )	{
		return Number( this.pMozStorageValueArray.getInt32( ordinal ) );
	},
	
	//** @param{Int32} ordinal
	//** @returns{Int64}
	GetInt64 : function( ordinal )	{
		return Number( this.pMozStorageValueArray.getInt64( ordinal ) );
	},
	
	//** @param{Int32} ordinal
	//** @returns{Double}
	GetDouble : function( ordinal )	{
		return Number( this.pMozStorageValueArray.getDouble( ordinal ) );
	},
	
	//** @param{Int32} ordinal
	//** @returns{String}
	GetString : function( ordinal )	{
		return this.pMozStorageValueArray.getString( ordinal );
	},
	
	//** @param{Int32} ordinal
	//** @param{Int64} dataOffset
	//** @param{Array} buffer
	//** @param{Int32} bufferOffset
	//** @param{Int32} length
	//** @returns{Int64}
	GetBytes : function( ordinal, fieldOffset, buffer, bufferOffset, length )	{
		return this.pMozStorageValueArray.getBlob( ordinal, length, buffer );
	},
	
	//** @param{Int32} ordinal
	//** @returns{Boolean}
	IsDBNull : function( ordinal )	{
		return this.pMozStorageValueArray.getIsNull( ordinal );
	},
	
	//** @returns{Boolean}
	NextResult : function()	{
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
	Read : function()	{	
		this.pHasMoreResults = true;
		return this.NextResult();
	},
	
	//** @returns{Int32}
	get RecordsAffected()	{
		// NB. Intentionally doesn't return MozStorageValueArray.numEntries for compatibility
		return this.pRecordsAffected;
	},
	
	//** @returns{Boolean}
	get HasRows()	{
		return ( this.pMozStorageValueArray.numEntries > 0 ) ? true : false;
	},
	
	//** @returns{Void}
	Close : function(){
		this.pCommand.pMozStatement.reset();
	},
    
	//** @returns{Int32}
	get FieldCount()	{
		return this.pCommand.pMozStatement.columnCount;
	},
	
	//** @returns{Object}
	get Item()	{
		try {
			return this.pCommand.pMozStatement.row;
		}
		catch( ex )	{
			throw new IndexOutOfRangeException( "No column with the specified name was found", ex );
		}
	}
};


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
	
	//** @returns{SQLiteTransaction}
	BeginTransaction : function( il, deferredLock ){
		if ( this.pConnectionState != System.Data.ConnectionState.Open )	{
			throw new System.InvalidOperationException();
		}
		return new SQLiteTransaction( this, true );
	},
	
	//** @returns{Void}
	Close : function(){
		this.pConnectionState = System.Data.ConnectionState.Closed;
	},
	
	//** @returns{SQLiteCommand}
	CreateCommand : function(){
		return new System.Data.SQLite.SQLiteCommand( "", this );
	},
	
	//** @returns{Void}
	Open : function(){
		if ( this.pConnectionState != System.Data.ConnectionState.Closed )	{
			throw new System.InvalidOperationException( "Connection is not Closed" );
		}
		this.pConnectionState = System.Data.ConnectionState.Connecting;
		try {
			var fileHandler = Mozilla.Components.Instance( "@mozilla.org/network/protocol;1?name=file", "nsIFileProtocolHandler" );
			// Expecting a file:// uri format
			this.pDatabaseFile = fileHandler.getFileFromURLSpec ( this.ConnectionString );
			this.pDatabaseFile.QueryInterface( Components.interfaces.nsILocalFile );
			this.pMozConnection = pStorageService.openDatabase( this.pDatabaseFile );
			if ( this.pMozConnection.connectionReady == true )	{
				this.pConnectionState = System.Data.ConnectionState.Open;
			}
			else	{
				throw new System.SystemException( "Database failed to open" );
			}
		}
		catch( ex )	{
			this.pConnectionState = System.Data.ConnectionState.Closed
			throw new System.SystemException( ex.message, ex );
		}
	},
	
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
	
	//** @returns{String}
	get Database(){
		if ( this.pMozConnection.databaseFile && this.State == System.Data.ConnectionState.Open )	{
			return this.pMozConnection.databaseFile.path;
		}
		else	{
			return "";
		}
	},
	
	//** @returns{ConnectionState}
	get State() {
		return this.pConnectionState;
	}
}

function SQLiteException( errorCode, extendedInformation )	{
	var ex =  new System.Data.Common.DbException( extendedInformation, null );
	ex.SetErrorCode( errorCode );
	return ex;
};



