const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.js')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const webpack = require('webpack')
module.exports = merge(baseConfig, {
    mode: 'production',
    devtool: 'none', //生产环境下一般不用souce-map
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
        splitChunks: {
            chunks: 'all', // 只对异步加载的模块进行拆分，可选值还有all | initial
            minSize: 30000, // 模块最少大于30KB才拆分
            maxSize: 0,  // 模块大小无上限，只要大于30KB都拆分
            minChunks: 1, // 模块最少引用一次才会被拆分
            maxAsyncRequests: 5, // 异步加载时同时发送的请求数量最大不能超过5,超过5的部分不拆分
            maxInitialRequests: 3, // 页面初始化时同时发送的请求数量最大不能超过3,超过3的部分不拆分
            automaticNameDelimiter: '~', // 默认的连接符
            name: true, // 拆分的chunk名,设为true表示根据模块名和CacheGroup的key来自动生成,使用上面连接符连接
            cacheGroups: { // 缓存组配置,上面配置读取完成后进行拆分,如果需要把多个模块拆分到一个文件,就需要缓存,所以命名为缓存组
                vendors: { // 自定义缓存组名
                    test: /[\\/]node_modules[\\/]/, // 检查node_modules目录,只要模块在该目录下就使用上面配置拆分到这个组
                    priority: -10 // 权重-10,决定了哪个组优先匹配,例如node_modules下有个模块要拆分,同时满足vendors和default组,此时就会分到vendors组,因为-10 > -20
                },
                default: { // 默认缓存组名
                    minChunks: 1, // 最少引用两次才会被拆分
                    priority: -20, // 权重-20
                    reuseExistingChunk: true // 如果主入口中引入了两个模块,其中一个正好也引用了后一个,就会直接复用,无需引用两次
                }
            }
        }
    },
    // webpack4默认采用的JS压缩插件为：`uglifyjs-webpack-plugin`，在`mini-css-extract-plugin`上一个版本中还推荐使用该插件，但最新的v0.6中建议使用`teser-webpack-plugin`来完成js代码压缩，
    plugins: [
        new webpack.DefinePlugin({
            IS_DEV: 'false'// DefinePlugin会解析定义的环境变量表达式, 当成JS执行
        })
    ]
})