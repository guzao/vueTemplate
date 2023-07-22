<script lang="ts" setup>
import { useRouter } from 'vue-router'
import BaseHeader from '@/components/common/BaseHeader.vue'
import I18nSelect from '@/components/common/I18nSelect.vue';

const router = useRouter()

</script>

<template>
    <!-- heder -->
    <BaseHeader>
        <div class="flex justify-end h-full items-center">

            <I18nSelect class="mr-[10px]" />

            <el-button text @click="router.push('/register')"> 立即注册 </el-button>
            
        </div>
    </BaseHeader>
</template>

<style lang="scss" scoped></style>