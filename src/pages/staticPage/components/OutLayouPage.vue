<script lang="ts" setup>
import Footer from '@/components/common/Footer.vue'
import SubTitle from '@/components/common/SubTitle.vue'
import BaseHeader from '@/components/common/BaseHeader.vue'
</script>

<template>
    <div id="out_layout_main" class="flex flex-col h-[100%] overflow-auto">

        <BaseHeader class="min-h-[58px]" />

        <div class="flex-1 m-auto w-[80%] min-w-[1480] flex flex-col">

            <SubTitle class="mt-[12px]" />

            <div class="bg-[var(--theme-white-bg)] flex-1 flex flex-col">

                <slot />

            </div>

        </div>

        <Footer class="min-h-[30px]" />

    </div>
</template>

