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


var EXPORTED_SYMBOLS = ["PropertyPath","DependencyProperty","DependencyObject"];

Components.utils.import( "resource://xulu/assemblies/System.jsm" );
System.Import( "System.Windows.Threading" );


//** @base{Object}
PropertyPath = {
	__proto__ : System.Object.prototype,
	
	//** @returns{PropertyPath}
	constructor : function PropertyPath(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get Path(){
		return this.__Path || "";
	},

	//** @param{String} value
	set Path( value ){
		this.__Path = value;
	},

	//** @returns{Collection}
	get PathParameters(){
		throw new NotImplementedException( arguments.callee.name );
	}
}




//** @base{Object}
DependencyProperty = {
	__proto__ : System.Object.prototype,
	
	//** @returns{DependencyProperty}
	constructor : function DependencyProperty(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get Name(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Type}
	get PropertyType(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Type}
	get OwnerType(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{PropertyMetadata}
	get DefaultMetadata(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{ValidateValueCallback}
	get ValidateValueCallback(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Int32}
	get GlobalIndex(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get ReadOnly(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{String} name
	//** @param{Type} propertyType
	//** @param{Type} ownerType
	//** @returns{DependencyProperty}
	Register : function( name, propertyType, ownerType ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{String} name
	//** @param{Type} propertyType
	//** @param{Type} ownerType
	//** @param{PropertyMetadata} typeMetadata
	//** @returns{DependencyProperty}
	Register : function( name, propertyType, ownerType, typeMetadata ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{String} name
	//** @param{Type} propertyType
	//** @param{Type} ownerType
	//** @param{PropertyMetadata} typeMetadata
	//** @param{ValidateValueCallback} validateValueCallback
	//** @returns{DependencyProperty}
	Register : function( name, propertyType, ownerType, typeMetadata, validateValueCallback ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{String} name
	//** @param{Type} propertyType
	//** @param{Type} ownerType
	//** @param{PropertyMetadata} typeMetadata
	//** @returns{DependencyPropertyKey}
	RegisterReadOnly : function( name, propertyType, ownerType, typeMetadata ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{String} name
	//** @param{Type} propertyType
	//** @param{Type} ownerType
	//** @param{PropertyMetadata} typeMetadata
	//** @param{ValidateValueCallback} validateValueCallback
	//** @returns{DependencyPropertyKey}
	RegisterReadOnly : function( name, propertyType, ownerType, typeMetadata, validateValueCallback ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{String} name
	//** @param{Type} propertyType
	//** @param{Type} ownerType
	//** @param{PropertyMetadata} defaultMetadata
	//** @returns{DependencyPropertyKey}
	RegisterAttachedReadOnly : function( name, propertyType, ownerType, defaultMetadata ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{String} name
	//** @param{Type} propertyType
	//** @param{Type} ownerType
	//** @param{PropertyMetadata} defaultMetadata
	//** @param{ValidateValueCallback} validateValueCallback
	//** @returns{DependencyPropertyKey}
	RegisterAttachedReadOnly : function( name, propertyType, ownerType, defaultMetadata, validateValueCallback ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{String} name
	//** @param{Type} propertyType
	//** @param{Type} ownerType
	//** @returns{DependencyProperty}
	RegisterAttached : function( name, propertyType, ownerType ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{String} name
	//** @param{Type} propertyType
	//** @param{Type} ownerType
	//** @param{PropertyMetadata} defaultMetadata
	//** @returns{DependencyProperty}
	RegisterAttached : function( name, propertyType, ownerType, defaultMetadata ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{String} name
	//** @param{Type} propertyType
	//** @param{Type} ownerType
	//** @param{PropertyMetadata} defaultMetadata
	//** @param{ValidateValueCallback} validateValueCallback
	//** @returns{DependencyProperty}
	RegisterAttached : function( name, propertyType, ownerType, defaultMetadata, validateValueCallback ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Type} forType
	//** @param{PropertyMetadata} typeMetadata
	//** @returns{Void}
	OverrideMetadata : function( forType, typeMetadata ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Type} forType
	//** @param{PropertyMetadata} typeMetadata
	//** @param{DependencyPropertyKey} key
	//** @returns{Void}
	OverrideMetadata : function( forType, typeMetadata, key ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Type} forType
	//** @returns{PropertyMetadata}
	GetMetadata : function( forType ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{DependencyObject} dependencyObject
	//** @returns{PropertyMetadata}
	GetMetadata : function( dependencyObject ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{DependencyObjectType} dependencyObjectType
	//** @returns{PropertyMetadata}
	GetMetadata : function( dependencyObjectType ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Type} ownerType
	//** @returns{DependencyProperty}
	AddOwner : function( ownerType ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Type} ownerType
	//** @param{PropertyMetadata} typeMetadata
	//** @returns{DependencyProperty}
	AddOwner : function( ownerType, typeMetadata ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Int32}
	GetHashCode : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Object} value
	//** @returns{Boolean}
	IsValidType : function( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Object} value
	//** @returns{Boolean}
	IsValidValue : function( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	ToString : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	}
}



//** @base{DispatcherObject}
function DependencyObject(){};
DependencyObject.prototype = {
	__proto__ : System.Windows.Threading.DispatcherObject,
	//** @returns{DependencyObject}
	constructor : DependencyObject,

	//** @returns{DependencyObjectType}
	get DependencyObjectType(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsSealed(){
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

	//** @param{DependencyProperty} dp
	//** @returns{Object}
	GetValue : function( dp ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{DependencyProperty} dp
	//** @param{Object} value
	//** @returns{Void}
	SetValue : function( dp, value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{DependencyPropertyKey} key
	//** @param{Object} value
	//** @returns{Void}
	SetValue : function( key, value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{DependencyProperty} dp
	//** @returns{Void}
	ClearValue : function( dp ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{DependencyPropertyKey} key
	//** @returns{Void}
	ClearValue : function( key ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{DependencyProperty} dp
	//** @returns{Void}
	CoerceValue : function( dp ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{DependencyProperty} dp
	//** @returns{Void}
	InvalidateProperty : function( dp ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{DependencyProperty} dp
	//** @returns{Object}
	ReadLocalValue : function( dp ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{LocalValueEnumerator}
	GetLocalValueEnumerator : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	}
}