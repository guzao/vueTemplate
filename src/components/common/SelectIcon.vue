<script lang="ts" setup>
import { ref } from 'vue'
import { passerClass } from '@/utils'
import Icon from '@/components/common/Icon.vue'
import IconClass from '@/assets/styles/icons.scss'

const icons = ref(passerClass(IconClass))
const icon = ref('')
const selectIcon = (icon: string) => {
    emits('update:modelValue', icon)
}
defineProps({
    width: {
        type: Number,
        default: () => 300
    },
    modelValue: {
        type: String,
        default: "",
    }
})

const emits = defineEmits<{
    (event: "update:modelValue", value: string): void,
}>()

</script>

<template>
    <div>
        <el-popover trigger="click" :width="width"
            popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;">

            <template #reference>
                <el-input v-model="icon" :style="`width:${width}px`" :placeholder="modelValue || '请选择图标'" clearable class="ml-[20px]]">
                    <template #prepend>
                        <Icon :icon="modelValue" />
                    </template>
                </el-input>
            </template>

            <template #default>
                <div>

                    <div class="tex-[12px] text-[var(--theme-gray153)]"> 请选择图标 </div>
                    <div class="h-[1px] bg-[var(--theme-gray-bg)] mt-[4px]"></div>

                    <el-scrollbar height="200px">
                        <div class="flex flex-wrap justify-between mt-[8px]">
                            <div v-for="(icon, index) in icons" :key="index" @click="selectIcon(icon)"
                                :class="modelValue == icon ? 'bg-[var(--theme-t-header-bg)]' : ' '" class="flex items-center justify-center p-[4px] rounded-[8px] border box-border 
                                w-[38px] h-[38px] mb-[6px]
                                border-light-50 cursor-pointer hover:bg-[var(--theme-t-header-bg)]">
                                <Icon :icon="icon" />
                            </div>
                        </div>
                    </el-scrollbar>
                </div>
            </template>
        </el-popover>
    </div>
</template>

