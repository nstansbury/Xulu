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


var EXPORTED_SYMBOLS = ["BindingMode","BindingOperations","BindingBase","Binding"];

Components.utils.import( "resource://xulu/assemblies/System.jsm" );
System.Import( "System.Windows.Markup" );

BindingMode =	{
	TwoWay : 0,					// Causes changes to either the source property or the target property to automatically update the other
	OneWay : 1,					// Updates the binding target when the binding source changes. This type of binding is appropriate if the control being bound is implicitly read-only
	OneTime : 2,					// Updates the binding target when the application starts or when the data context changes
	OneWayToSource : 3,	// Updates the source property when the target property changes.
    Default : 4
}

//** @base{Object}
BindingOperations = {
	__proto__ : System.Object.prototype,
	
	//** @returns{BindingOperations}
	constructor : function BindingOperations(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{DependencyObject} target
	//** @param{DependencyProperty} dp
	//** @param{BindingBase} binding
	//** @returns{BindingExpressionBase}
	SetBinding : function( target, dp, binding ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{DependencyObject} target
	//** @param{DependencyProperty} dp
	//** @returns{BindingBase}
	GetBindingBase : function( target, dp ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{DependencyObject} target
	//** @param{DependencyProperty} dp
	//** @returns{Binding}
	GetBinding : function( target, dp ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{DependencyObject} target
	//** @param{DependencyProperty} dp
	//** @returns{PriorityBinding}
	GetPriorityBinding : function( target, dp ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{DependencyObject} target
	//** @param{DependencyProperty} dp
	//** @returns{MultiBinding}
	GetMultiBinding : function( target, dp ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{DependencyObject} target
	//** @param{DependencyProperty} dp
	//** @returns{BindingExpressionBase}
	GetBindingExpressionBase : function( target, dp ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{DependencyObject} target
	//** @param{DependencyProperty} dp
	//** @returns{BindingExpression}
	GetBindingExpression : function( target, dp ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{DependencyObject} target
	//** @param{DependencyProperty} dp
	//** @returns{MultiBindingExpression}
	GetMultiBindingExpression : function( target, dp ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{DependencyObject} target
	//** @param{DependencyProperty} dp
	//** @returns{PriorityBindingExpression}
	GetPriorityBindingExpression : function( target, dp ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{DependencyObject} target
	//** @param{DependencyProperty} dp
	//** @returns{Void}
	ClearBinding : function( target, dp ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{DependencyObject} target
	//** @returns{Void}
	ClearAllBindings : function( target ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{DependencyObject} target
	//** @param{DependencyProperty} dp
	//** @returns{Boolean}
	IsDataBound : function( target, dp ){
		throw new NotImplementedException( arguments.callee.name );
	}
}



//** @base{MarkupExtension}
BindingBase = {
	__proto__ : System.Windows.Markup.MarkupExtension,
	//** @returns{BindingBase}
	constructor : function BindingBase(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Object}
	get FallbackValue(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Object} value
	set FallbackValue( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get StringFormat(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} value
	set StringFormat( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Object}
	get TargetNullValue(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Object} value
	set TargetNullValue( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get BindingGroupName(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} value
	set BindingGroupName( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	ShouldSerializeFallbackValue : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	ShouldSerializeTargetNullValue : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{IServiceProvider} serviceProvider
	//** @returns{Object}
	ProvideValue : function( serviceProvider ){
		throw new NotImplementedException( arguments.callee.name );
	}
}



//** @base{BindingBase}
function Binding(){};
Binding.prototype = {
	__proto__ : BindingBase,
	
	//** @returns{Binding}
	constructor : Binding,

	//** @returns{Collection}
	get ValidationRules(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get ValidatesOnExceptions(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Boolean} value
	set ValidatesOnExceptions( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get ValidatesOnDataErrors(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Boolean} value
	set ValidatesOnDataErrors( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{PropertyPath}
	get Path(){
		return this.__Path || new System.Object( System.Windows.PropertyPath );
	},

	//** @param{PropertyPath} value
	set Path( value ){
		this.__Path = value;
	},

	//** @returns{String}
	get XPath(){
		return this.__XPath || "";
	},

	//** @param{String} value
	set XPath( value ){
		this.__XPath = value;
	},

	//** @returns{BindingMode}
	get Mode(){
		return this.__Mode || BindingMode.Default;
	},

	//** @param{BindingMode} value
	set Mode( value ){
		this.__Mode = value;
	},

	//** @returns{UpdateSourceTrigger}
	get UpdateSourceTrigger(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{UpdateSourceTrigger} value
	set UpdateSourceTrigger( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get NotifyOnSourceUpdated(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Boolean} value
	set NotifyOnSourceUpdated( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get NotifyOnTargetUpdated(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Boolean} value
	set NotifyOnTargetUpdated( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get NotifyOnValidationError(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Boolean} value
	set NotifyOnValidationError( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{IValueConverter}
	get Converter(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{IValueConverter} value
	set Converter( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Object}
	get ConverterParameter(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Object} value
	set ConverterParameter( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{CultureInfo}
	get ConverterCulture(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{CultureInfo} value
	set ConverterCulture( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Object}
	get Source(){
		return this.__Source || null;
	},

	//** @param{Object} value
	set Source( value ){
		this.__Source = value;
	},

	//** @returns{RelativeSource}
	get RelativeSource(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{RelativeSource} value
	set RelativeSource( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get ElementName(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} value
	set ElementName( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsAsync(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Boolean} value
	set IsAsync( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Object}
	get AsyncState(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Object} value
	set AsyncState( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get BindsDirectlyToSource(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Boolean} value
	set BindsDirectlyToSource( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{UpdateSourceExceptionFilterCallback}
	get UpdateSourceExceptionFilter(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{UpdateSourceExceptionFilterCallback} value
	set UpdateSourceExceptionFilter( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{DependencyObject} element
	//** @param{EventHandler} handler
	//** @returns{Void}
	AddSourceUpdatedHandler : function( element, handler ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{DependencyObject} element
	//** @param{EventHandler} handler
	//** @returns{Void}
	RemoveSourceUpdatedHandler : function( element, handler ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{DependencyObject} element
	//** @param{EventHandler} handler
	//** @returns{Void}
	AddTargetUpdatedHandler : function( element, handler ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{DependencyObject} element
	//** @param{EventHandler} handler
	//** @returns{Void}
	RemoveTargetUpdatedHandler : function( element, handler ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{DependencyObject} target
	//** @returns{XmlNamespaceManager}
	GetXmlNamespaceManager : function( target ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @static
	//** @param{DependencyObject} target
	//** @param{XmlNamespaceManager} value
	//** @returns{Void}
	SetXmlNamespaceManager : function( target, value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	ShouldSerializeValidationRules : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	ShouldSerializePath : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	ShouldSerializeSource : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	}
}