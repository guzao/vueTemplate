<script setup lang="ts">

defineProps({
    /** 骨架行数 */
    rows: {
        type: Number,
        default: 3
    },
    /** 骨架状态 */
    loading: {
        type: Boolean,
        default: false
    }
})
</script>

<template>

    <div v-if="loading" :style="`min-height:${(rows * 50)}px`" class="p-[24px] box-border bg-[var(--theme-white-bg)] ">
        <el-skeleton :rows="rows" :animated="true" />
    </div>

    <slot v-else />

</template>