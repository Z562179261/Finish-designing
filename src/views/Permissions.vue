<template>
    <div class="content">
        <h2>用户权限管理</h2>
        <div class="list">
            <el-table :data="userList" style="width: 100%" max-height="400" stripe header-cell-class-name="header">
                <el-table-column prop="username" label="姓名" width="100" />
                <el-table-column prop="phone" label="电话" width="80" />
                <el-table-column fixed="right" label="权限" width="120">
                    <template #default="scope">
                        <div v-if="scope.$index == 0">
                            <el-radio-group v-if="userList" v-model="userList[0].status">
                                <el-radio :label="0" border disabled>用&#12288;户</el-radio>
                                <el-radio :label="1" border>管理员</el-radio>
                            </el-radio-group>
                        </div>
                        <div v-else>
                            <el-radio-group v-if="userList" v-model="userList[scope.$index].status">
                                <el-radio :label="0" border>用&#12288;户</el-radio>
                                <el-radio :label="1" border>管理员</el-radio>
                            </el-radio-group>
                        </div>

                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="删除" width="70">
                    <template #default="scope">
                        <div v-if="scope.$index == 0">
                            <el-button link type="primary" size="small" disabled>
                                删除
                            </el-button>
                        </div>
                        <div v-else>
                            <el-button link type="primary" size="small"
                                @click.prevent="deleteRow(userList![scope.$index].id)">
                                删除
                            </el-button>
                        </div>

                    </template>
                </el-table-column>
            </el-table>
        </div>



        <el-dialog v-model="centerDialogVisible" title="警告" width="80%" align-center>
            <span>确定删除该用户?</span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="centerDialogVisible = false">返回</el-button>
                    <el-button type="primary" @click="successFun">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import axios from 'axios';
import { ElMessage } from 'element-plus';
interface UserList {
    id: number;
    username: string;
    password: string;
    phone: string;
    status: boolean;
    email: string;
}

let removeId = ref(0)
const centerDialogVisible = ref(false)
const userList = ref<UserList[]>([])
const once = <T>(fn: Function | null) => {
    return (...args: T[]) => {
        if (fn) {
            fn.call(this, ...args)
            fn = null
        }
    }
}

const getAlluser = () => {
    axios.get("/localhost/getAlluser").then(res => {
        userList.value = res.data
        console.log(userList.value);
        setWatch()
    })
}
getAlluser()


const deleteRow = (id: number) => {
    removeId.value = id
    centerDialogVisible.value = true
}

const successFun = () => {
    centerDialogVisible.value = false
    axios({
        url: "/localhost/deleteUser",
        method: "post",
        data: {
            id: removeId.value
        }
    }).then(res => {
        ElMessage.success(res.data)
        getAlluser()
    })
}



const setWatch = once(() => {
    for (let i = 0; i < userList.value.length; i++) {
        watch(() => userList.value[i], (newVal) => {
            if (newVal) {
                const { id, status } = newVal
                axios({
                    url: "/localhost/updateUserStatus",
                    method: "POST",
                    data: {
                        id, status
                    }
                }).then(res => {
                    ElMessage.success(res.data)
                })
            }
        }, { deep: true })
    }
})

</script>

<style scoped lang="less">
.content {
    min-height: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;

    & h2 {
        margin: 5vh;
        color: white;
    }

    :deep(.cell) {
        text-align: center;

    }

    .dialog-footer button:first-child {
        margin-right: 10px;
    }
}
</style>