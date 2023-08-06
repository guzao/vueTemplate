<script lang="ts" setup>
import { PropType } from 'vue'
import { useDeviceDetail } from '../hooks/useDeviceDetail'
import { conversionUnitKWh, getRuningStateInfo, toFixed } from '@/utils'

import Icon from '@/components/common/Icon.vue'
import SubParkTitle from '../components/SubParkTitle.vue'

const { checkDeviceDetail } = useDeviceDetail()

defineProps({
    deivceGroupList: {
        type: Array as PropType<DeviceGroup[]>,
        default: []
    }
})


</script>

<template>
    <ul>

        <li class="px-[16px] py-[20px] mb-[16px] last:mb-0 bg-[var(--theme-white-bg)] " v-for="item in deivceGroupList"
            :key="item.id">

            <SubParkTitle :data="item" :device-state-count="item.stateCount" />

            <el-table stripe :data="item.list" style="width: 100%;" >

                <el-table-column property="name" label="设备名称">

                    <template #default="{ row }">
                        <span class="cursor-pointer underline decoration-1" @click="checkDeviceDetail(row)"> {{ row.name }}
                        </span>
                    </template>

                </el-table-column>

                <el-table-column property="name" label="状态">
                    <template #default="{ row }">
                        <div class="flex items-center">
                            <Icon :icon="getRuningStateInfo(row.deviceData.M2).icon" :size="24" class="mr-[8px]" />
                            <span :class="getRuningStateInfo(row.deviceData.M2).color">{{
                                getRuningStateInfo(row.deviceData.M2).text }}</span>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column property="name" label="剩余电量">
                    <template #default="{ row }">
                        <span>{{ toFixed(row.deviceData.M3) }}%</span>
                    </template>
                </el-table-column>

                <el-table-column property="name" label="日充">
                    <template #default="{ row }">
                        <span>{{ conversionUnitKWh(row.deviceData.M15).size }} {{ conversionUnitKWh(row.deviceData.M15).unit
                        }}</span>
                    </template>
                </el-table-column>

                <el-table-column property="name" label="日放">
                    <template #default="{ row }">
                        <span>{{ conversionUnitKWh(row.deviceData.M16).size }} {{ conversionUnitKWh(row.deviceData.M16).unit
                        }}</span>
                    </template>
                </el-table-column>

                <el-table-column property="name" label="年充">
                    <template #default="{ row }">
                        <span>{{ conversionUnitKWh(row.deviceData.M19).size }} {{ conversionUnitKWh(row.deviceData.M19).unit
                        }}</span>
                    </template>
                </el-table-column>

                <el-table-column property="name" label="年充">
                    <template #default="{ row }">
                        <span>{{ conversionUnitKWh(row.deviceData.M20).size }} {{ conversionUnitKWh(row.deviceData.M20).unit
                        }}</span>
                    </template>
                </el-table-column>

                <el-table-column property="name" label="累充">
                    <template #default="{ row }">
                        <span>{{ conversionUnitKWh(row.deviceData.M5).size }} {{ conversionUnitKWh(row.deviceData.M5).unit
                        }}</span>
                    </template>
                </el-table-column>

                <el-table-column property="name" label="累充">
                    <template #default="{ row }">
                        <span>{{ conversionUnitKWh(row.deviceData.M6).size }} {{ conversionUnitKWh(row.deviceData.M6).unit
                        }}</span>
                    </template>
                </el-table-column>

            </el-table>

        </li>

    </ul>
</template>