<script lang="ts" setup>
import { t } from '@/langs'
import { isFalse } from '@/utils'
import { CountUp } from 'countup.js'
import { watch, nextTick } from 'vue'
import { commonConfig } from '@/config'
import { useSystemConfig } from '@/store'
import TitleBox from '@/components/common/TitleBox.vue'
import LayoutModelSelect from './LayoutModelSelect.vue'

const systemConfig = useSystemConfig()

const baseNUmber = 1

const getCommonFractionDigitsEl = () => document.getElementById('commonFractionDigits')!
const getPriceFractionDigits = () => document.getElementById('priceFractionDigits')!

watch(() => systemConfig.systemrunningConfig.commonFractionDigits, (value) => {
    new CountUp(getCommonFractionDigitsEl(), baseNUmber, { decimalPlaces: value }).start()
})

watch(() => systemConfig.systemrunningConfig.priceFractionDigits, (value) => {
    new CountUp(getPriceFractionDigits(), baseNUmber, { decimalPlaces: value }).start()
})


watch(() => systemConfig.configModelState, async (value) => {
    if (isFalse(value)) return
    await nextTick()
    new CountUp(getCommonFractionDigitsEl(), baseNUmber, { decimalPlaces: systemConfig.systemrunningConfig.commonFractionDigits }).start()
    new CountUp(getPriceFractionDigits(), baseNUmber, { decimalPlaces: systemConfig.systemrunningConfig.priceFractionDigits }).start()
})

</script>


<template>
    <el-drawer v-model="systemConfig.configModelState" size="500px">

        <template #header>
            <TitleBox> {{ t('common.systemConfig') }} </TitleBox>
        </template>

        <template #default>

            <el-form label-position="left" label-width="150px" :model="systemConfig" size="default">

                <el-form-item label="是开启动态导航栏">
                    <el-switch @change="systemConfig.setIsDynamicHeader" active-text="开启" inactive-text="关闭"
                        v-model="systemConfig.dynamicHeader" />
                </el-form-item>

                <el-form-item label="是否展示二级标题">
                    <el-switch @change="systemConfig.setIsHiddenSubTitle" active-text="开启" inactive-text="关闭"
                        v-model="systemConfig.hiddenSubTitle" />
                </el-form-item>

                <el-form-item label="是否展示系统助手">
                    <el-switch active-text="开启" inactive-text="关闭" v-model="systemConfig.showSystemHelp" />
                </el-form-item>

                <el-form-item label="系统主题色选择">
                    <el-color-picker @change="(value: any) => systemConfig.setThemeColor(value)"
                        v-model="systemConfig.themeColor" show-alpha :predefine="systemConfig.themeColors" />
                </el-form-item>

                <el-form-item label="路由动画选择">
                    <el-select v-model="systemConfig.routerTransition" class="m-2"
                        @change="systemConfig.setRouterTaransition" placeholder="Select">
                        <el-option v-for="item in commonConfig.routerTransitionList" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                </el-form-item>

                <el-form-item label="通用保留小数位">
                    <el-input-number v-model="systemConfig.systemrunningConfig.commonFractionDigits"
                        @change="systemConfig.setSystemRunningConfig(systemConfig.systemrunningConfig)" />
                    <div id="commonFractionDigits" class="ml-[16px] text-[var(--theme-green-bg)] text-[16px] f-dn"></div>
                </el-form-item>

                <el-form-item label="收益保留小数位">
                    <el-input-number v-model="systemConfig.systemrunningConfig.priceFractionDigits"
                        @change="systemConfig.setSystemRunningConfig(systemConfig.systemrunningConfig)" />
                    <div id="priceFractionDigits" class="ml-[16px] text-[var(--theme-green-bg)] text-[16px] f-dn"></div>
                </el-form-item>

                <el-form-item label="金额汇率">
                    <el-input-number v-model="systemConfig.systemrunningConfig.exchangeRato" :min="0.01"
                        @change="systemConfig.setSystemRunningConfig(systemConfig.systemrunningConfig)" />
                </el-form-item>

            </el-form>

            <LayoutModelSelect />

        </template>

    </el-drawer>
</template>