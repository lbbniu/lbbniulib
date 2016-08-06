/**
 * Created by lbbniu on 16/8/5.
 *
 * 常用js函数库封装
 * 都是工具方法
 * 支持amd加载
 */
(function(global, factory) {
    if (typeof define === 'function' && define.amd)
        define(function() { return factory(global) });
    else
        factory(global)
}(this, function(window) {
    var lbbniu = (function () {
        var lbb = {};
        var cookiedomain = isUndefined(cookiedomain) ? '' : cookiedomain;
        var cookiepath = isUndefined(cookiepath) ? '' : cookiepath;
        var cookiepre = isUndefined(cookiepre) ? '' : cookiepre;

        lbb.setcookie = function (cookieName, cookieValue, seconds, path, domain, secure) {
            if(cookieValue == '' || seconds < 0) {
                cookieValue = '';
                seconds = -2592000;
            }
            if(seconds) {
                var expires = new Date();
                expires.setTime(expires.getTime() + seconds * 1000);
            }
            domain = !domain ? cookiedomain : domain;
            path = !path ? cookiepath : path;
            document.cookie = escape(cookiepre + cookieName) + '=' + escape(cookieValue)
                + (expires ? '; expires=' + expires.toGMTString() : '')
                + (path ? '; path=' + path : '/')
                + (domain ? '; domain=' + domain : '')
                + (secure ? '; secure' : '');
        };
        lbb.getcookie = function (name, nounescape) {
            name = cookiepre + name;
            var cookie_start = document.cookie.indexOf(name);
            var cookie_end = document.cookie.indexOf(";", cookie_start);
            if(cookie_start == -1) {
                return '';
            } else {
                var v = document.cookie.substring(cookie_start + name.length + 1, (cookie_end > cookie_start ? cookie_end : document.cookie.length));
                return !nounescape ? unescape(v) : v;
            }
        };
        lbb.in_array = function (needle, haystack) {
            if(typeof needle == 'string' || typeof needle == 'number') {
                for(var i in haystack) {
                    if(haystack[i] == needle) {
                        return true;
                    }
                }
            }
            return false;
        };

        lbb.trim = function (str) {
            return (str + '').replace(/(\s+)$/g, '').replace(/^\s+/g, '');
        };


        lbb.isWeiXin = function(){
            var ua = window.navigator.userAgent.toLowerCase();
            if(ua.match(/MicroMessenger/i) == 'micromessenger'){
                return true;
            }else{
                return false;
            }
        };
        
        function isUndefined(variable) {
            return typeof variable == 'undefined' ? true : false;
        }
        return lbb;
    })();

    window.lbbniu = lbbniu;
}));