export default [
    {
        path: '/demo/test',
        name: '测试页面',
        meta: {
            keepAlive: true,
            title: '测试页面',
        },
        component: resolve => require(['@/pages/demo/test'], resolve)
    },





]
