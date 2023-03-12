<template>
    <div class="container tm-mt-big tm-mb-big">
        <div class="row">
            <div class="col-xl-9 col-lg-10 col-md-12 col-sm-12 mx-auto">
                <div class="tm-bg-primary-dark tm-block tm-block-h-auto">
                    <div class="row">
                        <div class="col-12">
                            <h2 class="tm-block-title d-inline-block">增加一条新的数据</h2>
                        </div>
                    </div>
                    <div class="row tm-edit-product-row">
                        <div class="col-xl-6 col-lg-6 col-md-12">
                            <div class="tm-edit-product-form">
                                <div class="form-group mb-3">
                                    <label for="name">物资类型
                                    </label>
                                    <select class="custom-select tm-select-accounts" id="class"
                                        v-model.trim="newData.class">
                                        <option selected v-for="item in materialList" :key="item.id" :value="item.class">{{
                                            item.class }}</option>
                                    </select>
                                </div>
                                <div class="form-group mb-3">
                                    <label for="description">物资名称</label>
                                    <textarea class="form-control validate" rows="3" required v-model.trim="newData.name"></textarea>
                                </div>
                                <div class="form-group mb-3">
                                    <label for="category">地区</label>
                                    <select class="custom-select tm-select-accounts" id="category"
                                        v-model.trim="newData.region">
                                        <option v-for="item in regionList" :key="item.id" :value="item.province">{{
                                            item.province }}</option>
                                    </select>
                                </div>
                                <div class="form-group mb-3">
                                    <label for="category">供应商</label>
                                    <select class="custom-select tm-select-accounts" id="category"
                                        v-model.trim="newData.vendor">
                                        <option v-for="item in firmList" :key="item.id" :value="item.name">{{ item.name }}
                                        </option>
                                    </select>
                                </div>
                                <div class="row">
                                    <div class="form-group mb-3 col-xs-12 col-sm-6">
                                        <label for="expire_date">数量
                                        </label>
                                        <input id="expire_date" name="expire_date" type="text" class="form-control validate"
                                            required v-model.trim="newData.number" data-large-mode="true" />
                                    </div>
                                    <div class="form-group mb-3 col-xs-12 col-sm-6">
                                        <label for="stock">单价
                                        </label>
                                        <input id="stock" name="stock" type="text" class="form-control validate" required
                                            v-model.trim="newData.price" />
                                    </div>
                                    <div class="form-group mb-3 col-xs-12 col-sm-6">
                                        <label for="stock">总价
                                        </label>
                                        <h4 style="color: white;">{{ sum }}</h4>
                                    </div>
                                </div>

                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-12 mx-auto mb-4">


                            </div>
                            <div class="col-12">
                                <button type="button" class="btn btn-primary btn-block text-uppercase"
                                    @click="add">增加</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import axios from "axios"
import { ref, onMounted, reactive, computed } from "vue"
import { ElMessage } from "element-plus"
interface IMaterialList {
    id: number;
    class: string;
}
interface IRegionList {
    id: number;
    province: string;
}
interface IFirmList {
    id: number;
    name: string;
    contactsurname: string;
    phone: string;
}
interface IMaterialData {
    class: string;
    name: string;
    number: number | string;
    price: number | string;
    region: string;
    vendor: string;
}


const materialList = ref<IMaterialList[]>([])
const regionList = ref<IRegionList[]>([])
const firmList = ref<IFirmList[]>([])
const newData = reactive<IMaterialData>({
    class: "",
    name: "",
    number: "",
    price: "",
    region: "",
    vendor: "",
})
let sum = computed(() => {
    let num1 = Number(newData.number)
    let num2 = Number(newData.price)
    if (Number.isNaN(num1 * num2)) {
        return "请您输入正确的数值！！"
    } else {
        return Number(newData.number) * Number(newData.price) + "￥"
    }
})
onMounted(() => {
    axios({
        url: "/localhost/getClass",
        method: "get"
    })
        .then(res => {
            console.log(res);
            
            materialList.value = res.data[0]
            regionList.value = res.data[1]
            firmList.value = res.data[2]
        })
})

const add = () => {
    axios({
        url:"/localhost/add",
        method:"POST",
        data:{
            newData:newData
        }
    }).then(res=>{
        ElMessage.success(res.data)
    })

}
</script>

<style scoped></style>