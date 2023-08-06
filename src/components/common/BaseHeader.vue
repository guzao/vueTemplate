<script lang="ts" setup>
import { layoutConfig } from '@/config'
</script>

<template>
    <div class="flex pl-[16px] pr-[26px]  bg-[var(--theme-white-bg)]" :style="`height: ${layoutConfig.headerHeight}px`">
        <div class="flex items-center">
            <img src="../../assets/image/login/img_logo.png" alt="" srcset="" class="w-[262px] h-[36px]">
        </div>
        <div class="flex-1">
            <slot />
        </div>
    </div>
</template>

<style lang="scss" scoped></style>