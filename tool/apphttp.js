// import wk from '@/utils/wk.js'
import {
  BASEURL,
  timeout
} from '@/app.config'

var apphttp = {
  config: {},
  create: function (params) {
    console.log(params)
    var _create = (function (params) {
      var _insa = function () {
        return Object.assign(apphttp.config, params)
      }
      _insa.post = function (params) {
        console.log(params)
      }
      return _insa
    })()
    return _create
  }
}

export const create = con => {
  const ajax = apphttp.create({
    baseURL: BASEURL,
    timeout,
    ...con
  })
  return ajax
}

const request = create()
export default request
