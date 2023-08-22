<script lang="ts" setup>

import { useRouter } from 'vue-router'

import SubTitle from '@/components/common/SubTitle.vue';
import TitleBox from '@/components/common/TitleBox.vue'

const router = useRouter()

</script>

<template>
    <SubTitle />

    <div class="bg-[var(--theme-white-bg)] px-[60px] py-[40px] box-border">

        <div class="flex justify-between items-center">
            <TitleBox> 系统配置 </TitleBox>
            <el-button text size="small" type="success" @click="router.go(-1)"> 返回
            </el-button>
        </div>

        <el-divider />

    </div>

</template>
