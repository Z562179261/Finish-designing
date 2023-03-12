<template>
    <h2>出库管理</h2>
    <div class="demo-collapse">
        <el-collapse v-model="activeName" accordion style="font-size: 6vw;">
            <el-collapse-item :title="item.region + '---------------' + item.name" v-for="item, index in data"
                :key="item.id" :name="index">
                <div>
                    <h5>详情</h5>
                    <div class="box">
                        <div>数量:{{ item.number }}</div>
                        <div>物资价格:{{ item.price }} </div>
                        <div>物资类型:{{ item.class }}</div>
                        <div>供应商:{{ item.vendor }} </div>
                        <div>总价:{{ item.price * item.number }} </div>
                    </div>
                </div>
                <div class="sumbit">
                    <div><b style="font-size: 4vw;">出库数量：</b><input type="text" v-model="item.outNUmber"></div> <button class="button" @click="out(index)">出库</button>
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from "axios"
import { ElMessage } from "element-plus"
interface IMaterialData {
    id: number;
    class: string;
    name: string;
    number: number;
    price: number;
    region: string;
    vendor: string;
    outNUmber: number | string;
}
const activeName = ref('1')
const data = ref<IMaterialData[]>([])
const getData = () => {
    axios({
        url: "/localhost/regionarticle",
        method: "GET"
    }).then(res => {
        data.value = res.data[0]
        data.value.forEach(e => {
            e.outNUmber = ""
        });
    })
}

onMounted(getData)


const out = (index: number) => {
    const newData = data.value[index]
    console.log(newData);
    if (Number(newData.outNUmber) < 0) {
        
        return ElMessage.error("请提供正确的数量");
    }
    if (!newData.outNUmber) {
        return ElMessage.error("请提供值");
    }
    if (newData.number < Number(newData.outNUmber)) {
        return  ElMessage.error("出库数量不得大于仓库数量");
    }
    axios({
        url: "/localhost/updataData",
        method: "POST",
        data: {
            class: newData.class,
            id: newData.id,
            name: newData.name,
            number: newData.number - Number(newData.outNUmber),
            price: newData.price,
            region: newData.region,
            vendor: newData.vendor
        }
    }).then(res => {
        ElMessage.success(res.data)
        getData()
    })
}
</script>

<style scoped>
h2 {
    color: white;
    width: 100vw;
    margin: 3vh auto;
    text-align: center;
}

.sumbit {
    display: flex;
    justify-content: center;
}

.box>div {
    font-size: 5vw;
}

.button{
        background-color: #f5a623;
        color: white;
        width: 15vw;
        height: 4vh;
        border: none;
        margin-left: 3vw;
        font-weight: bold;
    }

:deep(.el-collapse-item__header) {
    font-size: 18px;
    color: white;
    font-weight: bold;
    background-color: #4E657A;
}

:deep(.el-collapse-item__content) {
    background-color: #4E657A;
    color: azure;
}


</style>