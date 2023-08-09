<script lang="ts" setup>
import { useAppData } from '@/store'
import { getDeviceInfo } from '@/API'
import { useReactiveHttp } from '@/hooks'
import { PropType, ref, watch, inject } from 'vue'
import { deviceDetailContextKey } from '../useDevice'


defineProps({
    storageUnit: {
        type: Array as PropType<StoreageUnit []>,
        required: true,
        default: []
    }
})

const appData = useAppData()

const deviceDetailContext = inject(deviceDetailContextKey)

const { result, getResult, loading } = useReactiveHttp({
    initData: {} as any,
    request: () => getDeviceInfo({ stationSerial: appData.currentParkSerial, type: 'S', groupId: deviceDetailContext?.storageUnitId, unitId: deviceDetailContext?.unitId! }),
    requestCallback: ({ data }) => {
        return data.S
    },
    Immediately: false
})

const stop = watch(() => deviceDetailContext?.storageUnitId, () => {
    getResult()
    stop()
})


watch(() => deviceDetailContext?.unitId,  getResult)

</script>

<template>
    <div class="bg-[var(--theme-white-bg)] mb-[16px] p-[20px] pt-[10px]" v-loading="loading">

        <el-tabs v-model="deviceDetailContext!.storageUnitId" class="demo-tabs" @tab-click="getResult" >

            <el-tab-pane :label="unit.name" :name="unit.id" v-for="unit in storageUnit" :key="unit.id">
                
                <div class="h-[96px] bg-[var(--theme-gray251-bg)] mt-[6px] mb-[16px]"></div>

                <ul class="grid grid-cols-4 gap-[32px]">
                    <li 
                    class="h-[183px] bg-[var(--theme-gray251-bg)]"
                    v-for="(item, index) in result.B" :key="index">
                        <div class="h-[36px] flex justify-between items-center px-[15px] box-border" 
                        style="background: linear-gradient(270deg, rgba(14,169,68,0) 0%, rgba(14,169,68,0.05) 100%);">
                            <div class="text-[var(--theme-black51)]"> 1#簇{{ index }} </div>
                        </div>
                    </li>
                </ul>

            </el-tab-pane>

        </el-tabs>

    </div>
</template>


<style lang="scss" scoped></style>