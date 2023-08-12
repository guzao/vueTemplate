<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAppData, useUser, useDicts } from '@/store'

import Cropper from '@/components/common/Cropper.vue'
import SubTitle from '@/components/common/SubTitle.vue'
import TitleBox from '@/components/common/TitleBox.vue';
import LabelValueUnit from '@/components/common/LabelValueUnit.vue';

const dicts = useDicts()
const route = useRoute()
const router = useRouter()
const userData = useUser()
const appData = useAppData()

const routerPush = (path: string) => {
    const query = route.query
    router.push({ path, query: { ...query, stationCode: appData.currentParkSerial } })
}

const showSetAvatarDialog = ref(false)

</script>

<template>

    <SubTitle />

    <div class="bg-[var(--theme-white-bg)] px-[60px] py-[40px] box-border">

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
            <template #value> {{ dicts.userSexTyeDict.dictLabel[userData.userInfo.user.sex] }} </template>
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
            <template #value> {{ userData.userInfo.user.roles.map(item => item.roleName).join('、') }} </template>
        </LabelValueUnit>

        <LabelValueUnit :font-size="16" class="my-[10px]">
            手机号
            <template #value> {{ userData.userInfo.user.phonenumber }} </template>
        </LabelValueUnit>


        <div class="flex justify-between items-center mt-[36px]">
            <TitleBox> 个人安全 </TitleBox>
        </div>

        <el-divider />

        <div class="flex justify-between items-center mt-[36px]">

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

</template>