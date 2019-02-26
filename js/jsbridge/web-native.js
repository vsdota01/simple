var jsBridgeFlag = false;//防止android多次监听
function setupWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
    if(navigator.userAgent.toLowerCase().indexOf('android') > -1 && !jsBridgeFlag){
    	jsBridgeFlag = true;
    	document.addEventListener('WebViewJavascriptBridgeReady', function() {
			callback(WebViewJavascriptBridge)
		}, false)
    	return;
    }
    if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'wvjbscheme://__bridge_loaded__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0);
}
/**
 * 此处注册公共方法供native调用 不涉及业务
 */
setupWebViewJavascriptBridge(function(jsBridge){
	jsBridge.registerHandler("functionInJs",function(resp){
		console.log(JSON.stringify(resp))
		document.getElementById("token").innerHTML=JSON.stringify(resp);
	})
})
function callHandle(funName,data,jscallback){
	setupWebViewJavascriptBridge(function(jsBridge){
		jsBridge.callHandler(funName,data,function(resp){
			jscallback.call(this,resp);
		})
	})
}
function registerHandle(jsFunName,jscallback){
	setupWebViewJavascriptBridge(function(jsBridge){
		jsBridge.registerHandler(jsFunName,function(resp){
			jscallback.call(this,resp);
		})
	})
}

/**
 * 此处封装公共js函数供业务调用
 * 待添加
 */
var wk = (function(){
	function submitFromWeb(data,callback){
		callHandle("submitFromWeb",data,function(resp){
			callback.call(this,resp);
		});
	}
	function register(jsFunName,jscallback){
		 registerHandle(jsFunName,callback)
	}
	return {
		submitFromWeb:submitFromWeb,
		register:register
	}
})();
