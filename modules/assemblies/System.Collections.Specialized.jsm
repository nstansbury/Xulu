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


var EXPORTED_SYMBOLS = ["NameObjectCollectionBase","NameValueCollection","KeysCollection"];

Components.utils.import( "resource://xulu/assemblies/System.jsm", this );
System.Import( "System.Collections" );

//** @returns{NameObjectCollectionBase}
function NameObjectCollectionBase(){
	this._Keys = null;
	//** Underlying array is of key names
	return System.Collections.ICollection.call( this, [] );
};
	
//** @base{ICollection}
NameObjectCollectionBase.prototype = {
	__proto__ : System.Collections.ICollection.prototype,
	
	constructor : NameObjectCollectionBase,
	
	get Count(){
		return this._array.length;
	},
	
	//** @returns{KeysCollection}
	get Keys(){
		if ( this._Keys == null )	{
			this._Keys = new KeysCollection( this );
		}
	},

	//** @param{SerializationInfo} info
	//** @param{StreamingContext} context
	//** @returns{Void}
	GetObjectData : function( info, context ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Object} sender
	//** @returns{Void}
	OnDeserialization : function( sender ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} item
	//** @param{String} item
	//** @returns{Object}
	BaseGet : function( item ) {
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} name
	//** @param{Object} value
	//** @returns{Void}
	BaseAdd : function( name, value )	{
		throw new NotImplementedException( arguments.callee.name );
	},
	
	//** @param{String} name
	//** @returns{Void}
	BaseRemove : function( name ) {
		throw new NotImplementedException( arguments.callee.name );
	},
	
	//** @param{Int32} index
	//** @returns{Void}
    BaseRemoveAt : function( index )	{
		throw new NotImplementedException( arguments.callee.name );
	},
	
	//** @param{Int32} item
	//** @param{String} item
	//** @param{Object} value
	//** @returns{Object}
	BaseSet : function( item, value)	{
		throw new NotImplementedException( arguments.callee.name );
	}


	/* Implemented by ICollection
	//** @returns{IEnumerator}
	GetEnumerator : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	}
	*/
	
}


//** @param{ICollection} collection
//** @returns{KeysCollection}
function KeysCollection( collection ){
	this.Col = collection;
	return System.Collections.ICollection.call( this, this.Col._array );
};
//** @base{ICollection}
KeysCollection.prototype = {
	__proto__ : System.Collections.ICollection.prototype,
	
	constructor : KeysCollection,
	
	//** @param{Int32} index
	//** @returns{String}
	Item : function( index ){
		return this._array[ index ];
	},

	//** @returns{Int32}
	get Count(){
		return this.Col.Count;
	},
	
	//** @param{Int32} index
	//** @returns{String}
	Get : function( index ){
		return this.Item( index );
	}

	/* Implemented by ICollection
	//** @returns{IEnumerator}
	GetEnumerator : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	}
	*/
	
}


function NameValueCollection(){
	this._keyTable = {};		// Maps key names to value array
	return NameObjectCollectionBase.call( this );
};
//** @base{NameObjectCollectionBase}
NameValueCollection.prototype = {
	__proto__ : NameObjectCollectionBase.prototype,
	
	constructor : NameValueCollection,
	
	//** @param{Int32} key
	//** @param{String} key
	//** @returns{String}
	Item : function( key ){
		if ( typeof( key ) == "number" )	{
			key = this._array[ key ];
		}
		if ( this._keyTable[ key ] != undefined )	{
			return this._keyTable[ key ].join( "," );
		}
		else	{
			return "";
		}
	},

	//** @returns{Array}
	get AllKeys(){
		return this._array;
	},

	//** @returns{Void}
	Clear : function(  ){
		this._keyTable = {};
		this._array = [];
		this._Keys = null;
	},

	//** @param{Array} dest
	//** @param{Int32} index
	//** @returns{Void}
	CopyTo : function( dest, index ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	HasKeys : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} key
	//** @param{String} value
	//** @returns{Void}
	Add : function( key, value ){
		if ( this._keyTable[ key ] == undefined )	{
			this._keyTable[ key ] = [ value ];
			this._array.push( key );
		}
		else	{
			this._keyTable[ key ].push( value );
		}
	},

	//** @param{NameValueCollection} c
	//** @returns{Void}
	Add_collection : function( c ){
		throw new NotImplementedException( arguments.callee.name );
	},
	
	//** @param{Int32} key
	//** @param{String} key
	//** @returns{String}
	Get : function( key ){
		return this.Item( key );
	},
	
	//** @param{Int32} key
	//** @param{String} key
	//** @returns{Array}
	GetValues : function( key ){
		// Don't just re-split this.Item( value ) in case values contain commas
		if ( typeof( key ) == "number" )	{
			key = this._array[ key ];
		}
		if ( this._keyTable[ key ] != undefined )	{
			return this._keyTable[ key ];
		}
		else	{
			return [];
		}
	},

	//** @param{String} name
	//** @param{String} value
	//** @returns{Void}
	Set : function( name, value ){
		if ( this._keyTable[ name ] == undefined )	{
			this.Add( name, value );
		}
		else	{
			this._keyTable[ key ] = value;
		}
	},

	//** @param{String} name
	//** @returns{Void}
	Remove : function( name ){
		if ( this._keyTable[ name ] == undefined )	{
			return;
		}
		delete this._keyTable[ name ];
		for( i = 0; i < this.Count; i++ )	{
			if( this._array[ i ] == name )	{
				this._array.splice( i, 1 );
				this._Keys = null;
				return;
			}
		}
	},

	//** @param{Int32} index
	//** @returns{String}
	GetKey : function( index ){
		return this._array[ index ];
	}

}