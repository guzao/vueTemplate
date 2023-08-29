<script setup lang="ts">
import { useI18nStore, useAppData } from "@/store"
import { useInterval, useDocumentTitle } from '@/hooks'
import SystemConfig from './components/common/SystemConfig.vue'


useDocumentTitle()
const appData = useAppData()
const I18nStore = useI18nStore()

/** 定时获取电站最新数据 */
useInterval(1000 * 60 * 5, () => {
  appData.loopGetParkAuthLastTime()
  appData.loopGetStationRuningState()
})

</script>

<template>
  
  <el-config-provider :locale="I18nStore.local">
    <router-view></router-view>
  </el-config-provider>

  <SystemConfig />
  
</template>

<style scoped lang="scss">
#app {
  height: 100vh;
}
</style>
