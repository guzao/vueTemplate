<script lang="ts" setup>
import { t } from '@/langs'
import { reactive } from 'vue'
import { useSystemConfig } from '@/store'

import TitleBox from '@/components/common/TitleBox.vue';

const systemConfig = useSystemConfig()

const form = reactive({})


</script>


<template>
    <el-drawer v-model="systemConfig.configModelState" size="360px">

        <template #header>
            <TitleBox> {{ t('common.systemConfig') }} </TitleBox>
        </template>

        <template #default>
            <el-form label-position="left" label-width="150px" :model="form" size="default">

                <el-divider border-style="dashed"> {{ t('common.globalConfig') }} </el-divider>

                <el-form-item label="是否固定全局导航栏">
                    <el-switch v-model="systemConfig.dynamicHeader" />
                </el-form-item>

                <el-form-item label="是否展示二级标题">
                    <el-switch v-model="systemConfig.hiddenSubTitle" />
                </el-form-item>

                <el-form-item label="数据采集点类型">
                    <el-select v-model="systemConfig.electricPowerType" >
                        <el-option label="直流侧" value="DC" />
                        <el-option label="交流侧" value="AC" />
                    </el-select >
                </el-form-item>

            </el-form>
        </template>

    </el-drawer>
</template>