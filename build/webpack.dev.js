const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.js')
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
        // contentBase: './public'
        // publicPath: assetsPublicPath,
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