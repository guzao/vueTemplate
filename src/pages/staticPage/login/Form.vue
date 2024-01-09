<script lang="ts" setup>
import { t } from '@/langs'
import { useLogin } from './useLogin'
import { User, Lock, Discount } from '@element-plus/icons-vue'

const { form, rules, handleLogin, getCodeImg, imgSrc, systemConfig, fromInstance, loading } = useLogin()
</script>

<template>
    <div class="h-[526px] bg-cover bg-no-repeat login_bg">
        <div class="w-[1200px] m-auto h-[526px] flex justify-end items-center">
            <div class="h-[450px] w-[440px] bg-[var(--theme-white-bg)] p-[40px] box-border flex flex-col">

                <div class="text-[var(--theme-black51)] text-[18px] mb-[32px]"> {{ t('login.loginType') }} </div>

                <div class="flex flex-col flex-1">

                    <el-form :model="form" :rules="rules" ref="fromInstance">

                        <el-form-item prop="username">
                            <el-input v-model="form.username" @keyup.enter.native="handleLogin"
                                :placeholder="`${t('common.placeholder')}${t('login.name')}`" class="h-[48px]"
                                :prefix-icon="User" clearable />
                        </el-form-item>

                        <el-form-item prop="password">
                            <el-input v-model="form.password" @keyup.enter.native="handleLogin"
                                :placeholder="`${t('common.placeholder')}${t('login.password')}`" type="password"
                                class="h-[48px]" :prefix-icon="Lock" clearable />
                        </el-form-item>

                        <el-form-item prop="code" v-if="systemConfig.baseConfig.captchaEnabled">
                            <el-input v-model="form.code" @keyup.enter.native="handleLogin" :prefix-icon="Discount"
                                class="h-[48px]" clearable :placeholder="`${t('common.placeholder')}${t('login.imgCode')}`">
                                <template #suffix>
                                    <img :src="imgSrc" alt="" class="w-[100px] h-[40px] cursor-pointer" @click="getCodeImg">
                                </template>
                            </el-input>
                        </el-form-item>

                    </el-form>

                    <div class="flex flex-1 h-full items-end">
                        <el-button class="flex-1" type="primary" :loading="loading" @click="handleLogin">{{ t('login.login')
                        }}</el-button>
                    </div>

                </div>

            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>.login_bg {
    background-image: url(../../../assets/image/login/login_bg.png);
}</style>