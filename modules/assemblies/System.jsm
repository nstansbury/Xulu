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



var EXPORTED_SYMBOLS = ["System","String","Boolean","Console","Attribute","AttributeUsageAttribute","AttributeTargets","Uri","ExceptionMessageKind","Exception","SystemException","NotImplementedException","InvalidOperationException","ArgumentNullException","ArgumentException","IndexOutOfRangeException","UnauthorizedAccessException","Delegate","MulticastDelegate","EventHandler","IAsyncResult","AsyncCallback","EventArgs","ValueType","Type","BindingFlags","Environment","Guid"];


System = {
	__Global : null,
	
	Components : Components,
	
	Object : function( obj )	{
		function f(){};
		if ( typeof( obj ) == "function" )	{		// Have we been passed a constructor?
			f.prototype = obj.prototype;
		}
		else	{
			f.prototype = obj;
		}
		return new f();
	},
	
	Init : function( global )	{
		this.__Global = global;
		this.Import( "System", true );	//** Import System symbols into System namepsace
	},
	
	Import : function Import( namespace, namespaceOnly, scope )	{
		//Console.WriteLine( "_____Importing Namespace: " + namespace );
		
		var keys = namespace.split( "." );	//** Expecting format:  x.y.z
		var len = keys.length;
		
		if ( !scope )	{
			scope = this.__Global;
		}
		var ns = scope;
		
		//** Ensure the full namespace object hierachy exists
		for ( var i = 0; i < len; i++ )	{
			var key = keys[ i ];
			//** Because testing for undefined in strict mode generates a "referenced to undefined property" warning
			if( ns.hasOwnProperty( key ) == false )	{
				//Console.WriteLine( "Add key: " +keys[ i ] );
				ns[ key ] = {};
			}
			ns = ns[ key ];
		}
		
		if ( ( keys[ 0 ] == "System") || ( keys[ 0 ] == "Mozilla") )	{
			var resource = "resource://xulu/assemblies/" +namespace +".jsm";
		}
		else	{
			var resource = "resource://" + keys[ 0 ] +"/" +namespace +".jsm";
		}
		
		// Import declared methods into both current scope and namespace scope
		// Eg. new z() and new x.y.z()
		try {
			if ( namespaceOnly != true )	{
				this.Components.utils.import( resource, scope );
			}
			this.Components.utils.import( resource, ns );
			//Console.WriteLine( "_______Imported Assembly: " + resource );
		}
		catch( e )	{
			var ex = new SystemException( "Assembly Import Failed\n" +resource +"\n" +e.message, e );
			ex.pStack = Components.stack.caller;
			Console.WriteLine( ex );
		}
		return scope[ keys[ 0 ] ];
	}
}


System.Object.prototype.GetType = function GetType()	{
	var type = System.Object( System.Type )
	type.constructor( this );
	return type;
}

//** This is a hack for the instanceof issues
System.Object.prototype.__isType__ = function __isType__( type )	{
	//Console.WriteLine( "IsTypeOf: " +this.constructor.name );
	try {
		if ( this instanceof type )	{
			return true;
		}
	}
	catch( e ){
	}
	try	{
		if ( type.isPrototypeOf( this ) )	{
			return true
		}
	}
	catch( e ){
	}
	return false;
};




// NB. we're extending the String prototype and re-exporting from this scope
String.prototype.Trim = function( chars )	{
		var str = this.replace( /^\s\s*/, '' );
		var ws = /\s/;
		var i = str.length;
		while ( ws.test( str.charAt( --i ) ) );
		return str.slice( 0, i + 1 );
};
String.prototype.Split = function( chars )	{
		return this.split( chars );
};
String.prototype.ToString = function()	{
		return this.toString();
}

//** @static
//** @param{String} string
//** @returns{Boolean}
Boolean.Parse = function( string ) {
    return ( string.toLowerCase() === "true" ) ? true : false; 
};


Console = {
	WriteLine : function( value )	{
		var cs = Components.classes[ "@mozilla.org/consoleservice;1" ].getService( Components.interfaces.nsIConsoleService );
		if ( value == undefined )	{
			if( typeof( value ) == "object" )	{
				value = "null"
			}
			else {
				value = "undefined";
			}
		}
		if ( typeof( value ) == "string" )	{
			cs.logStringMessage( (value == "" ) ? "[Empty String]" : value );
		}
		else	{
			try	{
				cs.logMessage( value.QueryInterface( Components.interfaces.nsIConsoleMessage ) );
			}
			catch( ex )	{
				cs.logStringMessage( value );
			}
		}
	}
}

BindingFlags = {
    CreateInstance : 0x200,
    DeclaredOnly : 2,
    Default : 0,
    ExactBinding : 0x10000,
    FlattenHierarchy : 0x40,
    GetField : 0x400,
    GetProperty : 0x1000,
    IgnoreCase : 1,
    IgnoreReturn : 0x1000000,
    Instance : 4,
    InvokeMethod : 0x100,
    NonPublic : 0x20,
    OptionalParamBinding : 0x40000,
    Public : 0x10,
    PutDispProperty : 0x4000,
    PutRefDispProperty : 0x8000,
    SetField : 0x800,
    SetProperty : 0x2000,
    Static : 8,
    SuppressChangeType : 0x20000
}


