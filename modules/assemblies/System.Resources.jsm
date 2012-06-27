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


var EXPORTED_SYMBOLS = ["ResourceManager","MissingManifestResourceException"];

Components.utils.import( "resource://xulu/assemblies/System.jsm" );
var Mozilla = System.Import( "Mozilla.Components", true );


//** @base{Object}
function ResourceManager( baseName, chromeName ){
	if ( baseName == null )	{
		throw new System.ArgumentNullException( "The 'baseName' parameter was null" );
	}
	this._BaseName = baseName;
	this._chromeName = chromeName;
	var mozStringBundleService = Mozilla.Components.Service( "@mozilla.org/intl/stringbundle;1", "nsIStringBundleService" );
	try {
		this._stringBundle = mozStringBundleService.createBundle( "chrome://" +chromeName +"/locale/" +baseName +".resources" );
	}
	catch( ex )	{
		throw new System.ArgumentException( ex.message, "ResourceManager", ex );
	}
};
ResourceManager.prototype = {

	//** @returns{String}
	get BaseName(){
		return this._BaseName;
	},

	//** @returns{Boolean}
	get IgnoreCase(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Boolean} value
	set IgnoreCase( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Type}
	get ResourceSetType(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Void}
	ReleaseAllResources : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} baseName
	//** @param{String} resourceDir
	//** @param{Type} usingResourceSet
	//** @returns{ResourceManager}
	CreateFileBasedResourceManager : function( baseName, resourceDir, usingResourceSet ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{CultureInfo} culture
	//** @param{Boolean} createIfNotExists
	//** @param{Boolean} tryParents
	//** @returns{ResourceSet}
	GetResourceSet : function( culture, createIfNotExists, tryParents ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} name
	//** @param{CultureInfo} culture
	//** @returns{String}
	GetString : function( name, culture ){
		if ( name == null )	{
			throw new System.ArgumentNullException( "The 'name' parameter was null" );
		}
		try {
			return this._stringBundle.GetStringFromName( name );
		}
		catch( ex )	{
			throw new System.Resources.MissingManifestResourceException( "No usable set of resources has been found, and there are no neutral culture resources", ex );
		}
	},

	//** @param{String} name
	//** @returns{Object}
	GetObject : function( name ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} name
	//** @param{CultureInfo} culture
	//** @returns{Object}
	GetObject : function( name, culture ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} name
	//** @returns{UnmanagedMemoryStream}
	GetStream : function( name ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} name
	//** @param{CultureInfo} culture
	//** @returns{UnmanagedMemoryStream}
	GetStream : function( name, culture ){
		throw new NotImplementedException( arguments.callee.name );
	},

}

//** @base{SystemException}
function MissingManifestResourceException(){};
MissingManifestResourceException.prototype = {

}