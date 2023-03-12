<template>
    <div class="contain">
        <h4 class="animate__animated animate__zoomInDown">register</h4>
        <div class="box animate__animated animate__flipInY">
            <input class="name hw" type="text" placeholder="姓名" v-model.trim="name">
            <input class="phone hw" type="text" placeholder="电话" v-model.trim="phone">
            <input class="email hw" type="text" placeholder="邮箱" v-model.trim="email">
            <input class="password hw" type="text" placeholder="密码" v-model.trim="password">
            <div class="in hw" @click="reg">立即注册</div>
            <div class="other"><router-link to="/login">注册完成啦？点我返回登录</router-link></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref } from "vue"

import { ElMessage } from "element-plus"
const name = ref("")
const phone = ref("")
const email = ref("")
const password = ref("")
function regexp(): boolean {
    let flag: boolean = true
    const emailTest: RegExp = new RegExp(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/)
    const phoneTest: RegExp = new RegExp(/^1\d{10}$/)
    const length: RegExp = new RegExp(/^[A-z0-9]{6,15}$/)

    if (!emailTest.test(email.value)) {
        ElMessage({
            type: "warning",
            message: "邮箱格式有问题",
            offset: 100
        })
        flag = false
    }
    if (!phoneTest.test(phone.value)) {
        ElMessage({
            type: "warning",
            message: "电话格式有问题",
            offset: 100
        })
        flag = false
    }
    if (!length.test(name.value)) {
        ElMessage({
            type: "warning",
            message: "账号长度为6--15",
            offset: 100
        })
        flag = false
    }
    if (!length.test(password.value)) {
        ElMessage({
            type: "warning",
            message: "密码长度为6--15",
            offset: 100
        })
        flag = false
    }
    return flag
}

const reg = () => {
    let result: boolean = regexp()
    if (result) {
        axios({
            url: "/localhost",
            method: "post",
            data: {
                name: name.value,
                phone: phone.value,
                email: email.value,
                password: password.value,
            }
        }).then(res => {
            console.log(res);
            if (res.data.sqlMessage) {
                // alert(res.data.sqlMessage + "此用户信息已经注册！！")
                ElMessage({
                    type: "error",
                    message: res.data.sqlMessage + "此用户信息已经注册！！",
                    offset: 100
                })
            }
            else ElMessage({
                type: "success",
                message: "注册成功！！",
                offset: 100
            })
        })
    } else {
        ElMessage({
            type: "error",
            message: "在检查一下吧！！",
            offset: 100
        })
    }
}
</script>

<style scoped lang="less">
* {
    color: #ffffff;
    box-sizing: border-box;
}

//定义变量，因为我的设计图纸的视口宽度是320 因此定义变量以便使用
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
    background-image: linear-gradient(to right bottom, gray, #3979ca);

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

        ::-webkit-input-placeholder {
            color: white;
        }

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
}</style>