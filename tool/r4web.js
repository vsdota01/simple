var R4web=(function () {
	var _instance = null;
	return function () {
		if(_instance==null){
				_instance=this;
		}
		return _instance;
	}
})();
R4web.prototype._events = [];

//开启监听
R4web.prototype.begin = function(){
	var _that = this;
	document.body.addEventListener('click',this.listen.bind(this),true)
}

//结束监听
R4web.prototype.end = function(){
	this._events.splice(this._events.length-1,1);
	console.log(this._events)
	document.body.removeEventListener('click',this.listen.bind(this),false);
	this._events = [];
}

//监听事件源，记录相关信息
R4web.prototype.listen = function(event){
	console.log(event)
	//TODO case dom node
	var text = '';
	if(event.path[0].childNodes.length>0){
		text = event.path[0].childNodes[0].data
	}else{
		text = event.path[0].currentSrc
	}
	this._events.push({
		name:event.type,
		x:event.offsetX||event.pageX,
		y:event.offsetY||event.pageY,
		dom:event.path[0],
		text:text
	})
}
//接收异常网络请求信息
R4web.prototype.netError = function(){
	
}

//接收异常js报错信息
R4web.prototype.scriptError = function(){
	
}

//上传异常数据
R4web.prototype.httpPost = function(){
	
}