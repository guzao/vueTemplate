<script lang="ts" setup>
import { getDeptList } from '@/API'
import { useReactiveHttp } from '@/hooks'
import { useAppData, useUser } from '@/store'
import { useRouter, useRoute } from 'vue-router'

import SubTitle from '@/components/common/SubTitle.vue'
import TitleBox from '@/components/common/TitleBox.vue';
import LabelValueUnit from '@/components/common/LabelValueUnit.vue';
import { getFirstElement } from '@/utils'

const route = useRoute()
const router = useRouter()
const { userInfo: { user: { dept } } } = useUser()
const appData = useAppData()

const routerPush = (path: string) => {
    const query = route.query
    router.push({ path, query: { ...query, stationCode: appData.currentParkSerial } })
}

const { result: detpInfo, loading } = useReactiveHttp({
    initData: {} as Dept,
    request: () => getDeptList(),
    requestCallback: ({ data }) => getFirstElement(data) 
})


</script>

<template>

    <SubTitle />

    <div class="bg-[var(--theme-white-bg)] px-[60px] py-[40px] box-border flex-1 flex flex-col" v-loading="loading">

        <div class="flex justify-between items-center">
            <TitleBox> 企业信息 </TitleBox>
            <el-button text size="small" type="success" @click="routerPush('/config/enterprise/editEnterprise')"> 编辑信息
            </el-button>
        </div>

        <el-divider />

        <LabelValueUnit :font-size="16" class="my-[10px]">
            公司名称 
            <template #value> {{ detpInfo.deptName }} </template>
        </LabelValueUnit>


        <LabelValueUnit :font-size="16" class="my-[10px]">
            公司状态
            <template #value> {{ detpInfo.status ? '正常' : '停业' }} </template>
        </LabelValueUnit>

        <LabelValueUnit :font-size="16" class="my-[10px]">
            负责人　
            <template #value> {{ detpInfo.leader }} </template>
        </LabelValueUnit>

        <LabelValueUnit :font-size="16" class="my-[10px]">
            手机号　
            <template #value> {{ detpInfo.phone }} </template>
        </LabelValueUnit>

        <LabelValueUnit :font-size="16" class="my-[10px]">
            邮　箱　 
            <template #value> {{ detpInfo.email }} </template>
        </LabelValueUnit>

        <LabelValueUnit :font-size="16" class="my-[10px]">
            注册时间
            <template #value> {{ detpInfo.createTime }} </template>
        </LabelValueUnit>


    </div>
    
</template>