<script lang="ts" setup>
import { t } from '@/langs'
import { useSystemConfig } from '@/store'

const systemConfig = useSystemConfig()

const setLayoutType = (layoutType: SystemRunningConfigLayoutType) => {
    systemConfig.systemrunningConfig.layoutType = layoutType
    systemConfig.setSystemRunningConfig(systemConfig.systemrunningConfig)
}


</script>


<template>
    <div>

        <div class="text-[#606266] mb-[16px]"> 布局选择 </div>

        <ul class="grid grid-cols-2 gap-x-[20px] w-full">

            <li class="cursor-pointer hover:shadow animate relative border " @click="setLayoutType('horizontal')"
                :class="systemConfig.systemrunningConfig.layoutType == 'horizontal' ? 'shadow border-[var(--theme-green-bg)]' : ' '">
                <div class="h-[30px] bg-[#b3c0d1]"></div>
                <div class="h-[80px] bg-[var(--theme-gray-bg)]"></div>
                <div
                    class="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] text-[var(--el-color-primary)] 
                    text-[12px] border border-dashed border-[var(--discharge)] rounded-full h-[50px] w-[50px] flex items-center justify-center">
                    横向
                </div>
            </li>

            <li class="flex cursor-pointer animate border hover:shadow relative" @click="setLayoutType('vertical')"
                :class="systemConfig.systemrunningConfig.layoutType == 'vertical' ? 'shadow border-[var(--theme-green-bg)]' : ' '">
                <div class="w-[40px] bg-[#d3dce6]"></div>
                <div class=" flex-1 flex flex-col">
                    <div class="h-[30px] bg-[#b3c0d1]"></div>
                    <div class="h-[80px] bg-[var(--theme-gray-bg)]"></div>
                </div>
                <div
                    class="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] text-[var(--el-color-primary)] 
                    text-[12px]  border border-dashed border-[var(--discharge)] rounded-full h-[50px] w-[50px] flex items-center justify-center">
                    经典
                </div>
            </li>

        </ul>

    </div>
</template>