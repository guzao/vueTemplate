<script lang="ts" setup>
import { sliderConfig } from '@/config'
import { useSystemConfig } from '@/store'
import { useUnitGroup } from './hooks/useUnitList'

const systemConfig  = useSystemConfig()

const { groupUnitList, loading, deviceDetail, groupClick } = useUnitGroup()

</script>

<template>
    <el-menu :default-active="deviceDetail?.unitId" class="el-menu-vertical-demo" unique-opened v-loading="loading"
        :active-text-color="systemConfig.themeColor" :background-color="sliderConfig.backgroundColor"
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
