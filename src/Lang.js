/**
    LangJS
    
    Multilanguage support for Webapps
    
    Author  :   Fabs/Fabio Gianini
    Mail    :   faebeee@gmail.com
    Repo    :   https://github.com/faebeee/LangJS
    Web     : http://www.owesome.ch
    
    (c) by Team Owesome
*/
var LangJS = {};
LangJS.version = 1;
LangJS.loadLang = function( langCode){
    LangJS.Config.langCode = langCode;
    LangJS.Core.load(langCode);
}
LangJS.setUrl = function( dir ){
    LangJS.Config.baseURL = dir;
}
LangJS.setDebug = function( d ){
    LangJS.Config.debug  = d;
}
LangJS.setFallbackLanguage = function( fallback){
    LangJS.Config.fallbackLang = fallback; 
}
LangJS.init = function(){
    var lang = navigator.language;
    LangJS.Core.load(lang.split("-")[0]);
}

LangJS.Config = {};
LangJS.Config.baseURL = "";
LangJS.Config.attributeName = "lang-js";
LangJS.Config.fallbackLang = "en";
LangJS.Config.langCode = "";
LangJS.Config.debug = false;

LangJS.Data = {};
LangJS.Data.ajax = null;
LangJS.Data.languages = new Array();

LangJS.Core = {};
LangJS.Core.debug = function(data){
    if(LangJS.Config.debug == true)
        console.log("LangJS >> "+data);
}
LangJS.Core.load = function( langCode ){
    LangJS.Core.debug("Load file for '"+langCode+"'");
    if (typeof window.ActiveXObject != 'undefined' ) {
        LangJS.Data.ajax = new ActiveXObject("Microsoft.XMLHTTP");
        LangJS.Data.ajax.onreadystatechange = LangJS.Core.proceed ;
    }
    else {
        LangJS.Data.ajax = new XMLHttpRequest();
        LangJS.Data.ajax.onload = LangJS.Core.onLoad;
    }
    LangJS.Data.ajax.open( "GET", LangJS.Config.baseURL+"/"+langCode+".json", true );
    LangJS.Data.ajax.send();
    
    LangJS.Core.debug("Load "+LangJS.Config.baseURL+"/"+langCode+".json");
}
LangJS.Core.proceed = function(  ){
    var s = document.querySelectorAll("["+LangJS.Config.attributeName+"]");
    
    for(var i = 0; i < s.length; i++){
        var element = s[i];
        element.innerHTML = LangJS.Data.languages[LangJS.Config.langCode][element.getAttribute(LangJS.Config.attributeName)];
    }
}
LangJS.Core.onLoad = function(){
    LangJS.Data.languages[LangJS.Config.langCode] = JSON.parse(LangJS.Data.ajax.responseText.trim());
    LangJS.Core.proceed();
}