<script lang="ts" setup>
import { User, Lock, Discount } from '@element-plus/icons-vue'
import { useLogin } from './useLogin'

// @ts-ignore
const { form, handleLogin, getCodeImg, imgSrc, serveConfigData } = useLogin()
</script>

<template>
    <div class="h-[526px] bg-cover bg-no-repeat login_bg">
        <div class="w-[1200px] m-auto h-[526px] flex justify-end items-center">
            <div class="h-[450px] w-[440px] bg-[var(--theme-white-bg)] p-[40px] box-border">

                <div class="text-[var(--theme-black51)] text-size-[18px] mb-[32px]"> 账户分类 </div>

                <el-form :model="form">

                    <el-form-item>
                        <el-input v-model="form.username" :prefix-icon="User" />
                    </el-form-item>

                    <el-form-item>
                        <el-input v-model="form.password" :prefix-icon="Lock" />
                    </el-form-item>

                    <el-form-item>
                        <el-input v-model="form.code" :prefix-icon="Discount">
                            <template #suffix>
                                <img :src="imgSrc" alt="" class="w-[80px] h-[36px] cursor-pointer" @click="getCodeImg">
                            </template>
                        </el-input>
                    </el-form-item>

                </el-form>
                <div class="flex">
                    <el-button class="flex-1" type="primary">登录</el-button>
                </div>


            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.login_bg {
    background-image: url(../../../assets/image/login/login-bg.png);
}
</style>