//** @base{Object}
Attribute = {
	__proto__ : System.Object.prototype,
	
	//** @returns{Attribute}
	constructor : function Attribute(){
		return this;
	},

	//** @returns{Object}
	get TypeId(){
		throw new NotImplementedException( arguments.callee.name );
	},
	
	//** @static
	//** @param{MemberInfo} element
	//** @param{Type} type
	//** @param{Boolean} inherit
	//** @returns{Array}
	GetCustomAttributes : function( element, type, inherit ){
		if ( element.__isType__( System.Reflection.MemberInfo ) == false )	{
			throw new ArgumentException( "Invalid MemberInfo type" );
		}
		var object = element._WrappedJSObject();
		if ( inherit == false )	{
			var attributes = ( object.__CustomAttributes  ) ? object.__CustomAttributes : [];
			
			//var attributes = ( object.constructor.prototype.__CustomAttributes  ) ? object.constructor.prototype.__CustomAttributes : [];
		}
		else	{
			var attributes = ( object.__CustomAttributes  ) ? object.__CustomAttributes : [];
		}
		if ( !type )		{
			return attributes;
		}
		else	{
			var types = [];
			for ( var i = 0; i < attributes.length; i++ )	{
				if ( attributes[ i ].__isType__( type ) )	{
					types.push( attributes[ i ] );
				}
			}
			return types;
		}
	},

	/*
	//** @static
	//** @param{MemberInfo} element
	//** @returns{Array}
	GetCustomAttributes : function( element ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{MemberInfo} element
	//** @param{Boolean} inherit
	//** @returns{Array}
	GetCustomAttributes : function( element, inherit ){
		throw new NotImplementedException( arguments.callee.name );
	},
	 */
	
	//** @static
	//** @param{MemberInfo} element
	//** @param{Type} attributeType
	//** @returns{Boolean}
	IsDefined : function( element, attributeType ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{MemberInfo} element
	//** @param{Type} attributeType
	//** @param{Boolean} inherit
	//** @returns{Boolean}
	IsDefined : function( element, attributeType, inherit ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{MemberInfo} element
	//** @param{Type} attributeType
	//** @returns{Attribute}
	GetCustomAttribute : function( element, attributeType ){
		return this.GetCustomAttributes( element, attributeType )[ 0 ];
	},

	/*
	//** @static
	//** @param{MemberInfo} element
	//** @param{Type} attributeType
	//** @param{Boolean} inherit
	//** @returns{Attribute}
	GetCustomAttribute : function( element, attributeType, inherit ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{ParameterInfo} element
	//** @returns{Array}
	GetCustomAttributes : function( element ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{ParameterInfo} element
	//** @param{Type} attributeType
	//** @returns{Array}
	GetCustomAttributes : function( element, attributeType ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{ParameterInfo} element
	//** @param{Type} attributeType
	//** @param{Boolean} inherit
	//** @returns{Array}
	GetCustomAttributes : function( element, attributeType, inherit ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{ParameterInfo} element
	//** @param{Boolean} inherit
	//** @returns{Array}
	GetCustomAttributes : function( element, inherit ){
		throw new NotImplementedException( arguments.callee.name );
	},
	 */
	
	//** @static
	//** @param{ParameterInfo} element
	//** @param{Type} attributeType
	//** @returns{Boolean}
	IsDefined : function( element, attributeType ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{ParameterInfo} element
	//** @param{Type} attributeType
	//** @param{Boolean} inherit
	//** @returns{Boolean}
	IsDefined : function( element, attributeType, inherit ){
		throw new NotImplementedException( arguments.callee.name );
	},

	/*
	//** @static
	//** @param{ParameterInfo} element
	//** @param{Type} attributeType
	//** @returns{Attribute}
	GetCustomAttribute : function( element, attributeType ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{ParameterInfo} element
	//** @param{Type} attributeType
	//** @param{Boolean} inherit
	//** @returns{Attribute}
	GetCustomAttribute : function( element, attributeType, inherit ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{Module} element
	//** @param{Type} attributeType
	//** @returns{Array}
	GetCustomAttributes : function( element, attributeType ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{Module} element
	//** @returns{Array}
	GetCustomAttributes : function( element ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{Module} element
	//** @param{Boolean} inherit
	//** @returns{Array}
	GetCustomAttributes : function( element, inherit ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{Module} element
	//** @param{Type} attributeType
	//** @param{Boolean} inherit
	//** @returns{Array}
	GetCustomAttributes : function( element, attributeType, inherit ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{Module} element
	//** @param{Type} attributeType
	//** @returns{Boolean}
	IsDefined : function( element, attributeType ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{Module} element
	//** @param{Type} attributeType
	//** @param{Boolean} inherit
	//** @returns{Boolean}
	IsDefined : function( element, attributeType, inherit ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{Module} element
	//** @param{Type} attributeType
	//** @returns{Attribute}
	GetCustomAttribute : function( element, attributeType ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{Module} element
	//** @param{Type} attributeType
	//** @param{Boolean} inherit
	//** @returns{Attribute}
	GetCustomAttribute : function( element, attributeType, inherit ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{Assembly} element
	//** @param{Type} attributeType
	//** @returns{Array}
	GetCustomAttributes : function( element, attributeType ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{Assembly} element
	//** @param{Type} attributeType
	//** @param{Boolean} inherit
	//** @returns{Array}
	GetCustomAttributes : function( element, attributeType, inherit ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{Assembly} element
	//** @returns{Array}
	GetCustomAttributes : function( element ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{Assembly} element
	//** @param{Boolean} inherit
	//** @returns{Array}
	GetCustomAttributes : function( element, inherit ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{Assembly} element
	//** @param{Type} attributeType
	//** @returns{Boolean}
	IsDefined : function( element, attributeType ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{Assembly} element
	//** @param{Type} attributeType
	//** @param{Boolean} inherit
	//** @returns{Boolean}
	IsDefined : function( element, attributeType, inherit ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{Assembly} element
	//** @param{Type} attributeType
	//** @returns{Attribute}
	GetCustomAttribute : function( element, attributeType ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{Assembly} element
	//** @param{Type} attributeType
	//** @param{Boolean} inherit
	//** @returns{Attribute}
	GetCustomAttribute : function( element, attributeType, inherit ){
		throw new NotImplementedException( arguments.callee.name );
	},
	 */
	
	//** @param{Object} obj
	//** @returns{Boolean}
	Equals : function( obj ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Int32}
	GetHashCode : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Object} obj
	//** @returns{Boolean}
	Match : function( obj ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	IsDefaultAttribute : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},
	
	//** Decorate object with .NET metadata attribute
	//** @param{Object} target
	_Apply : function( target )	{
		if( target.__CustomAttributes == undefined )	{
			target.__CustomAttributes = [];
		}
		target.__CustomAttributes.push( this );
		//** If this attribute's AttributeUsageAttribute isn't valid on this target throw exception
	}

}




AttributeTargets = {
	All : 0x7fff,
	Assembly : 1,
	Class : 4,
	Constructor : 0x20,
	Delegate : 0x1000,
    Enum : 0x10,
    Event : 0x200,
    Field : 0x100,
    GenericParameter : 0x4000,
    Interface : 0x400,
    Method : 0x40,
    Module : 2,
    Parameter : 0x800,
    Property : 0x80,
    ReturnValue : 0x2000,
    Struct : 8
}


//** @returns{AttributeUsageAttribute}
function AttributeUsageAttribute( target, validOn, args ){
	try{
	if ( !target )	{
		throw new ArgumentNullException( "Attribute target cannot be NULL" );
	}
	args = ( !args ) ? {} : args;
	if ( this instanceof arguments.callee )	{
		System.Attribute.constructor.call( this );
		this.__ValidOn = "ValidOn" in args ? args.ValidOn : AttributeTargets.All;
		this._Apply( target );
		return;
	}
	var attribute = new AttributeUsageAttribute( target, validOn, args );
	args = ( !args ) ? {} : args;
	attribute.Inherited = "Inherited" in args ? args.Inherited : true;
	attribute.AllowMultiple = "AllowMultiple" in args ? args.AllowMultiple : true;
	}
	catch(e)	{
		Console.WriteLine( e )
	}
};
	
//** @base{Attribute}
AttributeUsageAttribute.prototype = {
	__proto__ : Attribute,

	//** @returns{AttributeTargets}
	get ValidOn(){
		return this.__ValidOn;
	},

	//** @returns{Boolean}
	get AllowMultiple(){
		return this.__AllowMultiple;
	},

	//** @param{Boolean} value
	set AllowMultiple( value ){
		this.__AllowMultiple = value;
	},

	//** @returns{Boolean}
	get Inherited(){
		return this.__Inherited;
	},

	//** @param{Boolean} value
	set Inherited( value ){
		this.__Inherited = value;
	}

}



ExceptionMessageKind = {
    "OutOfMemory" : 3,
    "ThreadAbort" : 1,
    "ThreadInterrupted" : 2
};

function Exception( message, innerException ){
	this.pName = "Exception";
	this.pFlags = 0;
	this.pStack = Components.stack.caller;
	this._message = message;
	this._InnerException = innerException | null;
	this._HResult = -2146233088;
}

Exception.prototype =	{
	__proto__ : System.Object.prototype,
	
	get category(){ return "Javascript" },
	get columnNumber(){ return 0 },
	get errorMessage(){ return this._message },
	get fileName(){ return this.sourceName },
	get flags(){ return this.pFlags; },
	get HResult(){ return this._HResult },
	get InnerException(){ return this._InnerException; },
	get lineNumber(){ return this.pStack.lineNumber },
	get message(){ return this.errorMessage },
	get name(){ return this.pName; },
	get sourceLine(){ return "" },
	get sourceName(){ return this.pStack.filename },
	get stack(){ return this.pStack },
	SetErrorCode : function( hr ){ this._HResult = hr },
	toString : function()	{	return this.name +"\n" +this.message +"\n" + this.fileName +"\t\t\t\t\t Line:  " +this.lineNumber; },
	init : function( message, sourceName, sourceLine, lineNumber, columnNumber, flags, category )	{},
	QueryInterface : function( iid )	{
		if ( iid.equals( Components.interfaces.nsIScriptError ) || iid.equals( Components.interfaces.nsIConsoleMessage ) || iid.equals( Components.interfaces.nsISupports ) )	{
			return this;
		}
		Components.returnCode = Components.results.NS_ERROR_NO_INTERFACE;
			return null;
	}
}


function SystemException( message, innerException )	{
	Exception.call( this, message, innerException );
	this.pName = arguments.callee.name;
	this.pStack = Components.stack.caller;
	this.SetErrorCode( -2146233087 );
};
SystemException.prototype = {
	__proto__ : Exception.prototype
}


function NotImplementedException( message, innerException )	{
	SystemException.call( this, message, innerException );
	this.SetErrorCode( -2147467263 );
	this.pName = arguments.callee.name;
	this.pStack = Components.stack.caller;
}
NotImplementedException.prototype = {
	__proto__ : SystemException.prototype
}


function InvalidOperationException( message, innerException )	{
	SystemException.call( this, message, innerException );
	this.SetErrorCode( -2146233079 );
	this.pName = arguments.callee.name;
	this.pStack = Components.stack.caller;
};
InvalidOperationException.prototype = {
	__proto__ : SystemException.prototype
}

function ArgumentNullException( message, innerException )	{
	SystemException.call( this, message, innerException );
	this.SetErrorCode( -2147467261 );
	this.pName = arguments.callee.name;
	this.pStack = Components.stack.caller;
};
ArgumentNullException.prototype = {
	__proto__ : SystemException.prototype
}

function ArgumentException( message, paramName, innerException )	{
	SystemException.call( this, message, innerException );
	this.__ParamName = paramName;
	this.SetErrorCode( -2147024809 );
	this.pName = arguments.callee.name;
	this.pStack = Components.stack.caller;
};
ArgumentException.prototype = {
	__proto__ : SystemException.prototype,
	get ParamName()	{
		return this.__ParamName
	}
}

function IndexOutOfRangeException( message, innerException )	{
	SystemException.call( this, message, innerException );
	this.pName = arguments.callee.name;
	this.pStack = Components.stack.caller;
}
IndexOutOfRangeException.prototype = {
	__proto__ : SystemException.prototype,
	constructor : IndexOutOfRangeException
}


function UnauthorizedAccessException( message, innerException )	{
	SystemException.call( this, message, innerException );
	this.pName = arguments.callee.name;
	this.pStack = Components.stack.caller;
}
UnauthorizedAccessException.prototype = {
	__proto__ : SystemException.prototype,
	constructor : UnauthorizedAccessException
}



// This isn't really correct
// We should inherit from the target function itself so we can call directly ie: delegate() not just delegate.Invoke();

//** @base{Object}
Delegate = {
	__proto__ : System.Object.prototype,
	
	//** @param{Object} target
	//** @param{string} method
	//** @returns{Delegate}
	constructor : function Delegate( target, method ){
		this._Target = target;
		this._method = method;
		var f = function(){ return target[ method ].apply( target, arguments ); };
		this._InvocationList = [ f ];
		return this;
	},

	//** @returns{MethodInfo}
	get Method(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Object}
	get Target(){
		return this._Target;
	},

	//** @param{Array} args
	//** @returns{Object}
	DynamicInvoke : function( args ){
		var il = this.GetInvocationList();
		//Console.WriteLine( "Delegate.DynamicInvoke: " +this._method );
		// -1 to return last delegate return value
		for( var i = 0; i < il.length - 1; i++  )	{
			il[ i ].apply( this, args );
		}
		return il[ i ].apply( this, args );
	},

	//** Arguments as per delegate function signature
	//** @returns{Void}
	Invoke : function(){
		return this.DynamicInvoke( arguments );
	},

	//** Arguments as per delegate function signature followed by:
	//** @param{AsyncCallback} callback
	//** @param{Object} object
	//** @returns{IAsyncResult}
	BeginInvoke : function(){
		var callback = arguments[ arguments.length -2 ];
		var state = arguments[ arguments.length -1 ];
		this._asyncResult = new System.IAsyncResult( state );
		
		// Queue on new thread & return immediately
		this._EndInvoke = this.DynamicInvoke( arguments );
		if ( callback ) {
			callback.Invoke( this._asyncResult );
		}
		
		return this._asyncResult;
	},

	//** @param{IAsyncResult} result
	//** @returns{Void}
	EndInvoke : function( result ){
		if ( result == this._asyncResult )		{
			return this._EndInvoke;
		}
		else	{
			throw new System.ArgumentException( "AsyncResult did not originate from a BeginInvoke method on the current delegate." );
		}
	},
	
	//** @param{Object} obj
	//** @returns{Boolean}
	Equals : function( obj ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Int32}
	GetHashCode : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Delegate} a
	//** @param{Delegate} b
	//** @returns{Delegate}
	Combine : function( a, b ){
		a.GetInvocationList().push( b );
		return a;
	},

	//** @returns{Array}
	GetInvocationList : function(  ){
		return this._InvocationList;
	},

	//** @param{Delegate} source
	//** @param{Delegate} value
	//** @returns{Delegate}
	Remove : function( source, value ){
		var il = source.GetInvocationList();
		for( var i = 0; i < il.length; i++ )	{
			if ( il[ i ] == value )	{
				delete il[ i ];
			}
		}
		return source;
	},

	//** @param{Delegate} source
	//** @param{Delegate} value
	//** @returns{Delegate}
	RemoveAll : function( source, value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Object}
	Clone : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Type} type
	//** @param{Object} target
	//** @param{String} method
	//** @returns{Delegate}
	CreateDelegate : function( type, target, method ){
		if ( type.__isType__( System.Type ) != true )	{
			throw new ArgumentException( "Invalid type argument" );
		}
		var delegate = new System.Object( type._WrappedJSObject() );		// Hmm better underlying JS object access?
		System.Delegate.constructor.call( delegate, target, method );
		return delegate;
	},

	//** @param{SerializationInfo} info
	//** @param{StreamingContext} context
	//** @returns{Void}
	GetObjectData : function( info, context ){
		throw new NotImplementedException( arguments.callee.name );
	}

}

