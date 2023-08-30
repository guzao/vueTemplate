<script lang="ts" setup>
import { inject, PropType } from 'vue'
import { sliderConfig } from '@/config'
import { deviceDetailContextKey } from '../useDeviceDetail'

const deviceDetail = inject(deviceDetailContextKey)

defineProps({
    groupUnitList: {
        type: Array as PropType<GroupList []>,
        default: []
    },
    groupClick: {
        type: Function,
        default: () => {}
    }
})

</script>

<template>
    <el-menu :default-active="deviceDetail?.unitId" class="el-menu-vertical-demo" unique-opened
        :active-text-color="sliderConfig.activeTextColor" :background-color="sliderConfig.backgroundColor"
        style="border-right: none;">

        <el-sub-menu :index="group.id + ''" v-for="group in groupUnitList" :key="group.id">
            <template #title>
                <span>{{ group.name }}</span>
            </template>
            <template v-for="unit in group.eosUnitList" :key="unit.id">
                <el-menu-item :index="unit.id + ''" @click="groupClick(unit)">
                    {{ unit.name }}
                </el-menu-item>
            </template>
        </el-sub-menu>
    </el-menu>
</template>
