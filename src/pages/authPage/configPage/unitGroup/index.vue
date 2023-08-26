<script lang="ts" setup>
import { t } from '@/langs'
import { useUnitGroup } from './useUnitGroup'
import UnitForm from './components//UnitForm.vue'
import GroupForm from './components/GroupForm.vue'
import { ArrowLeft } from '@element-plus/icons-vue'
import TitleBox from '@/components/common/TitleBox.vue'
import Table from './components/Table.vue'

const { route, router, groupDrawerOpen, groupInstance, unitDrawerOpen, unitInstance, tableData } = useUnitGroup()
</script>

<template>
    <div class="w-full overflow-hidden p-[24px] box-border bg-[var(--theme-white-bg)]">

        <div class="flex justify-between items-center mb-[16px]">
            <TitleBox> {{ decodeURI(route.query.name as any) }} </TitleBox>
            <el-button text size="small" type="success" @click="router.go(-1)" :icon="ArrowLeft"> {{ t('common.back') }} </el-button>
        </div>

        <el-button type="primary" class="mr-[20px] mb-[26px]" size="default" @click="groupDrawerOpen"> 新增组 </el-button>

        <Table :table-data="tableData" />
        
    </div>

    <GroupForm ref="groupInstance" />

    <UnitForm ref="unitInstance" />
</template>

