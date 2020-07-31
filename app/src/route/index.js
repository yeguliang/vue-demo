import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router = new Router({
    linkActiveClass: 'selected',
    linkExactActiveClass: 'normal',
    scrollBehavior(to, from, savePosition) {//滚动行为
        //console.log(to) //进入的目标对象
        //console.log(from) //离开的路由对象
        console.log(savePosition)//记录滚动路由坐标
        if (savePosition) {
            return savePosition //针对鼠标点击浏览器前进后台，如果记录到坐标存在就返回出来之前坐标，
        } else {
            return { x: 0, y: 0 } //否则都返回默认的（0,0）
        }
        //值得注意的是在谷歌浏览器上我发现即使不设置，好像也一样
    },
    mode: 'history',
    base: '/',
    routes: require('./route').routes
})

// // 路由钩子函数
// //beforeEach即将要进某个路由时候
router.beforeEach((to, from, next) => {
    if (to.meta.login) {
        next(true) //false时候阻止路由执行，默认是true
        // next('/login') 在这里判断到后去跳到登录页面，先要在路由里配置
        console.log("当前是个404组件，需要登录访问，其实你还没有登录，不过看你可怜兮兮，我暂时让你旁观！")
    } else {
        next()
    }
})

// //afterEach进入组件之后，当然，就没有next了，已经进入了组件
router.afterEach((to, from) => {
    if (to.meta.title) {
        //当进入了组件后，如果meta里有title就设置title(注意，这个位置document前面需要加上window才能访问)
        window.document.title = to.meta.title;
        console.log(from)
    } else {
        window.document.title = '世上最完整的vue-router案例'
    }
})

export default router

