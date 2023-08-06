<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { deepCloe } from '@/utils';
import { useRouter, useRoute } from 'vue-router'
import { useAppData, useUser, useDicts } from '@/store'
import { ArrowLeft } from '@element-plus/icons-vue'
import type { FormInstance } from 'element-plus'


const router = useRouter()
const route = useRoute()
const userData = useUser()
const dicts = useDicts()


const userInfo = deepCloe(userData.userInfo.user)

const fromInstance = ref<FormInstance>()
const form = reactive(userInfo)
const rules = {
    userName: [ { required: true, message: '请输入用户名', trigger: 'blur' },],
    phonenumber: [ { required: true, message: '请输入用户名', trigger: 'blur' },],
    email: [ { required: true, message: '请输入用户名', trigger: 'blur' },],
    sex: [ { required: true, message: '请输入用户名', trigger: 'blur' },],
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

        <el-button class="flex-1" type="primary" size="default" @click="confirm">提交</el-button>

    </div>
</template>