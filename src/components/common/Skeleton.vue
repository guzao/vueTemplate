<script setup lang="ts">

defineProps({
    /** 骨架行数 */
    rows: {
        type: Number,
        default: 5
    },
    /** 骨架状态 */
    loading: {
        type: Boolean,
        default: false
    }
})
</script>

<template>
    <div v-show="loading" :style="`min-height:${(rows * 50)}px`" class="p-[24px] box-border bg-[var(--theme-white-bg)] ">
        <el-skeleton :rows="rows" :animated="true" />
    </div>

    <div v-show="!loading" class="flex flex-col flex-1">
        <slot />
    </div>
</template>