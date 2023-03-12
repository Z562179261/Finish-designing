<template>
    <div class="wraps">
        <div ref="bar" class="bar"></div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
let speed = ref<number>(1)
let bar = ref<HTMLDivElement>()
let timer = ref<number>(0)
const startLoading = () => {
    let dom = bar.value!
    speed.value = 1
    // console.log(dom);
    timer.value = window.requestAnimationFrame(function fn() {
        if (speed.value < 90) {
            speed.value += 1
            dom.style.width = speed.value + "%"
            timer.value = window.requestAnimationFrame(fn)
        } else {
            speed.value = 1
            window.cancelAnimationFrame(timer.value)
        }
    })
}
const endLoading = () => {
    let dom = bar.value!
    setTimeout(() => {
        window.requestAnimationFrame(() => {
            speed.value = 100
            dom.style.width = speed.value + "%"
        })
    }, 500);

}


defineExpose({
    startLoading, endLoading
})
</script>

<style scoped lang="less">
.wraps {
    position: fixed;
    top: 0;
    width: 100%;
    height:2px;

    .bar {
        height: inherit;
        width: 0;
        background-color: blue;
    }
}
</style>