/*
 * Copyright 2014-2015 Twitter, Inc.
 *
 * Licensed under the Creative Commons Attribution 3.0 Unported License. For
 * details, see https://creativecommons.org/licenses/by/3.0/.
 */
(function(){function c(){var f=/MSIE ([0-9.]+)/.exec(window.navigator.userAgent);if(f===null){return null}var h=parseInt(f[1],10);var g=Math.floor(h);return g}function a(){var f=new Function("/*@cc_on return @_jscript_version; @*/")();if(f===undefined){return 11}if(f<9){return 8}return f}var e=window.navigator.userAgent;if(e.indexOf("Opera")>-1||e.indexOf("Presto")>-1){return}var b=c();if(b===null){return}var d=a();if(b!==d){window.alert("WARNING: You appear to be using IE"+d+" in IE"+b+" emulation mode.\nIE emulation modes can behave significantly differently from ACTUAL older versions of IE.\nPLEASE DON'T FILE BOOTSTRAP BUGS based on testing in IE emulation modes!")}})();