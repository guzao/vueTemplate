<script lang="ts" setup>
defineProps({
    /** value 字体大小 */
    fontSize: {
        type: Number,
        default: () => 14
    }
})
</script>
<template>
    <div class="flex items-center">

        <div class="text-[var(--theme-gray107)] mr-[6px]"> <slot /> </div>

        <div class="text-[var(--theme-black51)] mr-[4px] f-din" :style="`font-size: ${fontSize}px;`" v-if="$slots.value"> <slot name="value" /> </div>

        <div class="text-[var(--theme-gray153)] text-[12px]" v-if="$slots.unit"> <slot name="unit" /> </div>

    </div>
</template>