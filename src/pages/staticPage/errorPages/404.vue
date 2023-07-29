<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
    <el-result icon="success" title="Success Tip" sub-title="Please follow the instructions">
        <template #extra>
            <el-button type="primary" @click="router.go(-1)" >Back</el-button>
        </template>
    </el-result>
</template>