<script lang="ts" setup>
import SubTitle from '@/components/common/SubTitle.vue';
import TitleBox from '@/components/common/TitleBox.vue'

</script>

<template>
    <SubTitle />

    <div class="bg-[var(--theme-white-bg)] px-[60px] py-[40px] box-border">

        <div class="flex justify-between items-center">
            <TitleBox> 系统配置 </TitleBox>
            <el-button text size="small" type="success"> 编辑信息
            </el-button>
        </div>

        <el-divider />

    </div>

</template>
