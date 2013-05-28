/**
    LangJS
    
    Multilanguage support for Webapps
    
    Author  :   Fabs/Fabio Gianini
    Mail    :   faebeee@gmail.com
    Repo    :   https://github.com/faebeee/LangJS
    Web     :   http://www.owesome.ch
    Version :   1.2
    
    (c) by Team Owesome
*/
var LangJS = {};

/*
    Load a specific language by langCode
    @LangCode
        Code of the language. Lang same name as the name of the Lang file ...loadLang("en") -> en.json
*/
LangJS.loadLang = function( langCode){
    LangJS.Config.langCode = langCode;
    LangJS.Core.load(langCode);
}

/**
    Define the folder where all the lang files were stored
*/
LangJS.setUrl = function( dir ){
    LangJS.Config.baseURL = dir;
}

/**
    Define the callback language if a lang/file couldn't be loaded
*/
LangJS.setFallbackLanguage = function( fallback){
    LangJS.Config.fallbackLang = fallback; 
}

/**
    Loads a specific value by key of the current lang file    
*/
LangJS.get = function ( key ) {
    return LangJS.Data.languages[LangJS.Config.langCode][key] || "";    
}

/**
    initializes an language
*/
LangJS.init = function(langToLoad){
    langToLoad = langToLoad || navigator.language;
    if(langToLoad && langToLoad != null)
        lang = langToLoad;
    
    LangJS.Core.load(lang.split("-")[0]);
}

LangJS.Config = {};
LangJS.Config.baseURL = "";
LangJS.Config.attributeName = "lang-js";
LangJS.Config.fallbackLang = "en";
LangJS.Config.langCode = "";

LangJS.Data = {};
LangJS.Data.ajax = null;
LangJS.Data.languages = new Array();

LangJS.Core = {};

/**
    Load a language file
*/
LangJS.Core.load = function( langCode ){
    LangJS.Config.langCode = langCode;
    
    if(LangJS.Data.languages[langCode] == null){
            
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
    }else{  
        LangJS.Core.proceed();
    }
}

/**
    Proceed the data insert logic
*/
LangJS.Core.proceed = function(  ){
    var s = document.querySelectorAll("["+LangJS.Config.attributeName+"]");
    
    for(var i = 0; i < s.length; i++){
        var element = s[i];
        element.innerHTML = LangJS.get(element.getAttribute(LangJS.Config.attributeName));
    }
}

/**
    Handle after the file has been loaded
*/
LangJS.Core.onLoad = function(){
    LangJS.Data.languages[LangJS.Config.langCode] = JSON.parse(LangJS.Data.ajax.responseText.trim());
    LangJS.Core.proceed();
}

