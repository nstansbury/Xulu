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


var EXPORTED_SYMBOLS = ["FileAccess","FileMode","SearchOption","FileAttributes","IOException","DirectoryNotFoundException","Path","Directory","File","Stream","SeekOrigin","FileStream","MemoryStream","AsyncStreamCallback","TextReader","StringReader"];

Components.utils.import( "resource://xulu/assemblies/System.jsm" );
Mozilla = System.Import( "Mozilla.Components", true );

const FILES_ROOT = "file:///";

FileAccess = {
	//** PR_RDONLY = Open for reading only.
	"Read" : 0x01,
	//** PR_WRONLY =  Open for writing only.
	"Write" : 0x02,
	//** PR_RDWR = Open for reading and writing.
	"ReadWrite" : 0x04
};

FileMode = {
	//** If the file does not exist, the file is created. If the file exists, this flag has no effect. == PR_CREATE_FILE
	"OpenOrCreate" : 0x08,
	//** If the file does not exist, the file is created. If the file exists, this flag has no effect. == PR_CREATE_FILE
	"Create" : 0x08,
	//** The file pointer is set to the end of the file prior to each write. == PR_APPEND
	"Append" : 0x10,
	//** If the file exists, its length is truncated to 0. == PR_TRUNCATE
	"Truncate" : 0x20,
	//** With PR_CREATE_FILE, if the file does not exist, the file is created. If the file already exists, no action and NULL is returned. == PR_EXCL
	"CreateNew" : 0x80,
	//** If set, each write will wait for both the file data and file status to be physically updated. == PR_SYNC
	"PR_SYNC" : 0x40			
};

SearchOption = {
	"TopDirectoryOnly" :	0x01,
	"AllDirectories" : 0x02
};

FileAttributes =	{
    "Archive" : 0x20,
    "Compressed" : 0x800,
    "Device" : 0x40,
    "Directory" : 0x10,
    "Encrypted" : 0x4000,
    "Hidden" : 2,
    "Normal" : 0x80,
    "NotContentIndexed" : 0x2000,
    "Offline" : 0x1000,
    "ReadOnly" : 1,
    "ReparsePoint" : 0x400,
    "SparseFile" : 0x200,
    "System" : 4,
    "Temporary" : 0x100
};


SeekOrigin = {
    Begin : 0,
    Current : 1,
    End : 2
};



//** @returns{IOException}
//** @base{IOException}
function IOException( message, innerException ){
    System.SystemException.call( this, message, innerException );
};
IOException.prototype = {
	__proto__  : System.SystemException.prototype,
	constructor : IOException
}


//** @returns{DirectoryNotFoundException}
//** @base{IOException}
function DirectoryNotFoundException( message, innerException ){
    DirectoryNotFoundException.call( this, message, innerException );
    this.SetErrorCode( 0x80070003 );
	this.pName = arguments.callee.name;
	this.pStack = Components.stack.caller;
};
DirectoryNotFoundException.prototype = {
	__proto__  : IOException.prototype,
	constructor : DirectoryNotFoundException
}


//** This Stream delegate type allows a delayed invocation via an nsIxStreamCallback
//** @returns{AsyncStreamCallback}
function AsyncStreamCallback()	{
	return this;
}
AsyncStreamCallback.prototype = {
	__proto__ : System.MulticastDelegate,
	
	constructor : AsyncStreamCallback,
	
	//** Arguments as per delegate function signature followed by:
	//** @param{AsyncCallback} callback
	//** @param{Object} object
	//** @returns{IAsyncResult}
	BeginInvoke : function(){
		this._arguments = arguments;
		this._callback = arguments[ arguments.length -2 ];
		var state = arguments[ arguments.length -1 ];
		this._asyncResult = new System.IAsyncResult( state );
		return this._asyncResult;
	},
	
	//** @param{nsIInputStream} stream
	//** @returns{void}
	onInputStreamReady : function ( stream ) {
		Console.WriteLine( "onInputStreamReady" );
		try {
			this._EndInvoke = this.DynamicInvoke( this._arguments );
			this._asyncResult._IsCompleted = true;
			this._callback.Invoke( this._asyncResult );
		}
		catch( e )	{
			Console.WriteLine( new System.SystemException( e.message ) );
		}
	},
	
	//** @param{nsIOutputStream} stream
	//** @returns{void}
	onOutputStreamReady : function ( stream ) {
		Console.WriteLine( "onOutputStreamReady" );
		try {
			this._EndInvoke = this.DynamicInvoke( this._arguments );
			this._asyncResult._IsCompleted = true;
			this._callback.Invoke( this._asyncResult );
		}
		catch( e )	{
			Console.WriteLine( new System.SystemException( e.message ) );
		}
	}
	
}

