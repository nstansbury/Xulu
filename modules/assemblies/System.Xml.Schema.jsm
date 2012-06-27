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


var EXPORTED_SYMBOLS = ["XmlSchema","XmlSchemaObjectCollection","XmlSchemaElement","XmlSchemaAttribute","XmlSchemaType","XmlSchemaSimpleType","XmlSchemaComplexType","XmlSchemaComplexContent","XmlSchemaComplexContentExtension","XmlSchemaComplexContentRestriction","XmlSchemaSimpleContentExtension","XmlSchemaSimpleContentRestriction","XmlSchemaSimpleTypeRestriction","XmlSchemaSimpleTypeUnion","XmlSchemaSimpleTypeList","XmlSchemaSequence","XmlSchemaChoice","XmlSchemaGroupRef","XmlSchemaAll"] ;

Components.utils.import( "resource://xulu/assemblies/System.jsm" );


System.Import( "System.Xml" );
System.Import( "System.Xml.Serialization" );
System.Import( "System.Collections" );


const XSD_NS = new Namespace( "http://www.w3.org/2001/XMLSchema" );

//** @returns{XmlSchemaObjectCollection}
function XmlSchemaObjectCollection( parentObject, e4xSchemaObjects ){
	this.__parentObject = parentObject;
	System.Collections.CollectionBase.call( this, e4xSchemaObjects );
};
//** @base{CollectionBase}
XmlSchemaObjectCollection.prototype = {
	__proto__ : System.Collections.CollectionBase.prototype,
	
	constructor : XmlSchemaObjectCollection,
	
	//** @returns{XmlSchemaObject}
	Item : function( value ){
		var schema = this._array[ value ];
		var elem = schema.localName();
		//Console.WriteLine( "Type: " +elem );
		switch( elem ){
			case "import":
				return new XmlSchemaImport( this.__parentObject, schema );
			case "complexType":
				return new XmlSchemaComplexType( this.__parentObject, schema );
			case "simpleType":
				return new XmlSchemaSimpleType( this.__parentObject, schema );
			case "element":
				return new XmlSchemaElement( this.__parentObject, schema );
			case "attribute":
				return new XmlSchemaAttribute( this.__parentObject, schema );
			case "annotation":
				return new XmlSchemaAnnotation( this.__parentObject, schema );
			case "attributeGroup":
				return new XmlSchemaAttributeGroup( this.__parentObject, schema );
			case "group":
				return new XmlSchemaGroup( this.__parentObject, schema );
			case "notation":
				return new XmlSchemaNotation( this.__parentObject, schema );
			default:
				return new XmlSchemaObject( this.__parentObject, schema );
		}
	},

	/*	IList iEnumerator calls implementors Item() method
	//** @returns{XmlSchemaObjectEnumerator}
	GetEnumerator : function(){
		throw new NotImplementedException( arguments.callee.name );
	},
	 */
	
	//** @param{XmlSchemaObject} item
	//** @returns{Int32}
	Add : function( item ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} index
	//** @param{XmlSchemaObject} item
	//** @returns{Void}
	Insert : function( index, item ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlSchemaObject} item
	//** @returns{Int32}
	IndexOf : function( item ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlSchemaObject} item
	//** @returns{Boolean}
	Contains : function( item ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlSchemaObject} item
	//** @returns{Void}
	Remove : function( item ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} array
	//** @param{Int32} index
	//** @returns{Void}
	CopyTo : function( array, index ){
		throw new NotImplementedException( arguments.callee.name );
	}

}



//** @returns{XmlSchemaObject}
function XmlSchemaObject( parentObject, e4xSchemaElem )	{
	this._schemaElem = e4xSchemaElem;
	// We should really just call:  this._schemaElem.parent() and pass to a generic constructor
	this.__parentObject = parentObject;
	// This is to ensure we always have direct access to any source XmlSchema object
	if ( parentObject != null )	{
		this.__xmlSchema = parentObject.__xmlSchema;
	}
}

