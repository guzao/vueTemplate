  
<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { sliderConfig } from '@/config'
import { useUser, useAppData } from '@/store'
import SliderItem from './SliderItem.vue'
import { computed } from 'vue';
const userData = useUser()
const appData = useAppData()

const route = useRoute()
const defaultActive = computed(() => route.path)

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>


<template>
  <el-menu :default-active="defaultActive" class="el-menu-vertical-demo" :collapse="appData.isCollapse" router
    :active-text-color="sliderConfig.activeTextColor" :background-color="sliderConfig.backgroundColor" @open="handleOpen"
    @close="handleClose" style="border-right: none;">

    <SliderItem v-for="router in userData.userRouters" :router="router" :key="router.path" />

  </el-menu>
</template>

  
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
</style>
  