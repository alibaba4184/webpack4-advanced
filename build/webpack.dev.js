const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.js')
const path = require('path')
// 引入webpack
const webpack = require('webpack')
const HOSTProd = 'http://zghdev.zhdj360.cn'
const HostTest = 'http://test.aixiaodou.cn'
const HostDev = 'http://aixiaodou.cn'
module.exports = merge(baseConfig, {
    mode: 'development',
    devServer: {
        open: true, //自动开启浏览器
        hot: true, //是否开启热模块更新
        port: 8082,
        compress: true, //是否开启压缩
         // contentBase: path.resolve(__dirname,'dist'),  //
        // 1.在没有使用html-webpack-plugin插件时，contentBase是有效的。给contentBase指定目录时，会直接读取这个目录下的内容，并且如果这个目录下有index.html，就直接打开这个index.html。如果没有就打开这个指定的目录，这时如果给index指定文件名。无效！！！
        // 2.当使用了html-webpack-plugin时，contentBase无效！！！！！。这时会直接打开打包代码输出的文件夹（output），并且打开这个文件夹下的index.html。如果这时指定了文件明给index属性，这个时候会打开output指定的文件夹并且打开这个index指定的文件明。
        proxy: {
            // /api/getUserInfo
            // 当前端请求 /api 地址时, 会将请求转发到 
            // http://localhost:9999/api
            // 举例: 客户端现在请求的时 /api/getUserInfo
            // 此时会将请求转发到: http://localhost:9999/api/getUserInfo
            // '/api': 'http://localhost:9999',
            // 此时会将请求转发到: http://localhost:9999/getUserInfo
            // '/getUserInfo': 'http://localhost:9999'
            '/api': {
                //   target: HOST,
                target: process.env.NODE_ENV === 'production' ? HOSTProd : process.env.NODE_ENV === 'development' ? HostDev : HostTest,
                // 转发请求时不会携带 /api
                // http://localhost:9999/getUserInfo
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    devtool: 'cheap-module-eval-source-map',  //开发环境中使用source-map,生产环境中不使用
    plugins: [
        // 定义环境变量
        new webpack.DefinePlugin({
            IS_DEV: 'true',
            // test: '1 +1',
            // test2: '"zs"' //zs如果是一个字符串需要用双引号包裹起来，这才表示是一个字符串，否则表示的是一个zs变量
        })
    ]

})