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


var EXPORTED_SYMBOLS = ["WebServiceBindingAttribute"];

Components.utils.import( "resource://xulu/assemblies/System.jsm" );

//** @param{Object} target
//** @param{Object} args
//** @returns{WebServiceBindingAttribute}
function WebServiceBindingAttribute( target, args )	{
	if ( !target )	{
		throw new ArgumentNullException( "Attribute target cannot be NULL" );
	}
	if ( this instanceof arguments.callee )	{
		System.Attribute.constructor.call( this );
		this._Apply( target );
		return;
	}
	var attribute = new WebServiceBindingAttribute( target );
	args = ( !args ) ? {} : args;
	attribute.ConformsTo = "ConformsTo" in args ? args.ConformsTo : null;
	attribute.EmitConformanceClaims = "EmitConformanceClaims" in args ? args.EmitConformanceClaims : false;
	attribute.Location = "Location" in args ? args.Location : target.Url;
	attribute.Name = "Name" in args ? args.Name : "";
	attribute.Namespace = "Namespace" in args ? args.Namespace : "";
}

//** @base{Attribute}
WebServiceBindingAttribute.prototype = {
	__proto__ : System.Attribute,
	
	constructor : WebServiceBindingAttribute,
	
	//** @returns{WsiProfiles}
	get ConformsTo(){
		return this._ConformsTo || null;
	},

	//** @param{WsiProfiles} value
	set ConformsTo( value ){
		this._ConformsTo = value;
	},

	//** @returns{Boolean}
	get EmitConformanceClaims(){
		return this._EmitConformanceClaims || null;
	},

	//** @param{Boolean} value
	set EmitConformanceClaims( value ){
		this._EmitConformanceClaims = value;
	},

	//** @returns{String}
	get Location(){
		return this._Location;
	},

	//** @param{String} value
	set Location( value ){
		this._Location = value;
	},

	//** @returns{String}
	get Name(){
		return this._Name;
	},

	//** @param{String} value
	set Name( value ){
		this._Name = value;
	},

	//** @returns{String}
	get Namespace(){
		return this._Namespace;
	},

	//** @param{String} value
	set Namespace( value ){
		this._Namespace = value;
	}

}