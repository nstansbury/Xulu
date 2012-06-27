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


var EXPORTED_SYMBOLS = ["CodeGenerationOptions","XmlSerializer","XmlSerializerNamespaces","XmlSchemas","XmlTypeAttribute","XmlAttributeAttribute","SoapReflectionImporter"] ;

Components.utils.import( "resource://xulu/assemblies/System.jsm" );

System.Import( "System.Xml.Schema" );
System.Import( "System.Collections" );


//** @base{Enum}
CodeGenerationOptions = {
	EnableDataBinding : 0x10,
    GenerateNewAsync : 2,
    GenerateOldAsync : 4,
    GenerateOrder : 8,
    GenerateProperties : 1,
    None : 0
}



//** @base{Object}
XmlSerializer = {
	__proto__ : System.Object.prototype,
	
	//** @param{Type} type
	//** @param{XmlTypeMapping} type
	//** @param{string} defaultNamespace
	//** @returns{XmlSerializer}
	constructor : function XmlSerializer( type, defaultNamespace ){
		if ( type.__isType__( XmlTypeMapping ) )	{
			this.__xmlMapping = type;
		}
		else	{
			this.__type = type;
		}
	},
	
	//** @param{TextWriter} textWriter
	//** @param{Object} o
	//** @param{XmlSerializerNamespaces} namespaces
	//** @returns{Void}
	Serialize : function( textWriter, o, namespaces ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Stream} stream
	//** @param{Object} o
	//** @param{XmlSerializerNamespaces} namespaces
	//** @returns{Void}
	Serialize : function( stream, o, namespaces ){
		throw new NotImplementedException( arguments.callee.name );
	},
	
	//** @param{XmlWriter} xmlWriter
	//** @param{Object} o
	//** @param{XmlSerializerNamespaces} namespaces
	//** @param{String} encodingStyle
	//** @param{String} id
	//** @returns{Void}
	Serialize : function( xmlWriter, o, namespaces, encodingStyle, id ){
		//** @bug{} __ignoreType - big hairy hack - needs fixing!!
		//** Writes the element tag as an xsd:type property not an actual element
		var ignoreType = ( this.__xmlMapping.__ignoreType != undefined ) ? this.__xmlMapping.__ignoreType : false;
		if( ignoreType != true )	{
			var ns = this.__xmlMapping.Namespace.split("/");
			xmlWriter.WriteStartElement( ns[ ns.length -1 ], this.__xmlMapping.XsdElementName, this.__xmlMapping.Namespace );
		}
		var properties = o.GetType().GetProperties( System.BindingFlags.Public );
		for( var i=0; i < properties.length; i++ )	{
			var property = properties[ i ];
			if ( ( property.CanRead ) && ( property.CanWrite ) )	{
				var value = property.GetValue();
				if( value != null )	{
					if( typeof( value ) == "object" )	{
						var xmlMapping = new SoapReflectionImporter().ImportTypeMapping( value.GetType() );
						
						//@bug{} *Very very* incorrect way to calculate the ns prefix
						var ns = xmlMapping.Namespace.split("/");
						var prefix = ns[ ns.length -1 ];
						
						xmlMapping.__ignoreType = true;
						xmlWriter.WriteStartElement( prefix, property.Name, xmlMapping.Namespace );
						xmlWriter.WriteAttributeString( "xsd", "type", "http://www.w3.org/2001/XMLSchema", "types:"+xmlMapping.TypeName );
						var serializers = this.FromMappings( [ xmlMapping ] );
						serializers[ 0 ].Serialize( xmlWriter, value, namespaces, encodingStyle, id );
					}
					else	{
						var attr = System.Attribute.GetCustomAttribute( property, System.Xml.Serialization.XmlAttributeAttribute, false );
						if( attr )	{
							
							//@bug{} *Very very* incorrect way to calculate the ns prefix
							var ns = attr.Namespace.split("/");
							var prefix = ns[ ns.length -1 ];
							
							xmlWriter.WriteStartElement( prefix, attr.AttributeName, attr.Namespace );
						}
						else	{
							
							//@bug{} *Very very* incorrect way to calculate the ns prefix
							var ns = this.__xmlMapping.Namespace.split("/");
							var prefix = ns[ ns.length -1 ];
							
							xmlWriter.WriteStartElement( prefix, property.Name, this.__xmlMapping.Namespace );
						}
						xmlWriter.WriteValue( value );
					}
					xmlWriter.WriteEndElement();
				}
			}
		}
		
		if( ignoreType != true )	{
			xmlWriter.WriteEndElement();
		}
		
	},

	//** @param{Stream} stream
	//** @returns{Object}
	Deserialize : function( stream ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{TextReader} textReader
	//** @returns{Object}
	Deserialize : function( textReader ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlReader} xmlReader
	//** @returns{Object}
	Deserialize : function( xmlReader ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlReader} xmlReader
	//** @param{XmlDeserializationEvents} events
	//** @returns{Object}
	Deserialize : function( xmlReader, events ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlReader} xmlReader
	//** @param{String} encodingStyle
	//** @returns{Object}
	Deserialize : function( xmlReader, encodingStyle ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlReader} xmlReader
	//** @param{String} encodingStyle
	//** @param{XmlDeserializationEvents} events
	//** @returns{Object}
	Deserialize : function( xmlReader, encodingStyle, events ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlReader} xmlReader
	//** @returns{Boolean}
	CanDeserialize : function( xmlReader ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} mappings
	//** @param{Evidence} evidence
	//** @returns{Array}
	FromMappings : function( mappings, evidence ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} mappings
	//** @param{Type} type
	//** @returns{Array}
	FromMappings : function( mappings, type ){
		var serializers = [];
		for( var i = 0; i < mappings.length; i++ )	{
			var serializer = new System.Object( XmlSerializer );
			serializer.constructor( mappings[ i ] );
			serializers.push( serializer );
		}
		return serializers;
	},
	
	//** @param{Array} types
	//** @param{Array} mappings
	//** @returns{Assembly}
	GenerateSerializer : function( types, mappings ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} types
	//** @param{Array} mappings
	//** @param{CompilerParameters} parameters
	//** @returns{Assembly}
	GenerateSerializer : function( types, mappings, parameters ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} types
	//** @returns{Array}
	FromTypes : function( types ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Type} type
	//** @returns{String}
	GetXmlSerializerAssemblyName : function( type ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Type} type
	//** @param{String} defaultNamespace
	//** @returns{String}
	GetXmlSerializerAssemblyName : function( type, defaultNamespace ){
		throw new NotImplementedException( arguments.callee.name );
	}

}





//** @param{SoapAttributeOverrides} attributeOverrides
//** @param{string} defaultNamespace
//** @returns{SoapReflectionImporter}
function SoapReflectionImporter( attributeOverrides, defaultNamespace ){

};
//** @base{Object}
SoapReflectionImporter.prototype = {
	__proto__ : System.Object.prototype,
	
	constructor : SoapReflectionImporter,

	//** @param{ICustomAttributeProvider} provider
	//** @returns{Void}
	IncludeTypes : function( provider ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Type} type
	//** @returns{Void}
	IncludeType : function( type ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Type} type
	//** @param{String} defaultNamespace
	//** @returns{XmlTypeMapping}
	ImportTypeMapping : function( type, defaultNamespace ){
		// Find the XmlTypeMapping for this type (not inherited types);
		var xmlTypes = type.GetCustomAttributes( XmlTypeAttribute, false );
		for ( var i = 0; i < xmlTypes.length; i++ )	{
			if ( xmlTypes[ i ].TypeName == type.Name )	{
				return new XmlTypeMapping( type, xmlTypes[ i ], ( xmlTypes[i].Namespace != "" ) ? xmlTypes[i].Namespace : defaultNamespace );
			}
		}
		if ( xmlTypes[ 0 ] != undefined )	{
			return new XmlTypeMapping( type, xmlTypes[ 0 ], ( xmlTypes[i].Namespace != "" ) ? xmlTypes[i].Namespace : defaultNamespace );
		}
		else	{
			//** @bug{} We should probably should throw an exception here??
			Console.WriteLine( "XmlTypeAttribute Missing: "+type.Name );
			return null;
		}
		
	},

	//** @param{String} elementName
	//** @param{String} ns
	//** @param{Array} members
	//** @returns{XmlMembersMapping}
	ImportMembersMapping : function( elementName, ns, members ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} elementName
	//** @param{String} ns
	//** @param{Array} members
	//** @param{Boolean} hasWrapperElement
	//** @param{Boolean} writeAccessors
	//** @returns{XmlMembersMapping}
	ImportMembersMapping : function( elementName, ns, members, hasWrapperElement, writeAccessors ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} elementName
	//** @param{String} ns
	//** @param{Array} members
	//** @param{Boolean} hasWrapperElement
	//** @param{Boolean} writeAccessors
	//** @param{Boolean} validate
	//** @returns{XmlMembersMapping}
	ImportMembersMapping : function( elementName, ns, members, hasWrapperElement, writeAccessors, validate ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} elementName
	//** @param{String} ns
	//** @param{Array} members
	//** @param{Boolean} hasWrapperElement
	//** @param{Boolean} writeAccessors
	//** @param{Boolean} validate
	//** @param{XmlMappingAccess} access
	//** @returns{XmlMembersMapping}
	ImportMembersMapping : function( elementName, ns, members, hasWrapperElement, writeAccessors, validate, access ){
		throw new NotImplementedException( arguments.callee.name );
	}

}



//** @base{Object}
XmlMapping = {
	__proto__ : System.Object.prototype,
	
	//** @returns{XmlMapping}
	constructor : function XmlMapping( type, xmltype, namespace ){
		this.__type = type;
		this.__xmltype = xmltype;
		this.__Namespace = namespace || xmltype.Namespace;
	},

	//** @returns{String}
	get ElementName(){
		return this.__type.Name;
	},

	//** @returns{String}
	get XsdElementName(){
		return this.__xmltype.TypeName;
	},

	//** @returns{String}
	get Namespace(){
		return this.__Namespace;
	},

	//** @param{String} key
	//** @returns{Void}
	SetKey : function( key ){
		throw new NotImplementedException( arguments.callee.name );
	}

}

//** Maps a .NET Type to an XML Schema Type
//** @returns{XmlTypeMapping}
function XmlTypeMapping( type, xmltype, namespace ){
	XmlMapping.constructor.call( this, type, xmltype, namespace );
};
//** @base{XmlMapping}
XmlTypeMapping.prototype = {
	__proto__ : XmlMapping,

	constructor : XmlTypeMapping,

	//** @returns{String}
	get TypeName(){
		return this.__type.Name;
	},

	//** @returns{String}
	get TypeFullName(){
		//** Full .NET namespace
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get XsdTypeName(){
		return this.__xmltype.TypeName;
	},

	//** @returns{String}
	get XsdTypeNamespace(){
		return this.__Namespace;
	}

}


//** @param{Object} target
//** @param{Object} args
//** @returns{XmlTypeAttribute}
function XmlTypeAttribute( target, args ) {
	if ( !target )	{
		throw new ArgumentNullException( "Attribute target cannot be NULL" );
	}
	if ( this instanceof arguments.callee )	{
		System.Attribute.constructor.call( this );
		this._Apply( target );
		return;
	}
	
	var attribute = new XmlTypeAttribute( target );
	attribute.AnonymousType = "AnonymousType" in args ? args.AnonymousType : false;
	attribute.IncludeInSchema = "IncludeInSchema" in args ? args.IncludeInSchema : true;
	attribute.TypeName = "TypeName" in args ? args.TypeName : target.GetType().Name;
	attribute.Namespace = "Namespace" in args ? args.Namespace : "";
};

//** @base{Attribute}
XmlTypeAttribute.prototype = {
	__proto__ : System.Attribute,
	
	constructor : XmlTypeAttribute,

	//** @returns{Boolean}
	get AnonymousType(){
		return this.__AnonymousType;
	},

	//** @param{Boolean} value
	set AnonymousType( value ){
		this.__AnonymousType = value;
	},

	//** @returns{Boolean}
	get IncludeInSchema(){
		return this.__IncludeInSchema;
	},

	//** @param{Boolean} value
	set IncludeInSchema( value ){
		this.__IncludeInSchema = value;
	},

	//** @returns{String}
	get TypeName(){
		return this.__TypeName;
	},

	//** @param{String} value
	set TypeName( value ){
		this.__TypeName = value;
	},

	//** @returns{String}
	get Namespace(){
		return this.__Namespace;
	},

	//** @param{String} value
	set Namespace( value ){
		this.__Namespace = value;
	}

}

System.AttributeUsageAttribute( XmlTypeAttribute.prototype, System.AttributeTargets.Class );


//** @param{Object} target
//** @param{Object} args
//** @returns{XmlAttributeAttribute}
function XmlAttributeAttribute( target, args ) {
	if ( !target )	{
		throw new ArgumentNullException( "Attribute target cannot be NULL" );
	}
	if ( this instanceof arguments.callee )	{
		System.Attribute.constructor.call( this );
		this._Apply( target );
		return;
	}
	
	var attribute = new XmlAttributeAttribute( target );
	attribute.AttributeName = "AttributeName" in args ? args.AttributeName : target.GetType().Name;
	attribute.Namespace = "Namespace" in args ? args.Namespace : "";
};
//** @base{Attribute}
XmlAttributeAttribute.prototype = {
	__proto__ : System.Attribute,

	//** @returns{XmlAttributeAttribute}
	constructor : XmlAttributeAttribute,


	//** @returns{Type}
	get Type(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Type} value
	set Type( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get AttributeName(){
		return this.__AttributeName;
	},

	//** @param{String} value
	set AttributeName( value ){
		this.__AttributeName = value;
	},

	//** @returns{String}
	get Namespace(){
		return this.__Namespace;
	},

	//** @param{String} value
	set Namespace( value ){
		this.__Namespace = value;
	},

	//** @returns{String}
	get DataType(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} value
	set DataType( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlSchemaForm}
	get Form(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlSchemaForm} value
	set Form( value ){
		throw new NotImplementedException( arguments.callee.name );
	}

}

System.AttributeUsageAttribute( XmlAttributeAttribute, System.AttributeTargets.Property );


//** @returns{XmlSchemas}
function XmlSchemas( array ){
	if( !array )	{
		array = new XMLList();
	}
	return System.Collections.CollectionBase.call( this, array );
};
//** @base{CollectionBase}
XmlSchemas.prototype = {
	__proto__ : System.Collections.CollectionBase.prototype,
	
	constructor : XmlSchemas,
	
	//** @returns{XmlSchema}
	Item : function( value ){	// value is namespace
		if ( typeof( value ) == "string" )		{
			var e4xSchema = this._array.( @targetNamespace == value );
		}
		else	{
			var e4xSchema = this._array[ value ];
		}
		var schema = new System.Object( System.Xml.Schema.XmlSchema );
		schema.constructor( e4xSchema );
		schema.SourceUri = e4xSchema.@SourceUri;
		return schema;
	},

	//** @returns{Boolean}
	get IsCompiled(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} ns
	//** @returns{IList}
	GetSchemas : function( ns ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlSchema} schema
	//** @param{Uri} baseUri
	//** @returns{Int32}
	Add : function( schema, baseUri ){
		var pos = ( this._array.length() == 0 ) ? 0 : this._array.length();
		// Because we unwrap the Schema object we lose the SourceUri
		//** @bug{} We shouldn't be doing this - may overwrite a real Schema attribute
		schema._schemaElem.@SourceUri = schema.SourceUri;
		this._array[ pos ] = schema._schemaElem;
		return pos;
	},

	//** @param{XmlSchemas} schemas
	//** @returns{Void}
	Add_schemas : function( schemas ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlSchema} schema
	//** @returns{Void}
	AddReference : function( schema ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} index
	//** @param{XmlSchema} schema
	//** @returns{Void}
	Insert : function( index, schema ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlSchema} schema
	//** @returns{Int32}
	IndexOf : function( schema ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlSchema} schema
	//** @returns{Boolean}
	Contains : function( schema ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} targetNamespace
	//** @returns{Boolean}
	Contains : function( targetNamespace ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlSchema} schema
	//** @returns{Void}
	Remove : function( schema ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} array
	//** @param{Int32} index
	//** @returns{Void}
	CopyTo : function( array, index ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlQualifiedName} name
	//** @param{Type} type
	//** @returns{Object}
	Find : function( name, type ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlSchema} schema
	//** @returns{Boolean}
	IsDataSet : function( schema ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{ValidationEventHandler} handler
	//** @param{Boolean} fullCompile
	//** @returns{Void}
	Compile : function( handler, fullCompile ){
		throw new NotImplementedException( arguments.callee.name );
	}

}


//** @base{Object}
function XmlSerializerNamespaces( e4XElement ){
	this._xmlElement = e4XElement;
	this._namespaces = e4XElement.namespaceDeclarations();
};
XmlSerializerNamespaces.prototype = {
	__proto__ : System.Object.prototype,
	
	constructor : XmlSerializerNamespaces,
	
	//** @returns{Int32}
	get Count(){
		return this._namespaces.length;
	},

	//** @param{String} prefix
	//** @param{String} ns
	//** @returns{Void}
	Add : function( prefix, ns ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Array}
	ToArray : function(){
		var array = [];
		for( var i = 0; i < this._namespaces.length; i++ )	{
			array.push( new System.Xml.XmlQualifiedName( this._namespaces[ i ].prefix, this._namespaces[ i ].uri ) );
		}
		return array;
	}

}