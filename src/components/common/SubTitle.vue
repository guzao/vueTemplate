<script lang="ts" setup>
import { t } from '@/langs'
import { getLocalLangMessage, writeDefault } from '@/utils'
import { useRoute } from 'vue-router'
import { useSystemConfig } from '@/store'
const route = useRoute()
const systemConfig = useSystemConfig()
const { sliderMenu } = getLocalLangMessage()
// @ts-ignore
const getSubTitleText = () => writeDefault(sliderMenu[route.meta?.i18nKey], route.meta?.title)
</script>


<template>
    <div v-if="systemConfig.hiddenSubTitle" class="flex items-center  text-[24px] font-medium mb-[10px]">
        {{ getSubTitleText() }}
    </div>
</template>