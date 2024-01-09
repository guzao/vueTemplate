<script setup lang="ts">
import { t } from '@/langs'
import { Type } from '@/enum'
import { onMounted } from 'vue'
import { getArrayLength } from '@/utils'
import { useStationList } from '../useStationList'
import DeviceStateCountDescVue from '@/components/common/DeviceStateCountDesc.vue';
const { searchCode, stationList, deviceStateCount, parkType, type, filteredList, state } = useStationList()

import Icon from '@/components/common/Icon.vue'

onMounted(() => {
    searchCode.value = ''
    state.value = -1
    type.value = ''
})

</script>

<template>
    <div class="h-[62px] bg-[var(--theme-white-bg)] flex items-center px-[12px] mb-[16px] justify-between">

        <div>

            <el-select v-model="type" class="m-2" placeholder="请选择电站类型" style="width: 260px;" clearable filterable
                @change="searchCode = ''">
                <el-option v-for="item in parkType" :key="item.dictValue" :label="item.accLabel" :value="item.dictValue" />
            </el-select>

            <el-select v-model="searchCode" class="m-2" placeholder="请筛选电站" style="width: 220px;" clearable filterable>
                <el-option v-for="item in filteredList" :key="item.code" :label="item.label" :value="item.code">
                    <div class="flex items-center">
                        <Icon :size="16" :icon="item.type == Type.NUMBER_CABINET ? 'icon_cng' : 'icon_cnx'" class="mr-1" />
                        <span>{{ item.label }}</span>
                    </div>
                </el-option>

            </el-select>

        </div>

        <DeviceStateCountDescVue :states="deviceStateCount" :open-state-click="true" v-model:model-value="state"
            :total="getArrayLength(stationList)">
            {{ t('common.park') }}{{ t('common.total') }}
        </DeviceStateCountDescVue>

    </div>
</template>