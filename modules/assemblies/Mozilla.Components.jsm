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



var EXPORTED_SYMBOLS = ["Instance","Service","SupportsInterface","ArrayEnumerator"];

Components.utils.import( "resource://xulu/assemblies/System.jsm", this );

function Instance( contractID, interfaceName, initializer )	{
	function constructor()		{
		var instance = Components.classes[ contractID ].createInstance( Components.interfaces.nsISupports );
		if ( interfaceName )	{
			instance.QueryInterface( Components.interfaces[ interfaceName ] );
			if ( initializer )	{
				instance[ initializer ].apply( instance, arguments );
			}
		}
		return instance;
	}
	return constructor();
};

function Service ( contractID, interfaceName, initializer )		{
	function constructor()		{
		if( Components.classes[ contractID ] == undefined )	{
			throw new System.ArgumentException( "Invalid XPCOM ContactID specified: '" +contractID +"'" );
		}
		var service = Components.classes[ contractID ].getService( Components.interfaces.nsISupports );
		if ( interfaceName )	{
			if( Components.interfaces[ interfaceName ] == undefined )	{
				throw new System.ArgumentException( "Invalid XPCOM Interface specified: '" +interfaceName +"'" );
			}
			service.QueryInterface( Components.interfaces[ interfaceName ] );
			if ( initializer )	{
				service[ initializer ].apply( service, arguments );
			}
		}	
		return service;
	}
	return constructor();
}	


//** @param{Object} object
//** @param{Array} interfaces
//** @returns{Void}
function SupportsInterface( object, interfaces ){
	this.__wrappedJSObject = object;
	if( interfaces == undefined )	{
		interfaces = [];
	}
	//interfaces.push( "xuluSystemObject" );
	interfaces.push( "nsISupports" );
	this.__interfaces = interfaces;
}

SupportsInterface.prototype = {
	__proto__ : System.Object.prototype,
	
	constructor : SupportsInterface,
	
	get Interfaces()	{
		return this.__interfaces;
	},
	
	get wrappedJSObject()	{
		return this.__wrappedJSObject;
	},
	
	QueryInterface: function( iid, result )	{
		for( var i = 0; i < this.__interfaces.length; i++ )	{
			if ( iid.equals( Components.interfaces[ this.__interfaces[ i ] ] ) )	{
				return this;
			}
		}
		throw Components.results.NS_ERROR_NO_INTERFACE;
	}
}


function ArrayEnumerator(array) {
    this.array = array;
    this.index = 0;
}
ArrayEnumerator.prototype = {
    hasMoreElements: function() { return this.index < this.array.length; },
    getNext: function () { return ( this.index < this.array.length ) ? this.array[this.index++] : null; }
}