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


var EXPORTED_SYMBOLS = ["KeyValuePair","IDictionary","KeyNotFoundException"];

Components.utils.import( "resource://xulu/assemblies/System.jsm", this );
System.Import( "System.Collections" );

try{
//** @param{Object} key
//** @param{Object} value
//** @returns{KeyValuePair}
function KeyValuePair( key, value )	{
	this.__Key = key;
	this.__Value = value;
}
KeyValuePair.prototype = {
	//** @base{ValueType}
	__proto__ : System.ValueType,
	
	constructor : KeyValuePair,
	
	//** @returns{Object}
	get Key(){
		return this.__Key;
	},

	//** @returns{Object}
	get Value(){
		return this.__Value;
	},

	//** @returns{String}
	ToString : function(){
		return "[" +this.Key.toString() +", " +this.Value.toString() +"]";
	}

}



function IDictionary()	{
	this.__Keys = [];
	this.__Values = [];
	this._array = [];
	this.__kvpList = new System.Collections.IList( this._array );
}

IDictionary.prototype = {
	//** @base{ICollection }
	__proto__ : System.Collections.ICollection.prototype,
	
	//** @returns{IDictionary}
	constructor : IDictionary,

	//** @param{Object} key
	//** @returns{Object}
	Item : function( key ){
		for( var i=0; i < this.__Keys.length; i++ )	{
			if( this.__Keys[ i ] == key )	{
				return this.__Values[ i ];
			}
		}
		throw new KeyNotFoundException();
	},

	//** @returns{ICollection}
	get Keys(){
		return new System.Collections.ICollection( this.__Keys );
	},

	//** @returns{ICollection}
	get Values(){
		return new System.Collections.ICollection( this.__Values );
	},

	//** @param{Object} key
	//** @returns{Boolean}
	ContainsKey : function( key ){
		for( var i=0; i < this.__Keys.length; i++ )	{
			if( this.__Keys[ i ] == key )	{
				return true;
			}
		}
		return false;
	},

	//** @param{Object} key
	//** @param{Object} value
	//** @returns{Void}
	Add : function( key, value ){
		this._array.push( new KeyValuePair( key, value ) );
		this.__Keys.push( key );
		this.__Values.push( key );
	},

	//** @param{Object} key
	//** @returns{Boolean}
	Remove : function( key ){
		for( var i=0; i < this.__Keys.length; i++ )	{
			if( this.__Keys[ i ] == key )	{
				delete this._array[ i ];
				delete this.__Values[ i ];
				delete this.__Keys[ i ];
				return true;
			}
		}
		return false;
	},

	//** @param{Object} key
	//** @param{Object} value
	//** @returns{Boolean}
	TryGetValue : function( key, value ){
		var val = this.Item( key );
		if( val == value )	{
			return true;
		}
		else{
			return false;
		}
	},
	
	//** @returns{IEnumerator}
	GetEnumerator : function(){
		return this.__kvpList.GetEnumerator();
	}

}



function KeyNotFoundException( message, innerException )	{
	System.SystemException.call( this, message || "Key not found", innerException );
	this.SetErrorCode( -2146232969 );
	this.pName = arguments.callee.name;
	this.pStack = Components.stack.caller;
}
KeyNotFoundException.prototype = {
	__proto__ : System.SystemException.prototype
}
}
catch(e)	{
	Components.utils.reportError(e);
}