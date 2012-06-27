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


var EXPORTED_SYMBOLS = ["XmlNodeType","XmlNamespaceScope","XmlException","XmlNode","XmlLinkedNode","XmlElement","XmlQualifiedName","ReadState","XmlReader","XmlTextReader","XmlWriter"];

Components.utils.import( "resource://xulu/assemblies/System.jsm" );

System.Import( "System.Collections.Generic" );
System.Import( "Mozilla.Components", true, this );


XmlNodeType = {
    None : 0,		
    Element  : 1,
    Attribute : 2,
    Text  : 3,
    CDATA  : 4,
    EntityReference  : 5,
    Entity  : 6,
    ProcessingInstruction  : 7,
    Comment  : 8,
    Document  : 9,
    DocumentType  : 10,
    DocumentFragment  : 11,
    Notation  : 12,
    Whitespace  : 13,
    SignificantWhitespace  : 14,
    EndElement  : 15,
    EndEntity  : 0x10,
    XmlDeclaration  : 0x11
}


XmlNamespaceScope = {
    All : 0,
    ExcludeXml : 1,
    Local : 2
}


//** @base{Object}
XmlNode = {
	__proto__ : System.Object.prototype,
	
	//** @returns{String}
	get Name(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get Value(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} value
	set Value( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlNodeType}
	get NodeType(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlNode}
	get ParentNode(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlNodeList}
	get ChildNodes(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlNode}
	get PreviousSibling(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlNode}
	get NextSibling(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlAttributeCollection}
	get Attributes(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlDocument}
	get OwnerDocument(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlNode}
	get FirstChild(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlNode}
	get LastChild(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get HasChildNodes(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get NamespaceURI(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get Prefix(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} value
	set Prefix( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get LocalName(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsReadOnly(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get InnerText(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} value
	set InnerText( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get OuterXml(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get InnerXml(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} value
	set InnerXml( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{IXmlSchemaInfo}
	get SchemaInfo(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get BaseURI(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlElement}
	get Item(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XPathNavigator}
	CreateNavigator : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} xpath
	//** @returns{XmlNode}
	SelectSingleNode : function( xpath ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} xpath
	//** @param{XmlNamespaceManager} nsmgr
	//** @returns{XmlNode}
	SelectSingleNode : function( xpath, nsmgr ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} xpath
	//** @returns{XmlNodeList}
	SelectNodes : function( xpath ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} xpath
	//** @param{XmlNamespaceManager} nsmgr
	//** @returns{XmlNodeList}
	SelectNodes : function( xpath, nsmgr ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlNode} newChild
	//** @param{XmlNode} refChild
	//** @returns{XmlNode}
	InsertBefore : function( newChild, refChild ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlNode} newChild
	//** @param{XmlNode} refChild
	//** @returns{XmlNode}
	InsertAfter : function( newChild, refChild ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlNode} newChild
	//** @param{XmlNode} oldChild
	//** @returns{XmlNode}
	ReplaceChild : function( newChild, oldChild ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlNode} oldChild
	//** @returns{XmlNode}
	RemoveChild : function( oldChild ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlNode} newChild
	//** @returns{XmlNode}
	PrependChild : function( newChild ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlNode} newChild
	//** @returns{XmlNode}
	AppendChild : function( newChild ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Boolean} deep
	//** @returns{XmlNode}
	CloneNode : function( deep ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Void}
	Normalize : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} feature
	//** @param{String} version
	//** @returns{Boolean}
	Supports : function( feature, version ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlNode}
	Clone : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{IEnumerator}
	GetEnumerator : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlWriter} w
	//** @returns{Void}
	WriteTo : function( w ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlWriter} w
	//** @returns{Void}
	WriteContentTo : function( w ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Void}
	RemoveAll : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} prefix
	//** @returns{String}
	GetNamespaceOfPrefix : function( prefix ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} namespaceURI
	//** @returns{String}
	GetPrefixOfNamespace : function( namespaceURI ){
		throw new NotImplementedException( arguments.callee.name );
	}

}

//** @base{XmlNode}
XmlLinkedNode = {
	__proto__ : XmlNode,
	
	//** @returns{XmlNode}
	get PreviousSibling(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlNode}
	get NextSibling(){
		throw new NotImplementedException( arguments.callee.name );
	}

}

//** @base{XmlLinkedNode}
function XmlElement(){};
XmlElement.prototype = {
	__proto__ : XmlLinkedNode,
	
	constructor : XmlElement,
	
	//** @returns{String}
	get Name(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get LocalName(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get NamespaceURI(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get Prefix(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} value
	set Prefix( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlNodeType}
	get NodeType(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlNode}
	get ParentNode(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlDocument}
	get OwnerDocument(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsEmpty(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Boolean} value
	set IsEmpty( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlAttributeCollection}
	get Attributes(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get HasAttributes(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{IXmlSchemaInfo}
	get SchemaInfo(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get InnerXml(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} value
	set InnerXml( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get InnerText(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} value
	set InnerText( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlNode}
	get NextSibling(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Boolean} deep
	//** @returns{XmlNode}
	CloneNode : function( deep ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} name
	//** @returns{String}
	GetAttribute : function( name ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} name
	//** @param{String} value
	//** @returns{Void}
	SetAttribute : function( name, value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} name
	//** @returns{Void}
	RemoveAttribute : function( name ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} name
	//** @returns{XmlAttribute}
	GetAttributeNode : function( name ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlAttribute} newAttr
	//** @returns{XmlAttribute}
	SetAttributeNode : function( newAttr ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlAttribute} oldAttr
	//** @returns{XmlAttribute}
	RemoveAttributeNode : function( oldAttr ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} name
	//** @returns{XmlNodeList}
	GetElementsByTagName : function( name ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} localName
	//** @param{String} namespaceURI
	//** @returns{String}
	GetAttribute : function( localName, namespaceURI ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} localName
	//** @param{String} namespaceURI
	//** @param{String} value
	//** @returns{String}
	SetAttribute : function( localName, namespaceURI, value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} localName
	//** @param{String} namespaceURI
	//** @returns{Void}
	RemoveAttribute : function( localName, namespaceURI ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} localName
	//** @param{String} namespaceURI
	//** @returns{XmlAttribute}
	GetAttributeNode : function( localName, namespaceURI ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} localName
	//** @param{String} namespaceURI
	//** @returns{XmlAttribute}
	SetAttributeNode : function( localName, namespaceURI ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} localName
	//** @param{String} namespaceURI
	//** @returns{XmlAttribute}
	RemoveAttributeNode : function( localName, namespaceURI ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} localName
	//** @param{String} namespaceURI
	//** @returns{XmlNodeList}
	GetElementsByTagName : function( localName, namespaceURI ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} name
	//** @returns{Boolean}
	HasAttribute : function( name ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} localName
	//** @param{String} namespaceURI
	//** @returns{Boolean}
	HasAttribute : function( localName, namespaceURI ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlWriter} w
	//** @returns{Void}
	WriteTo : function( w ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlWriter} w
	//** @returns{Void}
	WriteContentTo : function( w ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} i
	//** @returns{XmlNode}
	RemoveAttributeAt : function( i ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Void}
	RemoveAllAttributes : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Void}
	RemoveAll : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	}

}


//** An XML qualified name is a namespace qualified local name in the format of namespace:localname. 
//** @base{Object}
function XmlQualifiedName( name, ns ){
	if( !name )	{
		throw new System.ArgumentException( "Invalid XML name" )
	}
	this._name = name;
	this._ns = ns || "";
};
XmlQualifiedName.prototype = {
	__proto__ : System.Object.prototype,
	
	constructor : XmlQualifiedName,
	
	//** @returns{String}
	get Namespace(){
		return this._ns.toString();
	},

	//** @returns{String}
	get Name(){
		return this._name.toString();
	},

	//** @returns{Boolean}
	get IsEmpty(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Int32}
	GetHashCode : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	ToString : function(){
		if ( this._ns )	{
			return this._ns +":" +this._name;
		}
		else	{
			return this._name;
		}
	},

	//** @param{String} name
	//** @param{String} ns
	//** @returns{String}
	ToString_namespace : function( name, ns ){
		throw new NotImplementedException( arguments.callee.name );
	},
	
	//** @param{Object} other
	//** @returns{Boolean}
	Equals : function( other ){
		throw new NotImplementedException( arguments.callee.name );
	}

}



ReadState = {
    Initial : 0,
    Interactive : 1,
    Error : 2,
    EndOfFile : 3,
    Closed : 4
}



//** @base{Object}
XmlReader = {
	__proto__ : System.Object.prototype,
	
	//** @returns{XmlReader}
	constructor : function XmlReader( xmlRoot ){
		this._xmlRoot = xmlRoot;
		this._elemList = xmlRoot..*;		// Select all element children & desendants
		this._elemIndex = 0;
		
		this._nodeList = this._elemList;	// Current list
		this._nodeIndex = 0;
		
		this._xmlNode = null;					// Current node
		
		this._targetNamespace = this._elemList[0].namespace();
	},

	//** @returns{XmlReaderSettings}
	get Settings(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlNodeType}
	get NodeType(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get Name(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get LocalName(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get NamespaceURI(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get Prefix(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get HasValue(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get Value(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Int32}
	get Depth(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get BaseURI(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsEmptyElement(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsDefault(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Char}
	get QuoteChar(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlSpace}
	get XmlSpace(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get XmlLang(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{IXmlSchemaInfo}
	get SchemaInfo(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Type}
	get ValueType(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Int32}
	get AttributeCount(){
		throw new NotImplementedException( arguments.callee.name );
	},

	/*
	//** @returns{String}
	get Item(){
		throw new NotImplementedException( arguments.callee.name );
	},
	*/
	
	//** @param{String} value
	//** @param{Int32} value
	//** @param{String} namespace
	//** @returns{String}
	Item : function( value, namespace ){
		return this.GetAttribute( value, namespace )
	},

	//** @returns{Boolean}
	get EOF(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{ReadState}
	get ReadState(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlNameTable}
	get NameTable(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get CanResolveEntity(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get CanReadBinaryContent(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get CanReadValueChunk(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get HasAttributes(){
		return ( this.AttributeCount > 0 ) ? true : false;
	},

	//** @returns{Object}
	ReadContentAsObject : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	ReadContentAsBoolean : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{DateTime}
	ReadContentAsDateTime : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Double}
	ReadContentAsDouble : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Single}
	ReadContentAsFloat : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Decimal}
	ReadContentAsDecimal : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Int32}
	ReadContentAsInt : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Int64}
	ReadContentAsLong : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	ReadContentAsString : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Type} returnType
	//** @param{IXmlNamespaceResolver} namespaceResolver
	//** @returns{Object}
	ReadContentAs : function( returnType, namespaceResolver ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Object}
	ReadElementContentAsObject : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} localName
	//** @param{String} namespaceURI
	//** @returns{Object}
	ReadElementContentAsObject : function( localName, namespaceURI ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	ReadElementContentAsBoolean : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} localName
	//** @param{String} namespaceURI
	//** @returns{Boolean}
	ReadElementContentAsBoolean : function( localName, namespaceURI ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{DateTime}
	ReadElementContentAsDateTime : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} localName
	//** @param{String} namespaceURI
	//** @returns{DateTime}
	ReadElementContentAsDateTime : function( localName, namespaceURI ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Double}
	ReadElementContentAsDouble : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} localName
	//** @param{String} namespaceURI
	//** @returns{Double}
	ReadElementContentAsDouble : function( localName, namespaceURI ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Single}
	ReadElementContentAsFloat : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} localName
	//** @param{String} namespaceURI
	//** @returns{Single}
	ReadElementContentAsFloat : function( localName, namespaceURI ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Decimal}
	ReadElementContentAsDecimal : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} localName
	//** @param{String} namespaceURI
	//** @returns{Decimal}
	ReadElementContentAsDecimal : function( localName, namespaceURI ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Int32}
	ReadElementContentAsInt : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} localName
	//** @param{String} namespaceURI
	//** @returns{Int32}
	ReadElementContentAsInt : function( localName, namespaceURI ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Int64}
	ReadElementContentAsLong : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} localName
	//** @param{String} namespaceURI
	//** @returns{Int64}
	ReadElementContentAsLong : function( localName, namespaceURI ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	ReadElementContentAsString : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} localName
	//** @param{String} namespaceURI
	//** @returns{String}
	ReadElementContentAsString : function( localName, namespaceURI ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Type} returnType
	//** @param{IXmlNamespaceResolver} namespaceResolver
	//** @returns{Object}
	ReadElementContentAs : function( returnType, namespaceResolver ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Type} returnType
	//** @param{IXmlNamespaceResolver} namespaceResolver
	//** @param{String} localName
	//** @param{String} namespaceURI
	//** @returns{Object}
	ReadElementContentAs : function( returnType, namespaceResolver, localName, namespaceURI ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} name
	//** @returns{String}
	GetAttribute : function( name ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} name
	//** @param{String} namespaceURI
	//** @returns{String}
	GetAttribute : function( name, namespaceURI ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} i
	//** @returns{String}
	GetAttribute : function( i ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} name
	//** @returns{Boolean}
	MoveToAttribute : function( name ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} name
	//** @param{String} ns
	//** @returns{Boolean}
	MoveToAttribute : function( name, ns ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} i
	//** @returns{Void}
	MoveToAttribute : function( i ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	MoveToFirstAttribute : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	MoveToNextAttribute : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	MoveToElement : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	ReadAttributeValue : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	Read : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Void}
	Close : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Void}
	Skip : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} prefix
	//** @returns{String}
	LookupNamespace : function( prefix ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Void}
	ResolveEntity : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} buffer
	//** @param{Int32} index
	//** @param{Int32} count
	//** @returns{Int32}
	ReadContentAsBase64 : function( buffer, index, count ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} buffer
	//** @param{Int32} index
	//** @param{Int32} count
	//** @returns{Int32}
	ReadElementContentAsBase64 : function( buffer, index, count ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} buffer
	//** @param{Int32} index
	//** @param{Int32} count
	//** @returns{Int32}
	ReadContentAsBinHex : function( buffer, index, count ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} buffer
	//** @param{Int32} index
	//** @param{Int32} count
	//** @returns{Int32}
	ReadElementContentAsBinHex : function( buffer, index, count ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} buffer
	//** @param{Int32} index
	//** @param{Int32} count
	//** @returns{Int32}
	ReadValueChunk : function( buffer, index, count ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	ReadString : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlNodeType}
	MoveToContent : function(  ){
		this.MoveToElement();
		while( 1 )	{
			switch( this.NodeType ) {
				case XmlNodeType.CDATA:
					return this.NodeType;
				case XmlNodeType.Element:
					return this.NodeType;
				case XmlNodeType.EndElement:
					return this.NodeType;
				case XmlNodeType.EntityReference:
					return this.NodeType;
				case XmlNodeType.EndEntity:
					return this.NodeType;
				case XmlNodeType.Text:
					return this.NodeType;
				default:
					// Else skip over nodetypes: ProcessingInstruction, DocumentType, Comment, Whitespace, or SignificantWhitespace.
					if ( this.Read() == false )	{
						return XmlNodeType.None;
					}
			}
		}
	},

	//** @returns{Void}
	ReadStartElement : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} name
	//** @returns{Void}
	ReadStartElement : function( name ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} localname
	//** @param{String} ns
	//** @returns{Void}
	ReadStartElement : function( localname, ns ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	ReadElementString : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} name
	//** @returns{String}
	ReadElementString : function( name ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} localname
	//** @param{String} ns
	//** @returns{String}
	ReadElementString : function( localname, ns ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Void}
	ReadEndElement : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	IsStartElement : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} name
	//** @returns{Boolean}
	IsStartElement : function( name ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} name
	//** @param{String} ns
	//** @returns{Boolean}
	IsStartElement : function( name, ns ){
		if( this.MoveToContent() == XmlNodeType.Element )	{
			if( ns )	{
				return ( ( this.NamespaceURI == ns ) && ( this.LocalName == name ) )
			}
			else if( name )	{
				return ( this.Name == name );
			}
			else {
				return true;
			}
		}
		else	{
			return false;
		}
	},

	//** @param{String} name
	//** @returns{Boolean}
	ReadToFollowing : function( name ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} localName
	//** @param{String} namespaceURI
	//** @returns{Boolean}
	ReadToFollowing : function( localName, namespaceURI ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} name
	//** @returns{Boolean}
	ReadToDescendant : function( name ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} localName
	//** @param{String} namespaceURI
	//** @returns{Boolean}
	ReadToDescendant : function( localName, namespaceURI ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} name
	//** @returns{Boolean}
	ReadToNextSibling : function( name ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} localName
	//** @param{String} namespaceURI
	//** @returns{Boolean}
	ReadToNextSibling : function( localName, namespaceURI ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{String} str
	//** @returns{Boolean}
	IsName : function( str ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{String} str
	//** @returns{Boolean}
	IsNameToken : function( str ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	ReadInnerXml : function(  ){
		if( this.NodeType == XmlNodeType.Element ) {
			return this._xmlNode.*.toXMLString();		// Decendents of current node only
		}
		else if ( this.NodeType == XmlNodeType.Attribute )	{
			return this._xmlNode.toXMLString();
		}
		else	{
			return "";
		}
	},

	//** @returns{String}
	ReadOuterXml : function(  ){
		if( ( this.NodeType == XmlNodeType.Element ) || ( this.NodeType == XmlNodeType.Attribute ) )	{
			//** @bug{514681} - We lose the inScopeNamespaces() of a root node's children when serialising a node from an XMLList
			//** So we create a fake root with the scoped namespaces and re-serialise - YUK!
			var tmpRoot = XML( <tmpNode></tmpNode> );
			var ns = this._xmlNode.inScopeNamespaces();
			for( var i = 0; i < ns.length; i++ )	{
				tmpRoot.addNamespace( ns[ i ] );
			}
			tmpRoot.tmpNode = this._xmlNode;
			return  tmpRoot.*.toXMLString();	
		}
		else	{
			return "";
		}
	},

	//** @returns{XmlReader}
	ReadSubtree : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{String} input
	//** @param{Stream} input
	//** @param{TextReader} input
	//** @param{XmlReader} input
	//** @param{XmlReaderSettings} settings
	//** @param{XmlParserContext} inputContext
	//** @returns{XmlReader}
	Create : function( input ){
		if ( typeof( input ) == "string" )	{
			return this._CreateFromStringUri.apply( this, arguments );
		}
		else if( input.__isType__( System.IO.Stream ) )	{
			return this._CreateFromStream.apply( this, arguments );
		}
		else if( input.__isType__( System.IO.TextReader ) )	{
			return this._CreateFromTextReader.apply( this, arguments );
		}
		else if( input.__isType__( System.Xml.XmlReader ) )	{
			return this._CreateFromXmlReader.apply( this, arguments );
		}
		else	{
			throw new System.ArgumentException( "Create" );
		}
	},

	//** @param{String} inputUri
	//** @param{XmlReaderSettings} settings
	//** @param{XmlParserContext} inputContext
	//** @returns{XmlReader}
	_CreateFromStringUri : function( inputUri, settings, inputContext ){
		var httpRequest = Mozilla.Components.Instance( "@mozilla.org/xmlextras/xmlhttprequest;1", "nsIXMLHttpRequest" );
		httpRequest.open( "GET", inputUri, false );
		httpRequest.send();
		return new XmlTextReader( httpRequest.responseText, inputUri );// bug 270553
	},

	//** @param{Stream} input
	//** @param{XmlReaderSettings} settings
	//** @param{XmlParserContext} inputContext
	//** @param{String} baseUri
	//** @returns{XmlReader}
	_CreateFromStream : function( input, settings, inputContext, baseUri ){
		throw new NotImplementedException( arguments.callee.name );
	},

	
	//** @param{TextReader} input
	//** @param{XmlReaderSettings} settings
	//** @param{XmlParserContext} inputContext
	//** @param{String} baseUri
	//** @returns{XmlReader}
	_CreateFromTextReader : function( input, settings, inputContext, baseUri ){
		return new XmlTextReader( input.ReadToEnd(), baseUri );
	},

	//** @param{XmlReader} reader
	//** @param{XmlReaderSettings} settings
	//** @returns{XmlReader}
	_CreateFromXmlReader : function( reader, settings ){
		throw new NotImplementedException( arguments.callee.name );
	}

}





//** @param{String} xmlString
//** @param{String} baseUri
//** @returns{XmlTextReader}
function XmlTextReader( xmlString, baseUri ){	
	// E4X doesn't support parsing XML declaration - bug 336551
	var xmlRoot = xmlString.replace( /^<\?xml[^>]*\?>/, "" );
	var doc = <xmlDoc></xmlDoc>;
	// Convert to E4X document
	doc.xmlDoc = new XML( xmlRoot );
	this.__BaseURI = baseUri || "";
	this.__ReadState = ReadState.Initial;
	XmlReader.constructor.call( this, doc );
};
XmlTextReader.prototype = {
	//** @base{XmlReader}
	__proto__ : XmlReader,

	//** @returns{XmlTextReader}
	constructor : XmlTextReader,

	//** @returns{XmlReaderSettings}
	get Settings(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlNodeType}
	get NodeType(){
		var nodeType = this._xmlNode.nodeKind();
		switch( nodeType )	{
			case "attribute":
				return XmlNodeType.Attribute;
			case "element":
				return XmlNodeType.Element;
			case "text":
				if( this._xmlNode.toString() > "" )	{
					return XmlNodeType.Text;
				}
				else	{
					return XmlNodeType.Whitespace;
				}
			default:
				return XmlNodeType.None;
		}
		return null;
	},

	//** @returns{String}
	get Name(){
		var name = this._xmlNode.name();
		return ( name ) ? name.toString() : "";
	},

	//** @returns{String}
	get LocalName(){
		var name =  this._xmlNode.localName();
		return ( name ) ? name.toString() : "";
	},

	//** @returns{String}
	get NamespaceURI(){
		var ns = this._xmlNode.namespace();
		return ( ns > "" ) ? ns.toString() : this._targetNamespace.toString();
	},

	//** @returns{String}
	get Prefix(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get HasValue(){
		throw new NotImplementedException( arguments.callee.name );
		switch ( this.NodeType )	{
			// 2,3,4,7,8,10,0x11,13,14 == true
		}
	},

	//** @returns{String}
	get Value(){
		return this._xmlNode.toString();
	},

	//** @returns{Int32}
	get Depth(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get BaseURI(){
		return this.__BaseURI || "";
	},

	//** @returns{Boolean}
	get IsEmptyElement(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsDefault(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Char}
	get QuoteChar(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlSpace}
	get XmlSpace(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get XmlLang(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Int32}
	get AttributeCount(){
		if ( this.NodeType == 1 || 10 || 0x11 )	{
			return this._xmlNode.@*::*.length();
		}
		else	{
			return 0;
		}
	},

	//** @returns{Boolean}
	get EOF(){
		return ( this._nodeIndex == this._elemList.length() ) ? true : false;
	},

	//** @returns{ReadState}
	get ReadState(){
		return this.__ReadState;
	},

	//** @returns{XmlNameTable}
	get NameTable(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get CanResolveEntity(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get CanReadBinaryContent(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get CanReadValueChunk(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Int32}
	get LineNumber(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Int32}
	get LinePosition(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get Namespaces(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Boolean} value
	set Namespaces( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get Normalization(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Boolean} value
	set Normalization( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Encoding}
	get Encoding(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{WhitespaceHandling}
	get WhitespaceHandling(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{WhitespaceHandling} value
	set WhitespaceHandling( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get ProhibitDtd(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Boolean} value
	set ProhibitDtd( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{EntityHandling}
	get EntityHandling(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{EntityHandling} value
	set EntityHandling( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlResolver} value
	set XmlResolver( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} attribute
	//** @param{Int32} attribute
	//** @param{String} namespaceURI
	//** @returns{String}
	GetAttribute : function( attribute, namespaceURI ){
		if ( typeof( attribute ) == "string" )	{
			return this._GetAttributeFromStringName( attribute, namespaceURI );
		}
		else	{
			return this._GetAttributeFromIntIndex( attribute );
		}
	},

	//** @param{String} name
	//** @param{String} namespaceURI
	//** @returns{String}
	_GetAttributeFromStringName : function( name, namespaceURI ){
		if ( this.NodeType == XmlNodeType.Attribute )	{
			this._xmlNode.parent().attribute( name ) || null;
		}
		else	{
			this._xmlNode.attribute( name ) || null;
		}
	},

	//** @param{Int32} i
	//** @returns{String}
	_GetAttributeFromIntIndex : function( i ){
		if ( this.NodeType == XmlNodeType.Attribute )	{
			this._xmlNode.parent().attributes()[ i ] || null;
		}
		else	{
			this._xmlNode.attributes()[ i ] || null;
		}
	},
	
	//** @param{Int32} attribute
	//** @param{String} attribute
	//** @param{String} ns
	//** @returns{Boolean}
	MoveToAttribute : function( attribute, ns ){
		if ( typeof( attribute ) == "string" )	{
			return this._MoveToAttributeFromStringName( attribute, ns );
		}
		else	{
			return this._MoveToAttributeFromIntIndex( attribute );
		}
	},

	//** @param{String} localName
	//** @param{String} namespaceURI
	//** @returns{Boolean}
	_MoveToAttributeFromStringName : function( localName, namespaceURI ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} i
	//** @returns{Void}
	_MoveToAttributeFromIntIndex : function( i ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	MoveToFirstAttribute : function(  ){
		if ( this.NodeType == XmlNodeType.Attribute )	{
			var attrList = this._xmlNode.parent().@*::*;
		}
		else	{
			var attrList  = this._xmlNode.@*::*;
		}
		if ( attrList.length() > 0 )	{
			this._nodeList = attrList;
			this._elemIndex = this._nodeIndex;		// Save current index
			this._nodeIndex = 1;
			this._nodeList = attrList;
			this._xmlNode = attrList[ 0 ];
			return true;
		}
		else	{
			return false;
		}
	},

	//** @returns{Boolean}
	MoveToNextAttribute : function(  ){
		if ( this.NodeType == XmlNodeType.Element )	{
			return this.MoveToFirstAttribute();
		}
		else {
			return this.Read();
		}
	},

	//** @returns{Boolean}
	MoveToElement : function(  ){
		if ( this.NodeType == XmlNodeType.Attribute )	{
			this._nodeList = this._elemList;
			this._nodeIndex = this._elemIndex;
			this._xmlNode = this._xmlNode.parent();
			return true;
		}
		else	{
			return false;
		}
	},

	//** @returns{Boolean}
	ReadAttributeValue : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	Read : function(  ){
		if ( this._nodeIndex < this._nodeList.length() )	{
			this._xmlNode = this._nodeList[ this._nodeIndex++ ];
			this.__ReadState = ReadState.Interactive;
			return true;
		}
		else	{
			this.__ReadState = ReadState.EndOfFile;
			return false;
		}
	},

	//** @returns{Void}
	Close : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Void}
	Skip : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} prefix
	//** @returns{String}
	LookupNamespace : function( prefix ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Void}
	ResolveEntity : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} buffer
	//** @param{Int32} index
	//** @param{Int32} count
	//** @returns{Int32}
	ReadContentAsBase64 : function( buffer, index, count ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} buffer
	//** @param{Int32} index
	//** @param{Int32} count
	//** @returns{Int32}
	ReadElementContentAsBase64 : function( buffer, index, count ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} buffer
	//** @param{Int32} index
	//** @param{Int32} count
	//** @returns{Int32}
	ReadContentAsBinHex : function( buffer, index, count ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} buffer
	//** @param{Int32} index
	//** @param{Int32} count
	//** @returns{Int32}
	ReadElementContentAsBinHex : function( buffer, index, count ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	ReadString : function(  ){
		if( this.NodeType == XmlNodeType.Element ) {
			var text = this._xmlNode.text();
			return ( text == undefined ) ? "" : text;
		}
		else if( ( this.NodeType == XmlNodeType.Text ) || ( this.NodeType == XmlNodeType.Whitespace ) )	{
			return this._xmlNode.toString();
		}
		else if( this.NodeType == XmlNodeType.Attribute )	{
			this.MoveToElement();
			return "";
		}
		else {
			this.Read();
			return "";
		}
	},

	//** @returns{Boolean}
	HasLineInfo : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlNamespaceScope} scope
	//** @returns{IDictionary}
	GetNamespacesInScope : function( scope ){
		var dictionary = new System.Collections.Generic.IDictionary();
		if( this.NodeType != XmlNodeType.Element )	{
			return dictionary;
		}
		var ns = this._xmlNode.inScopeNamespaces();
		for( var i = 0; i < ns.length; i++ )	{
			if( ns[i] > "" )	{
				dictionary.Add( ns[ i ].prefix, ns[ i ].uri );	
			}
		}
		return dictionary;
	},

	//** @returns{Void}
	ResetState : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{TextReader}
	GetRemainder : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} buffer
	//** @param{Int32} index
	//** @param{Int32} count
	//** @returns{Int32}
	ReadChars : function( buffer, index, count ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} array
	//** @param{Int32} offset
	//** @param{Int32} len
	//** @returns{Int32}
	ReadBase64 : function( array, offset, len ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} array
	//** @param{Int32} offset
	//** @param{Int32} len
	//** @returns{Int32}
	ReadBinHex : function( array, offset, len ){
		throw new NotImplementedException( arguments.callee.name );
	}

}






//** @base{Object}
XmlWriter = {
	__proto__ : System.Object.prototype,
	
	//** @returns{XmlWriter}
	constructor : function XmlWriter(){
		var xmlDec = '<?xml version="1.0" encoding="UTF-8"?>'
		this._nodeList = new XMLList();
		this._xmlNode = <xmlRoot></xmlRoot>;
		this._StartDocument = false;
		this.__closed = false;
	},

	//** @returns{XmlWriterSettings}
	get Settings(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{WriteState}
	get WriteState(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlSpace}
	get XmlSpace(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get XmlLang(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Boolean} standalone
	//** @returns{Void}
	WriteStartDocument : function( standalone ){
		//** @bug{} Re-visit for encoding
		this._StartDocument = true;
	},

	//** @returns{Void}
	WriteEndDocument : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} name
	//** @param{String} pubid
	//** @param{String} sysid
	//** @param{String} subset
	//** @returns{Void}
	WriteDocType : function( name, pubid, sysid, subset ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} prefix
	//** @param{String} localName
	//** @param{String} ns
	//** @returns{Void}
	WriteStartElement : function( prefix, localName, ns ){
		if ( ( prefix ) && ( !ns  ) )	{
			throw new System.ArgumentNullException( "Namespace cannot be null" );
		}
		var xmlns = null;
		if ( prefix ) 	{
			var xmlns = this._xmlNode.namespace( prefix );
			if ( !xmlns )	{
				var xmlns = new Namespace( prefix, ns );
			}
		}
		else	{
			this._xmlNode.inScopeNamespaces().every( function( elem, index, array )	{
				if ( elem == ns )	{
					xmlns = elem;
					return false;
				}
				return true;
			});
			if ( !xmlns )	{
				var xmlns = new Namespace( ns );
			}
		}
		
		var node = <{localName}></{localName}>;
		if ( xmlns )	{
			node.setNamespace( xmlns );
		}
		this._xmlNode.appendChild( node );
		this._xmlNode = node;
	},

	//** @returns{Void}
	WriteEndElement : function(){
		var parentNode = this._xmlNode.parent();
		if ( parentNode.parent() == null )	{				// Closed root node
			this._nodeList += this._xmlNode;
			this._xmlNode = new XML( <xmlRoot></xmlRoot> );
		}
		else	{
			this._xmlNode = parentNode;
		}
	},

	//** @returns{Void}
	WriteFullEndElement : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},


	//** @param{String} prefix
	//** @param{String} localName
	//** @param{String} ns
	//** @param{String} value
	//** @returns{Void}
	WriteAttributeString : function( prefix, localName, ns, value ){
		if ( prefix == "xmlns" )	{
			var xmlns = new Namespace( localName, value );
			this._xmlNode.addNamespace( xmlns );
			return;
		}
		if ( ( prefix ) && ( !ns  ) )	{
			throw new System.ArgumentNullException( "Namespace cannot be null" );
		}
		value = value.replace( "'", "&apos" );
		value = value.replace( '"', "&quot" );
		if ( ns )	{
			var xmlns = new Namespace( prefix, ns );
			this._xmlNode.@xmlns::[ localName ] = value;
		}
		else	{
			this._xmlNode.@[ localName ]= value;
		}
	},

	//** @param{String} localName
	//** @param{String} ns
	//** @returns{Void}
	WriteStartAttribute : function( localName, ns ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} prefix
	//** @param{String} localName
	//** @param{String} ns
	//** @returns{Void}
	WriteStartAttribute : function( prefix, localName, ns ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} localName
	//** @returns{Void}
	WriteStartAttribute : function( localName ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Void}
	WriteEndAttribute : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} text
	//** @returns{Void}
	WriteCData : function( text ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} text
	//** @returns{Void}
	WriteComment : function( text ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} name
	//** @param{String} text
	//** @returns{Void}
	WriteProcessingInstruction : function( name, text ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} name
	//** @returns{Void}
	WriteEntityRef : function( name ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Char} ch
	//** @returns{Void}
	WriteCharEntity : function( ch ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} ws
	//** @returns{Void}
	WriteWhitespace : function( ws ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} text
	//** @returns{Void}
	WriteString : function( text ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Char} lowChar
	//** @param{Char} highChar
	//** @returns{Void}
	WriteSurrogateCharEntity : function( lowChar, highChar ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} buffer
	//** @param{Int32} index
	//** @param{Int32} count
	//** @returns{Void}
	WriteChars : function( buffer, index, count ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} buffer
	//** @param{Int32} index
	//** @param{Int32} count
	//** @returns{Void}
	WriteRaw : function( buffer, index, count ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} data
	//** @returns{Void}
	WriteRaw : function( data ){
		var xmlString = data.replace( /^<\?xml[^>]*\?>/, "" );
		var node = XML( xmlString );
		this._xmlNode.appendChild( node );
		this._xmlNode = node;
		this.WriteEndElement();
	},

	//** @param{Array} buffer
	//** @param{Int32} index
	//** @param{Int32} count
	//** @returns{Void}
	WriteBase64 : function( buffer, index, count ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} buffer
	//** @param{Int32} index
	//** @param{Int32} count
	//** @returns{Void}
	WriteBinHex : function( buffer, index, count ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Void}
	Close : function(){
		this.Flush();
		this.__closed = true;
	},

	//** @returns{Void}
	Flush : function(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} ns
	//** @returns{String}
	LookupPrefix : function( ns ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} name
	//** @returns{Void}
	WriteNmToken : function( name ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} name
	//** @returns{Void}
	WriteName : function( name ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} localName
	//** @param{String} ns
	//** @returns{Void}
	WriteQualifiedName : function( localName, ns ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Object} value
	//** @returns{Void}
	WriteValue : function( value ){
		this._xmlNode.setChildren( value );
	},

	//** @param{XmlReader} reader
	//** @param{Boolean} defattr
	//** @returns{Void}
	WriteAttributes : function( reader, defattr ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlReader} reader
	//** @param{Boolean} defattr
	//** @returns{Void}
	WriteNode : function( reader, defattr ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XPathNavigator} navigator
	//** @param{Boolean} defattr
	//** @returns{Void}
	WriteNode : function( navigator, defattr ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} localName
	//** @param{String} value
	//** @returns{Void}
	WriteElementString : function( localName, value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} localName
	//** @param{String} ns
	//** @param{String} value
	//** @returns{Void}
	WriteElementString : function( localName, ns, value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} prefix
	//** @param{String} localName
	//** @param{String} ns
	//** @param{String} value
	//** @returns{Void}
	WriteElementString : function( prefix, localName, ns, value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Object} output
	//** @param{Object} settings
	//** @returns{XmlWriter}
	Create : function( output, settings ){
		if ( typeof( output ) == "string" )	{
			return this._CreateFlushToUri( output, settings );
		}
		else if( output.__isType__( System.IO.Stream ) )	{
			return this._CreateFlushToStrean( output, settings );
		}
		else if( output.__isType__( System.IO.TextWriter ) )	{
			return this._CreateFlushToTextWriter( output, settings );
		}
		else if( output.__isType__( System.Text.StringBuilder ) )	{
			return this._CreateFlushToStringBuilder( output, settings );
		}
		else if( output.__isType__( System.Xml.XmlWriter ) )	{
			return this._CreateFlushToXmlWriter( output, settings );
		}
		throw new System.ArgumentException( "Incorrect output parameter type", "XmlWriter.Create()" );
	},
	
	//** @param{String} outputFileName
	//** @param{XmlWriterSettings} settings
	//** @returns{XmlWriter}
	_CreateFlushToUri : function( outputFileName, settings ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Stream} output
	//** @param{XmlWriterSettings} settings
	//** @returns{XmlWriter}
	_CreateFlushToStrean : function( output, settings ){
		//var streamWriter = System.Object( this );
		//streamWriter.constructor( output );
		//return streamWriter;
		return new XmlStreamWriterImpl( output );
	},

	//** @param{TextWriter} output
	//** @param{XmlWriterSettings} settings
	//** @returns{XmlWriter}
	_CreateFlushToTextWriter : function( output, settings ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{StringBuilder} output
	//** @param{XmlWriterSettings} settings
	//** @returns{XmlWriter}
	_CreateFlushToStringBuilder : function( output, settings ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlWriter} output
	//** @param{XmlWriterSettings} settings
	//** @returns{XmlWriter}
	_CreateFlushToXmlWriter : function( output, settings ){
		throw new NotImplementedException( arguments.callee.name );
	}

}


//** @param{Stream} output
//** @returns{XmlWriter}
function XmlStreamWriterImpl( output )	{
	this._Stream = output;
	XmlWriter.constructor.call( this );
}
XmlStreamWriterImpl.prototype = {
	__proto__ : XmlWriter,
	
	//** @returns{Void}
	Flush : function()	{
		if( this._nodeList.length() == 0 )	{
			return;
		}
		//** @bug{} BAD!!!! XML Dec should be handle by write start element
		var data = '<?xml version="1.0" encoding="UTF-8"?>' +"\n" +this._nodeList.toXMLString();
		this._Stream.Write( data, 0, data.length );
		//** Re-visit
		//** This is problematic - if Flush() is called before a call to WriteEndElement()
		this.constructor();
	}
}



//** @base{SystemException}
function XmlException(){};
XmlException.prototype = {
	__proto__ : System.SystemException,
	
	constructor : XmlException,
	
	//** @returns{Int32}
	get LineNumber(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Int32}
	get LinePosition(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get SourceUri(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get Message(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{SerializationInfo} info
	//** @param{StreamingContext} context
	//** @returns{Void}
	GetObjectData : function( info, context ){
		throw new NotImplementedException( arguments.callee.name );
	}

}
