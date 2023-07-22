  
<script lang="ts" setup>
import { ref } from 'vue'
import { useUser } from '@/store'
import SliderItem from './SliderItem.vue'
const userData= useUser()

const isCollapse = ref(false)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>


<template>
  <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="isCollapse"
    active-text-color="rgba(14, 169, 68, 1)" background-color="rgba(244, 246, 246, 1)" @open="handleOpen"
    @close="handleClose" style="border-right: none;">

    <SliderItem v-for="router in userData.userRouters" :router="router" :key="router.path" />

  </el-menu>
</template>

  
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
</style>
  