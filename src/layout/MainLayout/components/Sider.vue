  
<script lang="ts" setup>
import { computed } from 'vue';
import { loaclRouter } from '@/routers'
import { objectToUrlQuery } from '@/utils'
import { useRoute, useRouter } from 'vue-router'
import { sliderConfig, layoutConfig } from '@/config'
import { useUser, useAppData, useLayout, useSystemConfig } from '@/store'

import SliderItem from './SliderItem.vue'



const userData = useUser()
const appData = useAppData()
const layout = useLayout()
const systemConfig = useSystemConfig()

const route = useRoute()
const router = useRouter()
const defaultActive = computed(() => route.path)

appData.setActiveMenu(route.path)

const routerPush = (data: UserRouter) => {
  const urlQuery = { ...route.query, stationCode: appData.currentParkSerial }
  if (data.layoutType == 'NewTabLayOut') {
    window.open('/dataAnalysis/thermalField' + objectToUrlQuery(urlQuery))
    return
  }
  router.push({ path: data.path, query: urlQuery })
  layout.scrollTop()
}

</script>


<template>
  <el-menu :default-active="defaultActive" class="el-menu-vertical-demo" unique-opened
    :active-text-color="systemConfig.themeColor" :background-color="sliderConfig.backgroundColor"
    style="border-right: none;">

    <SliderItem v-if="layoutConfig.useLocalRouter" @menu-click="routerPush" v-for="router in (loaclRouter as any)"
      :router="router" :key="router.path" />

    <SliderItem v-else @menu-click="routerPush" v-for="router in userData.userRouters" :router="router"
      :key="router.path!" />

  </el-menu>
</template>
  
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
</style>
  