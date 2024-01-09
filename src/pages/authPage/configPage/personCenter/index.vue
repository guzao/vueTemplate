<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAppData, useUser, useDicts } from '@/store'

import { Female } from "@element-plus/icons-vue"
import Cropper from '@/components/common/Cropper.vue'
import CradBox from '@/components/common/CradBox.vue'
import SubTitle from '@/components/common/SubTitle.vue'
import TitleBox from '@/components/common/TitleBox.vue'
import LabelValueUnit from '@/components/common/LabelValueUnit.vue'

const dicts = useDicts()
const route = useRoute()
const router = useRouter()
const userData = useUser()
const appData = useAppData()

const routerPush = (path: string) => {
    const query = route.query
    router.push({ path, query: { ...query, stationCode: appData.currentParkSerial } })
}

const { pkg: { dependencies, devDependencies, version }, lastBuildTime } = __APP_INFO__

const showSetAvatarDialog = ref(false)

</script>

<template>
    <SubTitle />

    <div class="bg-[var(--theme-white-bg)] px-[60px] py-[40px] box-border flex flex-col mb-[16px]">

        <div class="flex justify-between items-center">
            <TitleBox> 基本信息 </TitleBox>
            <el-button text size="small" type="success" @click="routerPush('/config/personCenter/editPerson')"> 编辑信息
            </el-button>
        </div>

        <el-divider />

        <LabelValueUnit :font-size="16" class="my-[5px]">
            头像　
            <template #value>
                <el-avatar @click='showSetAvatarDialog = true' class="cursor-pointer"
                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
            </template>
        </LabelValueUnit>

        <LabelValueUnit :font-size="16" class="my-[10px]">
            名称　
            <template #value> {{ userData.userInfo.user.userName }} </template>
        </LabelValueUnit>


        <LabelValueUnit :font-size="16" class="my-[10px]">
            性别　
            <template #value>
                <el-icon>
                    <Female />
                </el-icon>
                {{ dicts.userSexTyeDict.dictLabel[userData.userInfo.user.sex] }}
            </template>

        </LabelValueUnit>

        <LabelValueUnit :font-size="16" class="my-[10px]">
            邮箱　
            <template #value> {{ userData.userInfo.user.email }} </template>
        </LabelValueUnit>

        <LabelValueUnit :font-size="16" class="my-[10px]">
            部门　
            <template #value> {{ userData.userInfo.user.dept.deptName }} </template>
        </LabelValueUnit>

        <LabelValueUnit :font-size="16" class="my-[10px]">
            角色　
            <!-- <template #value> {{ userData.userInfo.user.roles.map(item => item.roleName).join('、') }} </template> -->
            <template #value>
                <el-tag v-for="item in userData.userInfo.user.roles" class="mr-[8px]" round size="default" :type="'info'">
                    {{ item.roleName }}
                </el-tag>
            </template>
        </LabelValueUnit>

        <LabelValueUnit :font-size="16" class="my-[10px]">
            手机号
            <template #value> {{ userData.userInfo.user.phonenumber }} </template>
        </LabelValueUnit>


        <div class="flex justify-between items-center mt-[36px]">
            <TitleBox> 个人安全 </TitleBox>
        </div>

        <el-divider />

        <div class="flex justify-between items-center ">

            <LabelValueUnit>
                登录密码　
                <template #value> 修改用户登录密码,请谨慎操作 </template>
            </LabelValueUnit>

            <el-button text size="small" type="success" @click="routerPush('/config/personCenter/editPassword')"> 修改密码
            </el-button>
        </div>

    </div>


    <el-dialog draggable title="头像设置" v-model="showSetAvatarDialog" width="800px">
        <Cropper />
    </el-dialog>

    <CradBox class="mb-[10px]">
        <TitleBox class="mb-[16px]">项目信息</TitleBox>

        <el-descriptions :column="2" border size="default">
            <el-descriptions-item label="版本号" label-align="left">
                <el-tag size="default">V{{ version }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="发布时间" label-align="left">
                <el-tag size="default">{{ lastBuildTime }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="Gitlab" label-align="left">
                <el-link type="primary" href="http://192.168.0.100:8181/gitlab/lemon/opsnext/" target="_blank"> Gitlab
                </el-link>
            </el-descriptions-item>
            <el-descriptions-item label="Overview" label-align="left">
                <el-link type="primary" href="https://smartops.shanghai-electric.com/monitor" target="_blank"> Overview
                </el-link>
            </el-descriptions-item>
        </el-descriptions>
    </CradBox>

    <CradBox class="mb-[16px]">

        <TitleBox class="mb-[16px]">生产环境依赖</TitleBox>

        <el-descriptions :column="3" border size="default">
            <el-descriptions-item v-for="(value, key) in dependencies" :key="key" width="400px" :label="`${key}`">
                <el-tag type="info" size="default">
                    {{ value }}
                </el-tag>
            </el-descriptions-item>
        </el-descriptions>

    </CradBox>

    <CradBox>

        <TitleBox class="mb-[16px]">开发环境依赖</TitleBox>

        <el-descriptions :column="3" border size="default">
            <el-descriptions-item v-for="(value, key) in devDependencies" :key="key" width="400px" :label="`${key}`">
                <el-tag type="info" size="default">
                    {{ value }}
                </el-tag>
            </el-descriptions-item>
        </el-descriptions>

    </CradBox>
</template>