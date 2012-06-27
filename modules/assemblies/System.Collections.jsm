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


var EXPORTED_SYMBOLS = ["IEnumerator","IEnumerable","IList","ICollection","CollectionBase"];

Components.utils.import( "resource://xulu/assemblies/System.jsm", this );


//** @returns{IEnumerable}
function IEnumerable( array )		{
	this._array = array || [];
	return this;
}

//** @base{}
IEnumerable.prototype = {
	__proto__ : System.Object.prototype,
	
	//** @returns{IEnumerator}
	GetEnumerator : function(){
		return new IEnumerator( this );
	}

}

//** @returns{ICollection}
function ICollection( array )	{
	return IEnumerable.call( this, array );
}

//** @base{IEnumerable }
ICollection.prototype = {
	__proto__ : IEnumerable.prototype,
	
	//** @returns{Int32}
	get Count(){
		// @bug{} Oops!!!  This assumes the array is an XMLList array
		try {
			return this._array.length();
		}
		catch( e )	{
			return this._array.length;
		}
	},

	//** @returns{Object}
	get SyncRoot(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsSynchronized(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} array
	//** @param{Int32} index
	//** @returns{Void}
	CopyTo : function( array, index ){
		throw new NotImplementedException( arguments.callee.name );
	}

}

//** @returns{IList}
function IList( array ){
	return ICollection.call( this, array );
}
	
//** @base{ICollection}
IList.prototype = {
	__proto__ : ICollection.prototype,

	//** @param{Int32} index
	//** @returns{Object}
	Item : function( index ){
		return this._array[ index ];
	},

	//** @returns{Boolean}
	get IsReadOnly(){
		return false;
	},

	//** @returns{Boolean}
	get IsFixedSize(){
		return false;
	},

	//** @param{Object} value
	//** @returns{Int32}
	Add : function( value ){
		this._array.push( value );
		return this.Count -1;
	},

	//** @param{Object} value
	//** @returns{Boolean}
	Contains : function( value ){
		return this.IndexOf( value ) > -1 ? true : false;
	},

	//** @returns{Void}
	Clear : function(){
		this.array = [];
	},

	//** @param{Object} value
	//** @returns{Int32}
	IndexOf : function( value ){
		for( var i = 0; i < this._array.length; i++ )	{
			if( this._array[ i ] === value ) return i;
		}
		return -1;
	},

	//** @param{Int32} index
	//** @param{Object} value
	//** @returns{Void}
	Insert : function( index, value ){
		this.array[ index ] = value;
	},

	//** @param{Object} value
	//** @returns{Void}
	Remove : function( value ){
		var index = this.IndexOf( value );
		delete this._array[ index ];
	},

	//** @param{Int32} index
	//** @returns{Void}
	RemoveAt : function( index ){
		delete this.array[ index ];
	}

}

//** @returns{CollectionBase}
function CollectionBase( array )	{
	this.__Capacity = 1;
	return IList.call( this, array );
}

//** @base{IList}
CollectionBase.prototype = {
	__proto__ : IList.prototype,
	
	//** @returns{Int32}
	get Capacity(){
		return ( this.Count > this.__Capacity ) ? this.Count : this.__Capacity;
	},

	//** @param{Int32} value
	set Capacity( value ){				// Just no point in JS - just too cheap
		return this.__Capacity = value;
	}

	/* Inherit from IList & ICollection
	  
	//** @returns{Int32}
	get Count(){
		return this._IList.Count;
	},

	//** @returns{Void}
	Clear : function(  ){
		this._IList.Clear();
	},
	
	
	//** @param{Int32} index
	//** @returns{Void}
	RemoveAt : function( index ){
		this._IList.RemoveAt( index );
	},

	//** @returns{IEnumerator}
	GetEnumerator : function(  ){
		return this._IList.GetEnumerator();
	}
	*/
	
}



//** @returns{IEnumerator}
function IEnumerator( list )	{
	this._list = list;
    this._index = -1;
}

//** @base{}
IEnumerator.prototype = {
	__proto__ : System.Object.prototype,
	
	//** @returns{Object}
	get Current(){
		return this._list.Item( this._index );
	},

	//** @returns{Boolean}
	MoveNext : function(){
		if ( this._index < this._list.Count -1 )	{
			this._index++;
			return true;
		}
		else	{
			return false;
		}
	},

	//** @returns{Void}
	Reset : function(){
		this._index = -1;
	}

}