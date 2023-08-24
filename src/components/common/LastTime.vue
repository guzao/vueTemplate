<script lang="ts" setup>
import { t } from '@/langs'
</script>

<template>
    <div class="tex-[12px] text-[var(--theme-gray153)]"> {{ t('common.dataLastTime') }}：  <slot /> </div>
</template>