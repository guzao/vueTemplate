<script lang="ts" setup>
import { t } from '@/langs'
import { computed } from 'vue'
import { useNotice } from '../hooks/useNotice'
import { arrayIsEmpty, getFirstElement } from '@/utils'
import { ChatDotRound, ArrowRight } from '@element-plus/icons-vue'

const { result, checkDetail, goNoticeList, loading } = useNotice()
const top3 = computed(() => {
    if (arrayIsEmpty(result.value)) return result.value
    getFirstElement(result.value)!.isTop = true
    return result.value.filter((_, index) => index < 3)
})

</script>

<template>
    <div class="h-[64px]  bg-[var(--theme-white-bg)] my-[26px] px-[30px] flex items-center  justify-between">

        <div class="text-[var(--theme-black51)] mr-[30px] flex items-center justify-center ">
            <ChatDotRound style="width: 20px; height: 20px; margin-right: 4px;" /> 系统公告
        </div>

        <ul class="flex items-center h-[64px] flex-1" v-loading="loading">
            <li @click="checkDetail(item)" class="flex items-center mr-[30px] cursor-pointer  hover:underline"
                v-for="item in top3" :key="item.noticeId">
                <span class="w-[8px] h-[8px] bg-[var(--theme-gray153)] rounded-full mr-[4px]"></span>
                <span class="text-[var(--theme-gray153)] mr-[4px]">{{ item.noticeTitle }}</span>
                <span v-if="item.isTop" class="bg-[red] h-[20px] text-[12px] text-[#fff] px-[4px]"> New </span>
            </li>
        </ul>

        <div class="text-[var(--theme-gray153)] flex items-center  hover:underline cursor-pointer" @click="goNoticeList">
            {{ t('common.more') }}
            <ArrowRight style="width: 16px; height: 16px;margin-left: 2px;" />
        </div>

    </div>
</template>