//** @base{Delegate}
MulticastDelegate = {
	__proto__ : Delegate,

	//** @param{Object} target
	//** @param{string} method
	//** @returns{MulticastDelegate}
	constructor : function MulticastDelegate( target, method ){
		var mcd = new System.Object( this );
		return System.Delegate.constructor.call( mcd, target, method );
	},

	//** @param{SerializationInfo} info
	//** @param{StreamingContext} context
	//** @returns{Void}
	GetObjectData : function( info, context ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Object} obj
	//** @returns{Boolean}
	Equals : function( obj ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Array}
	GetInvocationList : function(){
		return this._InvocationList;
	},

	//** @returns{Int32}
	GetHashCode : function(){
		throw new NotImplementedException( arguments.callee.name );
	}

}




//** @returns{EventHandler}
function EventHandler( callback )	{
	this.EventHandler = callback;
	return Delegate.CreateDelegate( System.Type.GetType( "System.EventHandler" ), this, "EventHandler" );
}

//** @base{MulticastDelegate}
EventHandler.prototype = {
	__proto__ : MulticastDelegate,
	constructor : EventHandler
}




//** @returns{AsyncCallback}
function AsyncCallback( callback )	{
	this.AsyncCallback = callback
	return Delegate.CreateDelegate( System.Type.GetType( "System.AsyncCallback" ), this, "AsyncCallback" );
}

