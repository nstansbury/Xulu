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


var EXPORTED_SYMBOLS = ["Component","EventHandlerList","AsyncCompletedEventArgs"];

Components.utils.import( "resource://xulu/assemblies/System.jsm", this );

//** @base{MarshalByRefObject}
function Component(){
	this._Events = null;
};
Component.prototype = {
	__proto__ : System.Object.prototype,
	
	constructor : Component,
	
	//** @returns{boolean}
	get CanRaiseEvents(){
		throw new NotImplementedException( arguments.callee.name );
	},
	
	//** @returns{boolean}
	get DesignMode(){
		throw new NotImplementedException( arguments.callee.name );
	},
	
	//** @returns{EventHandlerList}
	get Events(){
		if( this._Events == null )	{
			this._Events = new EventHandlerList( this );
		}
		return this._Events;
	},

	//** @returns{ISite}
	get Site(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{ISite} value
	set Site( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{IContainer}
	get Container(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Void}
	Dispose : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	ToString : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	}

}

//** @param{Component} parent
//** @returns{EventHandlerList}
function EventHandlerList( parent ){
	this._component = parent;
	__listHead : null;
}
	
//** @base{Object}
EventHandlerList.prototype = {
	
	//** @param{Object} key
	//** @returns{Delegate}
	Item : function( key ){
		var d = this._Find( key )
		return ( d ) ? d.handler : null;
	},

	//** @param{Object} key
	//** @param{Delegate} value
	//** @returns{Void}
	AddHandler : function( key, value ){
		var listEntry = this._Find( key );
		if ( listEntry ) {
			// Add the new delegate into the existing delegates invocation list
			System.Delegate.Combine( listEntry.handler, value );
		}
		else	{
			this.__listHead = this._NewListEntry( key, value, this.__listHead );
		}
	},

	//** @param{EventHandlerList} listToAddFrom
	//** @returns{Void}
	AddHandlers : function( listToAddFrom ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Void}
	Dispose : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Object} key
	//** @param{Delegate} value
	//** @returns{Void}
	RemoveHandler : function( key, value ){
		var listEntry = this._Find( key );
		if ( listEntry ) {
			System.Delegate.Remove( listEntry.handler, value );
		}
	},

	//** @param{object} key
	//** @param{Delegate} handler
	//** @param{ EventHandlerList.ListEntry } next
	//** @returns{EventHandlerList.ListEntry}
	_NewListEntry :  function( key, handler, next ) {
		return {
			key : key,
			handler : handler,
			next : next
		}
	},
	
	//** @param{Object} key
	//** @returns{ListEntry}
	_Find : function( key )	{
		var listEntry = this.__listHead;
		while( listEntry )	{
			if ( listEntry.key == key )		{
				return listEntry;
			}
			else	{
				listEntry = listEntry.next;
			}
		}
		return listEntry;
	}

}


//** @param{Exception} error
//** @param{Boolean} cancelled
//** @param{Object} userState
//** @returns{AsyncCompletedEventArgs}
function AsyncCompletedEventArgs( error, cancelled, userState )	{
	this.__Error = error;
	this.__Cancelled = cancelled;
	this.__UserState = userState;
	return System.EventArgs.constructor.call( this );
}
//** @base{EventArgs}
AsyncCompletedEventArgs.prototype = {
	__proto__ : System.EventArgs,
	
	//** @returns{Boolean}
	get Cancelled(){
		return this.__Cancelled;
	},

	//** @returns{Exception}
	get Error(){
		return this.__Error;
	},

	//** @returns{Object}
	get UserState(){
		return this.__UserState;
	}

}