//** @returns{Stream}
function Stream( mozStream ){
	if ( !mozStream )	{
		var mozPipe = Mozilla.Components.Instance( "@mozilla.org/pipe;1", "nsIPipe" );
		mozPipe.init( true, true, 0, 0, null );
		this._mozInputStream = mozPipe.inputStream;
		this._mozOutputStream = mozPipe.outputStream;
	}
	else	{
		if ( mozStream instanceof Components.interfaces.nsIInputStream )	{
			this._mozInputStream = mozStream;
		}
		else if ( mozStream instanceof Components.interfaces.nsIOutputStream )	{
			this._mozOutputStream = mozStream;
		}
	}
	this._IsClosed = false;
}
	
//** @base{MarshalByRefObject}
Stream.prototype = {
	__proto__ : System.Object.prototype,
	
	constructor : Stream,
	
	//** @returns{Boolean}
	get CanRead(){
		return ( this._mozInputStream != null ) ? true : false;
	},

	//** @returns{Boolean}
	get CanSeek(){
		try {
			this._mozInputStream.QueryInterface( Components.interfaces.nsISeekableStream );
			return true;
		}
		catch( e )	{
			return false;
		}
	},

	//** @returns{Boolean}
	get CanTimeout(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get CanWrite(){
		return ( this._mozOutputStream != null ) ? true : false;
	},

	//** @returns{Int64}
	get Length(){
		if ( this.CanRead )	{
			return this._mozInputStream.available();
		}
		return -1;
	},

	//** @returns{Int64}
	get Position(){
		if ( this.CanSeek )	{
			return this._mozInputStream.tell();
		}
		else	{
			throw new System.NotSupportedException( "The stream does not support seeking" );
		}
	},

	//** @param{Int64} value
	set Position( value ){
		if ( this.CanSeek )	{
			this._mozInputStream.seek( SeekOrigin.Begin, value );
		}
		else	{
			throw new System.NotSupportedException( "The stream does not support seeking" );
		}
	},

	//** @returns{Int32}
	get ReadTimeout(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} value
	set ReadTimeout( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Int32}
	get WriteTimeout(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} value
	set WriteTimeout( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Void}
	Close : function(  ){
		this._mozInputStream.closeWithStatus( 0 );
		this._mozOutputStream.closeWithStatus( 0 );
		this._IsClosed = true;
	},

	//** @returns{Void}
	Dispose : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Void}
	Flush : function(  ){
		if ( this.CanWrite )	{
			this._mozOutputStream.flush();
		}
	},

	//** @param{Array} buffer
	//** @param{Int32} offset
	//** @param{Int32} count
	//** @param{AsyncCallback} callback
	//** @param{Object} state
	//** @returns{IAsyncResult}
	BeginRead : function( buffer, offset, count, callback, state ){
		if ( this.CanRead )	{
			this._ReadDelegate = new System.Delegate.CreateDelegate( System.Type.GetType( "System.IO.AsyncStreamCallback" ), this, "Read" );
			var asyncResult = this._ReadDelegate.BeginInvoke( buffer, offset, count, callback, state );
			this._mozInputStream.asyncWait( this._ReadDelegate, 0, 1024, null );
			return asyncResult;
		}
		else	{
			throw new System.NotSupportedException( "The stream does not support reading" );
		}
	},

	//** @param{IAsyncResult} asyncResult
	//** @returns{Int32}
	EndRead : function( asyncResult ){
		if ( asyncResult == this._ReadDelegate._asyncResult )	{
			return this._ReadDelegate.EndInvoke( asyncResult );
		}
		throw new System.ArgumentException( "asyncResult did not originate from a BeginRead method on the current stream." );
	},

	//** @param{Array} buffer
	//** @param{Int32} offset
	//** @param{Int32} count
	//** @param{AsyncCallback} callback
	//** @param{Object} state
	//** @returns{IAsyncResult}
	BeginWrite : function( buffer, offset, count, callback, state ){
		if ( this.CanRead )	{
			this._WriteDelegate = new System.Delegate.CreateDelegate( System.Type.GetType( "System.IO.AsyncStreamCallback" ), this, "Write" );
			var asyncResult = this._WriteDelegate.BeginInvoke( buffer, offset, count, callback, state );
			this._mozOutputStream.asyncWait( this._WriteDelegate, 0, 0, null );
			return asyncResult;
		}
		else	{
			throw new System.NotSupportedException( "The stream does not support reading" );
		}
	},

	//** @param{IAsyncResult} asyncResult
	//** @returns{Void}
	EndWrite : function( asyncResult ){
		if ( asyncResult == this._WriteDelegate._asyncResult )	{
			return this._WriteDelegate.EndInvoke( asyncResult );
		}
		throw new System.ArgumentException( "asyncResult did not originate from a BeginWrite method on the current stream." );
	},

	//** @param{Int64} offset
	//** @param{SeekOrigin} origin
	//** @returns{Int64}
	Seek : function( offset, origin ){
		if ( this.CanSeek )	{
			this._mozInputStream.seek( origin, offset );
			return this._mozInputStream.tell();
		}
		else	{
			throw new System.NotSupportedException( "The stream does not support seeking" );
		}
	},

	//** @param{Int64} value
	//** @returns{Void}
	SetLength : function( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} buffer
	//** @param{Int32} offset
	//** @param{Int32} count
	//** @returns{Int32}
	Read : function( buffer, offset, count ){
		if ( this.CanRead )	{
			try {
				var mozScriptReadStream = Mozilla.Components.Instance( "@mozilla.org/scriptableinputstream;1", "nsIScriptableInputStream" );
				mozScriptReadStream.init( this._mozInputStream );
				var max = this._mozInputStream.available();
				if ( ( count == -1 ) || ( count > max ) ) {
					count = max;
				}
				var buf = mozScriptReadStream.read( count );
			}
			catch( e )	{
				var buf = "";
			}
			buffer[ offset ] = buf;
			return buf.length;
		}
		else	{
			throw new System.NotSupportedException( "The stream does not support reading" );
		}
	},

	//** @returns{Int32}
	ReadByte : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} buffer
	//** @param{Int32} offset
	//** @param{Int32} count
	//** @returns{Void}
	Write : function( buffer, offset, count ){
		if ( this.CanWrite )	{
			var buf = buffer.slice( offset, count );
			this._mozOutputStream.write( buf.toString(), offset + count );
		}
		else	{
			throw new System.NotSupportedException( "The stream does not support writing" );
		}
	},

	//** @param{Byte} value
	//** @returns{Void}
	WriteByte : function( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Stream} stream
	//** @returns{Stream}
	Synchronized : function( stream ){
		throw new NotImplementedException( arguments.callee.name );
	},
	
	//** As a stream is a pipe we need to be able to close one end
	_CloseOutputStream : function()	{
		this._mozOutputStream.closeWithStatus( 0 );
	},
	
	_CloseInputStream : function()	{
		this._mozInputStream.closeWithStatus( 0 );
	}
	

}





