1.ios手机储存空间不足时候会把系统认为无用的信息清理掉（localstorage，cookie等），给主要程序提供运行环境。
	解决方案
	native开发类似localstorage的功能
	token存入native端
	前端启动时查询native端是否存在token，存在就同步到localstorage，不存在，跳转登陆页面