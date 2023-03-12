<template>
    <div class="content">
        <div class="import">
            <h2>留言板</h2>
            <el-input v-model.trim="textarea1" :autosize="{ minRows: 3, maxRows: 10 }" type="textarea"
                placeholder="输入您的看法及宝贵的意见" />
            <button @click="submit">提交</button>
        </div>
        <el-card class="box-card animate__animated animate__bounceInDown" v-for="item in msgList" :key="item.date">
            <div class="card-header">
                <span>{{ item.name }}</span>
                <button v-if="item.id == id" @click="deleteMsg(item.date)">删除</button>
            </div>
            <hr>
            <div class="text item">{{ item.msg }}</div>
            <p> {{ item.date }}</p>
        </el-card>


    </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import "animate.css"
import { ElMessage } from 'element-plus';
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router';

interface Msg {
    id: number;
    name: string;
    msg: string;
    date: string;
}
let msgList = ref<Msg[]>([])
const textarea1 = ref('')
const route = useRoute()
const name = ref(route.query.name)
let id: number | null;
if (localStorage.getItem("token") as unknown) {
    id = Number(localStorage.getItem("token"))
}
const getMsg = (): void => {
    axios({
        url: "/localhost/getmsg",
    }).then(res => {
        msgList.value = res.data
        for(let i=0;i<msgList.value.length-1;i++){
            for(let j=0;j<msgList.value.length-i-1;j++){
                let d1 = new Date(msgList.value[j].date).getTime()
                let d2 = new Date(msgList.value[j+1].date).getTime()
                if( d1<d2){
                    let tmp = msgList.value[j]
                    msgList.value[j]  = msgList.value[j+1]
                    msgList.value[j+1] =tmp
                }
            }
        }
    })
}
onMounted(() => {
    getMsg()
})
const submit = () => {
    let date = new Date()
    axios({ url: "/localhost/getUser", params: { id: localStorage.getItem("token") } }).then(res => {
        name.value = res.data[0].username
        if (!textarea1.value) { return ElMessage.error("不要留空值哦") }
        axios({
            url: "/localhost/msg",
            method: "POST",
            data: {
                date: date.toLocaleString(),
                id,
                name: name.value,
                msg: textarea1.value
            }
        }).then(res => {
            if (res.data) {
                ElMessage.success("留言成功")
                getMsg()
                textarea1.value = ""
            }
        })
    })

}

const deleteMsg = (date: string) => {
    axios({
        url: "/localhost/deleteMsg",
        method: "POST",
        data: {
            date: date
        }
    }).then(res => {
        if (res.data) {
            ElMessage.success("留言已删除！！")
            getMsg()
        }
    })
}
</script>

<style scoped lang="less">
.content {
    min-height: 80vh;

    & .import {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        &>* {
            margin: 2vw;
        }

        h2 {
            color: white;
        }

        button {
            width: 50vw;
            background-color: #f5a623;
            color: white;
            height: 5vh;
            border: none;
            font-weight: bold;
        }

        :deep(.el-textarea__inner) {
            width: 90vw;
        }
    }

    .box-card {
        margin: 3vw 0;

        width: 90vw;
        background-color: #4E657A;
        color: white;
        position: relative;

        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: white;
            background-color: #567086;

            button {
                width: 15vw;
                background-color: #f5a623;
                color: white;
                height: 5vh;
                border: none;
                font-weight: bold;
            }
        }

    }

    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    & p {
        position: absolute;
        bottom: 0;
        right: 5px;
    }
}</style>