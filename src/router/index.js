import Vue from 'vue/dist/vue.js'; // 完整版的vuejs
import VueRouter from 'vue-router'
import demo from './modules/demo.js';
Vue.use(VueRouter)

const router = new VueRouter({
    // base: __dirname,
    // https://blog.csdn.net/qyl_0316/article/details/109116953
    // mode: 'history', // 访问路径不带#号  访问路径带#  hash 默认是hash模式
    // base: '/page/aa',  // 配置单页应用的基路径
    base: IS_DEV === "false" ? "/vueAdmin" : "/",
    routes: [
        {
            path: '/',
            name: 'Admin',
            component: resolve => require(['@/pages/admin'], resolve),
            children: [

                {
                    path: '/',
                    name: 'index',
                    meta: {
                        keepAlive: true,
                        title: '首页',
                    },
                    component: resolve => require([`@/pages/index/index`], resolve)
                },
                // 子路由
                ...demo
                // ...setting,
                // ...organizationTransfer,
                // ...branchWork,

            ]
        },
        {
            path: '/404',
            name: '404',
            component: resolve => require(['@/pages/error-page/404'], resolve)
        },
        {
            path: '/login',
            name: 'Login',
            component: resolve => require(['@/pages/login/login'], resolve)
        }
    ]
})
// router.beforeEach((to, from, next) => {
//     let that = router.app;
//     //获取本地的token
//     const token = localStorage.getItem("token");
//     //是否是个人中心页面
//     const patharr = ['/'];
//     //这里通过indexOf来检验to.path有没有admin页面
//     if (patharr.indexOf(to.path) > -1) {
//         if (token) {
//             return next();
//         } else {
//             return router.push({
//                 path: '/login'
//             }).catch(err => {
//                 //这里catch捕获了错误，在前端就不会显示了
//                 console.log(err)
//             });
//         }
//     } else {
//         //这里有个保底的操作,其他页面直接放行
//         next();
//     }
//     //防止报错 Avoided redundant navigation to current location: "/partyManage/party/list" ---重复路由的问题
//     const originalPush = VueRouter.prototype.push
//     VueRouter.prototype.push = function push(location) {
//         return originalPush.call(this, location).catch(err => err)
//     }

//     const originalReplace = VueRouter.prototype.replace;
//     VueRouter.prototype.replace = function replace(location) {
//         return originalReplace.call(this, location).catch(err => err);
//     }
//     if (to.matched.length === 0) {
//         //如果未匹配到路由
//         next({ path: '/404' });
//         that.$message({ type: 'error', message: '正在建设中.....' });
//     } else if (to.name === 'Login') {
//         //正常进入登录页，不做token验证
//         next();

//     } else {
//         if (!localStorage.getItem("token")) {
//             //如果token不存在跳登录页
//             that.$message({ type: 'error', message: '请登录系统....' });
//             next({ path: '/login?page=' });
//         } else {

//             next();
//         }
//     }

// })
export default router;
