<script lang="ts" setup>
import { Type } from '@/enum'
import { useAppData } from '@/store'
import { inject, computed, ref } from 'vue'
import { deviceDetailContextKey } from '../useDevice'
import { getDeviceStateInfo, parserTime, isFalse } from '@/utils'

import CommandSend from './CommandSend.vue'
import Icon from '@/components/common/Icon.vue'
import { Operation } from '@element-plus/icons-vue'
import LastTimeVue from '@/components/common/LastTime.vue'

const appData = useAppData()

const CommandSendRef = ref<InstanceType<typeof CommandSend>>()

const deviceDetialContext = inject(deviceDetailContextKey)

const parkName = computed(() => appData.parkAuthList.find(item => item.serial == appData.currentParkSerial)?.name)

</script>

<template>
    
    <div class="h-[62px] bg-[var(--theme-white-bg)] mb-[16px] flex justify-between items-center">

        <div class="flex items-center px-[16px] box-border">
            <Icon icon="icon_parkselect" class="mr-2" />
            <span> {{ parkName + ' ' }} </span>
            <span> {{ deviceDetialContext?.deviceName }} </span>
            <span> 运行状态: </span>
            <Icon :icon="getDeviceStateInfo(deviceDetialContext?.deviceState!).icon" />
            <span :class="getDeviceStateInfo(deviceDetialContext?.deviceState!).color">{{
                getDeviceStateInfo(deviceDetialContext?.deviceState!).text }}</span>
        </div>

        <div class="flex items-center">
            <template v-if="(appData.currentParkType as any) == Type.NUMBER_CABINET">

                <el-button type="primary" text bg :icon="Operation" v-hasPermission="['ess:sendMqtt:getSetting']" size="default"
                    class="mr-[20px]" @click="CommandSendRef?.openDrawer" :disabled="isFalse(deviceDetialContext?.deviceState)"> 指令下发
                </el-button>

            </template>
            <LastTimeVue>{{ parserTime(appData.currentLastTime, 'YYYY-MM-DD HH:mm:ss') }}</LastTimeVue>
        </div>


    </div>


    <!-- 指令下发 -->
    <CommandSend ref="CommandSendRef" />

</template>