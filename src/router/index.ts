import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/Exhibition'
    },
    {
        path: '/Exhibition',
        component: () => import('../views/Exhibition.vue')
    },
    {
        path: '/login',
        component: () => import('../views/Login.vue'),
    },
    {
        path: '/register',
        component: () => import('../views/Reg.vue')
    },
    {
        path: "/index",
        component: () => import("../views/Index/Index.vue"),
        children: [
            {
                path: "",
                redirect: "/index/home"
            },
            {
                path: "home",
                component: () => import("../views/Home.vue")
            },
            {
                path: "user",
                name:"User",
                component: () => import("../views/UserInformation.vue")
            },
            {
                path:"add",
                name:"add",
                component:()=>import("../views/AddData.vue")
            },
            {
                path:"out",
                name:"out",
                component:()=>import("../views/OutBound.vue")
            },
            {
                path:"query/:method",
                name:"query",
                component:()=>import("../views/Query.vue")
            },
            {
                path:"msg",
                name:"msg",
                component:()=>import("../views/MessageBoards.vue")
            },
            {
                path:"dis",
                name:"dis",
                component:()=>import("../views/Display.vue")
            },
            {
                path:"per",
                name:"per",
                component:()=>import("../views/Permissions.vue")
            },
        ]
    },
    {
        path: "/:catchAll(.*)",
        component: () => import('../views/NotFound.vue')
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router