<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppData } from '@/store'
import DeviceStateDesc from './DeviceStateDesc.vue';
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

const viewModel = [
    { label: '整站全景视图', code: 1, url: '/monitor/parkOverview' },
    { label: '子站列表视图', code: 2, url: '/monitor/subParkOverview' },
    { label: '设备概览视图', code: 3, url: '/monitor/deviceOverview' },
    { label: '设备缩略视图', code: 4, url: '/monitor/thumbnailModel' },
    { label: '设备列表视图', code: 5, url: '/monitor/tableModel' },
]

const viewModelChange = (path: string) =>  router.push({ query: { stationCode: appData.parkSerial }, path: path })

</script>

<template>
    <div class="flex justify-between items-center h-[62px]  bg-[var(--theme-white-bg)] px-[10px]"
        :style="`height: ${$attrs.height || 62}px;`">

        <el-select v-model="appData.parkSerial" class="m-2" placeholder="Select" style="width: 260px;" filterable
            @change="parkChange">
            <el-option v-for="item in appData.parkAuthList" :key="item.id" :label="item.name" :value="item.serial" />
        </el-select>

        <div class="flex-1 flex justify-end items-center" v-if="showDeviceStateDesc">
            <DeviceStateDesc />
        </div>

        <el-select v-if="showDeviceStateDesc" v-model="viewModelPath" class="m-2" placeholder="Select" style="width: 260px;" filterable @change="viewModelChange">
            <el-option v-for="item in viewModel" :key="item.code" :label="item.label" :value="item.url" />
        </el-select>

        <div v-if="$slots.default" class="flex-1">
            <slot />
        </div>

    </div>
</template>