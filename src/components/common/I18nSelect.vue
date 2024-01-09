<script lang="ts" setup>
import { useSmartOpsBroadcastChannel } from '@/hooks'
import { useI18nStore, langs, useSystemConfig } from '@/store'

const i18nStore = useI18nStore()
const systemConfig = useSystemConfig()
const smartOpsBroadcastChannel = useSmartOpsBroadcastChannel()

const setLang = (lang: string) => {
    try {
        smartOpsBroadcastChannel.onPostMessage('I18n', { lang: lang })
    } catch (error) {
    }
    i18nStore.setLang(lang)
}

</script>

<template>
    <el-dropdown trigger="click" @command="setLang" v-if="systemConfig.baseConfig.internationalization">
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