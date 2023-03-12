<script setup lang="ts"></script>

<template>
  <router-view v-slot="{Component}">
    <keep-alive :exclude="['Login','Index']">
      <component :is='Component'></component>
    </keep-alive>
  </router-view>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

* {
  margin: 0;
  padding: 0;
}

html {
  font-size: 14px;
}
</style>
