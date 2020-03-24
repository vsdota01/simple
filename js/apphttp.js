import wk from '@/utils/wk.js'
import {
  BASEURL,
  timeout
} from '@/app.config'

const httprequest = (params = {}) => new Promise((resolve, reject) => wk.httpRequest(params, res => {
  let _res
  if (typeof res === 'string') {
    _res = JSON.parse(res)
  } else {
    _res = res || {}
  }
  if (_res.code === 200) {
    resolve(_res.data)
  } else {
    reject(_res.message)
  }
}))
// function httprequest (params, callback) {
//   wk.httpRequest(params, resp => {
//     callback.call(this, resp)
//   })
// }
var apphttp = {
  config: {},
  // 参考axios写法，实现create函数
  create: function (params) {
    // config保留字段，用于合并基础参数
    var config = Object.assign(apphttp.config, params)
    var _create = (function () {
      // 实现create即是函数又是对象 如create() create.post()
      var _insa = function (apiurl, json, header) {
        let _url = ''
        let _type = ''
        let _params = {}
        // 兼容axios的request(params) params是对象，get/post在参数中
        if (typeof apiurl === 'object') {
          _type = apiurl.method
          _url = apiurl.url
          // 兼容参数中不同对象的取值方式
          if (_type.toLocaleLowerCase() === 'get') {
            _params = apiurl.params
          } else {
            _params = apiurl.data
          }
        } else {
          _type = 'get'
          _params = json.params
          _url = apiurl
        }
        var data = { type: _type, path: _url, data: _params, header: Object.assign({ payPlatform: 'H5' }, header) }
        // 兼容request().then的Promise写法
        return httprequest(data)
      }
      // 兼容axios的request.post请求方式
      _insa.post = function (apiurl, json, header) {
        const _url = apiurl
        var data = { type: 'post', path: _url, data: json, header: Object.assign({ payPlatform: 'H5' }, header) }
        return httprequest(data)
      }
      return _insa
    })(config)
    return _create
  }
}

export const appcreate = con => {
  const ajax = apphttp.create({
    baseURL: BASEURL,
    timeout,
    ...con
  })
  return ajax
}

const request = appcreate()
export default request
