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


var EXPORTED_SYMBOLS = ["CodeObject","CodeNamespace","CodeCompileUnit"];

Components.utils.import( "resource://xulu/assemblies/System.jsm", this );

//** @base{Object}
function CodeObject(){};
CodeObject.prototype = {
	__proto__ : System.Object.prototype,
	
		//** @returns{CodeObject}
	constructor : CodeObject,
	
	//** @returns{IDictionary}
	get UserData(){
		throw new NotImplementedException( arguments.callee.name );
	}
}


//** @param{String} name
//** @returns{CodeNamespace}

function CodeNamespace( name ){
	this.__Name = name;
};
//** @base{CodeObject}
CodeNamespace.prototype = {
	__proto__ : CodeObject.prototype,
	
	//** @returns{CodeNamespace}
	constructor : CodeNamespace,
	
	//** @returns{CodeTypeDeclarationCollection}
	get Types(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{CodeNamespaceImportCollection}
	get Imports(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get Name(){
		return this.__Name || "";
	},

	//** @param{String} value
	set Name( value ){
		this.__Name = value;
	},

	//** @returns{CodeCommentStatementCollection}
	get Comments(){
		throw new NotImplementedException( arguments.callee.name );
	}
}


//** @base{CodeObject}
function CodeCompileUnit(){};
CodeCompileUnit.prototype = {
	__proto__ : CodeObject.prototype,
	
	//** @returns{CodeCompileUnit}
	constructor : CodeCompileUnit,
	
	//** @returns{CodeNamespaceCollection}
	get Namespaces(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{StringCollection}
	get ReferencedAssemblies(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{CodeAttributeDeclarationCollection}
	get AssemblyCustomAttributes(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{CodeDirectiveCollection}
	get StartDirectives(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{CodeDirectiveCollection}
	get EndDirectives(){
		throw new NotImplementedException( arguments.callee.name );
	}

}

//** @base{CollectionBase}
function CodeNamespaceCollection(){
	System.Collections.CollectionBase.call( this );
};
CodeNamespaceCollection.prototype = {
	__proto__ : System.Collections.CollectionBase.prototype,

	//** @returns{CodeNamespaceCollection}
	constructor : CodeNamespaceCollection,

	/*
	//** @returns{CodeNamespace}
	get Item(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{CodeNamespace} value
	set Item( value ){
		throw new NotImplementedException( arguments.callee.name );
	},
	 
	
	//** @param{CodeNamespace} value
	//** @returns{Int32}
	Add : function( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} value
	//** @returns{Void}
	AddRange : function( value ){
		throw new NotImplementedException( arguments.callee.name );
	},
	*/
	
	//** @param{CodeNamespaceCollection} value
	//** @returns{Void}
	AddRange : function( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{CodeNamespace} value
	//** @returns{Boolean}
	Contains : function( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} array
	//** @param{Int32} index
	//** @returns{Void}
	CopyTo : function( array, index ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{CodeNamespace} value
	//** @returns{Int32}
	IndexOf : function( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} index
	//** @param{CodeNamespace} value
	//** @returns{Void}
	Insert : function( index, value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{CodeNamespace} value
	//** @returns{Void}
	Remove : function( value ){
		throw new NotImplementedException( arguments.callee.name );
	}

}