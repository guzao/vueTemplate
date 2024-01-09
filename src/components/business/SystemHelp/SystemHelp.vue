<script lang="ts" setup>
import { useSystemHelp } from './useSystemHelp'
import Icon from "../..//common/Icon.vue"
import { ChatSquare, Close } from "@element-plus/icons-vue"
import LabelValueUnit from "../../common/LabelValueUnit.vue"


const { userData, draggableDarget, showHelpState, style } = useSystemHelp()

</script>

<template>
    <template v-if="userData.getRoles.length">
        <div :class="showHelpState ? 'animate-none' : 'animate-bounce'"
            class="fixed top-[50%] translate-y-[-50%] right-[10px] z-[99999]" id="system_help">
            <el-button @click="showHelpState = !showHelpState" type="primary" :icon="ChatSquare" circle />
        </div>
    </template>

    <Transition name="bounce">
        <div :style="style" style="touch-action: none;" v-show="showHelpState"
            class="bg-[var(--theme-white-bg)] w-[400px] min-h-[550px] right-0 fixed top-[120px] flex flex-col shadow-[var(--el-box-shadow-light)]  rounded-[10px] z-[999] overflow-hidden">

            <div ref="draggableDarget" class="flex items-center h-[46px] px-[16px] box-border bg-[var(--theme-green-bg)] ">

                <div class="flex items-center flex-1 cursor-move">
                    <Icon icon="icon_parkselect" class="mr-[6px]" />
                    <span class="text-[#fff] select-none"> SmartOps 系统助手 </span>
                </div>

                <div class="px-[10px] cursor-pointer box-border" @click="showHelpState = false">
                    <el-icon :size="50" color="#fff">
                        <Close />
                    </el-icon>
                </div>
            </div>

            <div
                class="m-[8px] box-border bg-[var(--theme-white-f4-bg)] flex-1 rounded-[10px] p-[16px] box-border ">

                <div class="mb-[6px]">您的电站存在异常</div>

                <LabelValueUnit class="mb-[6px]" :font-size="18">
                    电站离线数
                    <template #value> 3 </template>
                </LabelValueUnit>

            </div>


        </div>
    </Transition>
</template>

<style lang="scss" scoped>
.bounce-enter-active {
    animation: bounce-in 0.5s;
}

.bounce-leave-active {
    animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
    0% {
        transform: scale(0);
    }

    50% {
        transform: scale(1.1);
    }

    100% {
        transform: scale(1);
    }
}
</style>