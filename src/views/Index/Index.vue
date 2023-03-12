<template>
    <div id="reportsPage">
        <div id="home">
            <nav class="navbar navbar-expand-xl">
                <div class="container h-100">
                    <h1 class="tm-site-title mb-0">疫情物资管理系统</h1>
                    <button class="navbar-toggler ml-auto mr-0" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <i class="fas fa-bars tm-nav-icon"></i>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mx-auto h-100">
                            <li class="nav-item">
                                <router-link class="nav-link active" href="#" :to="{ path: '/index/home' }">
                                    <i class="fas fa-tachometer-alt"></i>
                                    首页
                                    <span class="sr-only">(current)</span>
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link :to="{ name: 'dis', query: { id } }" class="nav-link">
                                    <i class=" fa fa-server"></i>
                                    仓库详细柱图展示
                                </router-link>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="far fa-file-alt"></i>
                                    <span>
                                        查询 <i class="fas fa-angle-down"></i>
                                    </span>
                                </a>
                                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <router-link class="dropdown-item"
                                        :to="{ name: 'query', params: { method: '地区' } }">根据地区查询</router-link>
                                    <router-link class="dropdown-item"
                                        :to="{ name: 'query', params: { method: '物资类型' } }">根据物资类型查询</router-link>
                                    <router-link class="dropdown-item"
                                        :to="{ name: 'query', params: { method: '供应商' } }">根据供应商查询</router-link>
                                </div>
                            </li>
                            <li class="nav-item" v-if="status">
                                <router-link class="nav-link" to="/index/add">
                                    <i class="fas fa-shopping-cart"></i>
                                    入库
                                </router-link>
                            </li>
                            <li class="nav-item" v-if="status">
                                <router-link class="nav-link" to="/index/out">
                                    <i class="fas fa-shopping-cart"></i>
                                    出库
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link :to="{ name: 'User', query: { id } }" class="nav-link">
                                    <i class="far fa-user"></i>
                                    用户个人信息
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link :to="{ name: 'msg', query: { name } }" class="nav-link">
                                    <i class="fa fa-comment"></i>
                                    留言板
                                </router-link>
                            </li>
                            <li class="nav-item" v-if="name == 'admin'">
                                <router-link class="nav-link" to="/index/per">
                                    <i class="fa fa-cog"></i>
                                    修改用户权限
                                </router-link>
                            </li>
                            <li class="nav-item">
                                
                                <span class="nav-link" @click="quit">
                                    <i class="fa fa-power-off"></i>
                                    退出登录
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div class="container">
                <!-- row -->
                <router-view></router-view>
            </div>
            <footer class="tm-footer row tm-mt-small">
                <div class="col-12 font-weight-light">
                    <p class="text-center text-white mb-0 px-4 small">
                        ZhangYang &copy; 2023.Epidemic material management system.
                    </p>
                </div>
            </footer>
        </div>


        <div class="backTop" @click="backTop" v-if="divShow">
            回到顶部
        </div>
    </div>
</template>

<script setup lang="ts">
import "./Index"
import { useRoute, useRouter } from "vue-router"
import { ref, onMounted, } from "vue";
import { ElMessage } from "element-plus"
import axios from "axios";
const route = useRoute()
const router = useRouter()
const id = localStorage.getItem("token")
const name = route.query.name
const user = ref()
const divShow = ref(false)
const status = ref(false)
axios({ url: "/localhost/getUser", params: { id } }).then(res => {
        user.value = res.data[0]
        if(user.value.status){
            status.value = true
        }
        
    })

const quit = () => {
    ElMessage.success('退出登录成功！')
    localStorage.removeItem("token")
    setTimeout(() => {
        router.replace("/login")
    }, 1000);
}
onMounted(() => {
    window.addEventListener('scroll', scrollToTop)
})
let timer: any = null
const backTop = () => {
    timer = setInterval(function () {
        let backTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        let speedTop = backTop / 5;
        document.documentElement.scrollTop = backTop - speedTop;
        if (backTop === 0) {
            clearInterval(timer)
        }
    }, 30);
}

function scrollToTop(this: Window, ev: Event) {
    let scroll = document.documentElement.scrollTop


    if (scroll >= 50) {
        divShow.value = true
    } else {
        divShow.value = false
    }
}
</script>


<style>
.backTop {
    position: fixed;
    width: 20vw;
    height: 20vw;
    right: 5vw;
    bottom: 3vw;
    border-radius: 100%;
    background-color: rgba(245, 166, 35, .4);
    color: white;
    border: none;
    font-weight: bold;
    line-height: 20vw;
    text-align: center;
    animation: 1s te;
}

@keyframes te {
    to {
        right: 5vw;
    }

    from {
        right: -50vw;
    }
}
</style>