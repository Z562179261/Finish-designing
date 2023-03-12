<template>
    <div class="query">
        <div class="params">
            <h3>根据{{ method }}来查询</h3>
            <input type="text" v-model.trim="queryParams">
        </div>
        <div class="col-12  tm-block-col">
            <div class="tm-bg-primary-dark tm-block tm-block-taller tm-block-scroll">
                <h2 class="tm-block-title">仓库数据详细情况</h2>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">序号</th>
                            <th scope="col">物资类型</th>
                            <th scope="col">物资名称</th>
                            <th scope="col">数量</th>
                            <th scope="col">单价</th>
                            <th scope="col">所属区域</th>
                            <th scope="col">供应商</th>
                            <th scope="col">总价</th>
                            <th scope="col" v-if="status">修改</th>
                            <th scope="col" v-if="status">删除</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item, index in materialData" :key="item.id">
                            <td>{{ index + 1 }}</td>
                            <td scope="row" v-if="item.flag">{{ item.class }}</td>
                            <td v-if="item.flag">{{ item.name }}</td>
                            <td v-if="item.flag"><b>{{ item.number }}</b></td>
                            <td v-if="item.flag"><b>{{ item.price }}</b></td>
                            <td v-if="item.flag"><b>{{ item.region }}</b></td>
                            <td v-if="item.flag"><b>{{ item.vendor }}</b></td>

                            <td v-if="!item.flag"><input type="text" v-model="item.class"></td>
                            <td v-if="!item.flag"><input type="text" v-model="item.name"></td>
                            <td v-if="!item.flag"><input type="text" v-model="item.number"></td>
                            <td v-if="!item.flag"><input type="text" v-model="item.price"></td>
                            <td v-if="!item.flag"><input type="text" v-model="item.region"></td>
                            <td v-if="!item.flag"><input type="text" v-model="item.vendor"></td>
                            <td><b>{{ (item.number * item.price).toFixed(2) }}￥</b></td>
                            <td v-if="status">
                            <td v-if="item.flag"><button class="button" @click="updateItem(index)">修改</button></td>
                            <td v-if="!item.flag"><button class="button" @click="postItem(item.id)">确认</button></td>
                            </td>

                            <td v-if="status"><button class="button" @click="removeItem(item.id)">删除</button></td>
                        </tr>
                        <tr style="visibility:hidden">
                            <td><b>6666</b></td>
                            <th scope="row"><b>66666666</b></th>
                            <td>
                                666666666
                            </td>
                            <td><b>66666</b></td>
                            <td><b>66666</b></td>
                            <td><b>66666666</b></td>
                            <td>666666666666666</td>
                            <td>66666</td>
                            <td v-if="status">66666</td>
                            <td v-if="status">66666</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="main" ref="main"></div>
    </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus"
import { useRoute, onBeforeRouteUpdate } from "vue-router"
import { ref, watch, reactive } from "vue";
import axios from "axios";
import generate from "../echarts";

interface IMaterialData {
    id: number;
    class: string;
    name: string;
    number: number;
    price: number;
    region: string;
    vendor: string;
    flag?: boolean;
}

const route = useRoute()
let method = ref(route.params.method)
let status = ref(false)
const queryParams = ref('')
const materialData = ref<IMaterialData[]>([])
let main = ref<HTMLElement>()
onBeforeRouteUpdate(to => {
    method.value = to.params.method
})

axios({
    url: "/localhost/getUser",
    params: { id: localStorage.getItem("token") }
}).then(res => {
    status.value = res.data[0].status

})
const debounce = (fn: Function, time: number) => {
    let timer: any = null;
    return <T>(...args: T[]) => {
        if (timer) {
            clearTimeout(timer)
            timer = null
        }
        timer = setTimeout(() => {
            fn.call(this, ...args)
        }, time);
    }
}


watch(queryParams, debounce(() => {
    getData()
}, 500), { immediate: true })

const getData = () => {
    axios({
        url: "/localhost/queryData",
        method: "POST",
        data: {
            method: method.value,
            queryParams: queryParams.value
        }
    }).then(res => {
        materialData.value = res.data
        materialData.value.forEach(i => i.flag = true)
        if (main.value) {
            generate(main.value, materialData.value)
        }
    })
}

const updateItem = (id: number) => {
    materialData.value[id].flag = false

}
const postItem = (id: number) => {
    let data: any;
    for (const i of materialData.value) {
        if (i.id == id) {
            data = i
        }
    }
    if (data) {
        let materialList: string[] = reactive([]);
        let regionList: string[] = reactive([]);
        let firmList: string[] = reactive([]);
        axios("/localhost/getClass").then(res => {
            res.data[0].forEach((i: { class: string; }) => { materialList.push(i.class) });
            res.data[1].forEach((i: { province: string; }) => { regionList.push(i.province) });
            res.data[2].forEach((i: { name: string; }) => { firmList.push(i.name) });
            if (!materialList.includes(data.class)) {
                return ElMessage.error("没有这个物资分类,您的数据不会被提交！！")
            }
            if (!regionList.includes(data.region)) {
                return ElMessage.error("没有这个地区分类,您的数据不会被提交！！")
            }
            if (!firmList.includes(data.vendor)) {
                return ElMessage.error("没有这个公司分类,您的数据不会被提交！！")
            }
            axios({
                url: "/localhost/updataData",
                method: "POST",
                data: {
                    id: data?.id,
                    class: data.class,
                    name: data.name,
                    number: data.number,
                    price: data.price,
                    region: data.region,
                    vendor: data.vendor,
                }
            }).then(res => {
                ElMessage.success(res.data)
            })
        })
        data.flag = true
    }
}

const removeItem = (id: number) => {
    ElMessage.success("已经删除！")
    axios({
        url: "/localhost/removeData",
        params: {
            id
        }
    }).then(res => {
        ElMessage.success(res.data)
        queryParams.value = ""
    })
}
</script>

<style lang="less" scoped>
.query {
    min-height: 80vh;

    .params {
        height: 20vh;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .button {
        background-color: #f5a623;
        color: white;
        width: 15vw;
        height: 5vh;
        border: none;
        font-weight: bold;
    }

    .main {
        height: 50vh;
        width: 100%;
    }
}
</style>