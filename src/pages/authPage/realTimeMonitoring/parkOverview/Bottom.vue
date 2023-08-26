<script lang="ts" setup>
import { t } from '@/langs'
import { paserTime } from '@/utils';
import { usePowerCurve } from '../hooks/usePowerCurve'

import TitleBox from '@/components/common/TitleBox.vue';
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'

const { currentTime, prevTime, nextTime, chartRef, loading, nextDisabled } = usePowerCurve({ height: 206, device: 'park' })
</script>

<template>
    
    <TitleBox class="my-[10px] ">
        {{ t('common.realTime') }}
        <template #right>
            <div class="flex">
                <div @click="prevTime"
                    :class="[ loading ? 'cursor-wait' : ' ' ]"
                    class="bg-[var(--theme-white-bg)] w-[20px] flex justify-center items-center rounded-[4px] cursor-pointer">
                    <el-icon>
                        <ArrowLeft />
                    </el-icon>
                </div>
                <div class="tex-[12px] text-[var(--theme-gray153)] mx-[20px]"> {{ t('common.currentTime') }}：{{ paserTime(currentTime,
                    'YYYY-MM-DD') }} </div>
                <div @click="nextTime"
                    :class="[ loading ? 'cursor-wait' : ' ', nextDisabled ? 'cursor-not-allowed' : ' ' ]"
                    class="bg-[var(--theme-white-bg)] w-[20px] flex justify-center items-center  rounded-[4px] cursor-pointer">
                    <el-icon>
                        <ArrowRight />
                    </el-icon>
                </div>
            </div>
        </template>

    </TitleBox>

    <div ref="chartRef"> </div>
</template>