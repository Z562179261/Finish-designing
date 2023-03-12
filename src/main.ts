import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
import VNode from "./Vnode/index"
import 'animate.css';
import ElementPlus from "element-plus"
import {ElMessage} from "element-plus"
import "element-plus/dist/index.css"
import "bootstrap"
import $ from "jquery"

const app = createApp(App)
app.use(router)
app.use($)
app.use(ElementPlus)


const whileList = ['/','/Exhibition','/login','/register']
//路由前置守卫
router.beforeEach((to, from, next) => {
    VNode.component?.exposed?.startLoading()
    if (whileList.includes(to.path) || localStorage.getItem("token")) {
        next()
    }
    else {
        ElMessage.error("请您先登录")
        next('/login')
    }
})
//路由后置守卫
router.afterEach((to, from) => {
    VNode.component?.exposed?.endLoading()
})
app.mount('#app')