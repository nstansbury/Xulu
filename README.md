A .NET JavaScript framework for the Mozilla Platform
========
Xulu™ is a JavaScript framework that emulates the Microsoft .NET 3.5 namespaces, classes & methods on the Mozilla platform via JavaScript and XPConnect. It does so without installing 3rd party libraries such as Mono. This involves wrapping native XPCOM and Mozilla Javascript methods into a .NET 3.5 compatible JavaScript namespace. Where possible the same exceptions are thrown too.
Why?

Because it allows a C# or JScript developer to immediately begin developing to the Mozilla platform without worrying about the specifics of XPCOM components and interfaces, and use exactly the same interfaces (and documentation) as they might in Visual Studio. For the existing Mozilla Javascript developer it provides a convienient and much simplified abstraction from the complexities of XPCOM.

With Xulu™, the result is an Internet Explorer compatible, cross platform .NET environment written entirely in JavaScript, that can be used in Firefox & Thunderbird right through to XULRunner.
Current Status

The assemblies we have been creating have so far been driven from our need rather than a concerted effort to create them up front. So far we have full or partial implementations of:

    Mozilla.Components
    System
    System.CodeDom
    System.CodeDom.Compiler
    System.Collections
    System.Collections.Specialized
    System.ComponentModel
    System.Common
    System.Data
    System.Data.Common
    System.Data.SQLite
    System.Data.Rdf
    System.IO
    System.Net
    System.Reflection
    System.Resources
    System.Runtime.Serialization.jsm
    System.Runtime.Serialization.Json.jsm
    System.Text
    System.Threading
    System.Web.Services
    System.Web.Services.Description
    System.Web.Services.Protocols
    System.Xml
    System.Xml.Schema
    System.Xml.Serialization

ADO.NET
-------
Our goal is to provide a full ADO.NET implementation for JS in Mozilla. SQLite is mostly complete, as is System.Data.Rdf. This now allows Mozilla RDF datasources to be queried with a standard SQL syntax and written to disk with SQLite.

System.Import
-------------
System.Import( assembly, namespaceOnly, scope ); is the only additional method added to the System namespace, and functions similarly to the VB.NET 'Import' statement, the JScript 'import' statement and the C# 'using' statement. .NET applications typically have to include the assemblies referenced by that application prior to runtime. As Javascript is a dynamic language, there are no such restrictions, therefore System.Import(); is equivilent to referencing the assemby at design time, and calling Import/Using at runtime, except that in Xulu it can all be achieved at runtime.

Each assembly is a slightly modified Mozilla Javascript module, imported into the Javascript scope with:
System.Import( "X.Y.Z" );

It is then available for use in that current scope either using the full or partial namespace:
var a = new X.Y.Z.Class(); var a = new Class();
Examples

An asynchrous read with callback of an SQLite datasource:
```javascript
System.Import( "System.Data.SQLite" );
    		
function callbackHandler( asyncResult )  {
  var cmd = asyncResult.AsyncState;
  var reader = cmd.EndExecuteReader( asyncResult );
  reader.Read();
  Console.WriteLine( reader.GetString(5));
  cnn.Close();
}
				
var cnn = new System.Data.SQLite.SQLiteConnection( "database.sqlite" );
cnn.Open();
var cmd = cnn.CreateCommand();
cmd.CommandText = "SELECT * FROM something";
var callback = new System.AsyncCallback( callbackHandler );
var result = cmd.BeginExecuteReader( callback, cmd );
```
Enumerate all *.js files in the current Directory:
```javascript
System.Import( "System.IO" );
var files = System.IO.Directory.GetFiles( "path_to_dir", ".js", TopDirectoryOnly );
```
Get a FileStream:
```javascript
System.Import( "System.IO" );
				
var fileStream = System.IO.File.OpenRead( "Path_to_file" );
var contents = [];
fileStream.Read( contents, 0, null );
fileStream.Close();
'''
The equivilent of using the Mozilla string bundle:
```javascript
System.Import( "System.Resources" );
				
var rm = new ResourceManager( "baseName", "chromeName" );
var str = rm.GetString( "SomeResourceProperty" );
```
Using the XmlWriter:
```javascript
System.Import( "System.Xml" );
System.Import( "System.IO" );

var soapNS = "http://schemas.xmlsoap.org/soap/envelope/";
var encNs = "http://schemas.xmlsoap.org/soap/encoding/";

var stream = new Stream();
var xmlWriter = XmlWriter.Create( stream );
				
xmlWriter.WriteStartDocument();
				
xmlWriter.WriteStartElement( "soap", "Envelope", soapNS );
xmlWriter.WriteAttributeString( "soap", "soapAction", soapNS, "MySoapAction" );
				
xmlWriter.WriteStartElement( "soap", "Header", soapNS );
xmlWriter.WriteEndElement();
				
xmlWriter.WriteStartElement( "soap", "Header", soapNS );
xmlWriter.WriteEndElement();
				
xmlWriter.WriteStartElement( "soap", "Body", soapNS );
xmlWriter.WriteAttributeString( "xmlns", "soapenc", null, encNs );
xmlWriter.WriteValue( "SOAP Body value" );
xmlWriter.WriteEndElement();
				
xmlWriter.WriteEndElement();
				
xmlWriter.Close();
				
var buf = [];
stream.Read( buf, 0, -1 );
Console.WriteLine( buf );
stream.Close();
```
Outputs the following XML:

<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope soap:soapAction="MySoapAction" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Header/>
  <soap:Header/>
  <soap:Body xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">SOAP Body value</soap:Body>
</soap:Envelope>

Create and send SOAP requests by converting a JavaScript object into a web services proxy.
```javascript
System.Import( "System.Xml.Serialization" );
System.Import( "System.Web.Services" );
System.Import( "System.Web.Services.Protocols" );

function MyWebService(){
  this.__MyWebHeader = "xyz";
  SoapHttpClientProtocol.call( this );
};

MyWebService.prototype = {
  __proto__ : SoapHttpClientProtocol.prototype,
  
  get MyWebHeader()  {
    return this.__MyWebHeader;
  }, 
  set MyWebHeader( value )  {
    this.__MyWebHeader = value;
  },  
  MyWebMethod : function( message )  {
    return this.Invoke( arguments.callee.name, arguments );
  }
}

// NB. Because we don't have direct access to the compiler, when .NET attributes are applied
// the first argument to the attribute MUST be the object, method or property to apply the attribute to.
WebServiceBindingAttribute( MyWebService.prototype, { Name : "MyWebService", Namespace : http://ns.domain.com/abc } ) ;
SoapDocumentMethodAttribute( MyWebService.prototype.MyWebMethod, { Binding : "MyWebServiceBinding", Action : "MySoapAction" } );
SoapHeaderAttribute( MyWebService.prototype.MyWebMethod, { MemberName : "MyWebHeader", Direction : SoapHeaderDirection.In } );

var message = {
  __proto__ : System.Object.prototype,
  get myProp() { return "MyWebMethodMessageProperty" },
  set myProp(value) {  }
}
XmlTypeAttribute( message, { TypeName : "MyWebMethodMessage", Namespace : "http://eg.redbacksystems.com/xyz" } );

var webService = new MyWebService();
webService.Url = "http://host.domain.com:8080/soap";  
webService.MyWebMethod( message, null );
```
The Xulu Framework is available under the MPL/GPL and can be downloaded here. Unzip the download into you Mozilla application's directory and add this line to a XUL file to import:

<script type="text/javascript;e4x=1" src="resource://xulu/loader.js"/>
