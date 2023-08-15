
<script lang="ts" setup>
import { useEditEnterpise } from './useEditEnterpise'
import { ArrowLeft } from '@element-plus/icons-vue'

import SubTitle from '@/components/common/SubTitle.vue'
import TitleBox from '@/components/common/TitleBox.vue';

const { router, detpInfo, rules, confirm } = useEditEnterpise()

</script>

<template>
    <SubTitle />

    <div class="bg-[var(--theme-white-bg)] px-[60px] py-[40px] box-border">

        <div class="flex justify-between items-center mb-[36px]">
            <TitleBox> 企业信息 </TitleBox>
            <el-button text size="small" type="success" @click="router.go(-1)" :icon="ArrowLeft"> 返回 </el-button>
        </div>

        <el-form :model="detpInfo" :inline="true" :rules="rules" ref="fromInstance" label-width="100px" label-position="left">

            <el-form-item prop="leader" label="企业负责人">
                <el-input v-model="detpInfo.leader" placeholder="请输入企业负责人" style="width: 350px;" clearable />
            </el-form-item>

            <el-form-item prop="phone" label="联系电话">
                <el-input v-model="detpInfo.phone" placeholder="请输入联系电话" style="width: 350px;" clearable />
            </el-form-item>

            <el-form-item prop="email" label="邮 箱">
                <el-input v-model="detpInfo.email" placeholder="请输入邮箱" style="width: 350px;" clearable />
            </el-form-item>

            <el-form-item prop="deptName" label="企业全称">
                <el-input v-model="detpInfo.deptName" placeholder="请输入企业全称" style="width: 350px;" clearable />
            </el-form-item>

            <el-form-item prop="oldPassword" label="企业简称">
                <el-input v-model="detpInfo.shortName" placeholder="请输入企业简称" style="width: 350px;" clearable />
            </el-form-item>

            <el-form-item prop="oldPassword" label="企业标识">
                <el-input v-model="detpInfo.serial" placeholder="请输入标识" style="width: 350px;" clearable />
            </el-form-item>
            
            <el-form-item prop="oldPassword" label="企业地址">
                <el-input v-model="detpInfo.address" placeholder="请输入企业地址" style="width: 350px;" clearable />
            </el-form-item>
            
            <el-form-item prop="oldPassword" label="企业介绍">
                <el-input v-model="detpInfo.introduce" placeholder="请输入企业介绍" style="width: 350px;" clearable />
            </el-form-item>
            
            <el-form-item prop="oldPassword" label="官网地址">
                <el-input v-model="detpInfo.webSite" placeholder="请输入官网地址" style="width: 350px;" clearable />
            </el-form-item>
            
            <el-form-item prop="oldPassword" label="经度">
                <el-input v-model="detpInfo.longitude" placeholder="请输入官网地址" style="width: 350px;" clearable />
            </el-form-item>

            <el-form-item prop="oldPassword" label="维度">
                <el-input v-model="detpInfo.latitude" placeholder="请输入官网地址" style="width: 350px;" clearable />
            </el-form-item>

            <el-form-item prop="oldPassword" label="logo">
                <el-input v-model="detpInfo.latitude" placeholder="请输入官网地址" style="width: 350px;" clearable />
            </el-form-item>

        </el-form>

        <el-button class="flex-1" type="primary" size="default" @click="confirm">提交</el-button>

    </div>
</template>