import App from './App.vue';
import Vue from 'vue/dist/vue.js';
import "./assets/css/common.less"
import '@babel/polyfill'  //为了兼容ES6高级新语法
import router from './router/index'
import store from './store'//vueX
import ElementUI from 'element-ui';
import $ from 'jquery'
import { a } from "./other.js"
import moment from "moment"
import 'moment/locale/zh-cn'
moment.locale('zh-CN')
console.log(moment().subtract(6, 'days').calendar())
console.log('a', a)
console.log($)
Vue.use(ElementUI);
// import axios from "axios";
// window.$('h2').css({
//     'color': 'green',
//     'fontSize': '25px'
// })
$(function () {
    $('<div></div>').html('index').appendTo('body')
})
$('h2').css({
    'color': 'green',
    'fontSize': '25px'
})
// 将模块进行动态导入---返回一个Promise对象
// function getComponent() {
//     return import('jquery').then(({ default: $ }) => {
//         return $('<div></div>').html('mainhahah')
//     })
// }
// getComponent().then(item => item.appendTo('body'))

// 应用与好处
// window.onload = function () {
//     document.getElementById('btn').onclick = function () {
//         getComponent().then(item => {
//             item.appendTo('body')
//         })
//     }
// }
// console.log(IS_DEV, test, test2)
// import { getUserInfo } from "./api/http.js"
// getUserInfo().then(() => { }, (err) => {
//     console.log(err)
// })
// 1,cors跨域资源共享的方法解决跨域
// axios.get('http://localhost:9999/api/getUserInfo')
//     .then(result => console.log(result))
// 2,使用proxy进行代理服务器进行跨域
// axios.get('/api/getUserInfo')
//     .then(result => console.log(result))


// 模块热更替
if (module.hot) {
    module.hot.accept('./lib/hotModule.js', function () {
        console.log('模块更新了', str)
        let str = require('./lib/hotModule')
    })
}
new Vue({
    // 通过h把App组件挂载到html里面，这里只是声明了渲染的是组件App的内容，还需通过$mount挂载到html的一个节点上面
    router,
    store,
    render: (h) => h(App)
}).$mount("#app");