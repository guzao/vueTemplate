<script lang="ts" setup>
import { t } from '@/langs'
import { computed } from 'vue'
import { useFullscreen } from '@vueuse/core'
import { FullScreen, } from '@element-plus/icons-vue'

const { toggle, isFullscreen } = useFullscreen()
const tooltipText = computed(() => isFullscreen.value ? t('components.exitFullscreen') : t('components.entryFullscreen'))


</script>

<template>
    <el-tooltip class="box-item" effect="dark" :content="tooltipText" placement="bottom">
        <el-button circle text :icon="FullScreen" @click="toggle"> </el-button>
    </el-tooltip>
</template>

