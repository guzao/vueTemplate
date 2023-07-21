<script lang="ts" setup>
import Header from "../components/Header.vue"
import Footer from "../components/Footer.vue"
import { useLogin } from './useLogin'

// @ts-ignore
const { form, handleLogin } = useLogin()

</script>

<template>
    <div class="login">

        <!-- heder -->
        <Header />

        <!-- bady -->
        <div class="h-[526px] bg-cover bg-no-repeat login_bg">
            <div class="w-[1200px] m-auto h-[526px] flex justify-end items-center">
                <div class="h-[450px] w-[440px] bg-[var(--theme-white-bg)]"></div>
            </div>
        </div>

        <!-- info desc -->
        <div class="w-[1200px] mx-auto">

            <!--  -->
            <div class="h-[64px]  bg-[var(--theme-white-bg)] my-[26px]"></div>

            <!--  -->
            <div class="text-[var(--theme-black51)]"> 账户分类 </div>

            <!--  -->

            <div class="mt-[16px] grid grid-cols-3 gap-[16px]">

                <div class="h-[268px] bg-[var(--theme-white-bg)]" v-for="item in 3" :key="item">

                </div>

            </div>

        </div>

        <!-- footer -->
        <Footer />

    </div>
</template>

<style lang="scss" scoped>
.login {

    .login_bg {
        background-image: url(../../../assets/image/login/login-bg.png);
    }

}
</style>