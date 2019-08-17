const path = require('path')
const webpack = require('webpack')
// 获取配置文件，读取sdk列表
const config = require('./config.json')
let arr = new Array()
let sdkSet = new Set(config.SDK)
let sdkArr = Array.from(sdkSet)
arr.length = sdkArr.length
// 最终输出状态
let flag = true
webpack(
  {
    entry: './src/main.js',
    resolve: {
      alias: {
        '@': path.join(__dirname, './src')
      }
    }
  }, (err, stats) => {
    // stats.compilation.fileDependencies获取所有依赖文件
    let modules = stats.compilation.fileDependencies
    for (let item of modules) {
      for (let i = 0; i < sdkArr.length; i++) {
        if (item.match(sdkArr[i])) {
          arr[i] = true
          break
        }
      }
    }
    for (let i = 0; i < arr.length; i++) {
      if (!arr[i]) {
        flag = false
        console.log(sdkArr[i] + ' 未引用')
      }
    }
    if (!flag) {
      console.log('code review : fail')
    } else {
      console.log('code review : success')
    }
    if (err) {
      console.error(err)
    }
  })
