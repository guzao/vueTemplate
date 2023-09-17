<script lang="ts" setup>
import { layoutConfig } from '@/config'
</script>

<template>
    <div class="flex h-[28px] items-center justify-center text-[12px] text-[var(--theme-gray153)]">
        {{ layoutConfig.footerText }} V{{ layoutConfig.version }}
    </div>
</template>

<style lang="scss" scoped></style>