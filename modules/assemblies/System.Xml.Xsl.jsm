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


var EXPORTED_SYMBOLS = ["XslCompiledTransform"];

Components.utils.import( "resource://xulu/assemblies/System.jsm" );

System.Import( "Mozilla.Components", true, this );

//** @param{Boolean} enableDebug
//** @returns{XslCompiledTransform}
function XslCompiledTransform( enableDebug ){
	this.__XslProcessor = Mozilla.Components.Instance( "@mozilla.org/document-transformer;1?type=xslt", "nsIXSLTProcessor" );
}
XslCompiledTransform.prototype = {
	//** @base{Object}
	__proto__ : System.Object.prototype,
	
	constructor : XslCompiledTransform,

	//** @returns{XmlWriterSettings}
	get OutputSettings(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{TempFileCollection}
	get TemporaryFiles(){
		throw new NotImplementedException( arguments.callee.name );
	},

	Load : function( stylesheet, settings, stylesheetResolver )	{
		if( typeof( stylesheet ) == "string" )	{
			return this._LoadFromUri( stylesheet, settings, stylesheetResolver );
		}
		else if( stylesheet.__isType__( System.Xml.XmlReader ) )	{
			return this._LoadFromXmlReader( stylesheet, settings, stylesheetResolver );
		}
	},
	
	//** @param{XmlReader} stylesheet
	//** @param{XsltSettings} settings
	//** @param{XmlResolver} stylesheetResolver
	//** @returns{Void}
	_LoadFromXmlReader : function( stylesheet, settings, stylesheetResolver ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{IXPathNavigable} stylesheet
	//** @param{XsltSettings} settings
	//** @param{XmlResolver} stylesheetResolver
	//** @returns{Void}
	_LoadFromXPath : function( stylesheet, settings, stylesheetResolver ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} stylesheetUri
	//** @param{XsltSettings} settings
	//** @param{XmlResolver} stylesheetResolver
	//** @returns{Void}
	_LoadFromUri : function( stylesheetUri, settings, stylesheetResolver ){
		var request = Mozilla.Components.Instance( "@mozilla.org/xmlextras/xmlhttprequest;1", "nsIXMLHttpRequest" );
		request.open( "GET", stylesheetUri, false );   
		request.send( null ); 
		this.__XslProcessor.importStylesheet( request.responseXML );
	},

	//** @param{Type} compiledStylesheet
	//** @returns{Void}
	_LoadFromCompiled : function( compiledStylesheet ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{MethodInfo} executeMethod
	//** @param{Array} queryData
	//** @param{Array} earlyBoundTypes
	//** @returns{Void}
	_LoadFromMethodInfo : function( executeMethod, queryData, earlyBoundTypes ){
		throw new NotImplementedException( arguments.callee.name );
	},
	
	//** @static
	//** @param{XmlReader} stylesheet
	//** @param{XsltSettings} settings
	//** @param{XmlResolver} stylesheetResolver
	//** @param{Boolean} debug
	//** @param{TypeBuilder} typeBuilder
	//** @param{String} scriptAssemblyPath
	//** @returns{CompilerErrorCollection}
	CompileToType : function( stylesheet, settings, stylesheetResolver, debug, typeBuilder, scriptAssemblyPath ){
		throw new NotImplementedException( arguments.callee.name );
	},


	Transform : function( input, arguments, results ){
		if( results.__isType__( System.Xml.XmlWriter ))	{
			this._TransformXmlReaderToXmlWriter( input, arguments, results );
		}
	},

	//** @param{IXPathNavigable} input
	//** @param{XsltArgumentList} arguments
	//** @param{XmlWriter} results
	//** @returns{Void}
	_TransformXPathToXmlWriter : function( input, arguments, results ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{IXPathNavigable} input
	//** @param{XsltArgumentList} arguments
	//** @param{TextWriter} results
	//** @returns{Void}
	_TransformXPathToTextWriter : function( input, arguments, results ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{IXPathNavigable} input
	//** @param{XsltArgumentList} arguments
	//** @param{Stream} results
	//** @returns{Void}
	TransformXPathToStream : function( input, arguments, results ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlReader} reader
	//** @param{XsltArgumentList} arguments
	//** @param{XmlWriter} writer
	//** @returns{Void}
	_TransformXmlReaderToXmlWriter : function( reader, arguments, writer ){
		if( reader.NodeType != System.Xml.XmlNodeType.Element )		{
			reader.MoveToContent();
		}
		var mozDomParser = Mozilla.Components.Instance( "@mozilla.org/xmlextras/domparser;1", "nsIDOMParser" );
		var xmlString = reader.ReadOuterXml();
		var inputDocument = mozDomParser.parseFromString( xmlString, "text/xml" );
		// Transform input
		var outputDocument = this.__XslProcessor.transformToDocument( inputDocument );
		// Serialise output
		var mozSerializer = Mozilla.Components.Instance( "@mozilla.org/xmlextras/xmlserializer;1", "nsIDOMSerializer" );
		var xmlString = mozSerializer.serializeToString( outputDocument );
		writer.WriteRaw( xmlString );
		writer.Flush();
	},

	//** @param{XmlReader} input
	//** @param{XsltArgumentList} arguments
	//** @param{TextWriter} results
	//** @returns{Void}
	_TransformXmlReaderToTextWriter : function( input, arguments, results ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlReader} input
	//** @param{XsltArgumentList} arguments
	//** @param{Stream} results
	//** @returns{Void}
	_TransformXmlReaderToStrean : function( input, arguments, results ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{XmlReader} input
	//** @param{XsltArgumentList} arguments
	//** @param{XmlWriter} results
	//** @param{XmlResolver} documentResolver
	//** @returns{Void}
	_TransformXmlReaderToXmlResolver : function( input, arguments, results, documentResolver ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} inputUri
	//** @param{String} resultsFile
	//** @returns{Void}
	_TransformUriToString : function( inputUri, resultsFile ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} inputUri
	//** @param{XsltArgumentList} arguments
	//** @param{XmlWriter} results
	//** @returns{Void}
	_TransformUriToXmlWriter : function( inputUri, arguments, results ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} inputUri
	//** @param{XsltArgumentList} arguments
	//** @param{TextWriter} results
	//** @returns{Void}
	_TransformUriToTextWriter : function( inputUri, arguments, results ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} inputUri
	//** @param{XsltArgumentList} arguments
	//** @param{Stream} results
	//** @returns{Void}
	_TransformUriToStream : function( inputUri, arguments, results ){
		throw new NotImplementedException( arguments.callee.name );
	}

}