<script setup lang="ts">
import { onMounted, onUpdated, reactive, toRefs } from "vue";
import List from "./List.vue";
import ScrollCom from "./ScrollCom.vue";
import gsap from "gsap"
// import type { IData } from "../type/index";

import { InteData, initDataFun } from "../pageJs/index";

const data = reactive(new InteData());
let num1 = reactive<{ [name: string]: number }>({
  noSymptom: 0,
  input: 0,
  confirm: 0,
  dead: 0,
  heal: 0,
  sum: 0,
})

function numFunction():void{
  setTimeout(() => {
    let data = chinaTotal.value
    gsap.to(num1, {
      duration: 1.5,
      noSymptom: data.extData.noSymptom,
      input: data.total.input,
      confirm: data.total.confirm,
      dead: data.total.dead,
      heal: data.total.heal,
      sum: data.total.confirm - data.total.dead - data.total.heal
    })
  }, 1000);
}
onMounted(() => {
    initDataFun(data);
    numFunction()
});


const { chinaTotal, hbData, china } = toRefs(data);

const tabChange = (type: number) => {
  data.type = type;
};

const mapTypeChange = (type: number) => {
  console.log(type);

  data.mapType = type;
};

let page: number = 0;

const getList = () => {
  if (page === data.areaTree.length - 1) {
    data.isScroll = false;
    return;
  }
  console.log("加载下一页");

  // 子组件触发,加载下一页
  page++;
  data.showList.push(...data.areaTree[page]);
};

const refreshFun = (fun: Function) => {
  initDataFun(data).then(() => {
    page = 0;
    data.isScroll = true;
    fun();
  });
};

// defineProps<{ msg: string }>();

// const count = ref(0);
</script>

