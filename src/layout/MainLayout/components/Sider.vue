  
<script lang="ts" setup>
import { computed } from 'vue';
import { sliderConfig, layoutConfig } from '@/config'
import { useUser, useAppData, useLayout } from '@/store'
import { useRoute, useRouter } from 'vue-router'

import SliderItem from './SliderItem.vue'

import {  loaclRouter } from '@/routers'

const userData = useUser()
const appData = useAppData()
const layout = useLayout()

const route = useRoute()
const router = useRouter()
const defaultActive = computed(() => route.path)

const handleOpen = (key: string, keyPath: string[]) => console.log(key, keyPath)
const handleClose = (key: string, keyPath: string[]) => console.log(key, keyPath)

const routerPush = (data: UserRouter) => {
  const urlQuery = { ...route.query, stationCode: appData.currentParkSerial }
  router.push({ path: data.path, query: urlQuery })
  layout.scrollTop()
}

</script>


<template>

  <!-- :collapse="appData.isCollapse"  -->

  <el-menu :default-active="defaultActive" class="el-menu-vertical-demo" unique-opened
    :active-text-color="sliderConfig.activeTextColor" :background-color="sliderConfig.backgroundColor"
    style="border-right: none;">

    <SliderItem v-if="layoutConfig.useLocalRouter" @menu-click="routerPush" v-for="router in (loaclRouter as any)" :router="router" :key="router.path" />

    <SliderItem v-else @menu-click="routerPush" v-for="router in userData.userRouters" :router="router" :key="router.path!" />

  </el-menu>
  
</template>

  
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
</style>
  