<script setup lang="ts">
import { useInterval } from '@/hooks'
import { useI18nStore, useAppData } from "@/store";

import SystemConfig from './components/common/SystemConfig.vue';

const I18nStore = useI18nStore()
const appData = useAppData()

/** 定时获取电站最新数据 */
useInterval(1000 * 60 * 3, appData.loopGetParkAuthLastTime)

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