//** @base{Stream}
function MemoryStream( capacity ){
	this._stream = [];
	this._pos = 0;
};
MemoryStream.prototype = {
	__proto__ : Stream.prototype,
	
	constructor : MemoryStream,
	
	//** @returns{Boolean}
	get CanRead(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get CanSeek(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get CanWrite(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Int32}
	get Capacity(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} value
	set Capacity( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Int64}
	get Length(){
		return this._stream.length;
	},

	//** @returns{Int64}
	get Position(){
		return this._pos;
	},

	//** @param{Int64} value
	set Position( value ){
		this._pos = value || 0;
	},

	//** @returns{Void}
	Flush : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Array}
	GetBuffer : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} buffer
	//** @param{Int32} offset
	//** @param{Int32} count
	//** @returns{Int32}
	Read : function( buffer, offset, count ){
		buffer[ offset ] = this._stream.slice( this._pos, count );
		this._pos += buffer[ offset ].length;
		return buffer[ offset ].length;
	},

	//** @returns{Int32}
	ReadByte : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int64} offset
	//** @param{SeekOrigin} loc
	//** @returns{Int64}
	Seek : function( offset, loc ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int64} value
	//** @returns{Void}
	SetLength : function( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Array}
	ToArray : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} buffer
	//** @param{Int32} offset
	//** @param{Int32} count
	//** @returns{Void}
	Write : function( buffer, offset, count ){
		if (  ( typeof buffer ) == "string" )	{
			buffer = buffer.split("");
		}
		this._stream = this._stream.concat( buffer.slice( offset, count ) );
	},

	//** @param{Byte} value
	//** @returns{Void}
	WriteByte : function( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Stream} stream
	//** @returns{Void}
	WriteTo : function( stream ){
		throw new NotImplementedException( arguments.callee.name );
	}

}



