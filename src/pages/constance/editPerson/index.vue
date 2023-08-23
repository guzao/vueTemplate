<script lang="ts" setup>
import { useEditPerson } from './useEditPerson'
import { ArrowLeft } from '@element-plus/icons-vue'

import SubTitle from '@/components/common/SubTitle.vue'
import TitleBox from '@/components/common/TitleBox.vue';


const { confirm, loading, rules, dicts, form, router } = useEditPerson()


</script>

<template>
    <SubTitle />

    <div class="bg-[var(--theme-white-bg)] px-[60px] py-[40px] box-border">

        <div class="flex justify-between items-center mb-[36px]">
            <TitleBox> 基本信息 </TitleBox>
            <el-button text size="small" type="success" @click="router.go(-1)" :icon="ArrowLeft"> 返回 </el-button>
        </div>

        <el-form :model="form" :rules="rules" ref="fromInstance" label-width="100px" label-position="left">

            <el-form-item prop="userName" label="用户名">
                <el-input v-model="form.userName" placeholder="请输入用户名" style="width: 340px;" clearable />
            </el-form-item>

            <el-form-item prop="phonenumber" label="手机号">
                <el-input v-model="form.phonenumber" placeholder="请输入密码" style="width: 340px;" clearable />
            </el-form-item>

            <el-form-item prop="email" label="邮　箱">
                <el-input v-model="form.email" placeholder="请输入密码" style="width: 340px;" clearable />
            </el-form-item>

            <el-form-item prop="sex" label="性　别">
                <el-radio-group v-model="form.sex">
                    <el-radio :label="item.dictValue" v-for="item in dicts.userSexTyeDict.dictValue"> {{ item.dictLabel }}
                    </el-radio>
                </el-radio-group>
            </el-form-item>

        </el-form>

        <el-button class="flex-1" type="primary" size="default" :loading="loading" @click="confirm">提交</el-button>

    </div>
</template>