//** @base{MulticastDelegate}
AsyncCallback.prototype = {
	__proto__ : MulticastDelegate,
	constructor : AsyncCallback
}





//** @param{Object} asyncState
//** @returns{IAsyncResult}
function IAsyncResult( asyncState )	{
	this._AsyncState = asyncState;
	this._IsCompleted = false;
}

//** @base{}
IAsyncResult.prototype = {
	__proto__ : System.Object.prototype,
	constructor : IAsyncResult,
	
	//** @returns{Boolean}
	get IsCompleted(){
		return this._IsCompleted;
	},

	//** @returns{WaitHandle}
	get AsyncWaitHandle(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Object}
	get AsyncState(){
		return this._AsyncState;
	},

	//** @returns{Boolean}
	get CompletedSynchronously(){
		return false;
	}

}



//** @base{Object}
EventArgs = {
	__proto__ : System.Object.prototype,
	
	//** @returns{EventArgs}
	constructor : function EventArgs(){
		return this;
	},
	
	//** @returns{EventArgs}
	get Empty()	{
		throw new NotImplementedException( arguments.callee.name );
	}
}



//** @base{Object}
ValueType = {
	__proto__ : System.Object.prototype,
	
	//** @returns{ValueType}
	constructor : function ValueType(){
		throw new NotImplementedException( arguments.callee.name );
	},
	
	//** @param{Object} obj
	//** @returns{Boolean}
	Equals : function( obj ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Int32}
	GetHashCode : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	ToString : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	}

}



//** @base{Enum}
UriComponents = {
    AbsoluteUri : 0x7f,
    Fragment : 0x40,
    Host : 4,
    HostAndPort : 0x84,
    HttpRequestUrl : 0x3d,
    KeepDelimiter : 0x40000000,
    Path : 0x10,
    PathAndQuery : 0x30,
    Port : 8,
    Query : 0x20,
    Scheme : 1,
    SchemeAndServer : 13,
    SerializationInfoString : -2147483648,
    StrongAuthority : 0x86,
    StrongPort : 0x80,
    UserInfo : 2
};

//** @base{Enum}
UriFormat = {
    SafeUnescaped : 3,
    Unescaped : 2,
    UriEscaped : 1
}

//** @base{Enum}
UriHostNameType = {
    Unknown : 0,
    Basic : 1,
    Dns : 2,
    IPv4 : 3,
    IPv6 : 4
};


