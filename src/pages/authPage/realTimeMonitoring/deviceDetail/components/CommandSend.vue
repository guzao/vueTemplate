<script lang="ts" setup>
import { useCommandSend } from './hooks/useCommandSend'

import TitleBox from '@/components/common/TitleBox.vue'

const { appData, openDrawer, drawerState, parkName, deviceDetialContext } = useCommandSend()

defineExpose({
    /** 打开指令界面 */
    openDrawer: openDrawer
})

</script>

<template>
    <el-drawer append-to-body v-model="drawerState" size="840px">

        <template #header>
            <TitleBox> {{ parkName }}-{{ deviceDetialContext?.deviceName }}-指令下发 </TitleBox>
        </template>

        <template #default>

        </template>

        <template #footer>
            <div class="flex justify-start items-center">
                <el-button type="success" size="default">提交</el-button>
                <el-button type="danger" size="default">删除</el-button>
            </div>
        </template>

    </el-drawer>
</template>