<script lang="ts" setup>
defineProps({
    /** 标题字体大小 */
    size: {
        type: Number,
        default: () => 16
    }
})
</script>

<template> 
    <div class="flex justify-between items-center">
        

        <div class="flex items-center">

            <div class="h-[16px] w-[2px] bg-[var(--theme-green-bg)] mr-[8px]"></div>

            <span :style="`font-size:${size}px`" class="font-medium text-[var(--theme-black51)] font-medium">
                <slot />
            </span>

            <div  v-if="$slots.left">
                <slot name="left" />
            </div>


        </div>



        <div class="flex" v-if="$slots.right">
            <slot name="right" />
        </div>


    </div>
</template>