//** @base{Stream}
function FileStream( path, mode, access ){
	var pLocalFile = Mozilla.Components.Instance( "@mozilla.org/file/local;1", "nsILocalFile" );
	pLocalFile.initWithPath( path );
	
	this.pFileInputStream = Mozilla.Components.Instance( "@mozilla.org/network/file-input-stream;1", "nsIFileInputStream" );
	this.pFileInputStream.init( pLocalFile, mode, 0, 0 );
	
	this.pScriptableInputStream = Mozilla.Components.Instance( "@mozilla.org/scriptableinputstream;1", "nsIScriptableInputStream" );
	this.pScriptableInputStream.init( this.pFileInputStream );
};
FileStream.prototype = {
	__proto__ : Stream.prototype,
	
	constructor : FileStream,
	
	//** @returns{Boolean}
	get CanRead(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get CanWrite(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get CanSeek(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsAsync(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Int64}
	get Length(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get Name(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Int64}
	get Position(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int64} value
	set Position( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{IntPtr}
	get Handle(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{SafeFileHandle}
	get SafeFileHandle(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{FileSecurity}
	GetAccessControl : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{FileSecurity} fileSecurity
	//** @returns{Void}
	SetAccessControl : function( fileSecurity ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Void}
	Flush : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int64} value
	//** @returns{Void}
	SetLength : function( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} bytes
	//** @param{Int32} offset
	//** @param{Int32} count
	//** @returns{Int32}
	Read : function( bytes, offset, count ){
		bytes[ offset ] = this.pScriptableInputStream.read( count );
		return bytes[ offset ].length;
	},

	//** @param{Int64} offset
	//** @param{SeekOrigin} origin
	//** @returns{Int64}
	Seek : function( offset, origin ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} array
	//** @param{Int32} offset
	//** @param{Int32} count
	//** @returns{Void}
	Write : function( array, offset, count ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} array
	//** @param{Int32} offset
	//** @param{Int32} numBytes
	//** @param{AsyncCallback} userCallback
	//** @param{Object} stateObject
	//** @returns{IAsyncResult}
	BeginRead : function( array, offset, numBytes, userCallback, stateObject ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{IAsyncResult} asyncResult
	//** @returns{Int32}
	EndRead : function( asyncResult ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Int32}
	ReadByte : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} array
	//** @param{Int32} offset
	//** @param{Int32} numBytes
	//** @param{AsyncCallback} userCallback
	//** @param{Object} stateObject
	//** @returns{IAsyncResult}
	BeginWrite : function( array, offset, numBytes, userCallback, stateObject ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{IAsyncResult} asyncResult
	//** @returns{Void}
	EndWrite : function( asyncResult ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Byte} value
	//** @returns{Void}
	WriteByte : function( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int64} position
	//** @param{Int64} length
	//** @returns{Void}
	Lock : function( position, length ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int64} position
	//** @param{Int64} length
	//** @returns{Void}
	Unlock : function( position, length ){
		throw new NotImplementedException( arguments.callee.name );
	},
	
	Close : function()	{
		this.pScriptableInputStream.close();
		this.pFileInputStream.close();
	}
}



//** @base{Object}
Path = {
	__proto__ : System.Object,
	
	//** @returns{Path}
	constructor : function(){
		throw new NotImplementedException( arguments.callee.name );
	},
	
    DirectorySeparatorChar : "\\",
    
    AltDirectorySeparatorChar : "\\",
    
    PathSeparator : ";",
    
    VolumeSeparatorChar : ":",
    
	//** @param{String} path
	//** @param{String} extension
	//** @returns{String}
	ChangeExtension : function( path, extension ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @returns{String}
	GetDirectoryName : function( path ){
		if( path.indexOf( "file://" ) == 0 ) {
            if( path == FILES_ROOT )   {
                return null;
            }
            var nsIIOService = Mozilla.Components.Instance( "@mozilla.org/network/io-service;1", "nsIIOService" );
            var Uri = nsIIOService.newURI( path, null, null );
            var pLocalFile = Uri.QueryInterface( Components.interfaces.nsIFileURL ).file;
        }
        else {
            var pLocalFile = Mozilla.Components.Instance( "@mozilla.org/file/local;1", "nsILocalFile" );
            pLocalFile.initWithPath( path );
        }
		return pLocalFile.parent ? pLocalFile.parent.path : null;
	},

	//** @returns{Array}
	GetInvalidPathChars : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Array}
	GetInvalidFileNameChars : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @returns{String}
	GetExtension : function( path ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @returns{String}
	GetFullPath : function( path ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @returns{String}
	GetFileName : function( path ){
        if( path.indexOf( "file://" ) == 0 ) {
            var nsIIOService = Mozilla.Components.Instance( "@mozilla.org/network/io-service;1", "nsIIOService" );
            var Uri = nsIIOService.newURI( path, null, null );
            var pLocalFile = Uri.QueryInterface( Components.interfaces.nsIFileURL ).file;
        }
        else {
            var pLocalFile = Mozilla.Components.Instance( "@mozilla.org/file/local;1", "nsILocalFile" );
            pLocalFile.initWithPath( path );
        }
        
		return pLocalFile.leafName;
	},

	//** @param{String} path
	//** @returns{String}
	GetFileNameWithoutExtension : function( path ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @returns{String}
	GetPathRoot : function( path ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	GetTempPath : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	GetRandomFileName : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	GetTempFileName : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @returns{Boolean}
	HasExtension : function( path ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @returns{Boolean}
	IsPathRooted : function( path ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path1
	//** @param{String} path2
	//** @returns{String}
	Combine : function( path1, path2 ){
		throw new NotImplementedException( arguments.callee.name );
	}

}


//** @base{Object}
File = {
	__proto__ : System.Object,
	
	//** @returns{File}
	constructor : function(){
		throw new NotImplementedException( arguments.callee.name );
	},
	
	//** @param{String} path
	//** @returns{StreamReader}
	OpenText : function( path ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @returns{StreamWriter}
	CreateText : function( path ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @returns{StreamWriter}
	AppendText : function( path ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} sourceFileName
	//** @param{String} destFileName
	//** @returns{Void}
	Copy : function( sourceFileName, destFileName ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} sourceFileName
	//** @param{String} destFileName
	//** @param{Boolean} overwrite
	//** @returns{Void}
	Copy : function( sourceFileName, destFileName, overwrite ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @returns{FileStream}
	Create : function( path ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @param{Int32} bufferSize
	//** @returns{FileStream}
	Create : function( path, bufferSize ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @param{Int32} bufferSize
	//** @param{FileOptions} options
	//** @returns{FileStream}
	Create : function( path, bufferSize, options ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @param{Int32} bufferSize
	//** @param{FileOptions} options
	//** @param{FileSecurity} fileSecurity
	//** @returns{FileStream}
	Create : function( path, bufferSize, options, fileSecurity ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @returns{Void}
	Delete : function( path ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @returns{Void}
	Decrypt : function( path ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @returns{Void}
	Encrypt : function( path ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @returns{Boolean}
	Exists : function( path ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @param{FileMode} mode
	//** @returns{FileStream}
	Open : function( path, mode ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @param{FileMode} mode
	//** @param{FileAccess} access
	//** @returns{FileStream}
	Open : function( path, mode, access ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @param{FileMode} mode
	//** @param{FileAccess} access
	//** @param{FileShare} share
	//** @returns{FileStream}
	Open : function( path, mode, access, share ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @param{DateTime} creationTime
	//** @returns{Void}
	SetCreationTime : function( path, creationTime ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @param{DateTime} creationTimeUtc
	//** @returns{Void}
	SetCreationTimeUtc : function( path, creationTimeUtc ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @returns{DateTime}
	GetCreationTime : function( path ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @returns{DateTime}
	GetCreationTimeUtc : function( path ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @param{DateTime} lastAccessTime
	//** @returns{Void}
	SetLastAccessTime : function( path, lastAccessTime ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @param{DateTime} lastAccessTimeUtc
	//** @returns{Void}
	SetLastAccessTimeUtc : function( path, lastAccessTimeUtc ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @returns{DateTime}
	GetLastAccessTime : function( path ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @returns{DateTime}
	GetLastAccessTimeUtc : function( path ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @param{DateTime} lastWriteTime
	//** @returns{Void}
	SetLastWriteTime : function( path, lastWriteTime ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @param{DateTime} lastWriteTimeUtc
	//** @returns{Void}
	SetLastWriteTimeUtc : function( path, lastWriteTimeUtc ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @returns{DateTime}
	GetLastWriteTime : function( path ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @returns{DateTime}
	GetLastWriteTimeUtc : function( path ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @returns{FileAttributes}
	GetAttributes : function( path ){
        if( path.indexOf( "file://" ) == 0 ) {
            if( path == FILES_ROOT )    {
                return { Directory : 0x10, System : 4 };
            }
            var nsIIOService = Mozilla.Components.Instance( "@mozilla.org/network/io-service;1", "nsIIOService" );
            var Uri = nsIIOService.newURI( path, null, null );
            var pLocalFile = Uri.QueryInterface( Components.interfaces.nsIFileURL ).file;
        }
        else {
            var pLocalFile = Mozilla.Components.Instance( "@mozilla.org/file/local;1", "nsILocalFile" );
            pLocalFile.initWithPath( path );
        }
        if( pLocalFile.parent == null )    {    // Root
            return { Directory : 0x10, System : 4 };
        }
        var attributes = {};
		if( pLocalFile.isDirectory() )    {
            attributes["Directory"] = 0x10;
        }
		if( ( pLocalFile.isWritable() == false ) && ( pLocalFile.isReadable() ) )    {
            attributes["ReadOnly"] = 1;
        }
		if( pLocalFile.isHidden() )    {
            attributes["Hidden"] = 2;
        }
		if( pLocalFile.isSpecial() )    {
            attributes["System"] = 4;
        }
		// Finally
		if( attributes.length == 0 )	{
			attributes["Normal"] = 0x80;
		}
		return attributes;
	},

	//** @param{String} path
	//** @param{FileAttributes} fileAttributes
	//** @returns{Void}
	SetAttributes : function( path, fileAttributes ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @returns{FileSecurity}
	GetAccessControl : function( path ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @param{AccessControlSections} includeSections
	//** @returns{FileSecurity}
	GetAccessControl : function( path, includeSections ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @param{FileSecurity} fileSecurity
	//** @returns{Void}
	SetAccessControl : function( path, fileSecurity ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @returns{FileStream}
	OpenRead : function( path ){
		return new System.IO.FileStream( path, -1 );
	},

	//** @param{String} path
	//** @returns{FileStream}
	OpenWrite : function( path ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @returns{String}
	ReadAllText : function( path ){
		const ARRAY_OFFSET = 0;
		
		var pFileStream = System.IO.File.OpenRead( path );
		var pStreamRead = [];
		var pFileContents = "";
		while ( pFileStream.Read( pStreamRead, ARRAY_OFFSET, 4096 ) ) {
			pFileContents += pStreamRead[ ARRAY_OFFSET ];
		}
		pFileStream.Close();
		return pFileContents;	
	},

	//** @param{String} path
	//** @param{Encoding} encoding
	//** @returns{String}
	ReadAllText_encoding : function( path, encoding ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @param{String} contents
	//** @returns{Void}
	WriteAllText : function( path, contents ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @param{String} contents
	//** @param{Encoding} encoding
	//** @returns{Void}
	WriteAllText : function( path, contents, encoding ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @returns{Array}
	ReadAllBytes : function( path ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @param{Array} bytes
	//** @returns{Void}
	WriteAllBytes : function( path, bytes ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @returns{Array}
	ReadAllLines : function( path ){
		const ARRAY_OFFSET = 0;
		
		var pFileStream = System.IO.File.OpenRead( path );
		var pStreamRead = [];
		var pLineEntries = [];
		var pStreamLines = [];
		while ( pFileStream.Read( pStreamRead, ARRAY_OFFSET, 4096 ) ) {
			if ( pStreamRead[ ARRAY_OFFSET ].length > 0 )		{
				pStreamLines = pStreamRead[ ARRAY_OFFSET ].split( "\n" );
				pLineEntries = pLineEntries.concat( pStreamLines )
			}
		}
		pFileStream.Close();
		return pLineEntries;
	},

	//** @param{String} path
	//** @param{Encoding} encoding
	//** @returns{Array}
	ReadAllLines_encoding : function( path, encoding ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @param{Array} contents
	//** @returns{Void}
	WriteAllLines : function( path, contents ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @param{Array} contents
	//** @param{Encoding} encoding
	//** @returns{Void}
	WriteAllLines : function( path, contents, encoding ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @param{String} contents
	//** @returns{Void}
	AppendAllText : function( path, contents ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @param{String} contents
	//** @param{Encoding} encoding
	//** @returns{Void}
	AppendAllText : function( path, contents, encoding ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} sourceFileName
	//** @param{String} destFileName
	//** @returns{Void}
	Move : function( sourceFileName, destFileName ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} sourceFileName
	//** @param{String} destinationFileName
	//** @param{String} destinationBackupFileName
	//** @returns{Void}
	Replace : function( sourceFileName, destinationFileName, destinationBackupFileName ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} sourceFileName
	//** @param{String} destinationFileName
	//** @param{String} destinationBackupFileName
	//** @param{Boolean} ignoreMetadataErrors
	//** @returns{Void}
	Replace : function( sourceFileName, destinationFileName, destinationBackupFileName, ignoreMetadataErrors ){
		throw new NotImplementedException( arguments.callee.name );
	}

}



//** @base{Object}
Directory = {
	__proto__ : System.Object,
	
	//** @returns{Directory}
	constructor : function(){
		throw new NotImplementedException( arguments.callee.name );
	},
	
	//** @param{String} path
	//** @returns{DirectoryInfo}
	GetParent : function( path ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @returns{DirectoryInfo}
	CreateDirectory : function( path ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @param{DirectorySecurity} directorySecurity
	//** @returns{DirectoryInfo}
	CreateDirectory : function( path, directorySecurity ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @returns{Boolean}
	Exists : function( path ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @param{DateTime} creationTime
	//** @returns{Void}
	SetCreationTime : function( path, creationTime ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @param{DateTime} creationTimeUtc
	//** @returns{Void}
	SetCreationTimeUtc : function( path, creationTimeUtc ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @returns{DateTime}
	GetCreationTime : function( path ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @returns{DateTime}
	GetCreationTimeUtc : function( path ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @param{DateTime} lastWriteTime
	//** @returns{Void}
	SetLastWriteTime : function( path, lastWriteTime ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @param{DateTime} lastWriteTimeUtc
	//** @returns{Void}
	SetLastWriteTimeUtc : function( path, lastWriteTimeUtc ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @returns{DateTime}
	GetLastWriteTime : function( path ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @returns{DateTime}
	GetLastWriteTimeUtc : function( path ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @param{DateTime} lastAccessTime
	//** @returns{Void}
	SetLastAccessTime : function( path, lastAccessTime ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @param{DateTime} lastAccessTimeUtc
	//** @returns{Void}
	SetLastAccessTimeUtc : function( path, lastAccessTimeUtc ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @returns{DateTime}
	GetLastAccessTime : function( path ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @returns{DateTime}
	GetLastAccessTimeUtc : function( path ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @returns{DirectorySecurity}
	GetAccessControl : function( path ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @param{AccessControlSections} includeSections
	//** @returns{DirectorySecurity}
	GetAccessControl : function( path, includeSections ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @param{DirectorySecurity} directorySecurity
	//** @returns{Void}
	SetAccessControl : function( path, directorySecurity ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @returns{Array}
	GetFiles : function( path ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @param{String} searchPattern
	//** @param{SearchOption} searchOption
	//** @returns{Array}
	GetFiles : function( path, searchPattern, searchOption ){
		try {
            var pFileEntries = [];
            if( path.indexOf( "file://" ) == 0 ) {
                var nsIIOService = Mozilla.Components.Instance( "@mozilla.org/network/io-service;1", "nsIIOService" );
                var Uri = nsIIOService.newURI( path, null, null );
                var pLocalFile = Uri.QueryInterface( Components.interfaces.nsIFileURL ).file;
            }
            else {
                var pLocalFile = Mozilla.Components.Instance( "@mozilla.org/file/local;1", "nsILocalFile" );
                pLocalFile.initWithPath( path );
            }
			var pEnumerator = pLocalFile.directoryEntries;
			while( pEnumerator.hasMoreElements() )	{
				var pNextFile = pEnumerator.getNext().QueryInterface( Components.interfaces.nsIFile );
				if( pNextFile.isSpecial() == false )	{
					if ( pNextFile.isDirectory() == false )		{
						if ( ( searchPattern == undefined ) || ( pNextFile.leafName.indexOf( searchPattern ) ) )		{
							pFileEntries.push( pNextFile.path );
						}
					}
					else if ( searchOption == System.IO.SearchOption.AllDirectories )	{
						pFileEntries = pFileEntries.concat( System.IO.Directory.GetFiles( pNextFile.path, searchPattern, searchOption ) );
					}
				}
			}
		}
		catch( e )	{
            
		}
		finally	{
			return pFileEntries;
		}
	},

	//** @param{String} path
	//** @returns{Array}
	GetDirectories : function( path ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @param{String} searchPattern
	//** @returns{Array}
	GetDirectories : function( path, searchPattern ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @param{String} searchPattern
	//** @param{SearchOption} searchOption
	//** @returns{Array}
	GetDirectories : function( path, searchPattern, searchOption ){
		try {
            var pFileEntries = [];
            if( path.indexOf( "file://" ) == 0 ) {
                var nsIIOService = Mozilla.Components.Instance( "@mozilla.org/network/io-service;1", "nsIIOService" );
                var Uri = nsIIOService.newURI( path, null, null );
                var pLocalFile = Uri.QueryInterface( Components.interfaces.nsIFileURL ).file;
            }
            else {
                var pLocalFile = Mozilla.Components.Instance( "@mozilla.org/file/local;1", "nsILocalFile" );
                pLocalFile.initWithPath( path );
            }
            if( pLocalFile.parent != null )    {
                if( pLocalFile.isSpecial() )	{
                	return pFileEntries;
                }
            }
			var pEnumerator = pLocalFile.directoryEntries;
			while( pEnumerator.hasMoreElements() )	{
				var pNextFile = pEnumerator.getNext().QueryInterface( Components.interfaces.nsIFile );
				try	{
					if( pNextFile.isDirectory() )		{
						if ( ( searchPattern == undefined ) || ( pNextFile.leafName.indexOf( searchPattern ) ) )		{
							pFileEntries.push( pNextFile.path );
						}
						if ( searchOption == System.IO.SearchOption.AllDirectories )	{
							pFileEntries = pFileEntries.concat( System.IO.Directory.GetDirectories( pNextFile.path, searchPattern, searchOption ) );
						}
					}
				}
				catch( e ){}
			}
		}
		catch( e )	{
            Console.WriteLine( "GetFileSystemEntries: "+e +" " +pLocalFile.path );
		}
		finally	{
			return pFileEntries;
		}
	},

	//** @param{String} path
	//** @returns{Array}
	GetFileSystemEntries : function( path ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @param{String} searchPattern
	//** @returns{Array}
	GetFileSystemEntries : function( path, searchPattern ){
        try {
            var pFileEntries = [];
            if( path.indexOf( "file://" ) == 0 ) {
                var nsIIOService = Mozilla.Components.Instance( "@mozilla.org/network/io-service;1", "nsIIOService" );
                var Uri = nsIIOService.newURI( path, null, null );
                var pLocalFile = Uri.QueryInterface( Components.interfaces.nsIFileURL ).file;
            }
            else {
                var pLocalFile = Mozilla.Components.Instance( "@mozilla.org/file/local;1", "nsILocalFile" );
                pLocalFile.initWithPath( path );
            }
            if( pLocalFile.parent != null )    {
                if( pLocalFile.isSpecial() )	{
                	return pFileEntries;
                }
            }
			var pEnumerator = pLocalFile.directoryEntries;
			while( pEnumerator.hasMoreElements() )	{
				var pNextFile = pEnumerator.getNext().QueryInterface( Components.interfaces.nsIFile );
				if ( ( searchPattern == undefined ) || ( pNextFile.leafName.indexOf( searchPattern ) ) )		{
					pFileEntries.push( pNextFile.path );
				}
			}
		}
		catch( e )	{
            if( e.name == "NS_ERROR_FILE_NOT_FOUND" )   {
                throw new DirectoryNotFoundException();
            }
            else if( e.name == "NS_ERROR_FILE_ACCESS_DENIED" )   {
                throw new UnauthorizedAccessException();
            }
		}
		finally	{
			return pFileEntries;
		}
	},

	//** @returns{Array}
	GetLogicalDrives : function(){
		try {
            var pDriveEntries = [];
            var path = "\\\\.";
            var pLocalFile = Mozilla.Components.Instance( "@mozilla.org/file/local;1", "nsILocalFile" );
            pLocalFile.initWithPath( path );
            var pEnumerator = pLocalFile.directoryEntries;
			while( pEnumerator.hasMoreElements() )	{
				var pNextFile = pEnumerator.getNext().QueryInterface( Components.interfaces.nsIFile );
				pDriveEntries.push( pNextFile.path );
            }
        }
        catch( e )  {
            Console.WriteLine( "GetLogicalDrives: "+e +" " +pNextFile.path );
        }
        finally {
            return pDriveEntries;
        }
	},

	//** @param{String} path
	//** @returns{String}
	GetDirectoryRoot : function( path ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	GetCurrentDirectory : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @returns{Void}
	SetCurrentDirectory : function( path ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} sourceDirName
	//** @param{String} destDirName
	//** @returns{Void}
	Move : function( sourceDirName, destDirName ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @returns{Void}
	Delete : function( path ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} path
	//** @param{Boolean} recursive
	//** @returns{Void}
	Delete : function( path, recursive ){
		throw new NotImplementedException( arguments.callee.name );
	}

}


//** @base{MarshalByRefObject}
TextReader = {
	__proto__ : System.Object.prototype,
	
	//** @returns{TextReader}
	constructor : function(){
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

	//** @returns{Int32}
	Peek : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Int32}
	Read : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} buffer
	//** @param{Int32} index
	//** @param{Int32} count
	//** @returns{Int32}
	Read : function( buffer, index, count ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	ReadToEnd : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} buffer
	//** @param{Int32} index
	//** @param{Int32} count
	//** @returns{Int32}
	ReadBlock : function( buffer, index, count ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	ReadLine : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{TextReader} reader
	//** @returns{TextReader}
	Synchronized : function( reader ){
		throw new NotImplementedException( arguments.callee.name );
	}

}




//** @param{String} s
//** @returns{StringReader}
function StringReader( s ){
	if (s == null) {
		throw new ArgumentNullException( "s" );
	}
	this.__string = s;
	this.__pos = 0;
};
//** @base{TextReader}
StringReader.prototype = {
	__proto__ :TextReader,
	
	constructor : StringReader,
	
	//** @returns{Void}
	Close : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Int32}
	Peek : function(  ){
		if ( this.__pos == this.__string.length )	{
			return -1;
		}
		else	{
			return __string[ pos +1 ];
		}
	},

	//** @param{Array} buffer
	//** @param{Int32} index
	//** @param{Int32} count
	//** @returns{Int32}
	Read : function( buffer, index, count ){
		if ( this.__pos == this.__string.length )	{
			return -1;
		}
		if( !buffer )	{
			var s = this.__string.slice( this.__pos, ( count > this.__string.length ) ? this.__string.length : count );
			buffer[ index ] = s;
			this.__pos += s.length;
			return s.length;
		}
		else	{
			this.__pos++;
			return this.__string[ this.__pos ];
		}
	},

	//** @returns{String}
	ReadToEnd : function(  ){
		return this.__string.slice( this.__pos, this.__string.length ).toString();
	},

	//** @returns{String}
	ReadLine : function(  ){
		var pos = this.__string.lastIndexOf( "\n", this.__pos );
		if( pos )	{
			var s = this.__string.slice( this.__pos, pos );
			this.__pos = pos +1; //** The resulting string does not contain the terminating carriage return and/or line feed
			return s;
		}
		else	{
			return this.ReadToEnd();
		}
	}

}