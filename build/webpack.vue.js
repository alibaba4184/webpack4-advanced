const path = require('path')
const webpack = require('webpack')
module.exports = {
    mode: 'production',
    entry: {
        vue: [
            'vue/dist/vue.js',
            'vue-router',
            "vuex"
        ]
    },
    output: {
        filename: '[name]_dll.js',
        path: path.resolve(__dirname, '../dist'),
        library: '[name]_dll' //最终会在全局暴露一个vue_dll的对象
    },
    plugins: [
        new webpack.DllPlugin({
            name: '[name]_dll',
            path: path.resolve(__dirname, '../dist/manifest.json')   //清单文件，说明有哪些库被打包成dll文件了
        }),
    ]
}