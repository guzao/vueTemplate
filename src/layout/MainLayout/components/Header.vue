<script lang="ts" setup>
import { useAppData } from '@/store'

import HeaderSlider from './HeaderSlider.vue'
import BaseHeader from "@/components/common/BaseHeader.vue";
import I18nSelect from "@/components/common/I18nSelect.vue";
import UserDropdown from "@/components/common/UserDropdown.vue";
import { Expand, Fold } from '@element-plus/icons-vue'

const appData = useAppData()

</script>

<template>
    <BaseHeader>

        <div class="flex justify-between  items-center h-full">

            <el-button text :icon=" appData.isCollapse ?  Expand : Fold " @click="appData.chnageIsCollapse" class="ml-[10px]"> </el-button>

            <!-- 侧边栏展示到header  -->
            <HeaderSlider :style="`opacity:${ !appData.isCollapse ? 1 : 0 };${ appData.isCollapse ? 'pointer-events: none;' : '' }`"  />

            <div class="flex items-center h-full">

                <I18nSelect class="mr-[10px]" />

                <UserDropdown />

            </div>

        </div>

    </BaseHeader>
</template>

