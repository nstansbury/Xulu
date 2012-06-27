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


var EXPORTED_SYMBOLS = ["CodeDomProvider","CompilerResults"];

Components.utils.import( "resource://xulu/assemblies/System.jsm", this );
System.Import( "System.ComponentModel" );


//** @base{Component}
CodeDomProvider = {
	__proto__ : System.ComponentModel.Component.prototype,
	
	//** @returns{CodeDomProvider}
	constructor : function CodeDomProvider(){
		throw new NotImplementedException( arguments.callee.name );
	},
	
	//** @returns{String}
	get FileExtension(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{LanguageOptions}
	get LanguageOptions(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{String} language
	//** @returns{CodeDomProvider}
	CreateProvider : function( language ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{String} extension
	//** @returns{String}
	GetLanguageFromExtension : function( extension ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{String} language
	//** @returns{Boolean}
	IsDefinedLanguage : function( language ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{String} extension
	//** @returns{Boolean}
	IsDefinedExtension : function( extension ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{String} language
	//** @returns{CompilerInfo}
	GetCompilerInfo : function( language ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @returns{Array}
	GetAllCompilerInfo : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{ICodeGenerator}
	CreateGenerator : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{TextWriter} output
	//** @returns{ICodeGenerator}
	CreateGenerator : function( output ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} fileName
	//** @returns{ICodeGenerator}
	CreateGenerator : function( fileName ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{ICodeCompiler}
	CreateCompiler : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{ICodeParser}
	CreateParser : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Type} type
	//** @returns{TypeConverter}
	GetConverter : function( type ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{CompilerParameters} options
	//** @param{Array} compilationUnits
	//** @returns{CompilerResults}
	CompileAssemblyFromDom : function( options, compilationUnits ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{CompilerParameters} options
	//** @param{Array} fileNames
	//** @returns{CompilerResults}
	CompileAssemblyFromFile : function( options, fileNames ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{CompilerParameters} options
	//** @param{Array} sources
	//** @returns{CompilerResults}
	CompileAssemblyFromSource : function( options, sources ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} value
	//** @returns{Boolean}
	IsValidIdentifier : function( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} value
	//** @returns{String}
	CreateEscapedIdentifier : function( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} value
	//** @returns{String}
	CreateValidIdentifier : function( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{CodeTypeReference} type
	//** @returns{String}
	GetTypeOutput : function( type ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{GeneratorSupport} generatorSupport
	//** @returns{Boolean}
	Supports : function( generatorSupport ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{CodeExpression} expression
	//** @param{TextWriter} writer
	//** @param{CodeGeneratorOptions} options
	//** @returns{Void}
	GenerateCodeFromExpression : function( expression, writer, options ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{CodeStatement} statement
	//** @param{TextWriter} writer
	//** @param{CodeGeneratorOptions} options
	//** @returns{Void}
	GenerateCodeFromStatement : function( statement, writer, options ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{CodeNamespace} codeNamespace
	//** @param{TextWriter} writer
	//** @param{CodeGeneratorOptions} options
	//** @returns{Void}
	GenerateCodeFromNamespace : function( codeNamespace, writer, options ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{CodeCompileUnit} compileUnit
	//** @param{TextWriter} writer
	//** @param{CodeGeneratorOptions} options
	//** @returns{Void}
	GenerateCodeFromCompileUnit : function( compileUnit, writer, options ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{CodeTypeDeclaration} codeType
	//** @param{TextWriter} writer
	//** @param{CodeGeneratorOptions} options
	//** @returns{Void}
	GenerateCodeFromType : function( codeType, writer, options ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{CodeTypeMember} member
	//** @param{TextWriter} writer
	//** @param{CodeGeneratorOptions} options
	//** @returns{Void}
	GenerateCodeFromMember : function( member, writer, options ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{TextReader} codeStream
	//** @returns{CodeCompileUnit}
	Parse : function( codeStream ){
		throw new NotImplementedException( arguments.callee.name );
	}
}




//** @base{Object}
function CompilerResults(){};
CompilerResults.prototype = {
	__proto__ : System.Object.prototype,
	
	//** @returns{CompilerResults}
	constructor : CompilerResults,
	
	//** @returns{TempFileCollection}
	get TempFiles(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{TempFileCollection} value
	set TempFiles( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Evidence}
	get Evidence(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Evidence} value
	set Evidence( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Assembly}
	get CompiledAssembly(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Assembly} value
	set CompiledAssembly( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{CompilerErrorCollection}
	get Errors(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{StringCollection}
	get Output(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get PathToAssembly(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} value
	set PathToAssembly( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Int32}
	get NativeCompilerReturnValue(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} value
	set NativeCompilerReturnValue( value ){
		throw new NotImplementedException( arguments.callee.name );
	}
}



