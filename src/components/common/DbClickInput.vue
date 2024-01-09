<script setup lang="ts">
import { isTrue } from '@/utils';
import { ref, nextTick, computed } from 'vue'

const props = defineProps({
    /** 失去焦点 */
    onblur: {
        type: Function,
        default: () => { }
    },
    /** 双击 */
    ondblclick: {
        type: Function,
        default: () => { }
    },
    /** input 事件 */
    oninput: {
        type: Function,
        default: () => { }
    },
    modelValue: {
        type: [String, Number],
        default: "",
    }
})



const emits = defineEmits<{
    (event: "update:modelValue", value: string | number): void,
    /** 双击 */
    (event: "ondblclick"): void,
    /** 失去焦点 */
    (event: "onblur", shouldUpdate: boolean): void,
}>()

const isInput = ref(false)

const inputRef = ref<HTMLElement | null>(null)

const cacheValue = ref<typeof props.modelValue>('')

const dbClick = async () => {
    isInput.value = true
    // 缓存
    cacheValue.value = props.modelValue
    await nextTick()
    inputRef.value?.focus()
    props?.ondblclick()
    emits('ondblclick')
}

const blur = () => {
    isInput.value = false
    props?.onblur(cacheValue.value, props.modelValue)
    emits('onblur', cacheValue.value != props.modelValue)
}

const input = (value: string) => {
    props?.oninput(value)
    emits('update:modelValue', value)
}

const titleTips = computed(() => isTrue(isInput.value) ? '失去焦点切换为文本状态' : '双击进入编辑状态')


</script>

<template>
    <div :title="titleTips" @dblclick="dbClick" class="cursor-pointer">

        <el-input ref="inputRef" size="default" @blur="blur" @keyup.enter="blur" @input="input" v-if="isInput"
            v-model="props.modelValue"></el-input>

        <slot v-else />


    </div>
</template>