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


var EXPORTED_SYMBOLS = ["WebHeaderCollectionType","WebRequest","HttpWebRequest","FileWebRequest","FtpWebRequest","AsyncResponseListener"];

Components.utils.import( "resource://xulu/assemblies/System.jsm" );

var Mozilla = System.Import( "Mozilla.Components" );
System.Import( "System.Collections.Specialized" );
System.Import( "System.IO" );



WebHeaderCollectionType = {
    FileWebRequest : 9,
    FileWebResponse : 10,
    FtpWebRequest : 7,
    FtpWebResponse : 8,
    HttpListenerRequest : 5,
    HttpListenerResponse : 6,
    HttpWebRequest : 3,
    HttpWebResponse : 4,
    Unknown : 0,
    WebRequest : 1,
    WebResponse : 2
}


//** @param{WebHeaderCollectionType} type
//** @returns{WebHeaderCollection}
function WebHeaderCollection( type ){
	System.Collections.Specialized.NameValueCollection.call( this );
};

//** @base{NameValueCollection}
WebHeaderCollection.prototype = {
	__proto__ : System.Collections.Specialized.NameValueCollection.prototype,
	
	constructor : WebHeaderCollection,
	
	/*
	//** @returns{String}
	get Item(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} value
	set Item( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get Item(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} value
	set Item( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Int32}
	get Count(){
		throw new NotImplementedException( arguments.callee.name );
	},
	 */
	
	//** @returns{KeysCollection}
	get Keys(){
		throw new NotImplementedException( arguments.callee.name );
	},

	/*
	//** @returns{Array}
	get AllKeys(){
		throw new NotImplementedException( arguments.callee.name );
	},
	 */
	
	//** @param{HttpRequestHeader} header
	//** @param{String} value
	//** @returns{Void}
	Set : function( header, value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{HttpResponseHeader} header
	//** @param{String} value
	//** @returns{Void}
	Set : function( header, value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{HttpRequestHeader} header
	//** @returns{Void}
	Remove : function( header ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{HttpResponseHeader} header
	//** @returns{Void}
	Remove : function( header ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//* Implemented by NameValueCollection
	/*
	//** @param{HttpRequestHeader} header
	//** @param{String} value
	//** @returns{Void}
	Add : function( header, value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{HttpResponseHeader} header
	//** @param{String} value
	//** @returns{Void}
	Add : function( header, value ){
		throw new NotImplementedException( arguments.callee.name );
	},
	
	//** @param{String} name
	//** @param{String} value
	//** @returns{Void}
	Add : function( name, value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} header
	//** @returns{Void}
	Add : function( header ){
		throw new NotImplementedException( arguments.callee.name );
	},
	 */
	
	//** @param{String} name
	//** @param{String} value
	//** @returns{Void}
	Set : function( name, value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} name
	//** @returns{Void}
	Remove : function( name ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} header
	//** @returns{Array}
	GetValues : function( header ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	ToString : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Array}
	ToByteArray : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} headerName
	//** @returns{Boolean}
	IsRestricted : function( headerName ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} headerName
	//** @param{Boolean} response
	//** @returns{Boolean}
	IsRestricted : function( headerName, response ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Object} sender
	//** @returns{Void}
	OnDeserialization : function( sender ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{SerializationInfo} serializationInfo
	//** @param{StreamingContext} streamingContext
	//** @returns{Void}
	GetObjectData : function( serializationInfo, streamingContext ){
		throw new NotImplementedException( arguments.callee.name );
	},

	/*
	//** @param{String} name
	//** @returns{String}
	Get : function( name ){
		throw new NotImplementedException( arguments.callee.name );
	},
	
	//** @returns{IEnumerator}
	GetEnumerator : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},
	 
	
	//** @param{Int32} index
	//** @returns{String}
	Get : function( index ){
		throw new NotImplementedException( arguments.callee.name );
	},
	*/
	//** @param{Int32} index
	//** @returns{Array}
	GetValues : function( index ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} index
	//** @returns{String}
	GetKey : function( index ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Void}
	Clear : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	}

}



//** @base{MarshalByRefObject}
WebRequest = {
	__proto__ : System.Object,
	
	//** @returns{WebRequest}
	constructor : function(){
		return this;
	},
	
	//** @returns{RequestCachePolicy}
	get DefaultCachePolicy(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{RequestCachePolicy} value
	set DefaultCachePolicy( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{RequestCachePolicy}
	get CachePolicy(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{RequestCachePolicy} value
	set CachePolicy( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get Method(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} value
	set Method( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Uri}
	get RequestUri(){
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

	//** @returns{WebHeaderCollection}
	get Headers(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{WebHeaderCollection} value
	set Headers( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Int64}
	get ContentLength(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int64} value
	set ContentLength( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get ContentType(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} value
	set ContentType( value ){
		throw new NotImplementedException( arguments.callee.name );
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

	//** @returns{IWebProxy}
	get Proxy(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{IWebProxy} value
	set Proxy( value ){
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

	//** @returns{Int32}
	get Timeout(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} value
	set Timeout( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{AuthenticationLevel}
	get AuthenticationLevel(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{AuthenticationLevel} value
	set AuthenticationLevel( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{TokenImpersonationLevel}
	get ImpersonationLevel(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{TokenImpersonationLevel} value
	set ImpersonationLevel( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{IWebProxy}
	get DefaultWebProxy(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{IWebProxy} value
	set DefaultWebProxy( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} requestUri
	//** @param{Uri} requestUri
	//** @returns{WebRequest}
	Create : function( requestUri ){
		if ( typeof( requestUri  ) == "string"	)	{
			requestUri = new System.Uri( requestUri );
		}
		if ( requestUri.Scheme == requestUri.UriSchemeHttp )	{
			return new System.Net.HttpWebRequest( requestUri );
		}
		else if( requestUri.Scheme == requestUri.UriSchemeFtp )	{
			return new System.Net.FtpWebRequest( requestUri );
		}
		return null;
	},

	//** @param{Uri} requestUri
	//** @returns{WebRequest}
	CreateDefault : function( requestUri ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} prefix
	//** @param{IWebRequestCreate} creator
	//** @returns{Boolean}
	RegisterPrefix : function( prefix, creator ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Stream}
	GetRequestStream : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{WebResponse}
	GetResponse : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{AsyncCallback} callback
	//** @param{Object} state
	//** @returns{IAsyncResult}
	BeginGetResponse : function( callback, state ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{IAsyncResult} asyncResult
	//** @returns{WebResponse}
	EndGetResponse : function( asyncResult ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{AsyncCallback} callback
	//** @param{Object} state
	//** @returns{IAsyncResult}
	BeginGetRequestStream : function( callback, state ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{IAsyncResult} asyncResult
	//** @returns{Stream}
	EndGetRequestStream : function( asyncResult ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Void}
	Abort : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{IWebProxy}
	GetSystemWebProxy : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	}

}



HttpRequestHeader = {
    CacheControl : 0,
    Connection : 1,
    Date : 2,
    KeepAlive : 3,
    Pragma : 4,
    Trailer : 5,
    TransferEncoding : 6,
    Upgrade : 7,
    Via : 8,
    Warning : 9,
    Allow : 10,
    ContentLength : 11,
    ContentType : 12,
    ContentEncoding : 13,
    ContentLanguage : 14,
    ContentLocation : 15,
    ContentMd5 : 0x10,
    ContentRange : 0x11,
    Expires : 0x12,
    LastModified : 0x13,
    Accept : 0x14,
    AcceptCharset : 0x15,
    AcceptEncoding : 0x16,
    AcceptLanguage : 0x17,
    Authorization : 0x18,
    Cookie : 0x19,
    Expect : 0x1a,
    From : 0x1b,
    Host : 0x1c,
    IfMatch : 0x1d,
    IfModifiedSince : 30,
    IfNoneMatch : 0x1f,
    IfRange : 0x20,
    IfUnmodifiedSince : 0x21,
    MaxForwards : 0x22,
    ProxyAuthorization : 0x23,
    Referer : 0x24,
    Range : 0x25,
    Te : 0x26,
    Translate : 0x27,
    UserAgent : 40
}


//** This WebRequest delegate type allows a delayed invocation via an nsIStreamListener
//** @returns{AsyncResponseListener}
function AsyncResponseListener()	{
	
}
AsyncResponseListener.prototype = {
	__proto__ : System.MulticastDelegate,
	
	constructor : AsyncResponseListener,
	
	//** Arguments as per delegate function signature followed by:
	//** @param{AsyncCallback} callback
	//** @param{Object} object
	//** @returns{IAsyncResult}
	BeginInvoke : function(){
		this._arguments = arguments;
		this._callback = arguments[ arguments.length -2 ];
		var state = arguments[ arguments.length -1 ];
		this._asyncResult = new System.IAsyncResult( state );
		return this._asyncResult;
	},
	
	//** @param{nsIRequest} request
	//** @param{nsISupports} context
	//** @param{nsIInputStream} inputStream
	//** @param{PRUint32} offset
	//** @param{PRUint32} count
	//** @returns{void}
	onDataAvailable : function( request, context, inputStream, offset, count )	{
		//Console.WriteLine( "onDataAvailable" );
		try {
			if ( this._EndInvoke == null )	{
				this._EndInvoke = this.DynamicInvoke( this._arguments );
				var stream = this._EndInvoke.GetResponseStream();
				this._mozOutputStream = stream._mozOutputStream;
				this._mozOutputStream.writeFrom( inputStream, count );
				this._asyncResult._IsCompleted = true;
				this._callback.Invoke( this._asyncResult );
			}
			else	{
				this._mozOutputStream.writeFrom( inputStream, count );
				this._mozOutputStream.flush();
			}
		}
		catch( e )	{
			Console.WriteLine( new System.SystemException( e.message ) );
		}
	},
	
	//** @param{nsIRequest} request
	//** @param{nsISupports} context
	//** @returns{void}
	onStartRequest : function( request , context )	{
		Console.WriteLine( "onStartRequest: " +request.name );
	},
	
	//** @param{nsIRequest} request
	//** @param{nsISupports} context
	//** @param{nsresult} statusCode
	//** @returns{void}
	onStopRequest : function( request, context , statusCode )		{
		//Console.WriteLine( "onStopRequest" );
		if ( Components.isSuccessCode( statusCode ) == false )	{
			throw new WebException( "Unknown Error Occurred", WebExceptionStatus.UnknownError );
		}
		try {
			if ( this._mozOutputStream == null )		{		// onDataAvailable never got called
				this.onDataAvailable( request, context, null, 0, 0 );
			}
			var stream = this._EndInvoke.GetResponseStream();
			stream.Close();
		}
		catch( e )	{
			Console.WriteLine( new System.SystemException( e.message ) );
		}
	}
	
}



//** @param{Uri} uri
//** @param{ServicePoint} servicePoint
//** @returns{HttpWebRequest}
function HttpWebRequest( uri, servicePoint ){
	var mozIOService = Mozilla.Components.Service( "@mozilla.org/network/io-service;1","nsIIOService" );
	this._mozHttpChannel = mozIOService.newChannel( uri.AbsoluteUri, null, null ).QueryInterface( Components.interfaces.nsIHttpChannel );
	this._contentType = "text/html;";
	this._Headers = new WebHeaderCollection( WebHeaderCollectionType.HttpWebRequest );
	this._RequestUri = uri;
	this._ContinueDelegate = null;
	this._RequestStream = null;
	return WebRequest.constructor.call( this );
};

//** @base{WebRequest}
HttpWebRequest.prototype = {
	__proto__ : WebRequest,
	
	constructor : HttpWebRequest,
	
	//** @returns{Boolean}
	get AllowAutoRedirect(){
		( this._mozHttpChannel.redirectionLimit > 0 ) ? true : false;
	},

	//** @param{Boolean} value
	set AllowAutoRedirect( value ){
		this._mozHttpChannel.redirectionLimit = ( value == true ) ? 50 : 0;
	},

	//** @returns{Boolean}
	get AllowWriteStreamBuffering(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Boolean} value
	set AllowWriteStreamBuffering( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get HaveResponse(){
		return ( this._mozHttpChannel.status > 0 ) ? false : true;
	},

	//** @returns{Boolean}
	get KeepAlive(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Boolean} value
	set KeepAlive( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get Pipelined(){
		return this._mozHttpChannel.allowPipelining;
	},

	//** @param{Boolean} value
	set Pipelined( value ){
		this._mozHttpChannel.allowPipelining = value;
	},

	//** @returns{Boolean}
	get PreAuthenticate(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Boolean} value
	set PreAuthenticate( value ){
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

	//** @returns{Boolean}
	get SendChunked(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Boolean} value
	set SendChunked( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{DecompressionMethods}
	get AutomaticDecompression(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{DecompressionMethods} value
	set AutomaticDecompression( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{RequestCachePolicy}
	get DefaultCachePolicy(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{RequestCachePolicy} value
	set DefaultCachePolicy( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Int32}
	get DefaultMaximumResponseHeadersLength(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} value
	set DefaultMaximumResponseHeadersLength( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Int32}
	get DefaultMaximumErrorResponseLength(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} value
	set DefaultMaximumErrorResponseLength( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Int32}
	get MaximumResponseHeadersLength(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} value
	set MaximumResponseHeadersLength( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{X509CertificateCollection}
	get ClientCertificates(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{X509CertificateCollection} value
	set ClientCertificates( value ){
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

	//** @returns{Uri}
	get RequestUri(){
		return this._RequestUri;
	},

	//** @returns{Int64}
	get ContentLength(){
		// For 64-bit  value
		this._mozHttpChannel.QueryInterface( Components.interfaces.nsIPropertyBag2 );
		var len = this._mozHttpChannel.contentLength;
		// Not sure if we need QI back?
		this._mozHttpChannel.QueryInterface( Components.interfaces.nsIHttpChannel );
		return len;
	},

	//** @param{Int64} value
	set ContentLength( value ){
		this._mozHttpChannel.contentLength = value;
	},

	//** @returns{Int32}
	get Timeout(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} value
	set Timeout( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Int32}
	get ReadWriteTimeout(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} value
	set ReadWriteTimeout( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Uri}
	get Address(){
		return new System.Uri( this._mozHttpChannel.URI.spec );
	},

	//** @returns{HttpContinueDelegate}
	get ContinueDelegate(){
		return this._ContinueDelegate;
	},

	//** @param{HttpContinueDelegate} value
	set ContinueDelegate( value ){
		this._ContinueDelegate = value;
	},

	//** @returns{ServicePoint}
	get ServicePoint(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Int32}
	get MaximumAutomaticRedirections(){
		return this._mozHttpChannel.redirectionLimit;
	},

	//** @param{Int32} value
	set MaximumAutomaticRedirections( value ){
		this._mozHttpChannel.redirectionLimit = value;
	},

	//** @returns{String}
	get Method(){
		return this._mozHttpChannel.requestMethod;
	},

	//** @param{String} value
	set Method( value ){
		this._mozHttpChannel.requestMethod = value;
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

	//** @returns{WebHeaderCollection}
	get Headers(){
		return this._Headers;
	},

	//** @param{WebHeaderCollection} value
	set Headers( value ){
		return this._Headers = value;
	},

	//** @returns{IWebProxy}
	get Proxy(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{IWebProxy} value
	set Proxy( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Version}
	get ProtocolVersion(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Version} value
	set ProtocolVersion( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get ContentType(){
		return this._contentType;
	},

	//** @param{String} value
	set ContentType( value ){
		this._contentType = value;
	},

	//** @returns{String}
	get MediaType(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} value
	set MediaType( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get TransferEncoding(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} value
	set TransferEncoding( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get Connection(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} value
	set Connection( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get Accept(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} value
	set Accept( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get Referer(){
		return this._mozHttpChannel.referrer.spec;
	},

	//** @param{String} value
	set Referer( value ){
		//** This also needs to be a RequestHeader in the collection
		this._mozHttpChannel.referrer.spec = value;
	},

	//** @returns{String}
	get UserAgent(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} value
	set UserAgent( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get Expect(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} value
	set Expect( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{DateTime}
	get IfModifiedSince(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{DateTime} value
	set IfModifiedSince( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{AsyncCallback} callback
	//** @param{Object} state
	//** @returns{IAsyncResult}
	BeginGetRequestStream : function( callback, state ){
		var getRequestStream = System.Delegate.CreateDelegate( System.Type.GetType( "System.AsyncCallback" ), this, "GetRequestStream" );
		this._RequestStreamDelegate = getRequestStream;
		var asyncResult = getRequestStream.BeginInvoke( callback, state );
		
		return asyncResult;
	},

	//** @param{IAsyncResult} asyncResult
	//** @returns{Stream}
	EndGetRequestStream : function( asyncResult ){
		if ( asyncResult == this._RequestStreamDelegate._asyncResult )	{
			return this._RequestStreamDelegate.EndInvoke( asyncResult );
		}
		throw new System.ArgumentException( "asyncResult did not originate from a BeginGetRequestStream method on the current request." );
	},

	//** @returns{Stream}
	GetRequestStream : function(){
		if ( this._RequestStream == null )	{
			this._RequestStream = new System.IO.Stream();
		}
		return this._RequestStream;
	},

	//** @param{AsyncCallback} callback
	//** @param{Object} state
	//** @returns{IAsyncResult}
	BeginGetResponse : function( callback, state ){
		var responseListener = System.Delegate.CreateDelegate( System.Type.GetType( "System.Net.AsyncResponseListener" ), this, "GetResponse" );
		this._ResponseDelegate = responseListener;
		var asyncResult = responseListener.BeginInvoke( new System.IO.Stream(), callback, state );
		if ( this._RequestStream != null )	{
			this._RequestStream._CloseOutputStream();
			this._mozHttpChannel.QueryInterface( Components.interfaces.nsIUploadChannel );
			this._mozHttpChannel.setUploadStream( this._RequestStream._mozInputStream, this._contentType, -1 );
			this.Method = "POST";
		}
		var keys = this.Headers.AllKeys;
		for( var i = 0; i < keys.length; i++ )	{
			var val = this.Headers.Get( keys[ i ] );
			this._mozHttpChannel.setRequestHeader( keys[ i ], val, true );
		}
		this._mozHttpChannel.asyncOpen( responseListener, asyncResult );
		return asyncResult;
	},

	//** @param{IAsyncResult} asyncResult
	//** @returns{WebResponse}
	EndGetResponse : function( asyncResult ){
		if ( asyncResult == this._ResponseDelegate._asyncResult )	{
			return this._ResponseDelegate.EndInvoke( asyncResult );
		}
		throw new System.ArgumentException( "asyncResult did not originate from a BeginGetResponse method on the current request." );
	},

	//** @param{Stream} Stream get a response from a given stream - used by BeginGetResponse
	//** @returns{WebResponse}
	GetResponse : function( stream ){
		if ( stream == undefined )	{
			if ( this._RequestStream != null )	{
				this._RequestStream._CloseOutputStream();
				this._mozHttpChannel.QueryInterface( Components.interfaces.nsIUploadChannel );
				this._mozHttpChannel.setUploadStream( this._RequestStream._mozInputStream, this._contentType, -1 );
				this.Method = "POST";
			}
			stream = new System.IO.Stream( this._mozHttpChannel.open() );
		}
		if ( this.ContinueDelegate != null && this._mozHttpChannel.status == "100" )	{
			this.ContinueDelegate.BeginInvoke();
		}
		var coreData = {
			HttpChannel : this._mozHttpChannel,
			ResponseStream : stream
		}
		return new HttpWebResponse( this.Address, null, coreData );
	},

	//** @returns{Void}
	Abort : function(){
		this._mozHttpChannel.cancel( -1 );
		throw new WebException( "RequestCanceled", WebExceptionStatus.RequestCanceled );
	},

	//** @param{Int32} from
	//** @param{Int32} to
	//** @returns{Void}
	AddRange : function( from, to ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} range
	//** @returns{Void}
	AddRange : function( range ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} rangeSpecifier
	//** @param{Int32} from
	//** @param{Int32} to
	//** @returns{Void}
	AddRange : function( rangeSpecifier, from, to ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} rangeSpecifier
	//** @param{Int32} range
	//** @returns{Void}
	AddRange : function( rangeSpecifier, range ){
		throw new NotImplementedException( arguments.callee.name );
	}

}






//** @base{WebRequest}
function FileWebRequest(){};
FileWebRequest.prototype = {
	__proto__ : WebRequest,
	
	constructor : FileWebRequest,
	
	//** @returns{String}
	get ConnectionGroupName(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} value
	set ConnectionGroupName( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Int64}
	get ContentLength(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int64} value
	set ContentLength( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get ContentType(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} value
	set ContentType( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{ICredentials}
	get Credentials(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{ICredentials} value
	set Credentials( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{WebHeaderCollection}
	get Headers(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get Method(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} value
	set Method( value ){
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

	//** @returns{IWebProxy}
	get Proxy(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{IWebProxy} value
	set Proxy( value ){
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

	//** @returns{Uri}
	get RequestUri(){
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

	//** @param{AsyncCallback} callback
	//** @param{Object} state
	//** @returns{IAsyncResult}
	BeginGetRequestStream : function( callback, state ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{AsyncCallback} callback
	//** @param{Object} state
	//** @returns{IAsyncResult}
	BeginGetResponse : function( callback, state ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{IAsyncResult} asyncResult
	//** @returns{Stream}
	EndGetRequestStream : function( asyncResult ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{IAsyncResult} asyncResult
	//** @returns{WebResponse}
	EndGetResponse : function( asyncResult ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Stream}
	GetRequestStream : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{WebResponse}
	GetResponse : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Void}
	Abort : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	}

}




//** @base{WebRequest}
FtpWebRequest = {
	__proto__ : WebRequest,
	
	//** @returns{FtpWebRequest}
	constructor : function(){
		throw new NotImplementedException( arguments.callee.name );
	},
	
	//** @returns{RequestCachePolicy}
	get DefaultCachePolicy(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{RequestCachePolicy} value
	set DefaultCachePolicy( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get Method(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} value
	set Method( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get RenameTo(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} value
	set RenameTo( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{ICredentials}
	get Credentials(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{ICredentials} value
	set Credentials( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Uri}
	get RequestUri(){
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

	//** @returns{Int32}
	get ReadWriteTimeout(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} value
	set ReadWriteTimeout( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Int64}
	get ContentOffset(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int64} value
	set ContentOffset( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Int64}
	get ContentLength(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int64} value
	set ContentLength( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{IWebProxy}
	get Proxy(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{IWebProxy} value
	set Proxy( value ){
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

	//** @returns{ServicePoint}
	get ServicePoint(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get KeepAlive(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Boolean} value
	set KeepAlive( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get UseBinary(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Boolean} value
	set UseBinary( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get UsePassive(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Boolean} value
	set UsePassive( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{X509CertificateCollection}
	get ClientCertificates(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{X509CertificateCollection} value
	set ClientCertificates( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get EnableSsl(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Boolean} value
	set EnableSsl( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{WebHeaderCollection}
	get Headers(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{WebHeaderCollection} value
	set Headers( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get ContentType(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} value
	set ContentType( value ){
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

	//** @returns{Boolean}
	get PreAuthenticate(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Boolean} value
	set PreAuthenticate( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{WebResponse}
	GetResponse : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{AsyncCallback} callback
	//** @param{Object} state
	//** @returns{IAsyncResult}
	BeginGetResponse : function( callback, state ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{IAsyncResult} asyncResult
	//** @returns{WebResponse}
	EndGetResponse : function( asyncResult ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Stream}
	GetRequestStream : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{AsyncCallback} callback
	//** @param{Object} state
	//** @returns{IAsyncResult}
	BeginGetRequestStream : function( callback, state ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{IAsyncResult} asyncResult
	//** @returns{Stream}
	EndGetRequestStream : function( asyncResult ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Void}
	Abort : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	}

}




//** @base{MarshalByRefObject}
WebResponse = {
	__proto__ : System.Object,
	
	//** @returns{WebResponse}
	constructor : function(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsFromCache(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsMutuallyAuthenticated(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Int64}
	get ContentLength(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int64} value
	set ContentLength( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get ContentType(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} value
	set ContentType( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Uri}
	get ResponseUri(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{WebHeaderCollection}
	get Headers(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Void}
	Close : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Stream}
	GetResponseStream : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	}

}


HttpResponseHeader = {
    CacheControl : 0,
    Connection : 1,
    Date : 2,
    KeepAlive : 3,
    Pragma : 4,
    Trailer : 5,
    TransferEncoding : 6,
    Upgrade : 7,
    Via : 8,
    Warning : 9,
    Allow : 10,
    ContentLength : 11,
    ContentType : 12,
    ContentEncoding : 13,
    ContentLanguage : 14,
    ContentLocation : 15,
    ContentMd5 : 0x10,
    ContentRange : 0x11,
    Expires : 0x12,
    LastModified : 0x13,
    AcceptRanges : 0x14,
    Age : 0x15,
    ETag : 0x16,
    Location : 0x17,
    ProxyAuthenticate : 0x18,
    RetryAfter : 0x19,
    Server : 0x1a,
    SetCookie : 0x1b,
    Vary : 0x1c,
    WwwAuthenticate : 0x1d
}



//** @param{Uri} responseUri
//** @param{KnownHttpVerb} verb
//** @param{object} coreData
//** @param{String} mediaType
//** @param{Boolean} usesProxySemantics
//** @param{DecompressionMethods} decompressionMethod
//** @returns{HttpWebResponse}
function HttpWebResponse( responseUri, verb, coreData, mediaType, usesProxySemantics, decompressionMethod ){
	this._Headers = new WebHeaderCollection( WebHeaderCollectionType.HttpWebRequest );
	this._ResponseUri = responseUri;
	this._mozHttpChannel = coreData.HttpChannel.QueryInterface( Components.interfaces.nsIHttpChannel );
	this._ResponseStream = coreData.ResponseStream;
};
//** @base{WebResponse}
HttpWebResponse.prototype = {
	__proto__ : WebResponse,
	
	constructor : HttpWebResponse,
	
	//** @returns{Boolean}
	get IsMutuallyAuthenticated(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{CookieCollection}
	get Cookies(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{CookieCollection} value
	set Cookies( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{WebHeaderCollection}
	get Headers(){
		return this._Headers;
	},

	//** @returns{Int64}
	get ContentLength(){
		// For 64-bit  value
		this._mozHttpChannel.QueryInterface( Components.interfaces.nsIPropertyBag2 );
		var len = this._mozHttpChannel.contentLength;
		// Not sure if we need QI back?
		this._mozHttpChannel.QueryInterface( Components.interfaces.nsIHttpChannel );
		return len;
	},

	//** @returns{String}
	get ContentEncoding(){
		return this._mozHttpChannel.getResponseHeader( "Content-Encoding" );
	},

	//** @returns{String}
	get ContentType(){
		return this._mozHttpChannel.contentType;
	},

	//** @returns{String}
	get CharacterSet(){
		return this._mozHttpChannel.contentCharset;
	},

	//** @returns{String}
	get Server(){
		return this._mozHttpChannel.URI.asciiHost;
	},

	//** @returns{DateTime}
	get LastModified(){
		return this._mozHttpChannel.getResponseHeader( "Last-Modified" );
	},

	//** @returns{HttpStatusCode}
	get StatusCode(){
		return this._mozHttpChannel.responseStatus;
	},

	//** @returns{String}
	get StatusDescription(){
		return this._mozHttpChannel.responseStatusText;
	},

	//** @returns{Version}
	get ProtocolVersion(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Uri}
	get ResponseUri(){
		return this._ResponseUri;
	},

	//** @returns{String}
	get Method(){
		return this._mozHttpChannel.requestMethod
	},

	//** @returns{Stream}
	GetResponseStream : function(  ){
		return this._ResponseStream;
	},

	//** @returns{Void}
	Close : function(  ){
		this._ResponseStream.Close();
	},

	//** @param{String} headerName
	//** @returns{String}
	GetResponseHeader : function( headerName ){
		return this._mozHttpChannel.getResponseHeader( headerName );
	}

}




//** @base{WebResponse}
function FtpWebResponse(){

};
FtpWebResponse.prototype = {
	__proto__ : WebResponse,
	
	constructor : FtpWebResponse,
	
	//** @returns{Int64}
	get ContentLength(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{WebHeaderCollection}
	get Headers(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Uri}
	get ResponseUri(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{FtpStatusCode}
	get StatusCode(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get StatusDescription(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{DateTime}
	get LastModified(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get BannerMessage(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get WelcomeMessage(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get ExitMessage(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Stream}
	GetResponseStream : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Void}
	Close : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	}

}




//** @base{WebResponse}
function FileWebResponse(){

};
FileWebResponse.prototype = {
	__proto__ : WebResponse,
	
	constructor : FileWebResponse,
	
	//** @returns{Int64}
	get ContentLength(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get ContentType(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{WebHeaderCollection}
	get Headers(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Uri}
	get ResponseUri(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Void}
	Close : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Stream}
	GetResponseStream : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	}

}



WebExceptionStatus = {
    Success : 0,
    NameResolutionFailure : 1,
    ConnectFailure : 2,
    ReceiveFailure : 3,
    SendFailure : 4,
    PipelineFailure : 5,
    RequestCanceled : 6,
    ProtocolError : 7,
    ConnectionClosed : 8,
    TrustFailure : 9,
    SecureChannelFailure : 10,
    ServerProtocolViolation : 11,
    KeepAliveFailure : 12,
    Pending : 13,
    Timeout : 14,
    ProxyNameResolutionFailure : 15,
    UnknownError : 0x10,
    MessageLengthLimitExceeded : 0x11,
    CacheEntryNotFound : 0x12,
    RequestProhibitedByCachePolicy : 0x13,
    RequestProhibitedByProxy : 20
}

 

 
//** @param{String} message
//** @param{WebExceptionStatus} status
//** @returns{WebException}
function WebException( message, status){
	this.__status = status;
	System.InvalidOperationException.call( this, message );
};

//** @base{InvalidOperationException}
WebException.prototype = {
	__proto__ : System.InvalidOperationException.prototype,
	
	constructor : WebException,
	
	//** @returns{WebExceptionStatus}
	get Status(){
		return this.__status;
	},

	//** @returns{WebResponse}
	get Response(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{SerializationInfo} serializationInfo
	//** @param{StreamingContext} streamingContext
	//** @returns{Void}
	GetObjectData : function( serializationInfo, streamingContext ){
		throw new NotImplementedException( arguments.callee.name );
	}

}
