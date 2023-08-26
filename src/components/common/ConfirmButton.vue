<script setup lang="ts">
import { PropType } from 'vue'
import { ButtonType, ButtonProps } from 'element-plus'

defineProps({

    icon: {
        type: Object as PropType<ButtonProps['icon']>
    },

    text: Boolean,

    /** button 类型 */
    type: {
        type: String as PropType<ButtonType>,
        default: ''
    },

    /** button 大小 */
    size: {
        type: String as PropType<ButtonProps['size']>,
        default: 'default'
    },

    /** 弹窗标题 */
    title: String,

    /** button 加载状态 */
    loading: Boolean,

})


const emits = defineEmits<{
    (event: 'confirm', e?: MouseEvent): boolean
    (event: 'cancel', e?: MouseEvent): boolean
}>()

</script>

<template>
    <el-popconfirm :title="title" @confirm="emits('confirm')" @cancel="emits('cancel')">
        <template #reference>
            <el-button :size="size" :text="text" :type="type" :loading="loading" :icon="icon">
                <slot />
            </el-button>
        </template>
    </el-popconfirm></template>