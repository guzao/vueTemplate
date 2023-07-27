<script lang="ts" setup>
defineProps({
    /** icon 类名 */
    icon: String,
    /** icon 大小 */ 
    size: {
        type: Number,
        default: () => 24
    }
})
</script>

<template>
    <div class="icon" :class="icon" :style="`width: ${size}px;height: ${size}px;`"></div>
</template>

<style lang="scss" scoped>
@import url(../../assets/styles/icons.scss);
</style>