//** @base{Object}
XmlSchemaObject.prototype = {
	__proto__ : System.Object.prototype,
	
	constructor : XmlSchemaObject,
	
	//** @returns{Int32}
	get LineNumber(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} value
	set LineNumber( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Int32}
	get LinePosition(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} value
	set LinePosition( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get SourceUri(){
		return this.__SourceUri;
	},

	//** @param{String} value
	set SourceUri( value ){
		this.__SourceUri = value;
	},

	//** @returns{XmlSchemaObject}
	get Parent(){
		return this.__parentObject;
	},

	//** @param{XmlSchemaObject} value
	set Parent( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlSerializerNamespaces}
	get Namespaces(){
		return new System.Xml.Serialization.XmlSerializerNamespaces( this._schemaElem );
	},

	//** @param{XmlSerializerNamespaces} value
	set Namespaces( value ){
		throw new NotImplementedException( arguments.callee.name );
	}

}




//** @base{XmlSchemaObject}
XmlSchema = {
	__proto__ : XmlSchemaObject.prototype,
	
	//** @returns{XmlSchema}
	constructor : function XmlSchema( e4xSchema )	{
	//	var xs = System.Object( this );
	//	return XmlSchemaObject.call( xs, null, e4xSchema );
		this.__xmlSchema = this;
		XmlSchemaObject.call( this, null, e4xSchema );
	},
	
	//** @returns{XmlSchemaForm}
	get AttributeFormDefault(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlSchemaForm} value
	set AttributeFormDefault( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlSchemaDerivationMethod}
	get BlockDefault(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlSchemaDerivationMethod} value
	set BlockDefault( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlSchemaDerivationMethod}
	get FinalDefault(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlSchemaDerivationMethod} value
	set FinalDefault( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlSchemaForm}
	get ElementFormDefault(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlSchemaForm} value
	set ElementFormDefault( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get TargetNamespace(){
		return this._schemaElem.@targetNamespace.toString();
	},

	//** @param{String} value
	set TargetNamespace( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get Version(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} value
	set Version( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlSchemaObjectCollection}
	get Includes(){
		var e4xImports = this._schemaElem.XSD_NS::import;
		return new XmlSchemaObjectCollection( this, e4xImports );
	},

	//** @returns{XmlSchemaObjectCollection}
	get Items(){
		return new XmlSchemaObjectCollection( this, this._schemaElem.* );
	},

	//** @returns{Boolean}
	get IsCompiled(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlSchemaObjectTable}
	get Attributes(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlSchemaObjectTable}
	get AttributeGroups(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlSchemaObjectTable}
	get SchemaTypes(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlSchemaObjectTable}
	get Elements(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get Id(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} value
	set Id( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Array}
	get UnhandledAttributes(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} value
	set UnhandledAttributes( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlSchemaObjectTable}
	get Groups(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlSchemaObjectTable}
	get Notations(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Stream} input
	//** @param{TextReader} input
	//** @param{XmlReader} input
	//** @param{ValidationEventHandler} validationEventHandler
	//** @returns{XmlSchema}
	Read : function( input, validationEventHandler ){
		//if ( input instanceof System.Xml.XmlReader )	{
			return this.Read_xmlReader( input, validationEventHandler )
		//}
	},
	
	//** @param{TextReader} reader
	//** @param{ValidationEventHandler} validationEventHandler
	//** @returns{XmlSchema}
	Read_textReader : function( reader, validationEventHandler ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Stream} stream
	//** @param{ValidationEventHandler} validationEventHandler
	//** @returns{XmlSchema}
	Read_stream : function( stream, validationEventHandler ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlReader} reader
	//** @param{ValidationEventHandler} validationEventHandler
	//** @returns{XmlSchema}
	Read_xmlReader : function( reader, validationEventHandler ){
		while( reader.Read() )	{
			if ( reader.LocalName == "schema" )	{
				var schema = new System.Object( this );
				schema.constructor( XML( reader.ReadOuterXml() ) );
				schema.SourceUri = reader.BaseURI;
				return schema;
			}
		}
		return null;
	},

	//** @param{Stream} stream
	//** @returns{Void}
	Write : function( stream ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Stream} stream
	//** @param{XmlNamespaceManager} namespaceManager
	//** @returns{Void}
	Write : function( stream, namespaceManager ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{TextWriter} writer
	//** @returns{Void}
	Write : function( writer ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{TextWriter} writer
	//** @param{XmlNamespaceManager} namespaceManager
	//** @returns{Void}
	Write : function( writer, namespaceManager ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlWriter} writer
	//** @returns{Void}
	Write : function( writer ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlWriter} writer
	//** @param{XmlNamespaceManager} namespaceManager
	//** @returns{Void}
	Write : function( writer, namespaceManager ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{ValidationEventHandler} validationEventHandler
	//** @returns{Void}
	Compile : function( validationEventHandler ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{ValidationEventHandler} validationEventHandler
	//** @param{XmlResolver} resolver
	//** @returns{Void}
	Compile : function( validationEventHandler, resolver ){
		throw new NotImplementedException( arguments.callee.name );
	}

}



//** @returns{XmlSchemaExternal}
function XmlSchemaExternal( parentObject, e4xSchemaElem )	{
	return XmlSchemaObject.call( this, parentObject, e4xSchemaElem );
}
//** @base{XmlSchemaObject}
XmlSchemaExternal.prototype = {
	__proto__ : XmlSchemaObject.prototype,

	constructor : XmlSchemaExternal,
	
	//** @returns{String}
	get SchemaLocation(){
		return this._schemaElem.@schemaLocation.toString();
	},

	//** @param{String} value
	set SchemaLocation( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlSchema}
	get Schema(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlSchema} value
	set Schema( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get Id(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} value
	set Id( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Array}
	get UnhandledAttributes(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} value
	set UnhandledAttributes( value ){
		throw new NotImplementedException( arguments.callee.name );
	}

}



//** @returns{XmlSchemaImport}
function XmlSchemaImport( parentObject, e4xSchemaElem ){
	return XmlSchemaExternal.call( this, parentObject, e4xSchemaElem );
};
//** @base{XmlSchemaExternal}
XmlSchemaImport.prototype = {
	__proto__ : XmlSchemaExternal.prototype,
	
	constructor : XmlSchemaImport,
	
	//** @returns{String}
	get Namespace(){
		return this._schemaElem.@namespace.toString();
	},

	//** @param{String} value
	set Namespace( value ){
		if ( value )	{
			this._schemaElem.@namespace = new Namespace( value );
		}
	},

	//** @returns{XmlSchemaAnnotation}
	get Annotation(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlSchemaAnnotation} value
	set Annotation( value ){
		throw new NotImplementedException( arguments.callee.name );
	}

}


//** @returns{XmlSchemaAnnotation}
function XmlSchemaAnnotation( parentObject, e4xSchemaElem ){
	XmlSchemaObject.call( this, parentObject, e4xSchemaElem );
};
//** @base{XmlSchemaObject}
XmlSchemaAnnotation.prototype = {
	__proto__ : XmlSchemaObject.prototype,

	constructor : XmlSchemaAnnotation,

	//** @returns{String}
	get Id(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} value
	set Id( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlSchemaObjectCollection}
	get Items(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Array}
	get UnhandledAttributes(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} value
	set UnhandledAttributes( value ){
		throw new NotImplementedException( arguments.callee.name );
	}
}


//** @base{XmlSchemaObject}
function XmlSchemaAnnotated( parentObject, e4xSchemaElem ){
	XmlSchemaObject.call( this, parentObject, e4xSchemaElem );
};
XmlSchemaAnnotated.prototype = {
	__proto__ : XmlSchemaObject.prototype,
	
	constructor : XmlSchemaAnnotated,
	
	//** @returns{String}
	get Id(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} value
	set Id( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlSchemaAnnotation}
	get Annotation(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlSchemaAnnotation} value
	set Annotation( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Array}
	get UnhandledAttributes(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} value
	set UnhandledAttributes( value ){
		throw new NotImplementedException( arguments.callee.name );
	}

}



//** @base{XmlSchemaAnnotated}
function XmlSchemaAttribute( parentObject, e4xSchemaElem ){
	return XmlSchemaAnnotated.call( this, parentObject, e4xSchemaElem );
};
XmlSchemaAttribute.prototype = {
	__proto__ : XmlSchemaAnnotated.prototype,
	
		constructor : XmlSchemaAttribute,
	
	//** @returns{String}
	get DefaultValue(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} value
	set DefaultValue( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get FixedValue(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} value
	set FixedValue( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlSchemaForm}
	get Form(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlSchemaForm} value
	set Form( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get Name(){
		return this._schemaElem.@name.toString();
	},

	//** @param{String} value
	set Name( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlQualifiedName}
	get RefName(){
		var ref = this._schemaElem.@ref;
		if( ref > "" )	{
			// Expecting a QName string
			var qn = ref.split( ":" );
			return new System.Xml.XmlQualifiedName( qn[ 1 ], this._schemaElem.namespace( qn[ 0 ] ) );
		}
		else	{
			return null;
		}
	},

	//** @param{XmlQualifiedName} value
	set RefName( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlQualifiedName}
	get SchemaTypeName(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlQualifiedName} value
	set SchemaTypeName( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlSchemaSimpleType}
	get SchemaType(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlSchemaSimpleType} value
	set SchemaType( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlSchemaUse}
	get Use(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlSchemaUse} value
	set Use( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlQualifiedName}
	get QualifiedName(){
		return new System.Xml.XmlQualifiedName( this.Name, this.__xmlSchema.TargetNamespace );
	},

	//** @returns{Object}
	get AttributeType(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlSchemaSimpleType}
	get AttributeSchemaType(){
		throw new NotImplementedException( arguments.callee.name );
	}

}


//** @returns{XmlSchemaType}
function XmlSchemaType( parentObject, e4xSchemaElem ){
	XmlSchemaAnnotated.call( this, parentObject, e4xSchemaElem );
};

//** @base{XmlSchemaAnnotated}
XmlSchemaType.prototype = {
	__proto__ : XmlSchemaAnnotated.prototype,
	
	constructor : XmlSchemaType,
	
	//** @returns{String}
	get Name(){
		return this._schemaElem.@name.toString();
	},

	//** @param{String} value
	set Name( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlSchemaDerivationMethod}
	get Final(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlSchemaDerivationMethod} value
	set Final( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlQualifiedName}
	get QualifiedName(){
		return new System.Xml.XmlQualifiedName( this.Name, this.__xmlSchema.TargetNamespace );
	},

	//** @returns{XmlSchemaDerivationMethod}
	get FinalResolved(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Object}
	get BaseSchemaType(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlSchemaType}
	get BaseXmlSchemaType(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlSchemaDerivationMethod}
	get DerivedBy(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlSchemaDatatype}
	get Datatype(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsMixed(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Boolean} value
	set IsMixed( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlTypeCode}
	get TypeCode(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlQualifiedName} qualifiedName
	//** @returns{XmlSchemaSimpleType}
	GetBuiltInSimpleType : function( qualifiedName ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlTypeCode} typeCode
	//** @returns{XmlSchemaSimpleType}
	GetBuiltInSimpleType : function( typeCode ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlTypeCode} typeCode
	//** @returns{XmlSchemaComplexType}
	GetBuiltInComplexType : function( typeCode ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlQualifiedName} qualifiedName
	//** @returns{XmlSchemaComplexType}
	GetBuiltInComplexType : function( qualifiedName ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlSchemaType} derivedType
	//** @param{XmlSchemaType} baseType
	//** @param{XmlSchemaDerivationMethod} except
	//** @returns{Boolean}
	IsDerivedFrom : function( derivedType, baseType, except ){
		throw new NotImplementedException( arguments.callee.name );
	}

}




//** @base{XmlSchemaType}
function XmlSchemaSimpleType( parentObject, e4xSchemaElem ){
	return XmlSchemaType.call( this, parentObject, e4xSchemaElem );
};
XmlSchemaSimpleType.prototype = {
	__proto__ : XmlSchemaType.prototype,
	
	constructor : XmlSchemaSimpleType,
	
	//** @returns{XmlSchemaSimpleTypeContent}
	get Content(){
		if ( this._schemaElem.XSD_NS::list != undefined )	{
			return new XmlSchemaSimpleTypeList( this, this._schemaElem.XSD_NS::list );
		}
		else if ( this._schemaElem.XSD_NS::restriction != undefined )	{
			return new XmlSchemaSimpleTypeRestriction( this, this._schemaElem.XSD_NS::restriction );
		}
		else if ( this._schemaElem.XSD_NS::union != undefined )	{
			return new XmlSchemaSimpleTypeUnion( this, this._schemaElem.XSD_NS::union );
		}
		else	{
			return null; 
		}
	},

	//** @param{XmlSchemaSimpleTypeContent} value
	set Content( value ){
		throw new NotImplementedException( arguments.callee.name );
	}

}



//** @base{XmlSchemaAnnotated}
XmlSchemaSimpleTypeContent = {
	__proto__ : XmlSchemaAnnotated.prototype
}




function XmlSchemaSimpleTypeList(){

};
//** @base{XmlSchemaSimpleTypeContent}
XmlSchemaSimpleTypeList.prototype = {
	__proto__ : XmlSchemaSimpleTypeContent,

	//** @returns{XmlSchemaSimpleTypeList}
	constructor : XmlSchemaSimpleTypeList,


	//** @returns{XmlQualifiedName}
	get ItemTypeName(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlQualifiedName} value
	set ItemTypeName( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlSchemaSimpleType}
	get ItemType(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlSchemaSimpleType} value
	set ItemType( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlSchemaSimpleType}
	get BaseItemType(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlSchemaSimpleType} value
	set BaseItemType( value ){
		throw new NotImplementedException( arguments.callee.name );
	}

}




function XmlSchemaSimpleTypeRestriction(){

};
//** @base{XmlSchemaSimpleTypeContent}
XmlSchemaSimpleTypeRestriction.prototype = {
	__proto__ : XmlSchemaSimpleTypeContent,

	//** @returns{XmlSchemaSimpleTypeRestriction}
	constructor : XmlSchemaSimpleTypeRestriction,


	//** @returns{XmlQualifiedName}
	get BaseTypeName(){
		var base = this._schemaElem.@base;
		if( base > "" )	{
			// Expecting a QName string
			var qn = base.split( ":" );
			return new System.Xml.XmlQualifiedName( qn[ 1 ], this._schemaElem.namespace( qn[ 0 ] ) );
		}
		else	{
			return null;
		}
	},

	//** @param{XmlQualifiedName} value
	set BaseTypeName( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlSchemaSimpleType}
	get BaseType(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlSchemaSimpleType} value
	set BaseType( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlSchemaObjectCollection}
	get Facets(){
		throw new NotImplementedException( arguments.callee.name );
	}

}




function XmlSchemaSimpleTypeUnion(){

};
//** @base{XmlSchemaSimpleTypeContent}
XmlSchemaSimpleTypeUnion.prototype = {
	__proto__ : XmlSchemaSimpleTypeContent,

	//** @returns{XmlSchemaSimpleTypeUnion}
	constructor : XmlSchemaSimpleTypeUnion,


	//** @returns{XmlSchemaObjectCollection}
	get BaseTypes(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Array}
	get MemberTypes(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} value
	set MemberTypes( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Array}
	get BaseMemberTypes(){
		throw new NotImplementedException( arguments.callee.name );
	}

}




//** @base{XmlSchemaType}
function XmlSchemaComplexType( parentObject, e4xSchemaElem ){
	return XmlSchemaType.call( this, parentObject, e4xSchemaElem );
};
XmlSchemaComplexType.prototype = {
	__proto__ : XmlSchemaType.prototype,
	
	constructor : XmlSchemaComplexType,
	
	//** @returns{Boolean}
	get IsAbstract(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Boolean} value
	set IsAbstract( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlSchemaDerivationMethod}
	get Block(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlSchemaDerivationMethod} value
	set Block( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsMixed(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Boolean} value
	set IsMixed( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlSchemaContentModel}
	get ContentModel(){
		if ( this._schemaElem.XSD_NS::complexContent != undefined )	{
			return new XmlSchemaComplexContent( this, this._schemaElem.XSD_NS::complexContent );
		}
		else if ( this._schemaElem.XSD_NS::simpleContent != undefined )	{
			return new XmlSchemaSimpleContent( this, this._schemaElem.XSD_NS::simpleContent );
		}
		else	{
			return null; 
		}
	},

	//** @param{XmlSchemaContentModel} value
	set ContentModel( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlSchemaParticle}
	get Particle(){
		if ( this._schemaElem.XSD_NS::sequence != undefined )	{
			return new XmlSchemaSequence( this, this._schemaElem.XSD_NS::sequence );
		}
		else if ( this._schemaElem.XSD_NS::choice != undefined )	{
			return new XmlSchemaChoice( this, this._schemaElem.XSD_NS::choice );
		}
		else if ( this._schemaElem.XSD_NS::group != undefined )	{
			return new XmlSchemaGroupRef( this, this._schemaElem.XSD_NS::group );
		}
		else if ( this._schemaElem.XSD_NS::all != undefined )	{
			return new XmlSchemaAll( this, this._schemaElem.XSD_NS::all );
		}
		else	{
			return null; 
		}
	},

	//** @param{XmlSchemaParticle} value
	set Particle( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlSchemaObjectCollection}
	get Attributes(){
		return new XmlSchemaObjectCollection( this, this._schemaElem.XSD_NS::attribute );
	},

	//** @returns{XmlSchemaAnyAttribute}
	get AnyAttribute(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlSchemaAnyAttribute} value
	set AnyAttribute( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlSchemaContentType}
	get ContentType(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlSchemaParticle}
	get ContentTypeParticle(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlSchemaDerivationMethod}
	get BlockResolved(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlSchemaObjectTable}
	get AttributeUses(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlSchemaAnyAttribute}
	get AttributeWildcard(){
		throw new NotImplementedException( arguments.callee.name );
	}

}





//** @base{XmlSchemaAnnotated}
XmlSchemaContentModel = {
	__proto__ : XmlSchemaAnnotated.prototype,

	//** @returns{XmlSchemaContentModel}
	constructor : function XmlSchemaContentModel(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlSchemaContent}
	get Content(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlSchemaContent} value
	set Content( value ){
		throw new NotImplementedException( arguments.callee.name );
	}

}



//** @base{XmlSchemaContentModel}
function XmlSchemaComplexContent( parentObject, e4xSchemaElem ){
	XmlSchemaAnnotated.call( this, parentObject, e4xSchemaElem );
};
XmlSchemaComplexContent.prototype = {
	__proto__ : XmlSchemaContentModel,

	//** @returns{XmlSchemaComplexContent}
	constructor : XmlSchemaComplexContent,


	//** @returns{Boolean}
	get IsMixed(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Boolean} value
	set IsMixed( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlSchemaContent}
	get Content(){
		if ( this._schemaElem.XSD_NS::extension != undefined )	{
			return new XmlSchemaComplexContentExtension( this, this._schemaElem.XSD_NS::extension );
		}
		else if ( this._schemaElem.XSD_NS::restriction != undefined )	{
			return new XmlSchemaComplexContentRestriction( this, this._schemaElem.XSD_NS::restriction );
		}
		else	{
			return null; 
		}
	},

	//** @param{XmlSchemaContent} value
	set Content( value ){
		throw new NotImplementedException( arguments.callee.name );
	}

}




//** @base{XmlSchemaAnnotated}
XmlSchemaContent = {
	__proto__ : XmlSchemaAnnotated.prototype
}




//** @returns{XmlSchemaSimpleContentExtension}
function XmlSchemaSimpleContentExtension( parentObject, e4xSchemaElem ){
	XmlSchemaAnnotated.call( this, parentObject, e4xSchemaElem );
};
//** @base{XmlSchemaContent}
XmlSchemaSimpleContentExtension.prototype = {
	__proto__ : XmlSchemaContent,

	//** @returns{XmlSchemaSimpleContentExtension}
	constructor : XmlSchemaSimpleContentExtension,

	//** @returns{XmlQualifiedName}
	get BaseTypeName(){
		var base = this._schemaElem.@base;
		if( base > "" )	{
			// Expecting a QName string
			var qn = base.split( ":" );
			return new System.Xml.XmlQualifiedName( qn[ 1 ], this._schemaElem.namespace( qn[ 0 ] ) );
		}
		else	{
			return null;
		}
	},

	//** @param{XmlQualifiedName} value
	set BaseTypeName( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlSchemaObjectCollection}
	get Attributes(){
		return new XmlSchemaObjectCollection( this, this._schemaElem.XSD_NS::attribute );
	},

	//** @returns{XmlSchemaAnyAttribute}
	get AnyAttribute(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlSchemaAnyAttribute} value
	set AnyAttribute( value ){
		throw new NotImplementedException( arguments.callee.name );
	}

}




//** @returns{XmlSchemaSimpleContentRestriction}
function XmlSchemaSimpleContentRestriction( parentObject, e4xSchemaElem ){
	XmlSchemaAnnotated.call( this, parentObject, e4xSchemaElem );
};
//** @base{XmlSchemaContent}
XmlSchemaSimpleContentRestriction.prototype = {
	__proto__ : XmlSchemaContent,

	//** @returns{XmlSchemaSimpleContentRestriction}
	constructor : XmlSchemaSimpleContentRestriction,


	//** @returns{XmlQualifiedName}
	get BaseTypeName(){
		var base = this._schemaElem.@base;
		if( base > "" )	{
			// Expecting a QName string
			var qn = base.split( ":" );
			return new System.Xml.XmlQualifiedName( qn[ 1 ], this._schemaElem.namespace( qn[ 0 ] ) );
		}
		else	{
			return null;
		}
	},

	//** @param{XmlQualifiedName} value
	set BaseTypeName( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlSchemaSimpleType}
	get BaseType(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlSchemaSimpleType} value
	set BaseType( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlSchemaObjectCollection}
	get Facets(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlSchemaObjectCollection}
	get Attributes(){
		return new XmlSchemaObjectCollection( this, this._schemaElem.XSD_NS::attribute );
	},

	//** @returns{XmlSchemaAnyAttribute}
	get AnyAttribute(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlSchemaAnyAttribute} value
	set AnyAttribute( value ){
		throw new NotImplementedException( arguments.callee.name );
	}

}



//** @returns{XmlSchemaComplexContentExtension}
function XmlSchemaComplexContentExtension( parentObject, e4xSchemaElem ){
	XmlSchemaAnnotated.call( this, parentObject, e4xSchemaElem );
};
//** @base{XmlSchemaContent}
XmlSchemaComplexContentExtension.prototype = {
	__proto__ : XmlSchemaContent,

	//** @returns{XmlSchemaComplexContentExtension}
	constructor : XmlSchemaComplexContentExtension,

	//** @returns{XmlQualifiedName}
	get BaseTypeName(){
		var base = this._schemaElem.@base;
		if ( base > "" )	{
			// Expecting a QName string
			var qn = base.split( ":" );
			return new System.Xml.XmlQualifiedName( qn[ 1 ], this._schemaElem.namespace( qn[ 0 ] ) );
		}
		else	{
			return null;
		}
	},

	//** @param{XmlQualifiedName} value
	set BaseTypeName( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlSchemaParticle}
	get Particle(){
		if ( this._schemaElem.XSD_NS::sequence != undefined )	{
			return new XmlSchemaSequence( this, this._schemaElem.XSD_NS::sequence );
		}
		else if ( this._schemaElem.XSD_NS::choice != undefined )	{
			return new XmlSchemaChoice( this, this._schemaElem.XSD_NS::choice );
		}
		else if ( this._schemaElem.XSD_NS::group != undefined )	{
			return new XmlSchemaGroupRef( this, this._schemaElem.XSD_NS::group );
		}
		else if ( this._schemaElem.XSD_NS::all != undefined )	{
			return new XmlSchemaAll( this, this._schemaElem.XSD_NS::all );
		}
		else	{
			return null; 
		}
	},

	//** @param{XmlSchemaParticle} value
	set Particle( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlSchemaObjectCollection}
	get Attributes(){
		return new XmlSchemaObjectCollection( this, this._schemaElem.XSD_NS::attribute );
	},

	//** @returns{XmlSchemaAnyAttribute}
	get AnyAttribute(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlSchemaAnyAttribute} value
	set AnyAttribute( value ){
		throw new NotImplementedException( arguments.callee.name );
	}

}




//** @returns{XmlSchemaComplexContentRestriction}
function XmlSchemaComplexContentRestriction( parentObject, e4xSchemaElem ){
	XmlSchemaAnnotated.call( this, parentObject, e4xSchemaElem );
};
//** @base{XmlSchemaContent}
XmlSchemaComplexContentRestriction.prototype = {
	__proto__ : XmlSchemaContent,

	//** @returns{XmlSchemaComplexContentRestriction}
	constructor : XmlSchemaComplexContentRestriction,


	//** @returns{XmlQualifiedName}
	get BaseTypeName(){
		var base = this._schemaElem.@base;
		if( base > "" )	{
			// Expecting a QName string
			var qn = base.split( ":" );
			return new System.Xml.XmlQualifiedName( qn[ 1 ], this._schemaElem.namespace( qn[ 0 ] ) );
		}
		else	{
			return null;
		}
	},

	//** @param{XmlQualifiedName} value
	set BaseTypeName( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlSchemaParticle}
	get Particle(){
		if ( this._schemaElem.XSD_NS::sequence != undefined )	{
			return new XmlSchemaSequence( this, this._schemaElem.XSD_NS::sequence );
		}
		else if ( this._schemaElem.XSD_NS::choice != undefined )	{
			return new XmlSchemaChoice( this, this._schemaElem.XSD_NS::choice );
		}
		else if ( this._schemaElem.XSD_NS::group != undefined )	{
			return new XmlSchemaGroupRef( this, this._schemaElem.XSD_NS::group );
		}
		else if ( this._schemaElem.XSD_NS::all != undefined )	{
			return new XmlSchemaAll( this, this._schemaElem.XSD_NS::all );
		}
		else	{
			return null; 
		}
	},

	//** @param{XmlSchemaParticle} value
	set Particle( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlSchemaObjectCollection}
	get Attributes(){
		return new XmlSchemaObjectCollection( this, this._schemaElem.XSD_NS::attribute );
	},

	//** @returns{XmlSchemaAnyAttribute}
	get AnyAttribute(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlSchemaAnyAttribute} value
	set AnyAttribute( value ){
		throw new NotImplementedException( arguments.callee.name );
	}

}





function XmlSchemaSimpleContent( parentObject, e4xSchemaElem ){
	XmlSchemaAnnotated.call( this, parentObject, e4xSchemaElem );
};
//** @base{XmlSchemaContentModel}
XmlSchemaSimpleContent.prototype = {
	__proto__ : XmlSchemaContentModel,

	//** @returns{XmlSchemaSimpleContent}
	constructor : XmlSchemaSimpleContent,


	//** @returns{XmlSchemaContent}
	get Content(){
		if ( this._schemaElem.XSD_NS::extension != undefined )	{
			return new XmlSchemaSimpleContentExtension( this, this._schemaElem.XSD_NS::extension );
		}
		else if ( this._schemaElem.XSD_NS::restriction != undefined )	{
			return new XmlSchemaSimpleContentRestriction( this, this._schemaElem.XSD_NS::restriction );
		}
		else	{
			return null; 
		}
	},

	//** @param{XmlSchemaContent} value
	set Content( value ){
		throw new NotImplementedException( arguments.callee.name );
	}

}







//** @base{XmlSchemaAnnotated}
function XmlSchemaGroup( parentObject, e4xSchemaElem ){
	return XmlSchemaAnnotated.call( this, parentObject, e4xSchemaElem );
};
XmlSchemaGroup.prototype = {
	__proto__ : XmlSchemaAnnotated.prototype,
	
	constructor : XmlSchemaGroup,
	
	//** @returns{String}
	get Name(){
		return this._schemaElem.@name;
	},

	//** @param{String} value
	set Name( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlSchemaGroupBase}
	get Particle(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlSchemaGroupBase} value
	set Particle( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlQualifiedName}
	get QualifiedName(){
		throw new NotImplementedException( arguments.callee.name );
	}

}



//** @returns{XmlSchemaNotation}
function XmlSchemaNotation( parentObject, e4xSchemaElem ){
	return XmlSchemaAnnotated.call( this, parentObject, e4xSchemaElem );
};
//** @base{XmlSchemaAnnotated}
XmlSchemaNotation.prototype = {
	__proto__ : XmlSchemaAnnotated.prototype,
	
	constructor : XmlSchemaNotation,
	
	//** @returns{String}
	get Name(){
		return this._schemaElem.@name;
	},

	//** @param{String} value
	set Name( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get Public(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} value
	set Public( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get System(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} value
	set System( value ){
		throw new NotImplementedException( arguments.callee.name );
	}

}



//** @returns{XmlSchemaParticle}
function XmlSchemaParticle( parentObject, e4xSchemaElem )	{
	return XmlSchemaAnnotated.call( this, parentObject, e4xSchemaElem );
}

//** @base{XmlSchemaAnnotated}
XmlSchemaParticle.prototype = {
	__proto__ : XmlSchemaAnnotated.prototype,	
	
	constructor : XmlSchemaParticle,
	
	//** @returns{String}
	get MinOccursString(){
		return this._schemaElem.@minOccurs || "";
	},

	//** @param{String} value
	set MinOccursString( value ){
		this._schemaElem.@minOccurs = value;
	},

	//** @returns{String}
	get MaxOccursString(){
		return this._schemaElem.@maxOccurs || "";
	},

	//** @param{String} value
	set MaxOccursString( value ){
		this._schemaElem.@maxOccurs = value;
	},

	//** @returns{Decimal}
	get MinOccurs(){
		var occurs = this.MinOccursString;
		if ( occurs >= 0 )	{
			return occurs
		}
		else	{
			return 0;
		}
	},

	//** @param{Decimal} value
	set MinOccurs( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Decimal}
	get MaxOccurs(){
		var occurs = this.MaxOccursString;
		if ( occurs >= 0 )	{
			return occurs
		}
		else	{
			return 0;
		}
	},

	//** @param{Decimal} value
	set MaxOccurs( value ){
		throw new NotImplementedException( arguments.callee.name );
	}

}



//** @returns{XmlSchemaElement}
function XmlSchemaElement( parentObject, e4xSchemaElem ){
	return XmlSchemaParticle.call( this, parentObject, e4xSchemaElem );
};
//** @base{XmlSchemaParticle}
XmlSchemaElement.prototype = {
	__proto__ : XmlSchemaParticle.prototype,
	
	constructor : XmlSchemaElement,
	
	//** @returns{Boolean}
	get IsAbstract(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Boolean} value
	set IsAbstract( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlSchemaDerivationMethod}
	get Block(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlSchemaDerivationMethod} value
	set Block( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get DefaultValue(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} value
	set DefaultValue( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlSchemaDerivationMethod}
	get Final(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlSchemaDerivationMethod} value
	set Final( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get FixedValue(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} value
	set FixedValue( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlSchemaForm}
	get Form(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlSchemaForm} value
	set Form( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get Name(){
		return this._schemaElem.@name;
	},

	//** @param{String} value
	set Name( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsNillable(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Boolean} value
	set IsNillable( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlQualifiedName}
	get RefName(){
		var ref = this._schemaElem.@ref;
		if( ref > "" )	{
			// Expecting a QName string
			var qn = ref.split( ":" );
			return new System.Xml.XmlQualifiedName( qn[ 1 ], this._schemaElem.namespace( qn[ 0 ] ) );
		}
		else	{
			return null;
		}
	},

	//** @param{XmlQualifiedName} value
	set RefName( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlQualifiedName}
	get SubstitutionGroup(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlQualifiedName} value
	set SubstitutionGroup( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlQualifiedName}
	get SchemaTypeName(){
		var type = this._schemaElem.@type;
		if( type > "" )	{
			// Expecting a QName string
			var qn = type.split( ":" );
			return new System.Xml.XmlQualifiedName( qn[ 1 ], this._schemaElem.namespace( qn[ 0 ] ) );
		}
		else	{
			return null;
		}
	},

	//** @param{XmlQualifiedName} value
	set SchemaTypeName( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlSchemaType}
	get SchemaType(){
		if( this._schemaElem.XSD_NS::complexType != undefined )	{
			return new XmlSchemaComplexType( this, this._schemaElem.XSD_NS::complexType );
		}
		if( this._schemaElem.XSD_NS::simpleType != undefined )	{
			return new XmlSchemaSimpleType( this, this._schemaElem.XSD_NS::simpleType );
		}
		else	{
			return null;
		}
	},

	//** @param{XmlSchemaType} value
	set SchemaType( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlSchemaObjectCollection}
	get Constraints(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlQualifiedName}
	get QualifiedName(){
		var qn = this.RefName;
		if ( qn == null )	{
			var name = this._schemaElem.@name;
			var ns = this.__xmlSchema.TargetNamespace;
			qn = new System.Xml.XmlQualifiedName( name, ns );
		}
		return qn;
	},

	//** @returns{Object}
	get ElementType(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlSchemaType}
	get ElementSchemaType(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlSchemaDerivationMethod}
	get BlockResolved(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlSchemaDerivationMethod}
	get FinalResolved(){
		throw new NotImplementedException( arguments.callee.name );
	}

}





//** @base{XmlSchemaParticle}
XmlSchemaGroupBase = {
	__proto__ : XmlSchemaParticle.prototype,
	
	//** @returns{XmlSchemaObjectCollection}
	get Items(){
		throw new NotImplementedException( arguments.callee.name );
	}

}


//** @returns{XmlSchemaAll}
function XmlSchemaAll( parentObject, e4xSchemaElem ){
	XmlSchemaParticle.call( this, parentObject, e4xSchemaElem );
};
//** @base{XmlSchemaGroupBase}
XmlSchemaAll.prototype = {
	__proto__ : XmlSchemaGroupBase,
	
	constructor : XmlSchemaAll,
	
	//** @returns{XmlSchemaObjectCollection}
	get Items(){
		return new XmlSchemaObjectCollection( this, this._schemaElem.* );
	}

}



//** @returns{XmlSchemaChoice}
function XmlSchemaChoice( parentObject, e4xSchemaElem ){
	XmlSchemaParticle.call( this, parentObject, e4xSchemaElem );
};
//** @base{XmlSchemaGroupBase}
XmlSchemaChoice.prototype = {
	__proto__ : XmlSchemaGroupBase,

	//** @returns{XmlSchemaChoice}
	constructor : XmlSchemaChoice,

	//** @returns{XmlSchemaObjectCollection}
	get Items(){
		return new XmlSchemaObjectCollection( this, this._schemaElem.* );
	}

}




//** @returns{XmlSchemaSequence}
function XmlSchemaSequence( parentObject, e4xSchemaElem ){
	XmlSchemaParticle.call( this, parentObject, e4xSchemaElem );
};
//** @base{XmlSchemaGroupBase}
XmlSchemaSequence.prototype = {
	__proto__ : XmlSchemaGroupBase,

	//** @returns{XmlSchemaSequence}
	constructor : XmlSchemaSequence,

	//** @returns{XmlSchemaObjectCollection}
	get Items(){
		return new XmlSchemaObjectCollection( this, this._schemaElem.* );
	}

}