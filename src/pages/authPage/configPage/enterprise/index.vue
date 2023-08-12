<script lang="ts" setup>
import { useAppData, useUser, useDicts } from '@/store'
import { useRouter, useRoute } from 'vue-router'

const dicts = useDicts()
const route = useRoute()
const router = useRouter()
const { userInfo: { user: { dept } } } = useUser()
const appData = useAppData()

const routerPush = (path: string) => {
    const query = route.query
    router.push({ path, query: { ...query, stationCode: appData.currentParkSerial } })
}

import SubTitle from '@/components/common/SubTitle.vue'
import TitleBox from '@/components/common/TitleBox.vue';
import LabelValueUnit from '@/components/common/LabelValueUnit.vue';

</script>

<template>
    <SubTitle />
    <div class="bg-[var(--theme-white-bg)] px-[60px] py-[40px] box-border">

        <div class="flex justify-between items-center">
            <TitleBox> 企业信息 </TitleBox>
            <el-button text size="small" type="success" @click="routerPush('/config/enterprise/editEnterprise')"> 编辑信息 </el-button>
        </div>

        <el-divider />

        <LabelValueUnit :font-size="16" class="my-[10px]">
            公司名称
            <template #value> {{ dept.deptName }} </template>
        </LabelValueUnit>


        <LabelValueUnit :font-size="16" class="my-[10px]">
            公司状态
            <template #value> {{ dept.status  }} </template>
        </LabelValueUnit>

        <LabelValueUnit :font-size="16" class="my-[10px]">
            负责人
            <template #value> {{ dept.leader }} </template>
        </LabelValueUnit>


    </div>
</template>