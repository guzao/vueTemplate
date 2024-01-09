<script setup lang="ts">
import { useApp } from './useApp'
import SystemConfig from '@/components/business/SystemConfig.vue'
import SystemHelp from '@/components/business/SystemHelp/SystemHelp.vue'
const { I18nStore, systemConfig } = useApp()

</script>

<template>
  <!-- 系统主视图 -->
  <el-config-provider :locale="I18nStore.local">
    <router-view></router-view>
  </el-config-provider>

  <!-- 系统全局配置 -->
  <SystemConfig />

  <!-- 系统助手 -->
  <SystemHelp v-if="systemConfig.showSystemHelp" />
</template>

