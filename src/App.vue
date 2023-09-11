<script setup lang="ts">
import { useApp } from './useApp'
import SystemConfig from '@/components/common/SystemConfig.vue'

const { I18nStore } = useApp()

</script>

<template>

  <!-- 系统主视图 -->
  <el-config-provider :locale="I18nStore.local">
    <router-view></router-view>
  </el-config-provider>

  <!-- 系统全局配置 -->
  <SystemConfig  />

</template>

