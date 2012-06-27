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


var EXPORTED_SYMBOLS = ["HttpWebClientProtocol","SoapHttpClientProtocol","InvokeCompletedEventArgs","SoapClientMethod","SoapClientMessage","SoapHeader","SoapHeaderAttribute","SoapHeaderDirection","SoapDocumentMethodAttribute","SoapRpcMethodAttribute"];

Components.utils.import( "resource://xulu/assemblies/System.jsm" );
System.Import( "System.Web.Services.Description" );
System.Import( "System.ComponentModel" );
System.Import( "System.Net" );

SoapBindingUse = {
    Default : 0,
    Encoded : 1,
    Literal : 2
}

//** @base{Component}
WebClientProtocol = {
	__proto__ : System.ComponentModel.Component.prototype,
	
	//** @returns{WebClientProtocol}
	constructor : function WebClientProtocol(){
		System.ComponentModel.Component.call( this );

	},

	//** @returns{ICredentials}
	get Credentials(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{ICredentials} value
	set Credentials( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get UseDefaultCredentials(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Boolean} value
	set UseDefaultCredentials( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get ConnectionGroupName(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} value
	set ConnectionGroupName( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get PreAuthenticate(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Boolean} value
	set PreAuthenticate( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get Url(){
		return this._Url || null;
	},

	//** @param{String} value
	set Url( value ){
		this._Url = value;
	},

	//** @returns{Encoding}
	get RequestEncoding(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Encoding} value
	set RequestEncoding( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Int32}
	get Timeout(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} value
	set Timeout( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Void}
	Abort : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},
	
	//** @param{Type} type
	//** @param{object} value
	//** @returns{Void}
	AddToCache : function( type, value )	{
		throw new NotImplementedException( arguments.callee.name );
	},
	
	//** @param{Type} type
	//** @returns{object}
    GetFromCache : function( type )	{
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Uri} uri
	//** @returns{WebRequest}
	GetWebRequest : function( uri )	{
		return System.Net.WebRequest.Create( uri );
	},

	//** @param{WebRequest} request
	//** @param{IAsyncResult} result
	//** @returns{WebResponse}
	GetWebResponse : function( request, result )	{
		var response = request.EndGetResponse( result );
		return response;
	},
	
	//** @param{Uri} requestUri
	//** @param{WebClientAsyncResult} asyncResult
	//** @param{Boolean} callWriteAsyncRequest
	//** @returns{IAsyncResult}
	_BeginSend : function( requestUri, asyncResult, callWriteAsyncRequest )	{
		var webRequest = WebClientProtocol.GetWebRequest( requestUri );
		asyncResult.Request = webRequest;
		this._InitializeAsyncRequest( webRequest, asyncResult.InternalAsyncState );
		if ( callWriteAsyncRequest )	{
			var getRequestStreamAsyncCallback = new System.Delegate.CreateDelegate( System.Type.GetType( "System.AsyncCallback" ), this, "_GetRequestStreamAsyncCallback" );
			webRequest.BeginGetRequestStream( getRequestStreamAsyncCallback, asyncResult );
		}
		else	{
			var getResponseAsyncCallback = new System.Delegate.CreateDelegate( System.Type.GetType( "System.AsyncCallback" ), this, "_GetResponseAsyncCallback" );
			webRequest.BeginGetResponse( getResponseAsyncCallback, asyncResult );
		}
	},
	
	//** @param{IAsyncResult} asyncResult
	//** @param{Object} internalAsyncState
	//** @param{Stream} responseStream
	//** @returns{WebResponse}
    _EndSend : function( asyncResult, internalAsyncState, responseStream)	{
		internalAsyncState = asyncResult.InternalAsyncState;
		responseStream = asyncResult.ResponseStream;
		return asyncResult.Response;
	},
	
	//** @param{IAsyncResult} asyncResult
	//** @returns{void}
	_GetRequestStreamAsyncCallback : function( asyncResult )	{
		var asyncState = asyncResult.AsyncState;
		var request = asyncState.Request;
		var stream = request.EndGetRequestStream( asyncResult );
		// Serialise request
		this._AsyncBufferedSerialize( request, stream, asyncState.InternalAsyncState );
		stream.Flush();
		var getResponseAsyncCallback = new System.Delegate.CreateDelegate( System.Type.GetType( "System.AsyncCallback" ), this, "_GetResponseAsyncCallback" );
		request.BeginGetResponse( getResponseAsyncCallback, asyncState );
	},

	//** @param{IAsyncResult} asyncResult
	//** @returns{IAsyncResult}
	_GetResponseAsyncCallback : function( asyncResult )	{
		var asyncState = asyncResult.AsyncState;
		asyncState.Response = asyncState.ClientProtocol.GetWebResponse( asyncState.Request, asyncResult );
		if ( asyncState.Response.ContentLength > 0 )	{
			asyncState.ResponseStream = asyncState.Response.GetResponseStream();
			var readResponseAsyncCallback = new System.Delegate.CreateDelegate( System.Type.GetType( "System.AsyncCallback" ), this, "_ReadResponseAsyncCallback" );
			asyncState.ResponseStream.BeginRead( asyncState.Buffer, 0, -1, readResponseAsyncCallback, asyncState );
		}
		else	{
			asyncState.Complete();
		}
	},
	
	//** @param{IAsyncResult} asyncResult
	//** @returns{void}
	_ReadResponseAsyncCallback : function( asyncResult )	{
		var asyncState = asyncResult.AsyncState;
		var bytesRead = asyncState.ResponseStream.EndRead( asyncResult );
		if ( bytesRead > 0 )	{
			//Console.WriteLine( "_ReadResponseAsyncCallback" );
			var readResponseAsyncCallback = new System.Delegate.CreateDelegate( System.Type.GetType( "System.AsyncCallback" ), this, "_ReadResponseAsyncCallback" );
			asyncState.ResponseStream.BeginRead( asyncState.Buffer, asyncState.Buffer.length, -1, readResponseAsyncCallback, asyncState );
		}
		else	{
			asyncState.Complete();
		}
	},
	
	//** @param{WebRequest} request
	//** @param{Object} internalAsyncState
	//** @returns{void}
	_InitializeAsyncRequest : function( request, internalAsyncState )	{},
	
	//** @param{WebRequest} request
	//** @param{Stream} requestStream
	//** @param{Object} internalAsyncState
	//** @returns{void}
	_AsyncBufferedSerialize : function( request, requestStream, internalAsyncState){}

}




//** @base{WebClientProtocol}
HttpWebClientProtocol = {
	__proto__ : WebClientProtocol,
	
	//** @returns{HttpWebClientProtocol}
	constructor : function HttpWebClientProtocol(){
		this._UserAgent = "Mozilla/5.0 XULU"
		
		WebClientProtocol.constructor.call( this );
	},
	
	//** @returns{Boolean}
	get AllowAutoRedirect(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Boolean} value
	set AllowAutoRedirect( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{CookieContainer}
	get CookieContainer(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{CookieContainer} value
	set CookieContainer( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{X509CertificateCollection}
	get ClientCertificates(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get EnableDecompression(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Boolean} value
	set EnableDecompression( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get UserAgent(){
		return this._UserAgent;
	},

	//** @param{String} value
	set UserAgent( value ){
		this._UserAgent = value;
	},

	//** @returns{IWebProxy}
	get Proxy(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{IWebProxy} value
	set Proxy( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get UnsafeAuthenticatedConnectionSharing(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Boolean} value
	set UnsafeAuthenticatedConnectionSharing( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{object} userState
	//** @returns{void}
	CancelAsync : function( userState )	{
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Uri} uri
	//** @returns{WebRequest}
	GetWebRequest : function( uri )	{
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{WebRequest} request
	//** @param{IAsyncResult} result
	//** @returns{WebResponse}
	GetWebResponse : function( request, result )	{
		var response = request.EndGetResponse( result );
		return response;
	},

	//** @param{Type} type
	//** @param{ArrayList} mappings
	//** @returns{Boolean}
	GenerateXmlMappings : function( type, mappings ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} types
	//** @param{ArrayList} mappings
	//** @returns{Hashtable}
	GenerateXmlMappings : function( types, mappings ){
		throw new NotImplementedException( arguments.callee.name );
	}

}



SoapProtocolVersion = {
    Default : 0,
    Soap11 : 1,
    Soap12 : 2
}


//** @returns{SoapHttpClientProtocol}
function SoapHttpClientProtocol()	{
	HttpWebClientProtocol.constructor.call( this );
	
	this.__envelopeNS = null
	this.__encodingNS = null
	this.__SoapVersion = null;
	
	var type = this.GetType();

	//** Get the webservice binding attribute
	var bindings = type.GetCustomAttributes( System.Web.Services.WebServiceBindingAttribute );
	if ( bindings.length > 1 )	{
		throw new ArgumentException( "Only one web service attribute maybe specified", "type" );
	}
	this.__serviceNamespace = bindings[ 0 ].Namespace;
	
	// Get the webservice methods
	this.__webMethods = {};
	var methods = type.GetMethods();
	for( var i = 0; i < methods.length; i++ )	{
		var methodInfo = methods[ i ];
		var methodAttr = System.Attribute.GetCustomAttribute( methodInfo, SoapDocumentMethodAttribute );
		if ( methodAttr )	{
			this.__webMethods[ methodInfo.Name ] = new SoapClientMethod( type, methodInfo, methodAttr );
		}
	}
	
	
	this.SoapVersion = SoapProtocolVersion.Soap11;
};
//** @base{HttpWebClientProtocol}
SoapHttpClientProtocol.prototype = {
	__proto__ : HttpWebClientProtocol,

	constructor : SoapHttpClientProtocol,
	
	//** @returns{SoapProtocolVersion}
	get SoapVersion(){
		return this.__SoapVersion;
	},

	//** @param{SoapProtocolVersion} value
	set SoapVersion( value ){
		if ( value == SoapProtocolVersion.Soap12 )	{
			this.__envelopeNS = "http://www.w3.org/2003/05/soap-envelope";
			this.__encodingNS = "http://www.w3.org/2003/05/soap-encoding";
			this.__SoapVersion = SoapProtocolVersion.Soap12;
		}
	    else if ( value < SoapProtocolVersion.Soap12 ){
			this.__envelopeNS = "http://schemas.xmlsoap.org/soap/envelope/";
			this.__encodingNS = "http://schemas.xmlsoap.org/soap/encoding/";
			this.__SoapVersion = SoapProtocolVersion.Soap11;
		}
	},

	//** @param{string} methodName
	//** @param{Array} parameters
	//** @param{AsyncCallback} callback
	//** @param{object} asyncState
	//** @returns{IAsyncResult}
	BeginInvoke : function( methodName, parameters, callback, asyncState )	{
		throw new NotImplementedException( arguments.callee.name );
	},
	
	//** @param{IAsyncResult} asyncResult
	//** @returns{Array}
    EndInvoke : function( asyncResult )	{
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{SoapClientMessage} message
	//** @param{int32} bufferSize
	//** @returns{XmlReader}
    GetReaderForMessage : function( message, bufferSize )	{
		throw new NotImplementedException( arguments.callee.name );
	},
	
	//** @param{Uri} uri
	//** @returns{WebRequest}
    GetWebRequest : function( uri )	{
		throw new NotImplementedException( arguments.callee.name );
	},
	
	//** @param{SoapClientMessage} message
	//** @param{int32} bufferSize
	//** @returns{XmlWriter}
    GetWriterForMessage : function( message, bufferSize )	{
		throw new NotImplementedException( arguments.callee.name );
	},
	
	//** @param{string} methodName
	//** @param{Array} parameters
	//** @returns{Array}
    Invoke : function( methodName, parameters )	{
		Console.WriteLine( "Invoke: " +methodName );
		throw new NotImplementedException( arguments.callee.name );
	},
	
	//** @param{string} methodName
	//** @param{Array} parameters
	//** @param{SendOrPostCallback} callback
	//** @param{object} userState
	//** @returns{void}
    InvokeAsync : function( methodName, parameters, callback, userState )	{
		var userAsyncState = new UserToken( callback, userState );
		var internalAsyncState = new InvokeAsyncState( methodName, parameters, null );
		var internalAsyncCallback = System.Delegate.CreateDelegate( System.Type.GetType( "System.AsyncCallback" ), this, "_InvokeAsyncCallback" );
		var webClientResult = new WebClientAsyncResult( this, internalAsyncState, null, internalAsyncCallback, userAsyncState );
		this._BeginSend( this.Url, webClientResult, true );
	},

	//** @returns{Void}
	Discover : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},
	
	//** @param{IAsyncResult} result
	//** @returns{void}
	_InvokeAsyncCallback : function( result )	{
		//Console.WriteLine( "_InvokeAsyncCallback" );
		try {
			var e = null;
			
			//** @bug{} Make sure it actually hasn't been cancelled
			var cancelled = false;
			//var internalAsyncState = result.InternalAsyncState;
			//var responseStream = result.ResponseStream;
			//var response = result.Response;
			
			var userToken = result.AsyncState;
			var xmlString = result.Buffer.join(""); //this._ReadResponse( internalAsyncState.Message, response, responseStream, true );
			var reader = System.Xml.XmlReader.Create( new System.IO.StringReader( xmlString ) );
			while( reader.Read() )	{
				reader.MoveToContent();
				if( ( reader.NodeType == System.Xml.XmlNodeType.Element ) && ( reader.Name == this.__envelopeNS +"::Body" ) )	{
					break;
				}
			}
			
			//** @bug{}
			//** Here we delay Deserialize()ing the result by passing back as an XmlTextReader array
			//** This does allow the callback to decide whether to transform the XML first,
			//** but mostly this is because the SOAP operation return type needs to be correctly prototyped & constructed
			//** as well as making the return type assembly available to the XmlSerializer.Deserialize() method
			//var object = XmlSerializer.Deserialize( reader );
			var objects = [ reader ];
			var eventArgs = new InvokeCompletedEventArgs( objects, e, cancelled, userToken.UserState );
			userToken.Callback.BeginInvoke( eventArgs );
		}
		catch( e )	{
			Console.WriteLine( new System.SystemException( e ) );
		}
	},

	//** @param{SoapClientMessage} message
	//** @param{WebResponse} response
	//** @param{Stream} responseStream
	//** @param{Boolean} asyncCall
	//** @returns{Array}
	_ReadResponse : function( message, response, responseStream, asyncCall )	{
		return [];
	},

	//** @param{WebRequest} request
	//** @param{Object} internalAsyncState
	//** @returns{void}
	_InitializeAsyncRequest : function( request, internalAsyncState )	{
		internalAsyncState._Message = this._BeforeSerialize( request, internalAsyncState.MethodName, internalAsyncState.Parameters );
	},
	
	//** @param{WebRequest} request
	//** @param{string} methodName
	//** @param{Array} parameters
	//** @returns{SoapClientMessage}
	_BeforeSerialize : function( request, methodName, parameters)	{
		// Build SoapClientMessage
		// ---------------------------------------
		var method = this.__webMethods[ methodName ];
		if ( method == null )	{
			throw new System.ArgumentException( "Invalid web method name" );
		}
		if ( method.ParameterSerializer == null )	{
			// Create this methods parameter serializers
			var xmlMappings = [];
			this._GenerateXmlMappings( parameters, xmlMappings, this.__serviceNamespace );
			method.ParameterSerializer = System.Xml.Serialization.XmlSerializer.FromMappings( xmlMappings );
		}
		var message = new SoapClientMessage( this, method, this.Url );
		message._SetStage( SoapMessageStage.BeforeSerialize );
		message.ContentType = "application/soap+xml";
		
		//@bug{} Huh??? Content-Encoding is gzip stuff
		//message.ContentEncoding = this.__encodingNS;
		message._SetParameterValues( parameters );
		
		// Set SOAP headers
		// ---------------------------------------
		SoapHeaderHandling.GetHeaderMembers( message.Headers, this, method.InHeaderMappings, SoapHeaderDirection.In, true );
		
		// Run SOAP extensions
		// ---------------------------------------
		
		request.Method = "POST";
		request.ContentType = message.ContentType;
		//request.Headers.Add( "Content-Encoding", message.ContentEncoding );
		request.Headers.Add( "SOAPAction", message.Action );
		return message;
	},
	
	//** @param{WebRequest} request
	//** @param{Stream} requestStream
	//** @param{Object} internalAsyncState
	//** @returns{void}
	_AsyncBufferedSerialize : function( request, requestStream, internalAsyncState ){
		internalAsyncState.Message._SetStream( requestStream );
		this._Serialize( internalAsyncState.Message );
	},
	
	//** @param{SoapClientMessage} message
	//** @returns{void}
	_Serialize : function( message )	{
		var method = message._Method;
		var isEncoded = ( method.use == SoapBindingUse.Encoded );
		var xmlWriter = System.Xml.XmlWriter.Create( message.Stream );
		xmlWriter.WriteStartDocument();
		xmlWriter.WriteStartElement( "soap", "Envelope", this.__envelopeNS );
		if ( isEncoded )	{
			xmlWriter.WriteAttributeString( "xmlns", "soapenc", null, this._encodingNS );
			xmlWriter.WriteAttributeString( "xmlns", "tns", null, this.__serviceNamespace );
		}
		xmlWriter.WriteAttributeString( "xmlns", "xsi", null, "http://www.w3.org/2001/XMLSchema-instance" );
		xmlWriter.WriteAttributeString( "xmlns", "xsd", null, "http://www.w3.org/2001/XMLSchema" );
		
		SoapHeaderHandling.WriteHeaders(xmlWriter, method.InHeaderSerializers, message.Headers, method.InHeaderMappings, SoapHeaderDirection.In, isEncoded, this.__serviceNamespace, null, this.__envelopeNS );
		
		xmlWriter.WriteStartElement( "soap", "Body", this.__envelopeNS );
		var parameters = message._GetParameterValues();
		for ( var i = 0; i < parameters.length; i++ )	{
			method.ParameterSerializer[ i ].Serialize( xmlWriter, parameters[ i ], null, isEncoded ? this.__encodingNS : null );
		}
		xmlWriter.WriteEndElement();
		xmlWriter.WriteEndElement();
		
		//Console.WriteLine( "XML: " +xmlWriter._nodeList.toXMLString() );
		
		xmlWriter.Flush();
		message._SetStage( SoapMessageStage.AfterSerialize );
		// Run SOAP extensions
		// ---------------------------------------
	},
	
	_GenerateXmlMappings : function( parameters, mappings, defaultNamespace )	{
		// Generate the XmlTypeMappings for all the parameters to a given method
		for( var i = 0; i < parameters.length; i++ )	{
			var type = parameters[ i ].GetType();		
			var mapping = new System.Xml.Serialization.SoapReflectionImporter().ImportTypeMapping( type, defaultNamespace );
			mappings.push( mapping );
		}
	}
}

//** @param{string} methodName
//** @param{Array} parameters
//** @returns{InvokeAsyncState}
function InvokeAsyncState( methodName, parameters, message ){
	this._MethodName = methodName;
	this._Parameters = parameters;
	this._Message = message || null;
};
InvokeAsyncState.prototype = {
	
	//** @returns{string}
	get MethodName()	{
		return this._MethodName;
	},
	
	//** @returns{Array}
	get Parameters()	{
		return this._Parameters;
	},
	
	//** @returns{SoapClientMessage}
	get Message()	{
		return this._Message;
	}
}



	//** @returns{InvokeCompletedEventArgs}
function InvokeCompletedEventArgs( results, error, cancelled, userState )	{
	this._Results = results;
	return System.ComponentModel.AsyncCompletedEventArgs.call( this, error, cancelled, userState );
};
//** @base{AsyncCompletedEventArgs}
InvokeCompletedEventArgs.prototype = {
	__proto__ : System.ComponentModel.AsyncCompletedEventArgs.prototype,
	
	constructor : InvokeCompletedEventArgs,
	
	//** @returns{Array}
	get Results(){
		return this._Results;
	}

}



//** @param{SendOrPostCallback} callback
//** @param{Object} userState
//** @returns{UserToken}
function UserToken( callback, userState) {
    this._Callback = callback;
    this._UserState = userState;
}
UserToken.prototype = {
	get Callback()	{
		return this._Callback;
	},
	get UserState()	{
		return this._UserState;
	}
}



//** @param{WebClientProtocol} clientProtocol
//** @param{Object} internalAsyncState
//** @param{WebRequest} request
//** @param{AsyncCallback} userCallback
//** @param{Object} userAsyncState
//** @returns{WebClientAsyncResult}
function WebClientAsyncResult( clientProtocol,  internalAsyncState, request, userCallback, userAsyncState ){
	this.Buffer = [];
	this.Response = null;
	this.ResponseStream = null;
	this.ClientProtocol = clientProtocol;
	this.InternalAsyncState = internalAsyncState;
	this.Request = request;
	this.__userCallback = userCallback;
	this.__userAsyncState = userAsyncState;
	System.IAsyncResult.call( this, userAsyncState );
};
//** @base{Object}
WebClientAsyncResult.prototype = {
	__proto__ : System.IAsyncResult.prototype,
	
	constructor : WebClientAsyncResult,
	
	//** @param{Exception} e
	//** @returns{void}
	Complete : function( e )	{
		if ( this.ResponseStream )	{
			this.ResponseStream.Close();
		}
		this._IsCompleted = true;
		this.__userCallback.Invoke( this );
	},
	
	//** @returns{Object}
	get AsyncState(){
		return this.__userAsyncState;
	},

	//** @returns{WaitHandle}
	get AsyncWaitHandle(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get CompletedSynchronously(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsCompleted(){
		return this._IsCompleted || false;
	},

	//** @returns{Void}
	Abort : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	}

}


SoapMessageStage = {
    AfterDeserialize : 8,
    AfterSerialize : 2,
    BeforeDeserialize : 4,
    BeforeSerialize : 1
};


//** @param{SoapHttpClientProtocol} protocol
//** @param{SoapClientMethod} method
//** @param{string} url
//** @returns{SoapMessage}
function SoapMessage( method, url )	{
	this.__method = method
	this.__Url = url;
	this.__Headers = new SoapHeaderCollection();
	this.__Stage = SoapMessageStage.BeforeSerialize;
	this.__Stream = null;
	this.__parameters = null;
}

//** @base{Object}
SoapMessage.prototype = {

	//** @returns{Boolean}
	get OneWay(){
		return this.__method.oneWay;
	},

	//** @returns{SoapException}
	get Exception(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{SoapException} value
	set Exception( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{LogicalMethodInfo}
	get MethodInfo(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{SoapHeaderCollection}
	get Headers(){
		return this.__Headers;
	},

	//** @returns{Stream}
	get Stream(){
		return this.__Stream;
	},

	//** @returns{String}
	get ContentType(){
		return this.__ContentType || "text/xml";
	},

	//** @param{String} value
	set ContentType( value ){
		this.__ContentType = value;
	},

	//** @returns{String}
	get ContentEncoding(){
		return this.__ContentEncoding || "";
	},

	//** @param{String} value
	set ContentEncoding( value ){
		this.__ContentEncoding = value;
	},

	//** @returns{SoapMessageStage}
	get Stage(){
		return this.__Stage;
	},
	
	//** @returns{String}
	get Url(){
		return this.__Url;
	},

	//** @returns{String}
	get Action(){
		return this.__method.Action;
	},

	//** @returns{SoapProtocolVersion}
	get SoapVersion(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} index
	//** @returns{Object}
	GetInParameterValue : function( index ){
		return this.__parameters[ index ];
	},

	//** @param{Int32} index
	//** @returns{Object}
	GetOutParameterValue : function( index ){
		return this.__parameters[ index ];
	},

	//** @returns{Object}
	GetReturnValue : function(  ){
		return this.__parameters[ 0 ];
	},
	
	_SetStage : function( value )	{
		this.__Stage = value;
	},
	
	//** @param{Stream} stream
	_SetStream : function( stream )	{
		this.__Stream = stream;
	},
	
	get _Method()	{
		return this.__method;	
	},
	
	_GetParameterValues : function()	{
		return this.__parameters;
	},
	
	_SetParameterValues : function( parameterValues )	{
		this.__parameters = parameterValues;
	}

}
//** @returns{OperationBinding}
//** @param{SoapHttpClientProtocol} protocol
//** @param{SoapClientMethod} method
//** @param{string} url
//** @returns{SoapClientMessage}
function SoapClientMessage( protocol, method, url ){
	this.__Client = protocol;
	SoapMessage.call( this, method, url );
}
	
//** @base{SoapMessage}
SoapClientMessage.prototype = {
	__proto__ : SoapMessage.prototype,

	constructor : SoapClientMessage,
	
	//** @returns{Boolean}
	get OneWay(){
		return this._method.oneWay;
	},

	//** @returns{SoapHttpClientProtocol}
	get Client(){
		return this.__Client;
	},

	//** @returns{LogicalMethodInfo}
	get MethodInfo(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get Url(){
		return this.__Url;
	},

	//** @returns{String}
	get Action(){
		return this.__method.Action;
	},

	//** @returns{SoapProtocolVersion}
	get SoapVersion(){
		return this.__Client.SoapVersion;
	}

}



SoapHeaderDirection = {
    In : 1,
	Out : 2,
    InOut : 3,
    Fault : 4
}

SoapParameterStyle = {
    Default : 0,
    Bare : 1,
    Wrapped : 2
}


//** @base{Object}
SoapHeaderHandling = {

	//** @returns{SoapHeaderHandling}
	constructor : function(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlReader} reader
	//** @param{XmlSerializer} serializer
	//** @param{SoapHeaderCollection} headers
	//** @param{Array} mappings
	//** @param{SoapHeaderDirection} direction
	//** @param{String} envelopeNS
	//** @param{String} encodingStyle
	//** @param{Boolean} checkRequiredHeaders
	//** @returns{String}
	ReadHeaders : function( reader, serializer, headers, mappings, direction, envelopeNS, encodingStyle, checkRequiredHeaders ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlWriter} writer
	//** @param{XmlSerializer} serializer
	//** @param{SoapHeaderCollection} headers
	//** @param{Array} mappings
	//** @param{SoapHeaderDirection} direction
	//** @param{Boolean} isEncoded
	//** @param{String} defaultNS
	//** @param{Boolean} serviceDefaultIsEncoded
	//** @param{String} envelopeNS
	//** @returns{Void}
	WriteHeaders : function( writer, serializers, headers, mappings, direction, isEncoded, defaultNS, serviceDefaultIsEncoded, envelopeNS ){
		writer.WriteStartElement( "soap", "Header", envelopeNS );
		for( var i = 0; i < headers.Count; i++ )	{
			serializers[ i ].Serialize( writer, headers.Item( i ), envelopeNS, null, null );
		}
		writer.WriteEndElement();
	},

	//** @param{XmlWriter} writer
	//** @param{SoapHeaderCollection} headers
	//** @param{String} envelopeNS
	//** @returns{Void}
	WriteUnknownHeaders : function( writer, headers, envelopeNS ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{SoapHeaderCollection} headers
	//** @param{Object} target
	//** @param{Array} mappings
	//** @param{SoapHeaderDirection} direction
	//** @param{Boolean} client
	//** @returns{Void}
	SetHeaderMembers : function( headers, target, mappings, direction, client ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{SoapHeaderCollection} headers
	//** @param{Object} target
	//** @param{Array} mappings
	//** @param{SoapHeaderDirection} direction
	//** @param{Boolean} client
	//** @returns{Void}
	GetHeaderMembers : function( headers, target, mappings, direction, client ){
		for( var i = 0; i < mappings.length; i++ )	{
			var soapHeaderMapping = mappings[ i ];
			if ( soapHeaderMapping.Direction == direction )	{
				var header = new SoapHeader( soapHeaderMapping.MemberInfo );
				headers.Add( header );
			}
		}
	},

	//** @param{SoapHeaderCollection} headers
	//** @returns{Void}
	EnsureHeadersUnderstood : function( headers ){
		throw new NotImplementedException( arguments.callee.name );
	}

}





//** @base{CollectionBase}
function SoapHeaderCollection(){
	return System.Collections.CollectionBase.call( this, [] );
};
SoapHeaderCollection.prototype = {
	__proto__ : System.Collections.CollectionBase.prototype,
	
	constructor : SoapHeaderCollection
	/*
	//** @param{Int32} value
	//** @returns{SoapHeader}
	Item : function( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{SoapHeader} header
	//** @returns{Int32}
	Add : function( header ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} index
	//** @param{SoapHeader} header
	//** @returns{Void}
	Insert : function( index, header ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{SoapHeader} header
	//** @returns{Int32}
	IndexOf : function( header ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{SoapHeader} header
	//** @returns{Boolean}
	Contains : function( header ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{SoapHeader} header
	//** @returns{Void}
	Remove : function( header ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} array
	//** @param{Int32} index
	//** @returns{Void}
	CopyTo : function( array, index ){
		throw new NotImplementedException( arguments.callee.name );
	}
	 */
	
}




//** @returns{SoapHeader}
function SoapHeader( memberInfo )	{
	var fnGetter = function(){ return this.__headerField; };
	var fnSetter = function( value ){this.__headerField = value; };
			
	this.__defineGetter__( memberInfo.Name, fnGetter );
	this.__defineSetter__( memberInfo.Name, fnSetter );
	this.__headerField = memberInfo.GetValue();
	var xmlAttrs = memberInfo.GetCustomAttributes( System.Xml.Serialization.XmlAttributeAttribute, false );
	if( xmlAttrs.length > 0 )	{
		var attribute = xmlAttrs[ 0 ];
		System.Xml.Serialization.XmlAttributeAttribute( fnGetter, { AttributeName : attribute.AttributeName, Namespace : attribute.Namespace } );
	}
}

//** @base{Object}
SoapHeader.prototype = {
	__proto__ : System.Object.prototype,
	
	constructor : SoapHeader,
	
	//** @returns{String}
	get EncodedMustUnderstand(){
		return this.__EncodedMustUnderstand;
	},

	//** @param{String} value
	set EncodedMustUnderstand( value ){
		this.__EncodedMustUnderstand = value
	},

	//** @returns{String}
	get EncodedMustUnderstand12(){
		return this.__EncodedMustUnderstand12;
	},

	//** @param{String} value
	set EncodedMustUnderstand12( value ){
		this.__EncodedMustUnderstand12 = value
	},

	//** @returns{Boolean}
	get MustUnderstand(){
		return this.__MustUnderstand;
	},

	//** @param{Boolean} value
	set MustUnderstand( value ){
		this.__MustUnderstand = value;
	},

	//** @returns{String}
	get Actor(){
		return this.__Actor;
	},

	//** @param{String} value
	set Actor( value ){
		this.__Actor = value;
	},

	//** @returns{String}
	get Role(){
		return this.__Role;
	},

	//** @param{String} value
	set Role( value ){
		this.__Role = value;
	},

	//** @returns{Boolean}
	get DidUnderstand(){
		return this.__DidUnderstand;
	},

	//** @param{Boolean} value
	set DidUnderstand( value ){
		this.__DidUnderstand = value;
	},

	//** @returns{String}
	get EncodedRelay(){
		return this.__EncodedRelay;
	},

	//** @param{String} value
	set EncodedRelay( value ){
		this.__EncodedRelay = value;
	},

	//** @returns{Boolean}
	get Relay(){
		return this.__Relay;
	},

	//** @param{Boolean} value
	set Relay( value ){
		this.__Relay = value;
	}

}
System.Xml.Serialization.XmlTypeAttribute( SoapHeader.prototype, { TypeName : "SoapHeader", Namespace : "http://schemas.xmlsoap.org/soap/envelope/" } );



//** @param{PropertyInfo} property
//** @param{SoapHeaderAttribute} attribute
//** @returns{SoapHeaderMapping}
function SoapHeaderMapping( property, attribute )	{
	this.__property = property; 
	this.__attribute = attribute;
}
//** @base{Object}
SoapHeaderMapping.prototype = {
	__proto__ : System.Object.prototype,
	
	constructor : SoapHeaderMapping,
	
	//** @returns{Type}
	get HeaderType(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get Repeats(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get Custom(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{SoapHeaderDirection}
	get Direction(){
		return this.__attribute.Direction;
	},

	//** @returns{MemberInfo}
	get MemberInfo(){
		return this.__property;
	}

}



//** @param{Object} target
//** @param{Object} args
//** @returns{SoapHeaderAttribute}
function SoapHeaderAttribute( target, args )	{
	if ( !target )	{
		throw new ArgumentNullException( "Attribute target cannot be NULL" );
	}
	if ( this instanceof arguments.callee )	{
		System.Attribute.constructor.call( this );
		this._Apply( target );
		return;
	}
	
	var attribute = new SoapHeaderAttribute( target );
	args = ( !args ) ? {} : args;
	attribute.MemberName =  "MemberName" in args ? args.MemberName : "";
	attribute.Direction =  "Direction" in args ? args.Direction : SoapHeaderDirection.In;
}
//** @base{Attribute}
SoapHeaderAttribute.prototype = {
	__proto__ : System.Attribute,
	
	constructor : SoapHeaderAttribute,
	
	//** @returns{String}
	get MemberName(){
		return this._MemberName;
	},

	//** @param{String} value
	set MemberName( value ){
		this._MemberName = value;
	},

	//** @returns{SoapHeaderDirection}
	get Direction(){
		return this._Direction;
	},

	//** @param{SoapHeaderDirection} value
	set Direction( value ){
		if ( ( typeof( value ) == "number" ) && ( value < 5 ) )	{
			this._Direction = value;
		}
		else	{
			throw new System.ArgumentException( "Invalid SoapHeaderDirection", "SoapHeaderAttribute.Direction" );
		}
	},

	//** @returns{Boolean}
	get Required(){
		// Obselete
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Boolean} value
	set Required( value ){
		// Obselete
		throw new NotImplementedException( arguments.callee.name );
	}

}




//** @param{Object} target
//** @param{Object} args
//** @returns{SoapDocumentMethodAttribute}
function SoapDocumentMethodAttribute( target, args )	{
	
	if ( !target )	{
		throw new ArgumentNullException( "Attribute target cannot be Null" );
	}
	if ( this instanceof arguments.callee )	{
		System.Attribute.constructor.call( this );
		this._Apply( target );
		return;
	}
	var attribute = new SoapDocumentMethodAttribute( target );
	args = ( !args ) ? {} : args;
	attribute.Action = "Action" in args ? args.Action : "http://tempuri.org/MethodName";
	attribute.OneWay = "OneWay" in args ? args.OneWay : false;
	attribute.RequestNamespace = "RequestNamespace" in args ? args.RequestNamespace : "http://tempuri.org/";
	attribute.ResponseNamespace = "ResponseNamespace" in args ? args.ResponseNamespace : "http://tempuri.org/";
	attribute.RequestElementName = "RequestElementName" in args ? args.RequestElementName : "MethodName";
	attribute.ResponseElementName = "ResponseElementName" in args ? args.ResponseElementName : "MethodName";
	attribute.Use = "Use" in args ? args.Use : SoapBindingUse.Literal;
	attribute.ParameterStyle = "ParameterStyle" in args ? args.ParameterStyle : SoapParameterStyle.Wrapped;
	attribute.Binding = "Binding" in args ? args.Binding : "http://tempuri.org/Soap";
}

//** @base{Attribute}
SoapDocumentMethodAttribute.prototype = {
	__proto__ : System.Attribute,
	
	constructor : SoapDocumentMethodAttribute,
	
	//** @returns{String}
	get Action(){
		return this._Action;
	},

	//** @param{String} value
	set Action( value ){
		this._Action = value;
	},

	//** @returns{Boolean}
	get OneWay(){
		return this._OneWay;
	},

	//** @param{Boolean} value
	set OneWay( value ){
		this._OneWay = value;
	},

	//** @returns{String}
	get RequestNamespace(){
		return this._RequestNamespace;
	},

	//** @param{String} value
	set RequestNamespace( value ){
		this._RequestNamespace = value;
	},

	//** @returns{String}
	get ResponseNamespace(){
		return this._ResponseNamespace;
	},

	//** @param{String} value
	set ResponseNamespace( value ){
		this._ResponseNamespace = value;
	},

	//** @returns{String}
	get RequestElementName(){
		return this.RequestElementName;
	},

	//** @param{String} value
	set RequestElementName( value ){
		this._RequestElementName = value;
	},

	//** @returns{String}
	get ResponseElementName(){
		return this._ResponseElementName;
	},

	//** @param{String} value
	set ResponseElementName( value ){
		this._ResponseElementName = value;
	},

	//** @returns{SoapBindingUse}
	get Use(){
		return this._Use;
	},

	//** @param{SoapBindingUse} value
	set Use( value ){
		this._Use = value;
	},

	//** @returns{SoapParameterStyle}
	get ParameterStyle(){
		return this._ParameterStyle;
	},

	//** @param{SoapParameterStyle} value
	set ParameterStyle( value ){
		this._ParameterStyle = value;
	},

	//** @returns{String}
	get Binding(){
		return this._Binding;
	},

	//** @param{String} value
	set Binding( value ){
		this._Binding = value;
	}

}



//** @param{Object} target
//** @param{Object} args
//** @returns{SoapRpcMethodAttribute}
function SoapRpcMethodAttribute( target, args )	{
	if ( !target )	{
		throw new ArgumentNullException( "Attribute target cannot be NULL" );
	}
	if ( this instanceof arguments.callee )	{
		System.Attribute.constructor.call( this );
		this._Apply( target );
		return;
	}
	var attribute = new SoapRpcMethodAttribute();
	args = ( !args ) ? {} : args;
	attribute.Action = "Action" in args ? args.Action : "http://tempuri.org/MethodName";
	attribute.OneWay = "OneWay" in args ? args.OneWay : false;
	attribute.RequestNamespace = "RequestNamespace" in args ? args.RequestNamespace : "http://tempuri.org/";
	attribute.ResponseNamespace = "ResponseNamespace" in args ? args.ResponseNamespace : "http://tempuri.org/";
	attribute.RequestElementName = "RequestElementName" in args ? args.RequestElementName : "MethodName";
	attribute.ResponseElementName = "ResponseElementName" in args ? args.ResponseElementName : "MethodName";
	attribute.Use = "Use" in args ? args.Use : SoapBindingUse.Literal;
	attribute.Binding = "Binding" in args ? args.Binding : "http://tempuri.org/Soap";
}

//** @base{Attribute}
SoapRpcMethodAttribute.prototype = {
	__proto__ : System.Attribute,
	
	constructor : SoapRpcMethodAttribute,
	
	//** @returns{String}
	get Action(){
		return this._Action;
	},

	//** @param{String} value
	set Action( value ){
		this._Action = value;
	},

	//** @returns{Boolean}
	get OneWay(){
		return this._OneWay;
	},

	//** @param{Boolean} value
	set OneWay( value ){
		this._OneWay = value;
	},

	//** @returns{String}
	get RequestNamespace(){
		return this._RequestNamespace;
	},

	//** @param{String} value
	set RequestNamespace( value ){
		this._RequestNamespace = value;
	},

	//** @returns{String}
	get ResponseNamespace(){
		return this._ResponseNamespace;
	},

	//** @param{String} value
	set ResponseNamespace( value ){
		this._ResponseNamespace = value;
	},

	//** @returns{String}
	get RequestElementName(){
		return this.RequestElementName;
	},

	//** @param{String} value
	set RequestElementName( value ){
		this._RequestElementName = value;
	},

	//** @returns{String}
	get ResponseElementName(){
		return this._ResponseElementName;
	},

	//** @param{String} value
	set ResponseElementName( value ){
		this._ResponseElementName = value;
	},

	//** @returns{SoapBindingUse}
	get Use(){
		return this._Use;
	},

	//** @param{SoapBindingUse} value
	set Use( value ){
		this._Use = value;
	},

	//** @returns{String}
	get Binding(){
		return this._Binding;
	},

	//** @param{String} value
	set Binding( value ){
		this._Binding = value;
	}

}



//** @param{Type} type
//** @param{MethodInfo} method
//** @param{SoapMethodAttribute} attribute
//** @returns{SoapClientMethod}
function SoapClientMethod( type, method, attribute )	{
	this.__methodInfo = method;
	this.__methodAttr = attribute;
	this.__ParameterSerializer = null;
	this.__InHeaderMappings = [];
	this.__OutHeaderMappings = [];			 
	
	var xmlMappings = [];
	var headers = System.Attribute.GetCustomAttributes( method, SoapHeaderAttribute );
	for ( var i = 0; i < headers.length; i++ )	{
		var propertyInfo = type.GetProperty( headers[ i ].MemberName );
		var mapping = new SoapHeaderMapping( propertyInfo, headers[ i ] );
		if ( mapping.Direction == SoapHeaderDirection.In )	{
			this.__InHeaderMappings.push( mapping );
		}
		else if ( mapping.Direction == SoapHeaderDirection.Out )	{
			this.__OutHeaderMappings.push( mapping );
		}
		else	{
			this.__InHeaderMappings.push( mapping );
			this.__OutHeaderMappings.push( mapping );
		}
		var xmlMapping = new System.Xml.Serialization.SoapReflectionImporter().ImportTypeMapping( SoapHeader.prototype.GetType() );
		xmlMapping.__ignoreType = true;
		xmlMappings.push( xmlMapping );
	}
	this.InHeaderSerializers = System.Xml.Serialization.XmlSerializer.FromMappings( xmlMappings );
}
SoapClientMethod.prototype = {
    extensions : null,
	get Action()	{
		return this.__methodAttr.Action;
	},
	
	get InHeaderSerializers()	{
		return this.__InHeaderSerializers;
	},
	
	set InHeaderSerializers( value )	{
		this.__InHeaderSerializers = value;
	},
	
	get InHeaderMappings()	{
		return this.__InHeaderMappings;
	},
	get OutHeaderMappings()	{
		return this.__InHeaderMappings;
	},
    get MethodInfo ()	{
		return this.__methodInfo;
	},
	get ParamStyle()	{
		return this.__methodAttr.ParameterStyle;
	},
	get OneWay()	{
		return this.__methodAttr.OneWay;
	},
	get Rpc()	{
		return this.__methodAttr.__isType__( SoapRpcMethodAttribute );
	},
	get Use()	{
		return this.__methodAttr.Use;
	},
	get ParameterSerializer()	{
		return this.__ParameterSerializer;
	},
	set ParameterSerializer( value )	{
		this.__ParameterSerializer = value;
	}
}


