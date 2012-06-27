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


var EXPORTED_SYMBOLS = ["Assembly","MemberInfo","MethodInfo","FieldInfo","PropertyInfo"];

Components.utils.import( "resource://xulu/assemblies/System.jsm" );


//** @returns{Assembly}
function Assembly(){};
//** @base{Object}
Assembly.prototype = {

	//** @returns{Assembly}
	constructor : Assembly,
	
	//** @returns{String}
	get CodeBase(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get EscapedCodeBase(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get FullName(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{MethodInfo}
	get EntryPoint(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Evidence}
	get Evidence(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Module}
	get ManifestModule(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get ReflectionOnly(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get Location(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get ImageRuntimeVersion(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get GlobalAssemblyCache(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Int64}
	get HostContext(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Object} o
	//** @returns{Boolean}
	Equals : function( o ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Int32}
	GetHashCode : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{AssemblyName}
	GetName : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Boolean} copiedName
	//** @returns{AssemblyName}
	GetName : function( copiedName ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{String} assemblyName
	//** @param{String} typeName
	//** @returns{String}
	CreateQualifiedName : function( assemblyName, typeName ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{Type} type
	//** @returns{Assembly}
	GetAssembly : function( type ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} name
	//** @returns{Type}
	GetType : function( name ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} name
	//** @param{Boolean} throwOnError
	//** @returns{Type}
	GetType : function( name, throwOnError ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} name
	//** @param{Boolean} throwOnError
	//** @param{Boolean} ignoreCase
	//** @returns{Type}
	GetType : function( name, throwOnError, ignoreCase ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Array}
	GetExportedTypes : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Array}
	GetTypes : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Type} type
	//** @param{String} name
	//** @returns{Stream}
	GetManifestResourceStream : function( type, name ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} name
	//** @returns{Stream}
	GetManifestResourceStream : function( name ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{CultureInfo} culture
	//** @returns{Assembly}
	GetSatelliteAssembly : function( culture ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{CultureInfo} culture
	//** @param{Version} version
	//** @returns{Assembly}
	GetSatelliteAssembly : function( culture, version ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{SerializationInfo} info
	//** @param{StreamingContext} context
	//** @returns{Void}
	GetObjectData : function( info, context ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Boolean} inherit
	//** @returns{Array}
	GetCustomAttributes : function( inherit ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Type} attributeType
	//** @param{Boolean} inherit
	//** @returns{Array}
	GetCustomAttributes : function( attributeType, inherit ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Type} attributeType
	//** @param{Boolean} inherit
	//** @returns{Boolean}
	IsDefined : function( attributeType, inherit ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{String} assemblyFile
	//** @returns{Assembly}
	LoadFrom : function( assemblyFile ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{String} assemblyFile
	//** @returns{Assembly}
	ReflectionOnlyLoadFrom : function( assemblyFile ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{String} assemblyFile
	//** @param{Evidence} securityEvidence
	//** @returns{Assembly}
	LoadFrom : function( assemblyFile, securityEvidence ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{String} assemblyFile
	//** @param{Evidence} securityEvidence
	//** @param{Array} hashValue
	//** @param{AssemblyHashAlgorithm} hashAlgorithm
	//** @returns{Assembly}
	LoadFrom : function( assemblyFile, securityEvidence, hashValue, hashAlgorithm ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{String} assemblyString
	//** @returns{Assembly}
	Load : function( assemblyString ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{String} assemblyString
	//** @returns{Assembly}
	ReflectionOnlyLoad : function( assemblyString ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{String} assemblyString
	//** @param{Evidence} assemblySecurity
	//** @returns{Assembly}
	Load : function( assemblyString, assemblySecurity ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{AssemblyName} assemblyRef
	//** @returns{Assembly}
	Load : function( assemblyRef ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{AssemblyName} assemblyRef
	//** @param{Evidence} assemblySecurity
	//** @returns{Assembly}
	Load : function( assemblyRef, assemblySecurity ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{String} partialName
	//** @returns{Assembly}
	LoadWithPartialName : function( partialName ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{String} partialName
	//** @param{Evidence} securityEvidence
	//** @returns{Assembly}
	LoadWithPartialName : function( partialName, securityEvidence ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{Array} rawAssembly
	//** @returns{Assembly}
	Load : function( rawAssembly ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{Array} rawAssembly
	//** @returns{Assembly}
	ReflectionOnlyLoad : function( rawAssembly ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{Array} rawAssembly
	//** @param{Array} rawSymbolStore
	//** @returns{Assembly}
	Load : function( rawAssembly, rawSymbolStore ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{Array} rawAssembly
	//** @param{Array} rawSymbolStore
	//** @param{Evidence} securityEvidence
	//** @returns{Assembly}
	Load : function( rawAssembly, rawSymbolStore, securityEvidence ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{String} path
	//** @returns{Assembly}
	LoadFile : function( path ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{String} path
	//** @param{Evidence} securityEvidence
	//** @returns{Assembly}
	LoadFile : function( path, securityEvidence ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} moduleName
	//** @param{Array} rawModule
	//** @returns{Module}
	LoadModule : function( moduleName, rawModule ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} moduleName
	//** @param{Array} rawModule
	//** @param{Array} rawSymbolStore
	//** @returns{Module}
	LoadModule : function( moduleName, rawModule, rawSymbolStore ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} typeName
	//** @returns{Object}
	CreateInstance : function( typeName ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} typeName
	//** @param{Boolean} ignoreCase
	//** @returns{Object}
	CreateInstance : function( typeName, ignoreCase ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} typeName
	//** @param{Boolean} ignoreCase
	//** @param{BindingFlags} bindingAttr
	//** @param{Binder} binder
	//** @param{Array} args
	//** @param{CultureInfo} culture
	//** @param{Array} activationAttributes
	//** @returns{Object}
	CreateInstance : function( typeName, ignoreCase, bindingAttr, binder, args, culture, activationAttributes ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Array}
	GetLoadedModules : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Boolean} getResourceModules
	//** @returns{Array}
	GetLoadedModules : function( getResourceModules ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Array}
	GetModules : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Boolean} getResourceModules
	//** @returns{Array}
	GetModules : function( getResourceModules ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} name
	//** @returns{Module}
	GetModule : function( name ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} name
	//** @returns{FileStream}
	GetFile : function( name ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Array}
	GetFiles : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Boolean} getResourceModules
	//** @returns{Array}
	GetFiles : function( getResourceModules ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Array}
	GetManifestResourceNames : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @returns{Assembly}
	GetExecutingAssembly : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @returns{Assembly}
	GetCallingAssembly : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @returns{Assembly}
	GetEntryAssembly : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Array}
	GetReferencedAssemblies : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} resourceName
	//** @returns{ManifestResourceInfo}
	GetManifestResourceInfo : function( resourceName ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	ToString : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	}
}



//** @base{Object}
MemberInfo = {
	__proto__ : System.Object.prototype,
	
	//** @returns{MemberInfo}
	constructor : function MemberInfo( jsObject, name ){
		this.__jsObject = jsObject;
		this.__Name = name;
	},
	
	//** @returns{MemberTypes}
	get MemberType(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get Name(){
		return this.__Name;
	},

	//** @returns{Type}
	get DeclaringType(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Type}
	get ReflectedType(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Int32}
	get MetadataToken(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Module}
	get Module(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Type} attributeType
	//** @param{Boolean} inherit
	//** @returns{Array}
	GetCustomAttributes : function( attributeType, inherit ){
		return System.Attribute.GetCustomAttributes( this, attributeType, inherit );
	},

	//** @param{Type} attributeType
	//** @param{Boolean} inherit
	//** @returns{Boolean}
	IsDefined : function( attributeType, inherit ){
		throw new NotImplementedException( arguments.callee.name );
	},
	
	_WrappedJSObject : function()	{
		return this.__jsObject;
	}
		
}


/*	NB!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	We implement a field as if it were a read/write getter/setter
	As we can't get access to the JS object the field represents - only the value
*/

//** @base{MemberInfo}
FieldInfo = {
	__proto__ : MemberInfo,
	
	//** @returns{FieldInfo}
	constructor : function FieldInfo( jsField, name )	{
		MemberInfo.constructor.call( this, jsField, name );
	},
	
	//** @returns{MemberTypes}
	get MemberType(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{RuntimeFieldHandle}
	get FieldHandle(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Type}
	get FieldType(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{FieldAttributes}
	get Attributes(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsPublic(){
		return ( this.Name.indexOf( "_" ) == 0 ) ? false : true;
	},

	//** @returns{Boolean}
	get IsPrivate(){
		return ( this.Name.indexOf( "__" ) == 0 ) ? false : true;
	},

	//** @returns{Boolean}
	get IsFamily(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsAssembly(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsFamilyAndAssembly(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsFamilyOrAssembly(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsStatic(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsInitOnly(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsLiteral(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsNotSerialized(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsSpecialName(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsPinvokeImpl(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{RuntimeFieldHandle} handle
	//** @returns{FieldInfo}
	GetFieldFromHandle : function( handle ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{RuntimeFieldHandle} handle
	//** @param{RuntimeTypeHandle} declaringType
	//** @returns{FieldInfo}
	GetFieldFromHandle : function( handle, declaringType ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Array}
	GetRequiredCustomModifiers : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Array}
	GetOptionalCustomModifiers : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{TypedReference} obj
	//** @param{Object} value
	//** @returns{Void}
	SetValueDirect : function( obj, value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{TypedReference} obj
	//** @returns{Object}
	GetValueDirect : function( obj ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Object} obj
	//** @returns{Object}
	GetValue : function( obj ){
		return this.__jsObject[ this.Name ];
	},

	//** @returns{Object}
	GetRawConstantValue : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Object} obj
	//** @param{Object} value
	//** @param{BindingFlags} invokeAttr
	//** @param{Binder} binder
	//** @param{CultureInfo} culture
	//** @returns{Void}
	SetValue : function( obj, value, invokeAttr, binder, culture ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Object} obj
	//** @param{Object} value
	//** @returns{Void}
	SetValue : function( obj, value ){
		throw new NotImplementedException( arguments.callee.name );
	}

}



//** @base{MemberInfo}
PropertyInfo = {
	__proto__ : MemberInfo,
	
	//** @returns{PropertyInfo}
	constructor : function PropertyInfo( jsObject, name ){
		this.__getMethod = jsObject.__lookupGetter__( name );
		this.__setMethod = jsObject.__lookupSetter__( name );
		this.__baseObject = jsObject;
		// We use the property Getter as the base object for MemberInfo purposes
		MemberInfo.constructor.call( this, this.__getMethod, name );
	},

	//** @returns{MemberTypes}
	get MemberType(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Type}
	get PropertyType(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{PropertyAttributes}
	get Attributes(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get CanRead(){
		return ( this.__getMethod ) ? true : false;
	},

	//** @returns{Boolean}
	get CanWrite(){
		return ( this.__setMethod ) ? true : false;
	},

	//** @returns{Boolean}
	get IsSpecialName(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Object}
	GetConstantValue : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Object}
	GetRawConstantValue : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Object} obj
	//** @param{Object} value
	//** @param{BindingFlags} invokeAttr
	//** @param{Binder} binder
	//** @param{Array} index
	//** @param{CultureInfo} culture
	//** @returns{Void}
	SetValue : function( obj, value, invokeAttr, binder, index, culture ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Boolean} nonPublic
	//** @returns{Array}
	GetAccessors : function( nonPublic ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Boolean} nonPublic
	//** @returns{MethodInfo}
	GetGetMethod : function( nonPublic ){
		var mInfo = new System.Object( MethodInfo );
		minfo.constructor( this.__getMethod, this.Name );
	},

	//** @param{Boolean} nonPublic
	//** @returns{MethodInfo}
	GetSetMethod : function( nonPublic ){
		var mInfo = new System.Object( MethodInfo );
		minfo.constructor( this.__setMethod, this.Name );
	},

	//** @returns{Array}
	GetIndexParameters : function(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Object} obj
	//** @param{Array} index
	//** @returns{Object}
	GetValue : function( obj, index ){
		return ( obj ) ? obj[ this.Name ] : this.__getMethod.call( this.__baseObject );
	},

	//** @param{Object} obj
	//** @param{Object} value
	//** @param{Array} index
	//** @returns{Void}
	SetValue : function( obj, value, index ){
		if ( !this.CanWrite )	{
			throw new System.ArgumentException( "Not a writable property" )
		}
		obj[ this.Name ] = value;
	},

	//** @returns{Array}
	GetRequiredCustomModifiers : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Array}
	GetOptionalCustomModifiers : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Array}
	GetAccessors : function(  ){
		return [ this.GetGetMethod(), this.GetSetMethod() ];
	}

}


//** @base{MemberInfo}
MethodBase = {
	__proto__ : MemberInfo,
	
	//** @returns{MethodBase}
	constructor : function MethodBase( method, name ){
		MemberInfo.constructor.call( this, method, name );
		return this;
	},
	
	//** @returns{RuntimeMethodHandle}
	get MethodHandle(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{MethodAttributes}
	get Attributes(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{CallingConventions}
	get CallingConvention(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsGenericMethodDefinition(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get ContainsGenericParameters(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsGenericMethod(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsPublic(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsPrivate(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsFamily(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsAssembly(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsFamilyAndAssembly(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsFamilyOrAssembly(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsStatic(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsFinal(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsVirtual(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsHideBySig(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsAbstract(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsSpecialName(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsConstructor(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{RuntimeMethodHandle} handle
	//** @returns{MethodBase}
	GetMethodFromHandle : function( handle ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{RuntimeMethodHandle} handle
	//** @param{RuntimeTypeHandle} declaringType
	//** @returns{MethodBase}
	GetMethodFromHandle : function( handle, declaringType ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{MethodBase}
	GetCurrentMethod : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Array}
	GetParameters : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{MethodImplAttributes}
	GetMethodImplementationFlags : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Array}
	GetGenericArguments : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},
	
	//** @param{Object} obj
	//** @param{BindingFlags} invokeAttr
	//** @param{Binder} binder
	//** @param{Array} parameters
	//** @param{CultureInfo} culture
	//** @returns{Object}
	Invoke : function( obj, invokeAttr, binder, parameters, culture ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Object} obj
	//** @param{Array} parameters
	//** @returns{Object}
	Invoke : function( obj, parameters ){
		return obj[ this.Name ].apply( obj, parameters );
	},

	//** @returns{MethodBody}
	GetMethodBody : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	}

}



//** @base{MethodBase}
MethodInfo = {
	__proto__ : MethodBase,
	
	//** @returns{MethodInfo}
	constructor : function MethodInfo( method, name ){
		MethodBase.constructor.call( this, method, name );
	},
	
	//** @returns{MemberTypes}
	get MemberType(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Type}
	get ReturnType(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{ParameterInfo}
	get ReturnParameter(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{ICustomAttributeProvider}
	get ReturnTypeCustomAttributes(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsGenericMethodDefinition(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get ContainsGenericParameters(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsGenericMethod(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{MethodInfo}
	GetBaseDefinition : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Array}
	GetGenericArguments : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{MethodInfo}
	GetGenericMethodDefinition : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} typeArguments
	//** @returns{MethodInfo}
	MakeGenericMethod : function( typeArguments ){
		throw new NotImplementedException( arguments.callee.name );
	}

}