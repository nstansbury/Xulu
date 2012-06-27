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


var EXPORTED_SYMBOLS = ["StringBuilder","Encoding","Encoder","EncoderFallback","Decoder","DecoderFallback"];

Components.utils.import( "resource://xulu/assemblies/System.jsm" );

//** @returns{StringBuilder}
function StringBuilder( value, startIndex, length, capacity )	{
	this._stack = ( value != null ) ? [value] : [];
	this._capacity = capacity || 16;
}

//** @base{Object}
StringBuilder.prototype = {
	
	//** @returns{Int32}
	get Capacity(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} value
	set Capacity( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Int32}
	get MaxCapacity(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Int32}
	get Length(){
		var str = this._stack.join( "" );
		return str.length;
	},

	//** @param{Int32} value
	set Length( value ){
		var str = this._stack.join( "" );
		if ( value < str.length )	{
			this._stack = [ str.substr( 0, value ) ];
		}
		else if ( value > str.length )	{
			var pad = new Array( value - str.length );
			this._stack = this._stack.concat( pad );
		}
		if ( value > this._capacity )	{
			this._capacity = value;
		}
	},

	//** @returns{Char}
	get Chars(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Char} value
	set Chars( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} capacity
	//** @returns{Int32}
	EnsureCapacity : function( capacity ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} startIndex
	//** @param{Int32} length
	//** @returns{String}
	ToString : function( startIndex, length ){
		var str = this._stack.join( "" );
		if ( startIndex == undefined ) {
			startIndex = 0;
		}
		if ( length == undefined )	{
			length = str.length;
		}
		return str.slice( startIndex, length );
	},

	//** @param{Array} value
	//** @param{Int32} startIndex
	//** @param{Int32} charCount
	//** @returns{StringBuilder}
	Append : function( value, startIndex, charCount ){
		this._stack.push( value.toString() );
		return this;
	},

	//** @param{String} value
	//** @returns{StringBuilder}
	AppendLine : function( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} sourceIndex
	//** @param{Array} destination
	//** @param{Int32} destinationIndex
	//** @param{Int32} count
	//** @returns{Void}
	CopyTo : function( sourceIndex, destination, destinationIndex, count ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} startIndex
	//** @param{Int32} length
	//** @returns{StringBuilder}
	Remove : function( startIndex, length ){
		throw new NotImplementedException( arguments.callee.name );
	},


	//** @param{Int32} index
	//** @param{Array} value
	//** @param{Int32} startIndex
	//** @param{Int32} charCount
	//** @returns{StringBuilder}
	Insert : function( index, value, startIndex, charCount ){
		startIndex = ( startIndex == undefined ) ? 0 : startIndex;
		charCount = ( charCount == undefined ) ? value.length : charCount;
		value = value.slice( startIndex, charCount );
		var start = this._stack.slice( 0, index )
		var end = this._stack.slice( index, this._stack.length )
		this._stack = start.concat( value, end );
		return this;
	},

	//** @param{String} format
	//** @param{Object} arg0
	//** @returns{StringBuilder}
	AppendFormat : function( format, arg0 ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} format
	//** @param{Object} arg0
	//** @param{Object} arg1
	//** @returns{StringBuilder}
	AppendFormat : function( format, arg0, arg1 ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} format
	//** @param{Object} arg0
	//** @param{Object} arg1
	//** @param{Object} arg2
	//** @returns{StringBuilder}
	AppendFormat : function( format, arg0, arg1, arg2 ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} format
	//** @param{Array} args
	//** @returns{StringBuilder}
	AppendFormat : function( format, args ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{IFormatProvider} provider
	//** @param{String} format
	//** @param{Array} args
	//** @returns{StringBuilder}
	AppendFormat : function( provider, format, args ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} oldValue
	//** @param{String} newValue
	//** @returns{StringBuilder}
	Replace : function( oldValue, newValue ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} oldValue
	//** @param{String} newValue
	//** @param{Int32} startIndex
	//** @param{Int32} count
	//** @returns{StringBuilder}
	Replace : function( oldValue, newValue, startIndex, count ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{StringBuilder} sb
	//** @returns{Boolean}
	Equals : function( sb ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Char} oldChar
	//** @param{Char} newChar
	//** @returns{StringBuilder}
	Replace : function( oldChar, newChar ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Char} oldChar
	//** @param{Char} newChar
	//** @param{Int32} startIndex
	//** @param{Int32} count
	//** @returns{StringBuilder}
	Replace : function( oldChar, newChar, startIndex, count ){
		throw new NotImplementedException( arguments.callee.name );
	}

}



//** @base{Object}
Encoding = {

	//** @returns{Encoding}
	constructor : function(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get BodyName(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get EncodingName(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get HeaderName(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{String}
	get WebName(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Int32}
	get WindowsCodePage(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsBrowserDisplay(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsBrowserSave(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsMailNewsDisplay(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsMailNewsSave(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsSingleByte(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{EncoderFallback}
	get EncoderFallback(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{EncoderFallback} value
	set EncoderFallback( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{DecoderFallback}
	get DecoderFallback(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{DecoderFallback} value
	set DecoderFallback( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	get IsReadOnly(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Encoding}
	get ASCII(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Int32}
	get CodePage(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Encoding}
	get Default(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Encoding}
	get Unicode(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Encoding}
	get BigEndianUnicode(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Encoding}
	get UTF7(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Encoding}
	get UTF8(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Encoding}
	get UTF32(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Encoding} srcEncoding
	//** @param{Encoding} dstEncoding
	//** @param{Array} bytes
	//** @returns{Array}
	Convert : function( srcEncoding, dstEncoding, bytes ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Encoding} srcEncoding
	//** @param{Encoding} dstEncoding
	//** @param{Array} bytes
	//** @param{Int32} index
	//** @param{Int32} count
	//** @returns{Array}
	Convert : function( srcEncoding, dstEncoding, bytes, index, count ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} codepage
	//** @returns{Encoding}
	GetEncoding : function( codepage ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} codepage
	//** @param{EncoderFallback} encoderFallback
	//** @param{DecoderFallback} decoderFallback
	//** @returns{Encoding}
	GetEncoding : function( codepage, encoderFallback, decoderFallback ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} name
	//** @returns{Encoding}
	GetEncoding : function( name ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} name
	//** @param{EncoderFallback} encoderFallback
	//** @param{DecoderFallback} decoderFallback
	//** @returns{Encoding}
	GetEncoding : function( name, encoderFallback, decoderFallback ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Array}
	GetEncodings : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Array}
	GetPreamble : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Object}
	Clone : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} chars
	//** @returns{Int32}
	GetByteCount : function( chars ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} s
	//** @returns{Int32}
	GetByteCount : function( s ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} chars
	//** @param{Int32} index
	//** @param{Int32} count
	//** @returns{Int32}
	GetByteCount : function( chars, index, count ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} chars
	//** @param{Int32} count
	//** @returns{Int32}
	GetByteCount : function( chars, count ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} chars
	//** @returns{Array}
	GetBytes : function( chars ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} chars
	//** @param{Int32} index
	//** @param{Int32} count
	//** @returns{Array}
	GetBytes : function( chars, index, count ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} chars
	//** @param{Int32} charIndex
	//** @param{Int32} charCount
	//** @param{Array} bytes
	//** @param{Int32} byteIndex
	//** @returns{Int32}
	GetBytes : function( chars, charIndex, charCount, bytes, byteIndex ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} s
	//** @returns{Array}
	GetBytes : function( s ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{String} s
	//** @param{Int32} charIndex
	//** @param{Int32} charCount
	//** @param{Array} bytes
	//** @param{Int32} byteIndex
	//** @returns{Int32}
	GetBytes : function( s, charIndex, charCount, bytes, byteIndex ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} chars
	//** @param{Int32} charCount
	//** @param{Array} bytes
	//** @param{Int32} byteCount
	//** @returns{Int32}
	GetBytes : function( chars, charCount, bytes, byteCount ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} bytes
	//** @returns{Int32}
	GetCharCount : function( bytes ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} bytes
	//** @param{Int32} index
	//** @param{Int32} count
	//** @returns{Int32}
	GetCharCount : function( bytes, index, count ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} bytes
	//** @param{Int32} count
	//** @returns{Int32}
	GetCharCount : function( bytes, count ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} bytes
	//** @returns{Array}
	GetChars : function( bytes ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} bytes
	//** @param{Int32} index
	//** @param{Int32} count
	//** @returns{Array}
	GetChars : function( bytes, index, count ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} bytes
	//** @param{Int32} byteIndex
	//** @param{Int32} byteCount
	//** @param{Array} chars
	//** @param{Int32} charIndex
	//** @returns{Int32}
	GetChars : function( bytes, byteIndex, byteCount, chars, charIndex ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} bytes
	//** @param{Int32} byteCount
	//** @param{Array} chars
	//** @param{Int32} charCount
	//** @returns{Int32}
	GetChars : function( bytes, byteCount, chars, charCount ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Boolean}
	IsAlwaysNormalized : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{NormalizationForm} form
	//** @returns{Boolean}
	IsAlwaysNormalized : function( form ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Decoder}
	GetDecoder : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Encoder}
	GetEncoder : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} charCount
	//** @returns{Int32}
	GetMaxByteCount : function( charCount ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Int32} byteCount
	//** @returns{Int32}
	GetMaxCharCount : function( byteCount ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} bytes
	//** @returns{String}
	GetString : function( bytes ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} bytes
	//** @param{Int32} index
	//** @param{Int32} count
	//** @returns{String}
	GetString : function( bytes, index, count ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Object} value
	//** @returns{Boolean}
	Equals : function( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Int32}
	GetHashCode : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	}

}


//** @base{Object}
Encoder = {

	//** @returns{Encoder}
	constructor : function(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{EncoderFallback}
	get Fallback(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{EncoderFallback} value
	set Fallback( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{EncoderFallbackBuffer}
	get FallbackBuffer(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Void}
	Reset : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} chars
	//** @param{Int32} index
	//** @param{Int32} count
	//** @param{Boolean} flush
	//** @returns{Int32}
	GetByteCount : function( chars, index, count, flush ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} chars
	//** @param{Int32} count
	//** @param{Boolean} flush
	//** @returns{Int32}
	GetByteCount : function( chars, count, flush ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} chars
	//** @param{Int32} charIndex
	//** @param{Int32} charCount
	//** @param{Array} bytes
	//** @param{Int32} byteIndex
	//** @param{Boolean} flush
	//** @returns{Int32}
	GetBytes : function( chars, charIndex, charCount, bytes, byteIndex, flush ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} chars
	//** @param{Int32} charCount
	//** @param{Array} bytes
	//** @param{Int32} byteCount
	//** @param{Boolean} flush
	//** @returns{Int32}
	GetBytes : function( chars, charCount, bytes, byteCount, flush ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} chars
	//** @param{Int32} charIndex
	//** @param{Int32} charCount
	//** @param{Array} bytes
	//** @param{Int32} byteIndex
	//** @param{Int32} byteCount
	//** @param{Boolean} flush
	//** @param{Array} charsUsed
	//** @param{Array} bytesUsed
	//** @param{Array} completed
	//** @returns{Void}
	Convert : function( chars, charIndex, charCount, bytes, byteIndex, byteCount, flush, charsUsed, bytesUsed, completed ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} chars
	//** @param{Int32} charCount
	//** @param{Array} bytes
	//** @param{Int32} byteCount
	//** @param{Boolean} flush
	//** @param{Array} charsUsed
	//** @param{Array} bytesUsed
	//** @param{Array} completed
	//** @returns{Void}
	Convert : function( chars, charCount, bytes, byteCount, flush, charsUsed, bytesUsed, completed ){
		throw new NotImplementedException( arguments.callee.name );
	}

}




//** @base{Object}
EncoderFallback = {

	//** @returns{EncoderFallback}
	constructor : function(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{EncoderFallback}
	get ReplacementFallback(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{EncoderFallback}
	get ExceptionFallback(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Int32}
	get MaxCharCount(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{EncoderFallbackBuffer}
	CreateFallbackBuffer : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	}

}


//** @base{Object}
Decoder = {

	//** @returns{Decoder}
	constructor : function(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{DecoderFallback}
	get Fallback(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{DecoderFallback} value
	set Fallback( value ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{DecoderFallbackBuffer}
	get FallbackBuffer(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Void}
	Reset : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} bytes
	//** @param{Int32} index
	//** @param{Int32} count
	//** @returns{Int32}
	GetCharCount : function( bytes, index, count ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} bytes
	//** @param{Int32} index
	//** @param{Int32} count
	//** @param{Boolean} flush
	//** @returns{Int32}
	GetCharCount : function( bytes, index, count, flush ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} bytes
	//** @param{Int32} count
	//** @param{Boolean} flush
	//** @returns{Int32}
	GetCharCount : function( bytes, count, flush ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} bytes
	//** @param{Int32} byteIndex
	//** @param{Int32} byteCount
	//** @param{Array} chars
	//** @param{Int32} charIndex
	//** @returns{Int32}
	GetChars : function( bytes, byteIndex, byteCount, chars, charIndex ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} bytes
	//** @param{Int32} byteIndex
	//** @param{Int32} byteCount
	//** @param{Array} chars
	//** @param{Int32} charIndex
	//** @param{Boolean} flush
	//** @returns{Int32}
	GetChars : function( bytes, byteIndex, byteCount, chars, charIndex, flush ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} bytes
	//** @param{Int32} byteCount
	//** @param{Array} chars
	//** @param{Int32} charCount
	//** @param{Boolean} flush
	//** @returns{Int32}
	GetChars : function( bytes, byteCount, chars, charCount, flush ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} bytes
	//** @param{Int32} byteIndex
	//** @param{Int32} byteCount
	//** @param{Array} chars
	//** @param{Int32} charIndex
	//** @param{Int32} charCount
	//** @param{Boolean} flush
	//** @param{Array} bytesUsed
	//** @param{Array} charsUsed
	//** @param{Array} completed
	//** @returns{Void}
	Convert : function( bytes, byteIndex, byteCount, chars, charIndex, charCount, flush, bytesUsed, charsUsed, completed ){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @param{Array} bytes
	//** @param{Int32} byteCount
	//** @param{Array} chars
	//** @param{Int32} charCount
	//** @param{Boolean} flush
	//** @param{Array} bytesUsed
	//** @param{Array} charsUsed
	//** @param{Array} completed
	//** @returns{Void}
	Convert : function( bytes, byteCount, chars, charCount, flush, bytesUsed, charsUsed, completed ){
		throw new NotImplementedException( arguments.callee.name );
	}

}


//** @base{Object}
DecoderFallback = {

	//** @returns{DecoderFallback}
	constructor : function(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{DecoderFallback}
	get ReplacementFallback(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{DecoderFallback}
	get ExceptionFallback(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{Int32}
	get MaxCharCount(){
		throw new NotImplementedException( arguments.callee.name );
	},

	//** @returns{DecoderFallbackBuffer}
	CreateFallbackBuffer : function(  ){
		throw new NotImplementedException( arguments.callee.name );
	}

}