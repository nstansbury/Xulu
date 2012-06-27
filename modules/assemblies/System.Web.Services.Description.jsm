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


var EXPORTED_SYMBOLS = ["ServiceDescription", "ServiceDescriptionCollection", "ServiceDescriptionImporter", "SoapBindingStyle", "SoapBindingUse","SoapHeaderBinding","SoapBodyBinding","SoapOperationBinding"]

Components.utils.import( "resource://xulu/assemblies/System.jsm" );

System.Import( "System.Collections" );
System.Import( "System.Xml" );
System.Import( "System.Xml.Serialization" );

var Mozilla = System.Import( "Mozilla.Components" );

const WSDL_NS = new Namespace( "http://schemas.xmlsoap.org/wsdl/" );
const SOAP_NS = new Namespace( "http://schemas.xmlsoap.org/wsdl/soap" );
const XSD_NS = new Namespace( "http://www.w3.org/2001/XMLSchema" );

//** @base{Object}
DocumentableItem = {
	__proto__ : System.Object.prototype,
	
	constructor : function( wsdlElement )	{
		this._wsElement = wsdlElement;
	},
	
	//** @returns{String}
	get Documentation(){
		return this._wsElement.WSDL_NS::Documentation;
	},

	//** @param{String} value
	set Documentation( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlElement}
	get DocumentationElement(){
		return new System.Xml.XmlElement( this._wsElement.WSDL_NS::Documentation );
	},

	//** @param{XmlElement} value
	set DocumentationElement( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Array}
	get ExtensibleAttributes(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} value
	set ExtensibleAttributes( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlSerializerNamespaces}
	get Namespaces(){
		return new System.Xml.Serialization.XmlSerializerNamespaces( this._wsElement );
	},

	//** @param{XmlSerializerNamespaces} value
	set Namespaces( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{ServiceDescriptionFormatExtensionCollection}
	get Extensions(){
		throw new NotImplementedException( arguments.callee.name );
	}

}

//** @base{DocumentableItem}
NamedItem = {
	__proto__ : DocumentableItem,
	
	constructor : function( namedItem )	{
		DocumentableItem.constructor.call( this, namedItem );
	},
	
	//** @returns{String}
	get Name(){
		return this._wsElement.@name.toString();
	},

	//** @param{String} value
	set Name( value ){
		this._wsElement.@name = value || "";
	}

}

//** NB. Class has static methods
//** @base{NamedItem}
ServiceDescription = {
	__proto__ : NamedItem,
	
	Namespace : WSDL_NS,
	
	constructor : function ServiceDescription( definition )	{
		NamedItem.constructor.call( this, definition );
	},
	
	//** @returns{String}
	get RetrievalUrl(){
		return this._RetrievalUrl || "";
	},

	//** @param{String} value
	set RetrievalUrl( value ){
		this._RetrievalUrl = value || "";
	},

	//** @returns{ServiceDescriptionCollection}
	get ServiceDescriptions(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{ServiceDescriptionFormatExtensionCollection}
	get Extensions(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{ImportCollection}
	get Imports(){
		var wsImports = this._wsElement.WSDL_NS::import;
		return new ImportCollection( this, wsImports );
	},

	//** @returns{Types}
	get Types(){
		var wsTypes = this._wsElement.WSDL_NS::types;
		return new Types( this, wsTypes );
	},

	//** @param{Types} value
	set Types( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{MessageCollection}
	get Messages(){
		var wsMessages = this._wsElement.WSDL_NS::message;
		return new MessageCollection( this, wsMessages );
	},

	//** @returns{PortTypeCollection}
	get PortTypes(){
		var wsPortTypes = this._wsElement.WSDL_NS::portType;
		return new PortTypeCollection( this, wsPortTypes );
	},

	//** @returns{BindingCollection}
	get Bindings(){
		var wsBindings = this._wsElement.WSDL_NS::binding;
		return new BindingCollection( this, wsBindings );
	},

	//** @returns{ServiceCollection}
	get Services(){
		var wsServices = this._wsElement.WSDL_NS::service;
		return new ServiceCollection( this, wsServices );
	},

	//** @returns{String}
	get TargetNamespace(){
		return this._wsElement.@targetNamespace.toString();
	},

	//** @param{String} value
	set TargetNamespace( value ){
		this._wsElement.@targetNamespace = value || WSDL_NS;
	},

	//** @returns{XmlSchema}
	get Schema(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{StringCollection}
	get ValidationWarnings(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlSerializer}
	get Serializer(){
		return new System.Xml.Serialization.XmlSerializer( this._wsElement );
	},

	Read : function( wsdlObject, validate )	{
		return this.Read_fileName( wsdlObject, false );
	},

	//** @param{TextReader} textReader
	//** @param{Boolean} validate
	//** @returns{ServiceDescription}
	Read_textReader : function( textReader, validate ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Stream} stream
	//** @param{Boolean} validate
	//** @returns{ServiceDescription}
	Read_stream : function( stream, validate ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} fileName
	//** @param{Boolean} validate
	//** @returns{ServiceDescription}
	Read_fileName : function( fileName, validate ){
		this.RetrievalUrl = fileName;
		var httpRequest = Mozilla.Components.Instance( "@mozilla.org/xmlextras/xmlhttprequest;1", "nsIXMLHttpRequest" );
		httpRequest.open( "GET", fileName, false );
		httpRequest.send();
		// Convert to E4X document
		var xmlSerializer = Mozilla.Components.Instance( "@mozilla.org/xmlextras/xmlserializer;1", "nsIDOMSerializer" );
		
		// E4X doesn't support parsing XML declaration - bug 336551
		var response = httpRequest.responseXML.getElementsByTagNameNS( WSDL_NS ,"definitions" )[0];
		var wsDef = XML( xmlSerializer.serializeToString( response ) );
		var sd = System.Object( this );
		sd.constructor( wsDef );
		return sd;
	},

	//** @param{XmlReader} reader
	//** @param{Boolean} validate
	//** @returns{ServiceDescription}
	Read_xmlReader : function( reader, validate ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlReader} reader
	//** @returns{Boolean}
	CanRead : function( reader ){
		throw new NotImplementedException( arguments.callee.name );
	},

	Write : function( output )	{
		
	},
	
	//** @param{String} fileName
	//** @returns{Void}
	Write_fileName : function( fileName ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{TextWriter} writer
	//** @returns{Void}
	Write_textWriter : function( writer ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Stream} stream
	//** @returns{Void}
	Write_stream : function( stream ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlWriter} writer
	//** @returns{Void}
	Write_xmlWriter : function( writer ){
		throw new NotImplementedException( arguments.callee.name );
	}

}


//** @base{CollectionBase}
function ServiceDescriptionBaseCollection( array ){
	if ( !array )	{
		array = new XMLList();
	}
	System.Collections.CollectionBase.call( this, array );
}
ServiceDescriptionBaseCollection.prototype = {
	__proto__ : System.Collections.CollectionBase.prototype,
	
	constructor : ServiceDescriptionBaseCollection
}




//** @base{ServiceDescriptionBaseCollection}
function ServiceDescriptionCollection( ServiceDescription, wsDefinitions ){
	this._serviceDescription = ServiceDescription;
	ServiceDescriptionBaseCollection.call( this, wsDefinitions );
};
ServiceDescriptionCollection.prototype = {
	__proto__ : ServiceDescriptionBaseCollection.prototype,
	
	constructor : ServiceDescriptionCollection,
	
	//** @param{String} value
	//** @param{Int32} value
	//** @returns{ServiceDescription}
	Item : function( value ){
		if ( typeof( value ) == "string" )		{
			var wsDefinition = this._array.( @targetNamespace == value );
		}
		else	{
			var wsDefinition = this._array[ value ];
		}
		if ( wsDefinition )	{
			var description = System.Object( ServiceDescription );
			description.constructor( wsDefinition );
			return description;
		}
		else	{
			return null;
		}
	},

	//** @param{ServiceDescription} serviceDescription
	//** @returns{Int32}
	Add : function( serviceDescription ){
		var pos = ( this._array.length() == 0 ) ? 0 : this._array.length();
		this._array[ pos ] = serviceDescription._wsElement;
		return pos;
	},

	//** @param{Int32} index
	//** @param{ServiceDescription} serviceDescription
	//** @returns{Void}
	Insert : function( index, serviceDescription ){
		if ( index < this._array.length() )	{
			var before = this._array[ index ];
			this._array.insertChild( before, serviceDescription._wsElement );
		}
		else	{
			this._array.appendChild( serviceDescription._wsElement );
		}
	},

	//** @param{ServiceDescription} serviceDescription
	//** @returns{Int32}
	IndexOf : function( serviceDescription ){
		var wsDefinition = this._array.( @targetNamespace == serviceDescription.TargetNamespace );
		return ( wsDefinition ) ? wsDefinition.childIndex() : null;
	},

	//** @param{ServiceDescription} serviceDescription
	//** @returns{Boolean}
	Contains : function( serviceDescription ){
		var wsDefinition = this._array.( @targetNamespace == serviceDescription.TargetNamespace );
		return ( wsDefinition ) ? true : false;
	},

	//** @param{ServiceDescription} serviceDescription
	//** @returns{Void}
	Remove : function( serviceDescription ){
		var i = this.IndexOf( serviceDescription );
		if ( i )	{
			delete this._array[ i ];
		}
	},

	//** @param{Array} array
	//** @param{Int32} index
	//** @returns{Void}
	CopyTo : function( array, index ){
		for ( var i = index; i < this._array.length(); i++ )	{
			array.push( ServiceDescription.constructor( this._array[ index ] ) );
		}
		return array;
	},

	//** @param{XmlQualifiedName} name
	//** @returns{Message}
	GetMessage : function( name ){
		var wsMessages = this._array.WSDL_NS::message;
		var wsMessage = wsMessages.( @name == name.Name );
		if ( !wsMessage )	{
			return null;
		}
		var wsDefinition = this._array.( @targetNamespace == wsMessage.parent().TargetNamespace );
		var serviceDescription = ServiceDescription.constructor( wsDefinition );
		return new Message( serviceDescription, wsMessage );
	},

	//** @param{XmlQualifiedName} name
	//** @returns{PortType}
	GetPortType : function( name ){
		var wsPortTypes = this._array.WSDL_NS::portType;
		var wsPortType = wsPortTypes.( @name == name.Name );
		if ( !wsPortType )	{
			return null;
		}
		var wsDefinition = this._array.( @targetNamespace == wsPortType.parent().TargetNamespace );
		var serviceDescription = ServiceDescription.constructor( wsDefinition );
		return new PortType( serviceDescription, wsPortType );
	},

	//** @param{XmlQualifiedName} name
	//** @returns{Service}
	GetService : function( name ){
		var wsServices = this._array..WSDL_NS::service;
		var wsService = wsServices.( @name == name.Name );
		if ( !wsService )	{
			return null;
		}
		var wsDefinition = this._array.( @targetNamespace == wsService.parent().TargetNamespace );
		var serviceDescription = ServiceDescription.constructor( wsDefinition );
		return new Service( serviceDescription, wsService );
	},

	//** @param{XmlQualifiedName} name
	//** @returns{Binding}
	GetBinding : function( name ){
		var wsBindings = this._array.WSDL_NS::binding;
		var wsBinding = wsBindings.( @name == name.Name );
		if ( !wsBinding )	{
			return null;
		}
		var wsDefinition = this._array.( @targetNamespace == wsBinding.parent().TargetNamespace );
		var serviceDescription = ServiceDescription.constructor( wsDefinition );
		return new Binding( serviceDescription, wsBinding );
	}

}



//** @base{Enum}
ServiceDescriptionImportStyle = {
    Client : 0,
    Server : 1,
    ServerInterface : 2
}

//** @base{DocumentableItem}
function Types( ServiceDescription, wsTypes ){
	this._ServiceDescription = ServiceDescription;
	DocumentableItem.constructor.call( this, wsTypes );
};
Types.prototype = {
	__proto__ : DocumentableItem,
	
	constructor : Types,
	
	//** @returns{ServiceDescriptionFormatExtensionCollection}
	get Extensions(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlSchemas}
	get Schemas(){		
		var wsSchemas = this._wsElement[0].XSD_NS::schema;
		return new System.Xml.Serialization.XmlSchemas( wsSchemas );
	}

}


//** @returns{Binding}
function Binding( ServiceDescription, wsBinding ){
	this._ServiceDescription = ServiceDescription;
	NamedItem.constructor.call( this, wsBinding );
};
//** @base{NamedItem}
Binding.prototype = {
	__proto__ : NamedItem,
	
	constructor : Binding,
	
	//** @returns{ServiceDescription}
	get ServiceDescription(){
		return this._ServiceDescription;
	},

	//** @returns{ServiceDescriptionFormatExtensionCollection}
	get Extensions(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{OperationBindingCollection}
	get Operations(){
		var wsOperations = this._wsElement.WSDL_NS::operation;
		return new OperationBindingCollection( this, wsOperations );
	},

	//** @returns{XmlQualifiedName}
	get Type(){
		var type = this._wsElement.@type;
		// Expecting a QName string
		var ns = type.split( ":" );
		return new System.Xml.XmlQualifiedName( ns[ 1 ], this._wsElement.namespace( ns[ 0 ] ) );
	},

	//** @param{XmlQualifiedName} value
	set Type( value ){
		throw new NotImplementedException( arguments.callee.name );
	}

}

//** @base{ServiceDescriptionBaseCollection}
function BindingCollection( ServiceDescription, wsBindings ){
	this._serviceDescription = ServiceDescription;
	ServiceDescriptionBaseCollection.call( this, wsBindings );
};
BindingCollection.prototype = {
	__proto__ : ServiceDescriptionBaseCollection.prototype,
	
	constructor : BindingCollection,
	
	//** @returns{Binding}
	Item : function( value ){
		if ( typeof( value ) == "string" )		{
			var wsBinding = this._array.( @name == value );
		}
		else	{
			var wsBinding = this._array[ value ];
		}
		return new Binding( this._serviceDescription, wsBinding );
	},


	//** @param{Binding} binding
	//** @returns{Int32}
	Add : function( binding ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} index
	//** @param{Binding} binding
	//** @returns{Void}
	Insert : function( index, binding ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Binding} binding
	//** @returns{Int32}
	IndexOf : function( binding ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Binding} binding
	//** @returns{Boolean}
	Contains : function( binding ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Binding} binding
	//** @returns{Void}
	Remove : function( binding ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} array
	//** @param{Int32} index
	//** @returns{Void}
	CopyTo : function( array, index ){
		throw new NotImplementedException( arguments.callee.name );
	}

}



//** @base{ServiceDescriptionBaseCollection}
function ServiceCollection( ServiceDescription, wsServices ){
	this._serviceDescription = ServiceDescription;
	ServiceDescriptionBaseCollection.call( this, wsServices );
};
ServiceCollection.prototype = {
	__proto__ : ServiceDescriptionBaseCollection.prototype,
	
	constructor : ServiceCollection,
	
	//** @returns{Service}
	Item : function( value ){
		if ( typeof( value ) == "string" )		{
			var wsService = this._array.( @name == value );
		}
		else	{
			var wsService = this._array[ value ];
		}
		return new Service( this._serviceDescription, wsService );
	},

	//** @param{Service} service
	//** @returns{Int32}
	Add : function( service ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} index
	//** @param{Service} service
	//** @returns{Void}
	Insert : function( index, service ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Service} service
	//** @returns{Int32}
	IndexOf : function( service ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Service} service
	//** @returns{Boolean}
	Contains : function( service ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Service} service
	//** @returns{Void}
	Remove : function( service ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} array
	//** @param{Int32} index
	//** @returns{Void}
	CopyTo : function( array, index ){
		throw new NotImplementedException( arguments.callee.name );
	}

}


//** @returns{Service}
function Service( ServiceDescription, wsService ){
	this._ServiceDescription = ServiceDescription;
	NamedItem.constructor.call( this, wsService );
};
//** @base{NamedItem}
Service.prototype = {
	__proto__ : NamedItem,

	constructor : Service,
	
	//** @returns{ServiceDescription}
	get ServiceDescription(){
		return this._ServiceDescription;
	},

	//** @returns{ServiceDescriptionFormatExtensionCollection}
	get Extensions(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{PortCollection}
	get Ports(){
		var wsPorts = this._wsElement.WSDL_NS::port;
		return new PortCollection( this, wsPorts );
	}

}

//** @returns{PortCollection}
function PortCollection( Service, wsPorts )	{
	this._service = Service;
	ServiceDescriptionBaseCollection.call( this, wsPorts );
}

//** @base{ServiceDescriptionBaseCollection}
PortCollection.prototype = {
	__proto__ : ServiceDescriptionBaseCollection.prototype,
	
	constructor : PortCollection,
	
	//** @returns{Port}
	Item : function( value ){
		if ( typeof( value ) == "string" )		{
			var wsPort = this._array.( @name == value );
		}
		else	{
			var wsPort = this._array[ value ];
		}
		return new Port( this._service, wsPort );
	},

	//** @param{Port} port
	//** @returns{Int32}
	Add : function( port ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} index
	//** @param{Port} port
	//** @returns{Void}
	Insert : function( index, port ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Port} port
	//** @returns{Int32}
	IndexOf : function( port ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Port} port
	//** @returns{Boolean}
	Contains : function( port ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Port} port
	//** @returns{Void}
	Remove : function( port ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} array
	//** @param{Int32} index
	//** @returns{Void}
	CopyTo : function( array, index ){
		throw new NotImplementedException( arguments.callee.name );
	}

}



//** @returns{Port}
function Port( Service, wsPort ){
	this._Service = Service;
	NamedItem.constructor.call( this, wsPort );
}

//** @base{NamedItem}
Port.prototype = {
	__proto__ : NamedItem,

	constructor : Port,
	
	//** @returns{Service}
	get Service(){
		return this._Service;
	},

	//** @returns{ServiceDescriptionFormatExtensionCollection}
	get Extensions(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlQualifiedName}
	get Binding(){	
		var binding = this._wsElement.@binding;
		var ns = binding.split( ":" );
		return new System.Xml.XmlQualifiedName( ns[ 1 ], this._wsElement.namespace( ns[ 0 ] ) );
	},

	//** @param{XmlQualifiedName} value
	set Binding( value ){
		throw new NotImplementedException( arguments.callee.name );
	}

}



//** @base{ServiceDescriptionBaseCollection}
function MessageCollection( serviceDescription, wsMessages ){
	this._serviceDescription = serviceDescription;
	ServiceDescriptionBaseCollection.call( this, wsMessages )
};
MessageCollection.prototype = {
	__proto__ : ServiceDescriptionBaseCollection.prototype,
	
	constructor : MessageCollection,
	
	//** @returns{Message}
	Item : function( value ){
		if ( typeof( value ) == "string" )		{
			var wsMessage = this._array.( @name == value );
		}
		else	{
			var wsMessage = this._array[ value ];
		}
		return new Message( this._serviceDescription, wsMessage );
	},

	//** @param{Message} message
	//** @returns{Int32}
	Add : function( message ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} index
	//** @param{Message} message
	//** @returns{Void}
	Insert : function( index, message ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Message} message
	//** @returns{Int32}
	IndexOf : function( message ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Message} message
	//** @returns{Boolean}
	Contains : function( message ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Message} message
	//** @returns{Void}
	Remove : function( message ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} array
	//** @param{Int32} index
	//** @returns{Void}
	CopyTo : function( array, index ){
		throw new NotImplementedException( arguments.callee.name );
	}

}


//** @base{NamedItem}
function Message( serviceDescription, wsMessage ){
	this._ServiceDescription = serviceDescription;
	NamedItem.constructor.call( this, wsMessage );
};
Message.prototype = {
	__proto__ : NamedItem,
	
	constructor : Message,
	
	//** @returns{ServiceDescriptionFormatExtensionCollection}
	get Extensions(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{ServiceDescription}
	get ServiceDescription(){
		return this._ServiceDescription;
	},

	//** @returns{MessagePartCollection}
	get Parts(){
		var wsMessageParts = this._wsElement.WSDL_NS::part;
		return new MessagePartCollection( this, wsMessageParts );
	},

	//** @param{Array} partNames
	//** @returns{Array}
	FindPartsByName : function( partNames ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} partName
	//** @returns{MessagePart}
	FindPartByName : function( partName ){
		var part = this._wsElement.WSDL_NS::part.( @name == partName );
		return new MessagePart( this, part );
	}

}


//** @returns{MessagePartCollection}
function MessagePartCollection( Message, wsMessageParts )	{
	this._message = Message;
	ServiceDescriptionBaseCollection.call( this, wsMessageParts )
}

//** @base{ServiceDescriptionBaseCollection}
MessagePartCollection.prototype = {
	__proto__ : ServiceDescriptionBaseCollection.prototype,

	constructor : MessagePartCollection,
	
	//** @returns{MessagePart}
	Item : function( value ){
		if ( typeof( value ) == "string" )		{
			var wsMessagePart = this._array.( @name == value );
		}
		else	{
			var wsMessagePart = this._array[ value ];
		}
		return new MessagePart( this._message, wsMessagePart );
	},

	//** @param{MessagePart} messagePart
	//** @returns{Int32}
	Add : function( messagePart ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} index
	//** @param{MessagePart} messagePart
	//** @returns{Void}
	Insert : function( index, messagePart ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{MessagePart} messagePart
	//** @returns{Int32}
	IndexOf : function( messagePart ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{MessagePart} messagePart
	//** @returns{Boolean}
	Contains : function( messagePart ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{MessagePart} messagePart
	//** @returns{Void}
	Remove : function( messagePart ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} array
	//** @param{Int32} index
	//** @returns{Void}
	CopyTo : function( array, index ){
		throw new NotImplementedException( arguments.callee.name );
	}

}


//** @returns{MessagePart}
function MessagePart( Message, wsMessagePart ){
	this._Message = Message;
	NamedItem.constructor.call( this, wsMessagePart );
}
	
//** @base{NamedItem}
MessagePart.prototype = {
	_proto_ : NamedItem,

	constructor : MessagePart,
	
	//** @returns{ServiceDescriptionFormatExtensionCollection}
	get Extensions(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Message}
	get Message(){
		return this._Message;
	},

	//** @returns{XmlQualifiedName}
	get Element(){
		var element = this._wsElement.@element;
		if( element > "" )	{
			var ns = element.split( ":" );
			return new System.Xml.XmlQualifiedName( ns[ 1 ], this._wsElement.namespace( ns[ 0 ] ) );
		}
		else	{
			return null;
		}
	},

	//** @param{XmlQualifiedName} value
	set Element( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{XmlQualifiedName}
	get Type(){
		var type = this._wsElement.@type;
		if( type > "" )	{
			var ns = type.split( ":" );
			return new System.Xml.XmlQualifiedName( ns[ 1 ], this._wsElement.namespace( ns[ 0 ] ) );
		}
		else	{
			return null;
		}
	},

	//** @param{XmlQualifiedName} value
	set Type( value ){
		throw new NotImplementedException( arguments.callee.name );
	}

}


//** @base{ServiceDescriptionBaseCollection}
function ImportCollection( serviceDescription, wsImports ){
	this._serviceDescription = ServiceDescription;
	ServiceDescriptionBaseCollection.call( this, wsImports );
};
ImportCollection.prototype = {
	__proto__ : ServiceDescriptionBaseCollection.prototype,
	
	constructor : ImportCollection,
	
	//** @returns{Import}
	Item : function( value ){
		if ( typeof( value ) == "string" )		{
			var wsImport = this._array.( @name == value );
		}
		else	{
			var wsImport = this._array[ value ];
		}
		return new Import( this._serviceDescription, wsImport );
	},

	//** @param{Import} imports
	//** @returns{Int32}
	Add : function( imports ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} index
	//** @param{Import} imports
	//** @returns{Void}
	Insert : function( index, imports ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Import} imports
	//** @returns{Int32}
	IndexOf : function( imports ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Import} imports
	//** @returns{Boolean}
	Contains : function( imports ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Import} imports
	//** @returns{Void}
	Remove : function( imports ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} array
	//** @param{Int32} index
	//** @returns{Void}
	CopyTo : function( array, index ){
		throw new NotImplementedException( arguments.callee.name );
	}

}


//** @base{DocumentableItem}
function Import( serviceDescription, wsImport ){
	this._ServiceDescription = serviceDescription;
	DocumentableItem.constructor.call( this, wsImport );
};
Import.prototype = {
	__proto__ : DocumentableItem,
	
	constructor : Import,
	
	//** @returns{ServiceDescriptionFormatExtensionCollection}
	get Extensions(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{ServiceDescription}
	get ServiceDescription(){
		return this._ServiceDescription;
	},

	//** @returns{String}
	get Namespace(){
		return this._wsElement.@namespace;
	},

	//** @param{String} value
	set Namespace( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get Location(){
		return this._wsElement.@schemaLocation;
	},

	//** @param{String} value
	set Location( value ){
		throw new NotImplementedException( arguments.callee.name );
	}

}




//** @base{ServiceDescriptionBaseCollection}
function PortTypeCollection( serviceDescription, wsPortTypes ){
	this._serviceDescription = serviceDescription;
	ServiceDescriptionBaseCollection.call( this, wsPortTypes );
};
PortTypeCollection.prototype = {
	__proto__ : ServiceDescriptionBaseCollection.prototype,
	
	constructor : PortTypeCollection,
	
	//** @returns{PortType}
	Item : function( value ){
		if ( typeof( value ) == "string" )		{
			var wsPortType = this._array.( @name == value );
		}
		else	{
			var wsPortType = this._array[ value ];
		}
		return new PortType( this._serviceDescription, wsPortType );
	},

	//** @param{PortType} portType
	//** @returns{Int32}
	Add : function( portType ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} index
	//** @param{PortType} portType
	//** @returns{Void}
	Insert : function( index, portType ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{PortType} portType
	//** @returns{Int32}
	IndexOf : function( portType ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{PortType} portType
	//** @returns{Boolean}
	Contains : function( portType ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{PortType} portType
	//** @returns{Void}
	Remove : function( portType ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} array
	//** @param{Int32} index
	//** @returns{Void}
	CopyTo : function( array, index ){
		throw new NotImplementedException( arguments.callee.name );
	}

}



//** @base{NamedItem}
function PortType( ServiceDescription, wsPortType ){
	this._ServiceDescription = ServiceDescription;
	NamedItem.constructor.call( this, wsPortType );
};
PortType.prototype = {
	__proto__ : NamedItem,
	
	constructor : PortType,
	
	//** @returns{ServiceDescriptionFormatExtensionCollection}
	get Extensions(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{ServiceDescription}
	get ServiceDescription(){
		return this._ServiceDescription;
	},

	//** @returns{OperationCollection}
	get Operations(){
		var wsOperations = this._wsElement.WSDL_NS::operation;
		return new OperationCollection( this, wsOperations );
	}

}


//** @returns{OperationCollection}
function OperationCollection( PortType, wsOperations )	{
	this._portType = PortType;
	ServiceDescriptionBaseCollection.call( this, wsOperations );
}
//** @base{ServiceDescriptionBaseCollection}
OperationCollection.prototype = {
	__proto__ : ServiceDescriptionBaseCollection.prototype,

	constructor : OperationCollection,
	
	//** @param{String} value
	//** @returns{Operation}
	Item : function( value ){
		if ( typeof( value ) == "string" )		{
			var wsOperation = this._array.( @name == value );
		}
		else	{
			var wsOperation = this._array[ value ];
		}
		return new Operation( this._portType, wsOperation );
	},

	//** @param{Operation} operation
	//** @returns{Int32}
	Add : function( operation ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} index
	//** @param{Operation} operation
	//** @returns{Void}
	Insert : function( index, operation ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Operation} operation
	//** @returns{Int32}
	IndexOf : function( operation ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Operation} operation
	//** @returns{Boolean}
	Contains : function( operation ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Operation} operation
	//** @returns{Void}
	Remove : function( operation ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} array
	//** @param{Int32} index
	//** @returns{Void}
	CopyTo : function( array, index ){
		throw new NotImplementedException( arguments.callee.name );
	}

}



//** @returns{Operation}
function Operation( PortType, wsOperation )	{
	this._PortType = PortType;
	NamedItem.constructor.call( this, wsOperation );
}

//** @base{NamedItem}
Operation.prototype = {
	__proto__ : NamedItem,

	constructor : Operation,
	
	//** @returns{ServiceDescriptionFormatExtensionCollection}
	get Extensions(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{PortType}
	get PortType(){
		return this._PortType;
	},

	//** @returns{String}
	get ParameterOrderString(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} value
	set ParameterOrderString( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Array}
	get ParameterOrder(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} value
	set ParameterOrder( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{OperationMessageCollection}
	get Messages(){
		var wsInputMessage = this._wsElement.WSDL_NS::input;
		var wsOutputMessage = this._wsElement.WSDL_NS::ouput;
		var wsOperationMessages = [ wsInputMessage, wsOutputMessage ];
		return new OperationMessageCollection( this, wsOperationMessages );
	},

	//** @returns{OperationFaultCollection}
	get Faults(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{OperationBinding} operationBinding
	//** @returns{Boolean}
	IsBoundBy : function( operationBinding ){
		throw new NotImplementedException( arguments.callee.name );
	}

}


//** @returns{OperationMessageCollection}
function OperationMessageCollection( Operation, wsOperations )	{
	this._operation = Operation;
	ServiceDescriptionBaseCollection.call( this, wsOperations );
}

//** @base{ServiceDescriptionBaseCollection}
OperationMessageCollection.prototype = {
	__proto__ : ServiceDescriptionBaseCollection.prototype,

	constructor : OperationMessageCollection,
	
	//** @param{Int32}
	//** @returns{OperationMessage}
	Item : function( value ){
		var wsOperationMessage = this._array[ value ];
		if ( wsOperationMessage.localName() == "input" )	{
			return new OperationInput( this._operation, wsOperationMessage );
		}
		else if ( wsOperationMessage.localName() == "output" )	{
			return new OperationOutput( this._operation, wsOperationMessage );
		}
		else	{
			throw new ArgumentException( "An OperationMessageCollection can have exactly two members, one an OperationInput and the other an OperationOutput","OperationMessageCollection.Item()" );
		}
	},

	//** @returns{OperationInput}
	get Input(){
		var wsOperationMessage = this._array[ 0 ];
		return new OperationInput( this._operation, wsOperationMessage );
	},

	//** @returns{OperationOutput}
	get Output(){
		var wsOperationMessage = this._array[ 1 ];
		return new OperationOutput( this._operation, wsOperationMessage );
	},

	//** @returns{OperationFlow}
	get Flow(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{OperationMessage} operationMessage
	//** @returns{Int32}
	Add : function( operationMessage ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} index
	//** @param{OperationMessage} operationMessage
	//** @returns{Void}
	Insert : function( index, operationMessage ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{OperationMessage} operationMessage
	//** @returns{Int32}
	IndexOf : function( operationMessage ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{OperationMessage} operationMessage
	//** @returns{Boolean}
	Contains : function( operationMessage ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{OperationMessage} operationMessage
	//** @returns{Void}
	Remove : function( operationMessage ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} array
	//** @param{Int32} index
	//** @returns{Void}
	CopyTo : function( array, index ){
		throw new NotImplementedException( arguments.callee.name );
	}

}


//** @returns{OperationMessage}
function OperationMessage( Operation, wsOperationMessage )	{
	this._Operation = Operation;
	NamedItem.constructor.call( this, wsOperationMessage );
}
//** @base{NamedItem}
OperationMessage.prototype = {
	__proto__ : NamedItem,

	constructor : OperationMessage,
	
	//** @returns{Operation}
	get Operation(){
		return this._Operation;
	},

	//** @returns{XmlQualifiedName}
	get Message(){
		var message = this._wsElement.@message;
		var ns = message.split( ":" );
		return new System.Xml.XmlQualifiedName( ns[ 1 ], this._wsElement.namespace( ns[ 0 ] ) );
	},

	//** @param{XmlQualifiedName} value
	set Message( value ){
		throw new NotImplementedException( arguments.callee.name );
	}

}



//** @returns{OperationInput}
function OperationInput( Operation, wsOperationMessage )	{
	OperationMessage.call( this, Operation, wsOperationMessage );
}
//** @base{OperationMessage}
OperationInput.prototype = {
	__proto__ : OperationMessage,
	
	constructor : OperationInput,
	
	//** @returns{ServiceDescriptionFormatExtensionCollection}
	get Extensions(){
		throw new NotImplementedException( arguments.callee.name );
	}

}


//** @returns{OperationOutput}
function OperationOutput( Operation, wsOperationMessage )	{
	OperationMessage.call( this, Operation, wsOperationMessage );
}
//** @base{OperationMessage}
OperationOutput.prototype = {
	__proto__ : OperationMessage,

	constructor : OperationOutput,
	
	//** @returns{ServiceDescriptionFormatExtensionCollection}
	get Extensions(){
		throw new NotImplementedException( arguments.callee.name );
	}

}



//** @base{ServiceDescriptionBaseCollection}
function OperationBindingCollection( Binding, wsOperations ){
	this._binding = Binding;
	ServiceDescriptionBaseCollection.call( this, wsOperations );
};
OperationBindingCollection.prototype = {
	__proto__ : ServiceDescriptionBaseCollection.prototype,
	
	constructor : OperationBindingCollection,
	
	//** @returns{OperationBinding}
	Item : function( value ){
		if ( typeof( value ) == "string" )		{
			var wsBindingOp = this._array.( @name == value );
		}
		else	{
			var wsBindingOp = this._array[ value ];
		}
		return new OperationBinding( this._binding, wsBindingOp );
	},

	//** @param{OperationBinding} bindingOperation
	//** @returns{Int32}
	Add : function( bindingOperation ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} index
	//** @param{OperationBinding} bindingOperation
	//** @returns{Void}
	Insert : function( index, bindingOperation ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{OperationBinding} bindingOperation
	//** @returns{Int32}
	IndexOf : function( bindingOperation ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{OperationBinding} bindingOperation
	//** @returns{Boolean}
	Contains : function( bindingOperation ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{OperationBinding} bindingOperation
	//** @returns{Void}
	Remove : function( bindingOperation ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} array
	//** @param{Int32} index
	//** @returns{Void}
	CopyTo : function( array, index ){
		throw new NotImplementedException( arguments.callee.name );
	}

}



//** @returns{OperationBinding}
function OperationBinding( binding, wsOperation ){
	this._Binding = binding;
	NamedItem.constructor.call( this, wsOperation );
};
//** @base{NamedItem}
OperationBinding.prototype = {
	__proto__ : NamedItem,
	
	constructor : OperationBinding,
	
	//** @returns{Binding}
	get Binding(){
		return this._Binding;
	},

	//** @returns{ServiceDescriptionFormatExtensionCollection}
	get Extensions(){
		return new ServiceDescriptionFormatExtensionCollection( this, this._wsElement.* );
	},

	//** @returns{InputBinding}
	get Input(){
		var input = this._wsElement.WSDL_NS::input;
		if ( input != undefined )	{
			return new InputBinding( this, input );
		}
		else	{
			return null;
		}
	},

	//** @param{InputBinding} value
	set Input( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{OutputBinding}
	get Output(){
		var output = this._wsElement.WSDL_NS::output;
		if ( output != undefined )	{
			return new OutputBinding( this, output );
		}
		else	{
			return null;
		}
	},

	//** @param{OutputBinding} value
	set Output( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{FaultBindingCollection}
	get Faults(){
		throw new NotImplementedException( arguments.callee.name );
	}

}

	
//** @base{NamedItem}
MessageBinding = {
	__proto__ : NamedItem,
	
	//** @returns{MessageBinding}
	constructor : function( OperationBinding, wsOperation ){
		this._OperationBinding = OperationBinding;
		NamedItem.constructor.call( this, wsOperation );
	},
	
	//** @returns{OperationBinding}
	get OperationBinding(){
		return this._OperationBinding;
	}

}


//** @returns{InputBinding}
function InputBinding( OperationBinding, wsInputOperation )	{
	MessageBinding.constructor.call( this, OperationBinding, wsInputOperation );
}

//** @base{MessageBinding}
InputBinding.prototype = {
	__proto__ : MessageBinding,
	
	constructor : InputBinding,
	
	//** @returns{ServiceDescriptionFormatExtensionCollection}
	get Extensions(){
		return new ServiceDescriptionFormatExtensionCollection( this, this._wsElement.* )
	}

}


//** @returns{OutputBinding}
function OutputBinding( OperationBinding, wsOutputOperation )	{
	MessageBinding.constructor.call( this, OperationBinding, wsOutputOperation );
}

//** @base{MessageBinding}
OutputBinding.prototype = {
	__proto__ : MessageBinding,
	
	constructor : OutputBinding,
	
	//** @returns{ServiceDescriptionFormatExtensionCollection}
	get Extensions(){
		return new ServiceDescriptionFormatExtensionCollection( this, this._wsElement.* )
	}

}





//** @returns{ServiceDescriptionFormatExtensionCollection}
function ServiceDescriptionFormatExtensionCollection( parent, wsElements ){
	this._Parent = parent;
	// iterate only non WSDL elements
	var xmlList = new XMLList();
	for ( var i = 0; i < wsElements.length(); i++ )	{
		if ( wsElements[ i ].namespace() != WSDL_NS )	{
			xmlList += wsElements[ i ];
		}
	}
	ServiceDescriptionBaseCollection.call( this, xmlList );
};
//** @base{ServiceDescriptionBaseCollection}
ServiceDescriptionFormatExtensionCollection.prototype = {
	__proto__ : ServiceDescriptionBaseCollection.prototype,
	
	constructor : ServiceDescriptionFormatExtensionCollection,
	
	//** @returns{Object}
	Item : function( value ){
		if ( typeof( value ) == "number" )		{
			var wsElement = this._array[ value ];
		}
		if ( wsElement )	{
			var name = wsElement.name();
			switch( name.toString() )	{
				case "http://schemas.xmlsoap.org/wsdl/soap/::header" :
					return new SoapHeaderBinding( this._Parent, wsElement );
				case "http://schemas.xmlsoap.org/wsdl/soap/::body" :
					return new SoapBodyBinding( this._Parent, wsElement );
				case "http://schemas.xmlsoap.org/wsdl/soap/::operation" :
					return new SoapOperationBinding( this._Parent, wsElement );
				case "http://schemas.xmlsoap.org/wsdl/soap/::binding" :
					throw new NotImplementedException( arguments.callee.name );
				case "http://schemas.xmlsoap.org/wsdl/soap/::fault" :
					throw new NotImplementedException( arguments.callee.name );
				case "http://schemas.xmlsoap.org/wsdl/soap/::address" :
					throw new NotImplementedException( arguments.callee.name );
				default :
					return new ServiceDescriptionFormatExtension( this._Parent, wsElement );
			}
		}
		else	{
			return null;
		}
	},

	//** @param{Object} extension
	//** @returns{Int32}
	Add : function( extension ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} index
	//** @param{Object} extension
	//** @returns{Void}
	Insert : function( index, extension ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Object} extension
	//** @returns{Int32}
	IndexOf : function( extension ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Object} extension
	//** @returns{Boolean}
	Contains : function( extension ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Object} extension
	//** @returns{Void}
	Remove : function( extension ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} array
	//** @param{Int32} index
	//** @returns{Void}
	CopyTo : function( array, index ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Type} name
	//** @param{String} name
	//** @param{String} ns
	//** @returns{XmlElement}
	Find : function( name, ns ){
		if ( typeof( name ) == "string" )	{
			throw new NotImplementedException( arguments.callee.name );
		}
		else	{
			return this.Find_type( name );
		}
	},

	//** @param{Type} name
	//** @param{String} name
	//** @param{String} ns
	//** @returns{Array}
	FindAll : function( name, ns ){
		if ( typeof( name ) == "string" )	{
			throw new NotImplementedException( arguments.callee.name );
		}
		else	{
			return this.FindAll_type( name );
		}
	},

	//** @param{Type} type
	//** @returns{Object}
	Find_type : function( type ){
		var en = this.GetEnumerator();
		while ( en.MoveNext() )	{
			if ( en.Current.__isType__( type ) )	{
				return en.Current;
			}
		}
		return null;
	},

	//** @param{Type} type
	//** @returns{Array}
	FindAll_type : function( type ){
		var en = this.GetEnumerator();
		var all = [];
		while ( en.MoveNext() )	{
			if ( en.Current.__isType__( type ) )	{
				all.push( en.Current );
			}
		}
		return all;
	},
	
	//** @param{Object} item
	//** @returns{Boolean}
	IsHandled : function( item ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Object} item
	//** @returns{Boolean}
	IsRequired : function( item ){
		throw new NotImplementedException( arguments.callee.name );
	}

}




//** @returns{ServiceDescriptionFormatExtension}
function ServiceDescriptionFormatExtension( parent, wsElement ){
	this._Parent = parent;
	this._wsElement = wsElement;
}
	
//** @base{Object}
ServiceDescriptionFormatExtension.prototype = {
	__proto__ : System.Object.prototype,
	
	constructor : ServiceDescriptionFormatExtension,
	
	//** @returns{Object}
	get Parent(){
		return this._Parent;
	},

	//** @returns{Boolean}
	get Required(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Boolean} value
	set Required( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get Handled(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Boolean} value
	set Handled( value ){
		throw new NotImplementedException( arguments.callee.name );
	}

}


SoapBindingStyle = {
    Default : 0,
    Document : 1,
    Rpc : 2
}


//** @returns{SoapOperationBinding}
function SoapOperationBinding( parent, wsElement ){
	ServiceDescriptionFormatExtension.call( this, parent, wsElement );
};
//** @base{ServiceDescriptionFormatExtension}
SoapOperationBinding.prototype = {
	__proto__ : ServiceDescriptionFormatExtension.prototype,

	constructor : SoapOperationBinding,
	
	//** @returns{String}
	get SoapAction(){
		return this._wsElement.@soapAction;
	},

	//** @param{String} value
	set SoapAction( value ){
		this._wsElement.@soapAction = value;
	},

	//** @returns{SoapBindingStyle}
	get Style(){
		var style = this._wsElement.@style;
		if ( style == "rpc" )	{
			return SoapBindingStyle.Rpc;
		}
		else if( style == "document" )	{
			return SoapBindingStyle.Document;
		}
		else	{
			return SoapBindingStyle.Default;
		}
	},

	//** @param{SoapBindingStyle} value
	set Style( value ){
		if ( value == SoapBindingStyle.Rpc )	{
			this._wsElement.@style = "rpc";
		}
		else if( value == SoapBindingStyle.Document )	{
			this._wsElement.@style = "document";
		}
	}

}


SoapBindingUse = {
    Default : 0,
    Encoded : 1,
    Literal : 2
}


//** @returns{SoapHeaderBinding}
function SoapHeaderBinding( parent, wsElement ){
	this._MapToProperty = true;
	ServiceDescriptionFormatExtension.call( this, parent, wsElement );
};

//** @base{ServiceDescriptionFormatExtension}
SoapHeaderBinding.prototype = {
	__proto__ : ServiceDescriptionFormatExtension.prototype,
	
	constructor : SoapHeaderBinding,
	
	//** @returns{Boolean}
	get MapToProperty(){
		return this._MapToProperty;
	},

	//** @param{Boolean} value
	set MapToProperty( value ){
		this._MapToProperty = value;
	},

	//** @returns{XmlQualifiedName}
	get Message(){
		var message = this._wsElement.@message;
		if( message )	{
			var qn = message.split( ":" );
			return new System.Xml.XmlQualifiedName( qn[ 1 ], this._wsElement.namespace( qn[ 0 ] ) );
		}
		else	{
			return null;
		}
	},

	//** @param{XmlQualifiedName} value
	set Message( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get Part(){
		return this._wsElement.@part.toString();
	},

	//** @param{String} value
	set Part( value ){
		this._wsElement.@part = value;
	},

	//** @returns{SoapBindingUse}
	get Use(){
		var use = this._wsElement.@use;
		if(  use == "literal" )	{
			return SoapBindingUse.Literal;
		}
		else if ( use == "encoded" )	{
			return SoapBindingUse.Encoded;
		}
		else	{
			return SoapBindingUse.Default;
		}
		
	},

	//** @param{SoapBindingUse} value
	set Use( value ){
		if(  value == SoapBindingUse.Literal )	{
			this._wsElement.@use = "literal";
		}
		else if ( value == SoapBindingUse.Encoded )	{
			this._wsElement.@use = "encoded";
			this._wsElement.@encodingStyle = "http://schemas.xmlsoap.org/soap/encoding/";
		}
	},

	//** @returns{String}
	get Encoding(){
		return this._wsElement.@encodingStyle;
	},

	//** @param{String} value
	set Encoding( value ){
		this._wsElement.@encodingStyle = value;
	},

	//** @returns{String}
	get Namespace(){
		return this._wsElement.@namespace || "";
	},

	//** @param{String} value
	set Namespace( value ){
		this._wsElement.@namespace = value;
	},

	//** @returns{SoapHeaderFaultBinding}
	get Fault(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{SoapHeaderFaultBinding} value
	set Fault( value ){
		throw new NotImplementedException( arguments.callee.name );
	}

}



//** @base{ServiceDescriptionFormatExtension}
function SoapBodyBinding( parent, wsElement ){
	ServiceDescriptionFormatExtension.call( this, parent, wsElement );
};
SoapBodyBinding.prototype = {
	__proto__ : ServiceDescriptionFormatExtension.prototype,
	
	constructor : SoapBodyBinding,
	
	//** @returns{SoapBindingUse}
	get Use(){
		var use = this._wsElement.@use;
		if(  use == "literal" )	{
			return SoapBindingUse.Literal;
		}
		else if ( use == "encoded" )	{
			return SoapBindingUse.Encoded;
		}
		else	{
			return SoapBindingUse.Default;
		}
	},

	//** @param{SoapBindingUse} value
	set Use( value ){
		if(  value == SoapBindingUse.Literal )	{
			this._wsElement.@use = "literal";
		}
		else if ( value == SoapBindingUse.Encoded )	{
			this._wsElement.@use = "encoded";
			this._wsElement.@encodingStyle = "http://schemas.xmlsoap.org/soap/encoding/";
		}
	},

	//** @returns{String}
	get Namespace(){
		return this._wsElement.@namespace || "";
	},

	//** @param{String} value
	set Namespace( value ){
		this._wsElement.@namespace = value;
	},

	//** @returns{String}
	get Encoding(){
		return this._wsElement.@encodingStyle;
	},

	//** @param{String} value
	set Encoding( value ){
		this._wsElement.@encodingStyle = value;
	},

	//** @returns{String}
	get PartsString(){
		return this._wsElement.@part;
	},

	//** @param{String} value
	set PartsString( value ){
		this._wsElement.@part = value;
	},

	//** @returns{Array}
	get Parts(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} value
	set Parts( value ){
		throw new NotImplementedException( arguments.callee.name );
	}

}


//** @base{Enum}
ServiceDescriptionImportStyle = {
    Client : 0,
    Server : 1,
    ServerInterface : 2
}


//** @base{Object}
function ServiceDescriptionImporter(){
	this._wsElement = null;
	this.__ServiceDescriptions = new ServiceDescriptionCollection( new XMLList() );
	this.__Schemas = new System.Xml.Serialization.XmlSchemas( new XMLList() );
};
ServiceDescriptionImporter.prototype = {

	__proto__ : System.Object.prototype,
	
	constructor : ServiceDescriptionImporter,
	
	//** @returns{ServiceDescriptionCollection}
	get ServiceDescriptions(){
		return this.__ServiceDescriptions;
	},

	//** @returns{XmlSchemas}
	get Schemas(){
		return this.__Schemas;
	},

	//** @returns{ServiceDescriptionImportStyle}
	get Style(){
		return this.__style || ServiceDescriptionImportStyle.Client;
	},

	//** @param{ServiceDescriptionImportStyle} value
	set Style( value ){
		this.__style = value;
	},

	//** @returns{CodeGenerationOptions}
	get CodeGenerationOptions(){
		return this.__CodeGenerationOptions || 1; //System.Xml.Serialization.CodeGenerationOptions.GenerateProperties
	},

	//** @param{CodeGenerationOptions} value
	set CodeGenerationOptions( value ){
		this.__CodeGenerationOptions = value;
	},

	//** @returns{CodeDomProvider}
	get CodeGenerator(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{CodeDomProvider} value
	set CodeGenerator( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get ProtocolName(){
		return this.__PrototcolName || "Soap";
	},

	//** @param{String} value
	set ProtocolName( value ){
		this.__PrototcolName = value;
	},

	//** @param{ServiceDescription} serviceDescription
	//** @param{String} appSettingUrlKey
	//** @param{String} appSettingBaseUrl
	//** @returns{Void}
	AddServiceDescription : function( serviceDescription, appSettingUrlKey, appSettingBaseUrl ){
		this.__ServiceDescriptions.Add( serviceDescription );
	},

	//** @param{CodeNamespace} codeNamespace
	//** @param{CodeCompileUnit} codeCompileUnit
	//** @returns{ServiceDescriptionImportWarnings}
	Import : function( codeNamespace, codeCompileUnit ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{WebReferenceCollection} webReferences
	//** @param{CodeDomProvider} codeProvider
	//** @param{CodeCompileUnit} codeCompileUnit
	//** @param{WebReferenceOptions} options
	//** @returns{StringCollection}
	GenerateWebReferences : function( webReferences, codeProvider, codeCompileUnit, options ){
		throw new NotImplementedException( arguments.callee.name );
	}

}