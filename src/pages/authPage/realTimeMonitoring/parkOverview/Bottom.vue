<script lang="ts" setup>
import { paserTime } from '@/utils';
import { usePowerCurve } from '../hooks/usePowerCurve'

import TitleBox from '@/components/common/TitleBox.vue';
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'

const { currentTime, prevTime, nextTime, chartRef } = usePowerCurve({ height: 206, device: 'park' })
</script>

<template>
    
    <TitleBox class="my-[10px] ">
        全站实时充放电功率曲线
        <template #right>
            <div class="flex">
                <div @click="prevTime"
                    class="bg-[var(--theme-white-bg)] w-[20px] flex justify-center items-center rounded-[4px] cursor-pointer">
                    <el-icon>
                        <ArrowLeft />
                    </el-icon>
                </div>
                <div class="tex-[12px] text-[var(--theme-gray153)] mx-[20px]"> 当前时间：{{ paserTime(currentTime,
                    'YYYY-MM-DD') }} </div>
                <div @click="nextTime"
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