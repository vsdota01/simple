const CopyWebpackPlugin = require("copy-webpack-plugin");
// 去除无用的样式
const glob = require("glob");
const PurgecssWebpackPlugin = require("purgecss-webpack-plugin");
// 配置CDN
const HtmlWebpackExternalsPlugin = require("html-webpack-externals-plugin");

module.exports = {
  productionSourceMap: false,
  devServer: {
    disableHostCheck: true
  },
  publicPath: "./",

  css: {
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          require("./src/utils/pxtorem")([
            {
              remUnit: 32,
              exclude: /node_modules/i
            },
            {
              remUnit: 16,
              include: /vant/i
            }
          ])
        ]
      }
    }
  },
  chainWebpack: config => {
    // 移除 prefetch 插件
    config.plugins.delete("prefetch");
    // 移除 preload 插件
    config.plugins.delete("preload");
  },
  configureWebpack: config => {
    // 抽取公共代码块
    // config.optimization.splitChunks.cacheGroups.vendor = {
    //   chunks: "initial",
    //   minSize: 0,
    //   minChunks: 2,
    //   test: /node_modules/,
    //   priority: 1
    // };
    config.plugins.push(
      new PurgecssWebpackPlugin({
        paths: glob.sync("./src/**/*", { nodir: true })
      })
    );
    config.plugins.push(
      new HtmlWebpackExternalsPlugin({
        externals: [
          {
            module: "vue",
            entry: "https://cdn.bootcss.com/vue/2.6.10/vue.min.js",
            global: "Vue"
          },
          {
            module: "vue-router",
            entry: "https://cdn.bootcss.com/vue-router/3.1.3/vue-router.min.js",
            global: "VueRouter"
          },
          {
            module: "vuex",
            entry: "https://cdn.bootcss.com/vuex/3.1.2/vuex.min.js",
            global: "Vuex"
          },
          {
            module: "axios",
            entry: "https://cdn.bootcss.com/axios/0.19.2/axios.min.js",
            global: "axios"
          }
        ]
      })
    );
    config.plugins.push(
      new CopyWebpackPlugin([
        { from: "./MP_verify_NjCCrjg7QOk7gRjF.txt", to: "./" },
        { from: "./MP_verify_qsezSKh2Q2VF5QAQ.txt", to: "./" }
      ])
    );
  }
};
