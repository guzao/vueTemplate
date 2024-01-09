<script lang="ts" setup>
import { computed } from 'vue'
import { layoutConfig } from '@/config'
import { useLayout, useUser } from '@/store'
import LogoIMg from '@/assets/image/login/img_logo.png'

const userData = useUser()
const logoSrc = computed(() => userData.userInfo.user.logo || LogoIMg)

const layout = useLayout()
const hasShadow = computed(() => layout.scrollNumber > layoutConfig.offset ? 'shadow' : ' ')
</script>

<template>
    <div class="flex px-[16px]  bg-[var(--theme-white-bg)]" :style="`height: ${layoutConfig.headerHeight}px`">
        <div class="flex items-center min-w-[180px]">
            <img :src="logoSrc" alt="" srcset="" class="min-w-[180px] w-[262px] h-[36px]">
        </div>
        <div class="flex-1">
            <slot />
        </div>
    </div>
</template>

<style lang="scss" scoped></style>