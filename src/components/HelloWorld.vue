<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <div class="card border border-solid border-[red]">
    <button type="button" @click="count++">count is {{ count }}</button>
  </div>
</template>

<style scoped lang="scss">
</style>
