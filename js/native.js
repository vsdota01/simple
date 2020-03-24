var jsBridgeFlag = window.jsBridgeFlag || false// 防止android多次监听
function setupWebViewJavascriptBridge (callback) {
  if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge) }
  if (navigator.userAgent.toLowerCase().indexOf('android') > -1 && !jsBridgeFlag) {
		jsBridgeFlag = false
		document.addEventListener('WebViewJavascriptBridgeReady', function () {
		callback(WebViewJavascriptBridge)
	}, false)
		return
  }
  if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback) }
  window.WVJBCallbacks = [callback]
  var WVJBIframe = document.createElement('iframe')
  WVJBIframe.style.display = 'none'
  WVJBIframe.src = 'wvjbscheme://__bridge_loaded__'
  document.documentElement.appendChild(WVJBIframe)
  setTimeout(function () { document.documentElement.removeChild(WVJBIframe) }, 0)
}

//关闭webview
setupWebViewJavascriptBridge(function (jsBridge) {
	jsBridge.callHandler('common.pageExit')
})
//修改title
setupWebViewJavascriptBridge(function (jsBridge) {
	jsBridge.callHandler('common.setTitle':, { 'title': ''})
})