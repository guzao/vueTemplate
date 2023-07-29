<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
    <div class="auth_erro h-[100vh] bg-no-repeat ">

        <el-result icon="error" title="权限认证失败" sub-title="您没有进入此页面的权限" >
            <template #extra>
                <el-button type="primary" @click="router.go(-1)" >Back</el-button>
            </template>
        </el-result>

    </div>
</template>

<style lang="scss" scoped>
.auth_erro {
    background-position: center;
    background-image: url(../../../assets/svgs/common/autherror_1.svg);
}
</style>