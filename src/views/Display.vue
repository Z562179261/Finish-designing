<template>
    <div class="content">
        <h3>仓库详细柱图展示</h3>
        <div ref="main" class="main"> </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import axios from "axios";
import generate from "../echarts/index"

let main = ref<HTMLElement>()
onMounted( async()=>{
    let result = await axios({ url: "/localhost/regionarticle" })
    if(main.value){
        generate(main.value,result.data[0])
    }
})
</script>

<style scoped lang="less">
.content {
    width: 100%;
    min-height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;

    h3 {
        color: white;
        margin: 3vw;
    }

    & .main {
        min-height: 80vh;
        width: 100%;
    }
}
</style>