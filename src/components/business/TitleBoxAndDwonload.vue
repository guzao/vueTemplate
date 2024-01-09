<script lang="ts" setup>
import { t } from "@/langs"
import { Download } from '@element-plus/icons-vue'
import TitleBox from '@/components/common/TitleBox.vue'

defineProps({
    /** 文件下载进度 */
    loading: {
        type: Boolean,
        default: false
    },
    /** 下载按钮状态 数据为空时按钮应该为禁止点击状态 */
    disabledDownload: {
        type: Boolean,
        default: false
    }
})

const emits = defineEmits<{
    /** 按钮点击事件 */
    (event: 'downloadFile'): void
}>()

</script>


<template>
    <TitleBox>

        <slot />

        <template #right>
            <el-button :title="t('tipsInfo.downloadFile')" :icon="Download" text size="default"
                :disabled="!disabledDownload" @click="emits('downloadFile')" :loading="loading">{{
                    t('tipsInfo.downloadFile') }}</el-button>
        </template>

    </TitleBox>
</template>