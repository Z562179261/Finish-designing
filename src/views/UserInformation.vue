<template>
    <div class="user">
        <div class="container mt-5">
            <div class="row tm-content-row">
                <div class="col-12 tm-block-col">
                </div>
            </div>
            <div class="row tm-content-row">
                <div class="tm-block-col tm-col-account-settings">
                    <div class="tm-bg-primary-dark tm-block tm-block-settings">
                        <h2 class="tm-block-title">账户设置</h2>
                        <form action="" class="tm-signup-form row">

                            <div class="form-group col-lg-6">
                                <label for="name">账户名称</label>
                                <input id="name" name="name" type="text" class="form-control validate"
                                    v-model="userdata.username" />
                            </div>
                            <div class="form-group col-lg-6">
                                <label for="email">账户邮箱</label>
                                <input id="email" name="email" type="email" class="form-control validate"
                                    v-model="userdata.email" />
                            </div>
                            <div class="form-group col-lg-6">
                                <label for="password">账户密码</label>
                                <input id="password" name="password" type="text" class="form-control validate"
                                    v-model="userdata.password" />
                            </div>
                            <div class="form-group col-lg-6">
                                <label for="phone">手机号码</label>
                                <input id="phone" name="phone" type="tel" class="form-control validate"
                                    v-model="userdata.phone" />
                            </div>
                            <div class="form-group col-lg-6">
                                <label class="tm-hide-sm">&nbsp;</label>
                                <button type="button" class="btn btn-primary btn-block text-uppercase" @click="update">
                                    更新您的账户
                                </button>
                            </div>
                            <div class="col-12">
                                <button type="button" class="btn btn-primary btn-block text-uppercase"
                                    @click="centerDialogVisible = true">
                                    删除您的账户
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <el-dialog v-model="centerDialogVisible" title="警告" width="75%" align-center>
            <span>确定要删除您的用户信息吗？</span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="centerDialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="deleteUser">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { onMounted, ref, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router"
import { ElMessage } from "element-plus"

interface UserData {
    id: number;
    username: string;
    password: string;
    phone: string;
    email: string,
}

const route = useRoute()
const router = useRouter()
let id = ref(route.query.id)
const centerDialogVisible = ref(false)
let userdata = ref<UserData>({
    id: 0,
    username: "",
    password: "",
    phone: "",
    email: "",

})

onMounted(() => {
    axios({
        url: "/localhost/getUser",
        method: "GET",
        params: {
            id: id.value
        }
    }).then(res => {
        userdata.value = res.data[0]
    })
})

const update = () => {
    let { username, phone, email, password } = toRefs(userdata.value)
    function regexp(): boolean {
        let flag: boolean = true
        const emailTest: RegExp = new RegExp(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/)
        const phoneTest: RegExp = new RegExp(/^1\d{10}$/)
        const length: RegExp = new RegExp(/^[A-z0-9]{6,15}$/)

        if (!emailTest.test(email.value)) {
            console.log('邮箱格式有问题')
            flag = false
        }
        if (!phoneTest.test(phone.value)) {
            console.log('电话格式有问题')
            flag = false
        }
        if (!length.test(username.value) && !length.test(password.value)) {
            console.log('账号和密码长度为6--15')
            flag = false
        }
        return flag
    }
    if (regexp()) {
        axios({
            url: "/localhost/updateUser",
            method: "POST",
            data: {
                userdata: userdata.value
            }
        }).then(res => {
            console.log(res.data);

            if (res.data.sqlMessage) {
                ElMessage({
                    type: "error",
                    message: "不能将数据更新成已存在的用户"
                })
            }
            else {
                ElMessage({
                    type: "success",
                    message: res.data
                })
            }

        })

    }
}

//实现删除按钮
const deleteUser = () => {
    centerDialogVisible.value = false
    if(userdata.value.id == 1){return ElMessage.error("您不能删除这个账号!!")}
    axios({
        url: "/localhost/deleteUser",
        method: "post",
        data: {
            id: userdata.value.id
        }
    }).then(res => {
        ElMessage({
            type: "success",
            message: res.data
        })
        ElMessage({
            type: "success",
            message: '正在为您跳转到登录页面'
        })
        setTimeout(() => {
            router.replace("/login")
        }, 2000);
    })
}
</script>

<style  lang="less" scoped>
.user {
    min-height: 500px;

    .dialog-footer button:first-child {
        margin-right: 10px;
    }

    .content {
        border: 1px solid black;
        height: 300px;
    }
}
</style>