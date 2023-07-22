<script lang="ts" setup>
import Header from "../components/Header.vue"
import Form from './Form.vue'
import Footer from "../components/Footer.vue"

</script>

<template>
    <el-scrollbar height="100vh">

        <div class="login">

            <!-- heder -->
            <Header />

            <!-- Form -->
            <Form />

            <!-- info desc -->
            <div class="w-[1200px] mx-auto">

                <!--  -->
                <div class="h-[64px]  bg-[var(--theme-white-bg)] my-[26px]">

                </div>

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
    </el-scrollbar>
</template>