<template>
  <div class="box">
    <router-link class="indexLogin" to="/login">登录</router-link>
    <div class="top-box">
      <img class="bg-img" src="../assets/bg.png" alt="" />
      <div class="title-text">
        <h1>科学防护 共渡难关</h1>
        <h2>肺炎疫情实时动态播报</h2>
      </div>

      <div v-if="chinaTotal.total" class="cover-cards">
        <div class="cover-tab">
          <div @click="tabChange(1)" :class="{ active: data.type === 1 }">
            全国疫情数据(含港澳台)
          </div>
          <div @click="tabChange(2)" :class="{ active: data.type === 2 }">
            湖北疫情数据
          </div>
        </div>

        <div v-show="data.type === 1" class="cover-info">
          <div>
            <h4 class="title">境外输入</h4>
            <p class="number">{{ num1.input.toFixed(0) }}</p>
            <p class="tip">
              较昨日
              <span>+{{ chinaTotal.today.input }}</span>
            </p>
          </div>
          <div>
            <h4 class="title">无症状感染者</h4>
            <!-- <p class="number">{{ chinaTotal.extData.noSymptom }}</p> -->
            <p class="number">{{ num1.noSymptom.toFixed(0) }}</p>
            <p class="tip">
              较昨日
              <span>+{{ chinaTotal.extData.incrNoSymptom }}</span>
            </p>
          </div>
          <div>
            <h4 class="title">现有确诊</h4>
            <p class="number">
              {{
                  num1.sum.toFixed(0)
              }}
            </p>
            <p class="tip">
              较昨日
              <span>+{{ chinaTotal.today.storeConfirm }}</span>
            </p>
          </div>
          <div>
            <h4 class="title">累计确诊</h4>
            <p class="number">{{ num1.confirm.toFixed(0) }}</p>
            <p class="tip">
              较昨日
              <span>+{{ chinaTotal.today.confirm }}</span>
            </p>
          </div>
          <div>
            <h4 class="title">累计死亡</h4>
            <p class="number">{{ num1.dead.toFixed(0) }}</p>
            <p class="tip">
              较昨日
              <span>+{{ chinaTotal.today.dead }}</span>
            </p>
          </div>
          <div>
            <h4 class="title">累计治愈</h4>
            <p class="number">{{ num1.heal.toFixed(0) }}</p>
            <p class="tip">
              较昨日
              <span>+{{ chinaTotal.today.heal }}</span>
            </p>
          </div>
        </div>
        <div v-show="data.type === 2" class="cover-info">
          <div>
            <h4 class="title">累计确诊</h4>
            <p class="number">{{ hbData.total.confirm }}</p>
            <p class="tip">
              较昨日
              <span>+{{ hbData.today.confirm }}</span>
            </p>
          </div>
          <div>
            <h4 class="title">累计死亡</h4>
            <p class="number">{{ hbData.total.dead }}</p>
            <p class="tip">
              较昨日
              <span>+{{ hbData.today.dead }}</span>
            </p>
          </div>
          <div>
            <h4 class="title">累计治愈</h4>
            <p class="number">{{ hbData.total.heal }}</p>
            <p class="tip">
              较昨日
              <span>+{{ hbData.today.heal }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- echarts -->
    <div class="data-map content">
      <h3>中国疫情</h3>
      <div class="map-box">
        <div :class="data.mapType == 1 ? 'to-left' : 'to-right'" id="map"></div>
        <div :class="data.mapType == 1 ? 'to-left' : 'to-right'" id="map2"></div>
      </div>
      <div class="map-btn">
        <div @click="mapTypeChange(1)" :class="{ active: data.mapType == 1 }">
          现有确诊
        </div>
        <div @click="mapTypeChange(2)" :class="{ active: data.mapType == 2 }">
          累计确诊
        </div>
      </div>
    </div>

    <div class="data-line content">
      <div class="line-box">
        <div id="line"></div>
        <div id="line1"></div>
        <div id="line2"></div>
      </div>
    </div>

    <!-- 列表 -->
    <div class="data-list content">
      <h3>中国病例</h3>
      <List v-if="china.length" :showChildren="true" :list="china" />
    </div>
    <div v-if="data.showList.length" class="data-list content">
      <h3>世界病例</h3>
      <ScrollCom :distance="100" :isScroll="(data.isScroll as boolean)" @getList="getList" @refreshFun="refreshFun">
        <List :showChildren="false" :list="data.showList" />
      </ScrollCom>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@keyframes toRight {
  from {
    left: 0;
  }

  to {
    left: calc(0px - 100vw + 1rem);
  }
}

@keyframes toLeft {
  from {
    left: calc(0px - 100vw + 1rem);
  }

  to {
    left: 0;
  }
}

.bg-img {
  width: 100%;
}

.indexLogin {
  position: absolute;
  right: 2rem;
  top: 1rem;
  z-index: 999;
  display: block;
  width: 3rem;
  height: 2rem;
  color: white;
  text-decoration: none;
  border: 1px solid gray;
  line-height: 2rem;
  text-align: center;
}

.top-box {
  position: relative;

  .title-text {
    position: absolute;
    z-index: 2;
    color: #fff;
    top: 20px;
    left: 1rem;
  }

  .cover-cards {
    position: absolute;
    top: 120px;
    background: #fff;
    border-radius: 20px;
    width: calc(100% - 2rem);
    left: 1rem;
    overflow: hidden;
    box-shadow: 0 2px 20px rgb(0 0 0 / 10%);

    >div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;

      &.cover-tab {

        //div.cover-tab{}
        >div {
          width: 50%;
          background: #efefef;
          text-align: center;
          height: 40px;
          line-height: 40px;

          &.active {
            background: #fff;
          }
        }
      }

      &.cover-info {
        >div {
          width: 33%;
          text-align: center;
          margin: 10px 0;

          &:nth-child(2) {

            .number,
            span {
              color: #ffa352;
            }
          }

          &:nth-child(3) {

            .number,
            span {
              color: #791618;
            }
          }

          &:nth-child(4) {

            .number,
            span {
              color: #e44a3d;
            }
          }

          &:nth-child(5) {

            .number,
            span {
              color: #333;
            }
          }

          &:nth-child(6) {

            .number,
            span {
              color: #34aa70;
            }
          }

          .title {
            font-size: 12px;
          }

          .number {
            font-size: 1.5rem;
            font-weight: 600;
            margin: 5px 0;
            color: #a31d13;

            span {
              color: #a31d13;
            }
          }

          .tip {
            font-size: 12px;
          }
        }
      }
    }
  }
}

.content {
  padding: 0 1rem;
}

.data-map,
.data-list {
  margin-top: 130px;
  overflow: hidden;

  h3 {
    border-left: 8px solid #e10000;
    padding-left: 1rem;
  }
}

.map-box {
  display: flex;
  width: 200%;
}

.data-line {
  margin-top: 20px;
}

#line,
#line1,
#line2 {
  height: 400px;
  width: 100%;
}

#map,
#map2 {
  height: 350px;
  width: 50%;
  animation-fill-mode: forwards;
  left: 0;
}

#map {
  margin-right: 1rem;
}

#map2 {
  margin-left: 1rem;
}

.to-left {
  animation: toLeft 1s;
}

.to-right {
  animation: toRight 1s;
}

.map-btn,
.line-btn {
  display: flex;
  justify-content: space-between;
  align-items: center;

  >div {
    width: 45%;
    height: 40px;
    line-height: 40px;
    border: 1px solid #d2d2d2;
    box-shadow: 0 5px 7px 1px rgb(0 0 0 / 5%);
    border-radius: 5px;
    text-align: center;

    &.active {
      border-color: #ce4733;
      background-color: #fef7f7;
      color: #ce2c1e;
    }
  }
}

.line-btn {
  >div {
    width: 30%;
    height: 55px;
    line-height: 25px;
    padding-top: 5px;
  }
}

.data-list {
  margin-top: 20px;
}
</style>
