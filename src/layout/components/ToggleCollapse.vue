<script lang="ts" setup>
import { t } from '@/langs'
import { computed } from 'vue'
import { useAppData } from '@/store'
import { Expand, Fold, } from '@element-plus/icons-vue'

const appData = useAppData()
const icon = computed(() => appData.isCollapse ? Expand : Fold)
const tooltipText = computed(() => appData.isCollapse ? t('components.Fold') : t('components.Expand'))

</script>
 
<template>
    <el-tooltip class="box-item" effect="dark" :content="tooltipText" placement="bottom">
        <el-button text :icon="icon" @click="appData.changeIsCollapse" class="ml-[10px]">
        </el-button>
    </el-tooltip>
</template>

