
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { deepCloe } from '@/utils';
import { useRouter, useRoute } from 'vue-router'
import { useAppData, useUser } from '@/store'
import { ArrowLeft, View, } from '@element-plus/icons-vue'
import type { FormInstance } from 'element-plus'


const router = useRouter()
const route = useRoute()
const userData = useUser()


const fromInstance = ref<FormInstance>()
const form = reactive({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
})

const inputTypes = reactive({
    oldPasswordType: true,
    newPasswordType: true,
    confirmPasswordType: true,
})

const rules = {
    oldPasswordType: [{ required: true, message: '请输入旧密码', trigger: 'blur' },],
    newPasswordType: [{ required: true, message: '请输入旧密码', trigger: 'blur' },],
    confirmPasswordType: [{ required: true, message: '请输入新密码', trigger: 'blur' },],
}

const confirm = async () => {
    try {
        await fromInstance.value?.validate()
        console.log(form)
    } catch (error) {
        console.log(error)
    }
}

import SubTitle from '@/components/common/SubTitle.vue'
import TitleBox from '@/components/common/TitleBox.vue';

</script>

<template>
    <SubTitle />

    <div class="bg-[var(--theme-white-bg)] px-[60px] py-[40px] box-border">

        <div class="flex justify-between items-center mb-[36px]">
            <TitleBox> 修改登录密码 </TitleBox>
            <el-button text size="small" type="success" @click="router.go(-1)" :icon="ArrowLeft"> 返回 </el-button>
        </div>

        <el-form :model="form" :rules="rules" ref="fromInstance" label-width="100px" label-position="left">

            <el-form-item prop="oldPassword" label="旧密码">
                <el-input v-model="form.oldPassword" placeholder="请输入用户名"
                    :type="inputTypes.oldPasswordType ? 'password' : 'text'" style="width: 340px;" clearable>
                    <template #suffix>
                        <el-icon class="cursor-pointer" @click="inputTypes.oldPasswordType = !inputTypes.oldPasswordType">
                            <View />
                        </el-icon>
                    </template>
                </el-input>
            </el-form-item>

            <el-form-item prop="newPassword" label="新密码">
                <el-input v-model="form.newPassword" placeholder="请输入密码"
                    :type="inputTypes.newPasswordType ? 'password' : 'text'" style="width: 340px;" clearable>
                    <template #suffix>
                        <el-icon class="cursor-pointer" @click="inputTypes.newPasswordType = !inputTypes.newPasswordType">
                            <View />
                        </el-icon>
                    </template>
                </el-input>
            </el-form-item>

            <el-form-item prop="confirmPassword" label="确认密码">
                <el-input v-model="form.confirmPassword" placeholder="请输入密码"
                    :type="inputTypes.confirmPasswordType ? 'password' : 'text'" style="width: 340px;" clearable>
                    <template #suffix>
                        <el-icon class="cursor-pointer" @click="inputTypes.confirmPasswordType = !inputTypes.confirmPasswordType">
                            <View />
                        </el-icon>
                    </template>
                </el-input>
        </el-form-item>

    </el-form>

    <el-button class="flex-1" type="primary" size="default" @click="confirm">提交</el-button>

</div></template>