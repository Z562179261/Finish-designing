<template>
    <div class="contain">
        <h4 class="animate__animated animate__zoomInDown">Welcome</h4>
        <div class="box animate__animated animate__flipInY">
            <input class="name hw" type="text" placeholder="姓名" v-model="name">
            <input class="password hw" type="text" placeholder="密码" v-model="password">

            <div class="in hw" @click="login">立即登录</div>
            <div class="other"><a href="#">忘记密码？丨</a><router-link to="/register">立即注册</router-link> </div>
        </div>
    </div>
</template>




<script setup lang="ts">
import { useRouter } from "vue-router"
import axios from 'axios';
import { ref } from 'vue';
import { ElMessage } from "element-plus"

const router = useRouter()

const name = ref("")
const password = ref("")
const login = () => {
    if (name.value && password.value) {
        axios({
            url: "/localhost",
            method: "get",
            params: {
                name: name.value,
                password: password.value
            },
        }).then(result => {
            if (result.data) {
                //跳转进入
                ElMessage({
                    type: "success",
                    message: `欢迎${name.value}`,
                    offset: 100
                })
                localStorage.setItem("token", result.data.id)
                router.push({
                    path: "/index", query: {
                        name: name.value,
                    }
                })
                name.value = ""
                password.value = ""
            } else {
                // alert("没有您的信息！！");
                ElMessage.error({ message: "没有您的信息！！", offset: 100 })
            }
        })
    } else {
        // alert("请输入完整!")
        ElMessage.error({ message: "请输入完整!", offset: 100 })
    }

}
</script>


<style scoped lang="less">
* {
    margin: 0;
    padding: 0;
    color: #ffffff;
    box-sizing: border-box;
}

//定义变量，因为设计图纸的视口宽度是320 因此定义变量以便使用
@vw: 3.2vw;

.hw {
    width: (235/@vw);
    height: (38/@vw);

    margin-bottom: (15/@vw);
    padding-left: (8/@vw);

    color: #ffffff;
    font-size: (13/@vw);
    line-height: (38/@vw);

    border-radius: 18px;
    border: solid 1px #ffffff;
    background-color: transparent;
    // outline:none;

    &:focus {
        border: transparent;
    }
}

.contain {
    height: (670/@vw);
    width: (375/@vw);
    background-image: linear-gradient(to right bottom, #6dcab7, #3979ca);

    h4 {
        position: fixed;
        top: (100/@vw);
        left: (60/@vw);
        font-size: (45/@vw);
    }

    .box {
        position: fixed;
        top: (200/@vw);
        left: (40/@vw);
        width: (235/@vw);

        .in {
            text-align: center;
            background-color: rgb(86, 179, 245);
        }

        .other {

            text-align: center;

            a {
                text-decoration: none;
                font: normal 400 (10/@vw) '微软雅黑';
            }
        }
    }
}
</style>