<script lang="ts" setup>
import { useAppData } from '@/store'

import HeaderSlider from './HeaderSlider.vue'
import Message from "@/components/business/Message.vue"
import BaseHeader from "@/components/common/BaseHeader.vue"
import I18nSelect from "@/components/common/I18nSelect.vue"
import UserDropdown from "@/components/common/UserDropdown.vue"
import ToggleCollapse from '../../components/ToggleCollapse.vue'
import ToggleFullscreen from '../../components/ToggleFullscreen.vue'


const appData = useAppData()
</script>

<template>
    <BaseHeader>

        <div class="flex justify-between  items-center h-full">

            <ToggleCollapse />

            <!-- 侧边栏展示到header  -->
            <HeaderSlider
                :style="`opacity:${!appData.isCollapse ? 1 : 0};${appData.isCollapse ? 'pointer-events: none;' : ''}`" />

            <div class="flex items-center h-full">


                <ToggleFullscreen />

                <Message class="mr-[10px] ml-[10px]" />

                <I18nSelect class="mr-[10px]" />

                <UserDropdown />

            </div>

        </div>

    </BaseHeader>
</template>

