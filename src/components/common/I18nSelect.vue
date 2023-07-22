<script lang="ts" setup>
import { useI18nStore } from '@/store'
const i18nStore = useI18nStore()

const handleSlect = (command: string) => {
    i18nStore.setLang(command)
}


</script>

<template>
    <el-dropdown trigger="click"  @command="handleSlect">
        <el-button text>
            {{ i18nStore.langLable }}
        </el-button>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item command="zh_CN"> 简体中文 </el-dropdown-item>
                <el-dropdown-item command="en_US">English</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<style lang="scss" scoped></style>