//** @param{Uri} baseUri
//** @param{String} baseUri
//** @param{String} relativeUri
function Uri( baseUri, relativeUri ){
	this.SchemeDelimiter = ":";
    this.UriSchemeFile = "file";
    this.UriSchemeFtp = "ftp";
    this.UriSchemeGopher = "gopher";
    this.UriSchemeHttp = "http";
    this.UriSchemeHttps = "https";
    this.UriSchemeMailto = "mailto";
    this.UriSchemeNetPipe = "";
    this.UriSchemeNetTcp = "";
    this.UriSchemeNews = "news";
    this.UriSchemeNntp = "nntp";

	var Mozilla = System.Import( "Mozilla.Components" );
	var nsIIOService = Mozilla.Components.Instance( "@mozilla.org/network/io-service;1", "nsIIOService" );
	if ( baseUri instanceof Uri )	{
		baseUri = baseUri.AbsoluteUri;
	}
		
	this._OriginalString = baseUri;
	try {
		this._mozUri = nsIIOService.newURI( baseUri, null, null );
		var h = this._mozUri.host;
	}
	catch( e )	{
		// We get an exception here for urn: schemes
		if( baseUri.indexOf( "urn:") == 0 )	{
			var protocolHandler = nsIIOService.getProtocolHandler( "urn" );
			this._mozUri = protocolHandler.newURI( baseUri, null, null );
		}
		else {
			// We get an exception here if it is a nativePath urieg: c:\windows etc
			var localFile = Mozilla.Components.Instance( "@mozilla.org/file/local;1", "nsILocalFile" );
			try {
				localFile.initWithPath( baseUri );
			}
			catch(e)	{
				throw new ArgumentException("Invalid baseURI: "+baseUri);
			}
			this._mozUri = nsIIOService.newFileURI( localFile );
		}
	}
	
	if ( relativeUri )	{
		this._mozUri = nsIIOService.newURI( relativeUri, null, this._mozUri );
	}
	try {
		this._mozUri.QueryInterface( Components.interfaces.nsIURL );
	}
	catch( e )	{
		
	}
};
//** @base{Object}
Uri.prototype = {
	__proto__ : System.Object,
	
	constructor : Uri,
	
	//** @returns{String}
	get AbsolutePath(){
		return this._mozUri.filePath;
	},

	//** @returns{String}
	get AbsoluteUri(){
		return this._mozUri.spec;
	},

	//** @returns{String}
	get Authority(){
		this._mozUri.hostPort;
	},

	//** @returns{String}
	get Host(){
		return this._mozUri.host;
	},

	//** @returns{UriHostNameType}
	get HostNameType(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsDefaultPort(){
		return ( this._mozUri.port == -1 ) ? true : false;
	},

	//** @returns{Boolean}
	get IsFile(){
		return ( this._mozUri.fileName == "" ) ? false : true;
	},

	//** @returns{Boolean}
	get IsLoopback(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsUnc(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get LocalPath(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get PathAndQuery(){
		return this.AbsolutePath + this.Query;
	},

	//** @returns{Int32}
	get Port(){
		return this._mozUri.port;
	},

	//** @returns{String}
	get Query(){
		return ( this._mozUri.query == "" ) ? "" : "?" + this._mozUri.query;
	},

	//** @returns{String}
	get Fragment(){
		return ( this._mozUri.ref == "" ) ? "" : "#" + this._mozUri.ref;
	},

	//** @returns{String}
	get Scheme(){
		return this._mozUri.scheme;
	},

	//** @returns{String}
	get OriginalString(){
		return this._OriginalString;
	},

	//** @returns{String}
	get DnsSafeHost(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsAbsoluteUri(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Array}
	get Segments(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get UserEscaped(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get UserInfo(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} name
	//** @returns{UriHostNameType}
	CheckHostName : function( name ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} schemeName
	//** @returns{Boolean}
	CheckSchemeName : function( schemeName ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Char} digit
	//** @returns{Int32}
	FromHex : function( digit ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Int32}
	GetHashCode : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	ToString : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Object} comparand
	//** @returns{Boolean}
	Equals : function( comparand ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{UriPartial} part
	//** @returns{String}
	GetLeftPart : function( part ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Char} character
	//** @returns{String}
	HexEscape : function( character ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} pattern
	//** @param{Array} index
	//** @returns{Char}
	HexUnescape : function( pattern, index ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Char} character
	//** @returns{Boolean}
	IsHexDigit : function( character ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} pattern
	//** @param{Int32} index
	//** @returns{Boolean}
	IsHexEncoding : function( pattern, index ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Uri} toUri
	//** @returns{String}
	MakeRelative : function( toUri ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Uri} uri
	//** @returns{Uri}
	MakeRelativeUri : function( uri ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} uriString
	//** @param{UriKind} uriKind
	//** @param{Array} result
	//** @returns{Boolean}
	TryCreate : function( uriString, uriKind, result ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Uri} baseUri
	//** @param{String} relativeUri
	//** @param{Array} result
	//** @returns{Boolean}
	TryCreate : function( baseUri, relativeUri, result ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Uri} baseUri
	//** @param{Uri} relativeUri
	//** @param{Array} result
	//** @returns{Boolean}
	TryCreate : function( baseUri, relativeUri, result ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Uri} uri
	//** @returns{Boolean}
	IsBaseOf : function( uri ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{UriComponents} components
	//** @param{UriFormat} format
	//** @returns{String}
	GetComponents : function( components, format ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	IsWellFormedOriginalString : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} uriString
	//** @param{UriKind} uriKind
	//** @returns{Boolean}
	IsWellFormedUriString : function( uriString, uriKind ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Uri} uri1
	//** @param{Uri} uri2
	//** @param{UriComponents} partsToCompare
	//** @param{UriFormat} compareFormat
	//** @param{StringComparison} comparisonType
	//** @returns{Int32}
	Compare : function( uri1, uri2, partsToCompare, compareFormat, comparisonType ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} stringToUnescape
	//** @returns{String}
	UnescapeDataString : function( stringToUnescape ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} stringToEscape
	//** @returns{String}
	EscapeUriString : function( stringToEscape ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} stringToEscape
	//** @returns{String}
	EscapeDataString : function( stringToEscape ){
		throw new NotImplementedException( arguments.callee.name );
	}

}



// Breaks circular reference: System > System.Reflection > System etc
System.Reflection = {}
Components.utils.import( "resource://xulu/assemblies/System.Reflection.jsm", System.Reflection );


//** @base{MemberInfo}
Type = {
	__proto__ : System.Reflection.MemberInfo,

	//** @returns{Type}
	constructor : function Type( object ){
		if( !object || object.constructor.name == "" )	{
			throw new System.ArgumentException( "Object missing formal constructor", arguments.callee.name )
		}
		System.Reflection.MemberInfo.constructor.call( this, object, object.constructor.name )
	},
	
	//** @returns{MemberTypes}
	get MemberType(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Type}
	get DeclaringType(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{MethodBase}
	get DeclaringMethod(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Type}
	get ReflectedType(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{StructLayoutAttribute}
	get StructLayoutAttribute(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Guid}
	get GUID(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Binder}
	get DefaultBinder(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Module}
	get Module(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Assembly}
	get Assembly(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{RuntimeTypeHandle}
	get TypeHandle(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get FullName(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get Namespace(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get AssemblyQualifiedName(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Type}
	get BaseType(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{ConstructorInfo}
	get TypeInitializer(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsNested(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{TypeAttributes}
	get Attributes(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{GenericParameterAttributes}
	get GenericParameterAttributes(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsVisible(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsNotPublic(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsPublic(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsNestedPublic(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsNestedPrivate(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsNestedFamily(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsNestedAssembly(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsNestedFamANDAssem(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsNestedFamORAssem(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsAutoLayout(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsLayoutSequential(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsExplicitLayout(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsClass(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsInterface(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsValueType(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsAbstract(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsSealed(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsEnum(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsSpecialName(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsImport(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsSerializable(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsAnsiClass(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsUnicodeClass(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsAutoClass(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsArray(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsGenericType(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsGenericTypeDefinition(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsGenericParameter(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Int32}
	get GenericParameterPosition(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get ContainsGenericParameters(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsByRef(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsPointer(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsPrimitive(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsCOMObject(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get HasElementType(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsContextful(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsMarshalByRef(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Type}
	get UnderlyingSystemType(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Type}
	GetType : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} typeName
	//** @param{Boolean} throwOnError
	//** @param{Boolean} ignoreCase
	//** @returns{Type}
	GetType : function( typeName, throwOnError, ignoreCase ){
		var namespace = {};
		var path = typeName.split( "." );
		var assembly = path.splice( 0, path.length -1 ).join(".");
		System.Import( assembly, false, namespace );
		var object = namespace[ path[ path.length -1 ] ];
		var type = new System.Object( System.Type );
		if ( typeof( object ) == "function" )	{
			type.constructor( object.prototype );
		}
		else	{
			type.constructor( object );
		}
		return type;
	},

	//** @param{String} typeName
	//** @param{Boolean} throwIfNotFound
	//** @param{Boolean} ignoreCase
	//** @returns{Type}
	ReflectionOnlyGetType : function( typeName, throwIfNotFound, ignoreCase ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Type}
	MakePointerType : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Type}
	MakeByRefType : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Type}
	MakeArrayType : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} rank
	//** @returns{Type}
	MakeArrayType : function( rank ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} progID
	//** @returns{Type}
	GetTypeFromProgID : function( progID ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} progID
	//** @param{Boolean} throwOnError
	//** @returns{Type}
	GetTypeFromProgID : function( progID, throwOnError ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} progID
	//** @param{String} server
	//** @returns{Type}
	GetTypeFromProgID : function( progID, server ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} progID
	//** @param{String} server
	//** @param{Boolean} throwOnError
	//** @returns{Type}
	GetTypeFromProgID : function( progID, server, throwOnError ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Guid} clsid
	//** @returns{Type}
	GetTypeFromCLSID : function( clsid ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Guid} clsid
	//** @param{Boolean} throwOnError
	//** @returns{Type}
	GetTypeFromCLSID : function( clsid, throwOnError ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Guid} clsid
	//** @param{String} server
	//** @returns{Type}
	GetTypeFromCLSID : function( clsid, server ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Guid} clsid
	//** @param{String} server
	//** @param{Boolean} throwOnError
	//** @returns{Type}
	GetTypeFromCLSID : function( clsid, server, throwOnError ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Type} type
	//** @returns{TypeCode}
	GetTypeCode : function( type ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} name
	//** @param{BindingFlags} invokeAttr
	//** @param{Binder} binder
	//** @param{Object} target
	//** @param{Array} args
	//** @param{Array} modifiers
	//** @param{CultureInfo} culture
	//** @param{Array} namedParameters
	//** @returns{Object}
	InvokeMember : function( name, invokeAttr, binder, target, args, modifiers, culture, namedParameters ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} name
	//** @param{BindingFlags} invokeAttr
	//** @param{Binder} binder
	//** @param{Object} target
	//** @param{Array} args
	//** @param{CultureInfo} culture
	//** @returns{Object}
	InvokeMember : function( name, invokeAttr, binder, target, args, culture ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} name
	//** @param{BindingFlags} invokeAttr
	//** @param{Binder} binder
	//** @param{Object} target
	//** @param{Array} args
	//** @returns{Object}
	InvokeMember : function( name, invokeAttr, binder, target, args ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Object} o
	//** @returns{RuntimeTypeHandle}
	GetTypeHandle : function( o ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{RuntimeTypeHandle} handle
	//** @returns{Type}
	GetTypeFromHandle : function( handle ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Int32}
	GetArrayRank : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{BindingFlags} bindingAttr
	//** @param{Binder} binder
	//** @param{CallingConventions} callConvention
	//** @param{Array} types
	//** @param{Array} modifiers
	//** @returns{ConstructorInfo}
	GetConstructor : function( bindingAttr, binder, callConvention, types, modifiers ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{BindingFlags} bindingAttr
	//** @param{Binder} binder
	//** @param{Array} types
	//** @param{Array} modifiers
	//** @returns{ConstructorInfo}
	GetConstructor : function( bindingAttr, binder, types, modifiers ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} types
	//** @returns{ConstructorInfo}
	GetConstructor : function( types ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Array}
	GetConstructors : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{BindingFlags} bindingAttr
	//** @returns{Array}
	GetConstructors : function( bindingAttr ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} name
	//** @param{BindingFlags} bindingAttr
	//** @param{Binder} binder
	//** @param{CallingConventions} callConvention
	//** @param{Array} types
	//** @param{Array} modifiers
	//** @returns{MethodInfo}
	GetMethod : function( name, bindingAttr, binder, callConvention, types, modifiers ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} name
	//** @param{BindingFlags} bindingAttr
	//** @param{Binder} binder
	//** @param{Array} types
	//** @param{Array} modifiers
	//** @returns{MethodInfo}
	GetMethod : function( name, bindingAttr, binder, types, modifiers ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} name
	//** @param{Array} types
	//** @param{Array} modifiers
	//** @returns{MethodInfo}
	GetMethod : function( name, types, modifiers ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} name
	//** @param{Array} types
	//** @returns{MethodInfo}
	GetMethod : function( name, types ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} name
	//** @param{BindingFlags} bindingAttr
	//** @returns{MethodInfo}
	GetMethod : function( name, bindingAttr ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} name
	//** @returns{MethodInfo}
	GetMethod : function( name ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{BindingFlags} bindingAttr
	//** @returns{Array}
	GetMethods : function( bindingAttr ){
		//** @bug{} only returns public properties
		var methods = [];
		var object = this._WrappedJSObject();
		for( item in object )	{
			if ( ( item.indexOf( "_" ) != 0 ) && ( object.__proto__.hasOwnProperty( item ) ) )	{
				var fn = object.__lookupGetter__( item );
				if ( fn == null )	{
					fn = object.__lookupSetter__( item );
				}
				if ( fn == null )	{
					var mInfo = System.Object( System.Reflection.MethodInfo );
					mInfo.constructor( object[ item ], item )
					methods.push( mInfo );
				}
			}
		}
		return methods;
	},

	//** @param{String} name
	//** @param{BindingFlags} bindingAttr
	//** @returns{FieldInfo}
	GetField : function( name, bindingAttr ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} name
	//** @returns{FieldInfo}
	GetField : function( name ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Array}
	GetFields : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{BindingFlags} bindingAttr
	//** @returns{Array}
	GetFields : function( bindingAttr ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} name
	//** @returns{Type}
	GetInterface : function( name ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} name
	//** @param{Boolean} ignoreCase
	//** @returns{Type}
	GetInterface : function( name, ignoreCase ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Array}
	GetInterfaces : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{TypeFilter} filter
	//** @param{Object} filterCriteria
	//** @returns{Array}
	FindInterfaces : function( filter, filterCriteria ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} name
	//** @returns{EventInfo}
	GetEvent : function( name ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} name
	//** @param{BindingFlags} bindingAttr
	//** @returns{EventInfo}
	GetEvent : function( name, bindingAttr ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Array}
	GetEvents : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{BindingFlags} bindingAttr
	//** @returns{Array}
	GetEvents : function( bindingAttr ){
		throw new NotImplementedException( arguments.callee.name );
	},

	/*
	//** @param{String} name
	//** @param{BindingFlags} bindingAttr
	//** @param{Binder} binder
	//** @param{Type} returnType
	//** @param{Array} types
	//** @param{Array} modifiers
	//** @returns{PropertyInfo}
	GetProperty : function( name, bindingAttr, binder, returnType, types, modifiers ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} name
	//** @param{Type} returnType
	//** @param{Array} types
	//** @param{Array} modifiers
	//** @returns{PropertyInfo}
	GetProperty : function( name, returnType, types, modifiers ){
		throw new NotImplementedException( arguments.callee.name );
	},
	 */
	
	//** @param{String} name
	//** @param{BindingFlags} bindingAttr
	//** @returns{PropertyInfo}
	GetProperty : function( name, bindingAttr ){
		if ( !name )	{
			throw new ArgumentNullException( "Property name cannot be null" );
		}
		if ( this._WrappedJSObject().__lookupGetter__( name )  == null )	{
			return null;
		}
		var propInfo = new System.Object( System.Reflection.PropertyInfo );
		propInfo.constructor( this._WrappedJSObject(), name );
		return propInfo; 		
	},

	/*
	//** @param{String} name
	//** @param{Type} returnType
	//** @param{Array} types
	//** @returns{PropertyInfo}
	GetProperty : function( name, returnType, types ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} name
	//** @param{Array} types
	//** @returns{PropertyInfo}
	GetProperty : function( name, types ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} name
	//** @param{Type} returnType
	//** @returns{PropertyInfo}
	GetProperty : function( name, returnType ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} name
	//** @returns{PropertyInfo}
	GetProperty : function( name ){
		throw new NotImplementedException( arguments.callee.name );
	},
	 */
	
	//** @param{BindingFlags} bindingAttr
	//** @returns{Array}
	GetProperties : function( bindingAttr ){
		var properties = [];
		var object = this._WrappedJSObject();
		for( item in object )	{
			if ( ( item.indexOf( "_" ) != 0 ) )	{
				var fn = object.__lookupGetter__( item );
				if ( fn != null )	{
					var pInfo = new System.Object( System.Reflection.PropertyInfo );
					pInfo.constructor( object, item )
					properties.push( pInfo );
				}
			}
		}
		return properties;
	},
	
	/*
	//** @returns{Array}
	GetProperties : function(){
		throw new NotImplementedException( arguments.callee.name );
	},
	 */
	
	//** @returns{Array}
	GetNestedTypes : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{BindingFlags} bindingAttr
	//** @returns{Array}
	GetNestedTypes : function( bindingAttr ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} name
	//** @returns{Type}
	GetNestedType : function( name ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} name
	//** @param{BindingFlags} bindingAttr
	//** @returns{Type}
	GetNestedType : function( name, bindingAttr ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} name
	//** @returns{Array}
	GetMember : function( name ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} name
	//** @param{BindingFlags} bindingAttr
	//** @returns{Array}
	GetMember : function( name, bindingAttr ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} name
	//** @param{MemberTypes} type
	//** @param{BindingFlags} bindingAttr
	//** @returns{Array}
	GetMember : function( name, type, bindingAttr ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Array}
	GetMembers : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{BindingFlags} bindingAttr
	//** @returns{Array}
	GetMembers : function( bindingAttr ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Array}
	GetDefaultMembers : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{MemberTypes} memberType
	//** @param{BindingFlags} bindingAttr
	//** @param{MemberFilter} filter
	//** @param{Object} filterCriteria
	//** @returns{Array}
	FindMembers : function( memberType, bindingAttr, filter, filterCriteria ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Array}
	GetGenericParameterConstraints : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} typeArguments
	//** @returns{Type}
	MakeGenericType : function( typeArguments ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Type}
	GetElementType : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Array}
	GetGenericArguments : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Type}
	GetGenericTypeDefinition : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Type} c
	//** @returns{Boolean}
	IsSubclassOf : function( c ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Object} o
	//** @returns{Boolean}
	IsInstanceOfType : function( o ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Type} c
	//** @returns{Boolean}
	IsAssignableFrom : function( c ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	ToString : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} args
	//** @returns{Array}
	GetTypeArray : function( args ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Object} o
	//** @returns{Boolean}
	Equals : function( o ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Type} o
	//** @returns{Boolean}
	Equals : function( o ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Int32}
	GetHashCode : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Type} interfaceType
	//** @returns{InterfaceMapping}
	GetInterfaceMap : function( interfaceType ){
		throw new NotImplementedException( arguments.callee.name );
	}

}




//** @base{Object}
Environment = {
	__proto__ : System.Object.prototype,
	
	//** @returns{Environment}
	constructor : function Environment(){
		throw new NotImplementedException( arguments.callee.name );
	},

	SpecialFolder : {
		ApplicationData : 0x1a,
		CommonApplicationData : 0x23,
		CommonProgramFiles : 0x2b,
		Cookies : 0x21,
		Desktop : 0,
		DesktopDirectory : 0x10,
		Favorites : 6,
		History : 0x22,
		InternetCache : 0x20,
		LocalApplicationData : 0x1c,
		MyComputer : 0x11,
		MyDocuments : 5,
		MyMusic : 13,
		MyPictures : 0x27,
		Personal : 5,
		ProgramFiles : 0x26,
		Programs : 2,
		Recent : 8,
		SendTo : 9,
		StartMenu : 11,
		Startup : 7,
		System : 0x25,
		Templates : 0x15
	},

	//** @returns{Int32}
	get TickCount(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Int32}
	get ExitCode(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} value
	set ExitCode( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get CommandLine(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get CurrentDirectory(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} value
	set CurrentDirectory( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get SystemDirectory(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get MachineName(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Int32}
	get ProcessorCount(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get NewLine(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Version}
	get Version(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Int64}
	get WorkingSet(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{OperatingSystem}
	get OSVersion(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get StackTrace(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get HasShutdownStarted(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get UserName(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get UserInteractive(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get UserDomainName(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{Int32} exitCode
	//** @returns{Void}
	Exit : function( exitCode ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{String} message
	//** @returns{Void}
	FailFast : function( message ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{String} name
	//** @returns{String}
	ExpandEnvironmentVariables : function( name ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @returns{Array}
	GetCommandLineArgs : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{String} variable
	//** @returns{String}
	GetEnvironmentVariable : function( variable ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{String} variable
	//** @param{EnvironmentVariableTarget} target
	//** @returns{String}
	GetEnvironmentVariable : function( variable, target ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @returns{IDictionary}
	GetEnvironmentVariables : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{EnvironmentVariableTarget} target
	//** @returns{IDictionary}
	GetEnvironmentVariables : function( target ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{String} variable
	//** @param{String} value
	//** @returns{Void}
	SetEnvironmentVariable : function( variable, value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{String} variable
	//** @param{String} value
	//** @param{EnvironmentVariableTarget} target
	//** @returns{Void}
	SetEnvironmentVariable : function( variable, value, target ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @returns{Array}
	GetLogicalDrives : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{SpecialFolder} folder
	//** @returns{String}
	GetFolderPath : function( folder ){
		var Mozilla = System.Import( "Mozilla.Components", true, this );
		var nsIProperties = Mozilla.Components.Service( "@mozilla.org/file/directory_service;1", "nsIProperties" );
		switch( folder )	{
			case this.SpecialFolder.Programs:
				return nsIProperties.get( "Progs", Components.interfaces.nsILocalFile ).path;
			case this.SpecialFolder.DesktopDirectory:
				return nsIProperties.get( "Desk", Components.interfaces.nsILocalFile ).path;
			case this.SpecialFolder.LocalApplicationData:
				return nsIProperties.get( "ProfLD", Components.interfaces.nsILocalFile ).path;
			case this.SpecialFolder.InternetCache:
				return nsIProperties.get( "ProfLD", Components.interfaces.nsILocalFile ).path;
			case this.SpecialFolder.ApplicationData:
				return nsIProperties.get( "ProfD", Components.interfaces.nsILocalFile ).path;
			case this.SpecialFolder.CommonApplicationData:
				return nsIProperties.get( "resource:app", Components.interfaces.nsILocalFile ).path;
			default:
				return "";
		}
	}

}
/*
		CommonProgramFiles : 0x2b,
		Cookies : 0x21,
		Desktop : 0,
		Favorites : 6,
		History : 0x22,
		MyComputer : 0x11,
		MyMusic : 13,
		MyPictures : 0x27,
		ProgramFiles : 0x26,
		Recent : 8,
		SendTo : 9,
		StartMenu : 11,
		Startup : 7,
		System : 0x25,
		Templates : 0x15
*/	



//** @base{ValueType}
Guid = {

	__proto__ : System.Object.prototype,
	
	//** @returns{Guid}
	constructor : function Guid(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Array}
	ToByteArray : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Int32}
	GetHashCode : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Object} o
	//** @returns{Boolean}
	Equals : function( o ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Guid} g
	//** @returns{Boolean}
	Equals : function( g ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Object} value
	//** @returns{Int32}
	CompareTo : function( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Guid} value
	//** @returns{Int32}
	CompareTo : function( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @returns{Guid}
	NewGuid : function(  ){
		return new System.Object( this );
	},
	
	//** @returns{String}
	ToString : function(  ){
		return Math.uuid();
	}

	/*
	//** @param{String} format
	//** @returns{String}
	ToString : function( format ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} format
	//** @param{IFormatProvider} provider
	//** @returns{String}
	ToString : function( format, provider ){
		throw new NotImplementedException( arguments.callee.name );
	}
	*/
}


/*!
Math.uuid.js (v1.4)
http://www.broofa.com
mailto:robert@broofa.com

Copyright (c) 2009 Robert Kieffer
Dual licensed under the MIT and GPL licenses.
*/

/*
 * Generate a random uuid.
 *
 * USAGE: Math.uuid(length, radix)
 *   length - the desired number of characters
 *   radix  - the number of allowable values for each character.
 *
 * EXAMPLES:
 *   // No arguments  - returns RFC4122, version 4 ID
 *   >>> Math.uuid()
 *   "92329D39-6F5C-4520-ABFC-AAB64544E172"
 * 
 *   // One argument - returns ID of the specified length
 *   >>> Math.uuid(15)     // 15 character ID (default base=62)
 *   "VcydxgltxrVZSTV"
 *
 *   // Two arguments - returns ID of the specified length, and radix. (Radix must be <= 62)
 *   >>> Math.uuid(8, 2)  // 8 character ID (base=2)
 *   "01001010"
 *   >>> Math.uuid(8, 10) // 8 character ID (base=10)
 *   "47473046"
 *   >>> Math.uuid(8, 16) // 8 character ID (base=16)
 *   "098F4D35"
 */
Math.uuid = (function() {
  // Private array of chars to use
  var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(''); 

  return function (len, radix) {
    var chars = CHARS, uuid = [];
    radix = radix || chars.length;

    if (len) {
      // Compact form
      for (var i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
    } else {
      // rfc4122, version 4 form
      var r;

      // rfc4122 requires these characters
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';

      // Fill in random data.  At i==19 set the high bits of clock sequence as
      // per rfc4122, sec. 4.1.5
      for (var i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random()*16;
          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
      }
    }

    return uuid.join('');
  };
})();

// A more compact, but less performant, RFC4122v4 compliant solution:
Math.uuid2 = function() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
  }).toUpperCase();
};
