<template>
    <div class="row">
        <div class="col">
            <p class="text-white mt-5 mb-5">欢迎, <b>{{ userName }}</b>!!</p>
        </div>
    </div>
    <div class="row tm-content-row">
        <div class="col-12  tm-block-col">
            <div class="tm-bg-primary-dark tm-block tm-block-taller tm-block-scroll">
                <h2 class="tm-block-title">仓库数据详细情况</h2>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col" style="word-break:break-all">物资类型</th>
                            <th scope="col">物资名称</th>
                            <th scope="col">数量</th>
                            <th scope="col">单价</th>
                            <th scope="col">所属区域</th>
                            <th scope="col">供应商</th>
                            <th scope="col">总价</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in materialData" :key="item.id">
                            <th scope="row">{{ item.class }}</th>
                            <td>{{ item.name }}</td>
                            <td><b>{{ item.number }}</b></td>
                            <td><b>{{ item.price }}</b></td>
                            <td><b>{{ item.region }}</b></td>
                            <td><b>{{ item.vendor }}</b></td>
                            <td><b>{{ item.number * item.price }}￥</b></td>
                        </tr>
                        <tr style="visibility:hidden">
                            <th scope="row"><b>66666666</b></th>
                            <td>
                                666666666
                            </td>
                            <td><b>66666</b></td>
                            <td><b>66666</b></td>
                            <td><b>66666666</b></td>
                            <td>666666666666666</td>
                            <td>66666</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6 tm-block-col">
            <div class="tm-bg-primary-dark tm-block tm-block-taller tm-block-overflow">
                <h2 class="tm-block-title">供应商列表</h2>
                <div class="tm-notification-items">
                    <div class="media tm-notification-item" v-for="item in vendor" :key="item.id">
                        <div class="tm-gray-circle"><img src="@/assets/img/notification-03.jpg" alt="Avatar Image"
                                class="rounded-circle"></div>
                        <div class="media-body">
                            <p class="mb-2">{{ item.name }}</p>
                            <br>
                            <p class="mb-2">电话：{{ item.phone }}</p>
                            <span class="tm-small tm-text-color-secondary"><b>联系人:</b>{{
                                item.contactsurname
                            }}女士</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">

import { onMounted, ref } from "vue"
import axios from "axios"
import { useRoute } from "vue-router"

interface IMaterialData {
    id: number;
    class: string;
    name: string;
    number: number;
    price: number;
    region: string;
    vendor: string;
}
interface IVendorData {
    id: number;
    name: string;
    phone: string;
    contactsurname: string;
}

let route = useRoute()
let id =  localStorage.getItem("token")
let userName = ref("")

let materialData = ref<Array<IMaterialData>>([])
let vendor = ref<IVendorData[]>([])
    axios({
        url: "/localhost/getUser",
        method: "GET",
        params: {
            id: id
        }
    }).then(res => {
        userName.value = res.data[0].username
    })
onMounted(() => {
    axios({
        url: "/localhost/regionarticle",
        method: "get"
    }).then(res => {
        materialData.value = res.data[0]
        vendor.value = res.data[1]
    })
})

</script>

<style scoped></style>