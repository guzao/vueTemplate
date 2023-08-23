<script lang="ts" setup>
import { useI18nStore, langs, useSystemConfig } from '@/store'
const i18nStore = useI18nStore()
const systemConfig = useSystemConfig()

</script>

<template>
    <el-dropdown trigger="click" @command="i18nStore.setLang" v-if="systemConfig.baseConfig.internationalization">
        <el-button text>
            {{ i18nStore.langLable }}
        </el-button>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item v-for="item in langs" :key="item.code" :command="item.code">
                    {{ item.label }}
                </el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<style lang="scss" scoped></style>