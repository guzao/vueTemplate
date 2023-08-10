<script lang="ts" setup>
import { useUpdatePassword } from './useUpdatePassword'
import { ArrowLeft, View, Hide } from '@element-plus/icons-vue'

import SubTitle from '@/components/common/SubTitle.vue'
import TitleBox from '@/components/common/TitleBox.vue';

const { confirm, rules, inputTypes, fromInstance, router, form, loading } = useUpdatePassword()

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
                            <Hide v-if="inputTypes.oldPasswordType" />
                            <View v-else  />
                        </el-icon>
                    </template>
                </el-input>
            </el-form-item>

            <el-form-item prop="newPassword" label="新密码">
                <el-input v-model="form.newPassword" placeholder="请输入密码"
                    :type="inputTypes.newPasswordType ? 'password' : 'text'" style="width: 340px;" clearable>
                    <template #suffix>
                        <el-icon class="cursor-pointer" @click="inputTypes.newPasswordType = !inputTypes.newPasswordType">
                            <Hide v-if="inputTypes.newPasswordType" />
                            <View v-else  />
                        </el-icon>
                    </template>
                </el-input>
            </el-form-item>

            <el-form-item prop="confirmPassword" label="确认密码">
                <el-input v-model="form.confirmPassword" placeholder="请输入密码"
                    :type="inputTypes.confirmPasswordType ? 'password' : 'text'" style="width: 340px;" clearable>
                    <template #suffix>
                        <el-icon class="cursor-pointer" @click="inputTypes.confirmPasswordType = !inputTypes.confirmPasswordType">
                            <Hide v-if="inputTypes.confirmPasswordType" />
                            <View v-else  />
                        </el-icon>
                    </template>
                </el-input>
        </el-form-item>

    </el-form>

    <el-button class="flex-1" type="primary" size="default" :loading="loading" @click="confirm">提交</el-button>

</div></template>