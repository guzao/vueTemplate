<script setup lang="ts">
import { useI18nStore } from "@/store";
const I18nStore = useI18nStore()
</script>

<template>
    <el-config-provider  :locale="I18nStore.local">
      <router-view></router-view>
  </el-config-provider>
</template>

<style scoped lang="scss">
#app {
  height: 100vh;
}
</style>
