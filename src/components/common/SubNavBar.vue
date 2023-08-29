<script lang="ts" setup>
import { ref } from 'vue'
import { useAppData } from '@/store'
import { layoutConfig } from '@/config'
import { getDeviceStateInfo } from '@/utils'
import { useRoute, useRouter } from 'vue-router'
import DeviceStateDesc from './DeviceStateDesc.vue';

import Icon from './Icon.vue';

const appData = useAppData()
const emits = defineEmits<{
    /** 电站变化事件 */
    (event: 'parkChange', parkCode: string): void
}>()

defineProps({
    /** 显示设备状态提示 */
    showDeviceStateDesc: {
        type: Boolean,
        default: () => true
    },
    /** 显示视图模式选择 */
    showViewModelSelect: {
        type: Boolean,
        default: () => true
    },
})


const route = useRoute()
const router = useRouter()
const viewModelPath = ref(route.path)


const parkChange = (code: string) => {
    appData.parkCodeChnage(code)
    emits('parkChange', code)
}

const viewModelChange = (path: string) => router.push({ query: { stationCode: appData.parkSerial }, path: path })

</script>

<template>
    <div class="flex justify-between items-center h-[62px]  bg-[var(--theme-white-bg)] px-[10px]"
        :style="`height: ${$attrs.height || 62}px;`">

        <el-select v-model="appData.parkSerial" class="m-2" placeholder="Select" style="width: 260px;" filterable
            @change="parkChange">

            <template #prefix>
                <Icon icon="icon_parkselect" />
            </template>

            <el-option v-for="item in appData.parkAuthList" :key="item.id" :label="item.name" :value="item.serial">

                <div class="flex justify-between items-center">
                    <span>{{ item.name }}</span>
                    <Icon :size="16" :icon="getDeviceStateInfo(appData.parkRuningState[item.serial]).icon" />
                </div>

            </el-option>

        </el-select>

        <div class="flex-1 flex justify-end items-center" v-if="showDeviceStateDesc">
            <DeviceStateDesc />
        </div>

        <el-select v-if="showViewModelSelect" v-model="viewModelPath" class="m-2" placeholder="Select" style="width: 260px;"
            filterable @change="viewModelChange">

            <template #prefix>
                <Icon icon="icon_viewmodel" />
            </template>

            <el-option v-for="item in layoutConfig.viewModel" :key="item.code" :label="item.label" :value="item.url" />
        </el-select>

        <div v-if="$slots.default" class="flex-1">
            <slot />
        </div>

    </div>
</template>