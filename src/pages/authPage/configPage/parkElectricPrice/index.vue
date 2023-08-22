<script lang="ts" setup>
import { useParkElectricPrice } from './useParkElectricPrice'

import SubTitle from '@/components/common/SubTitle.vue'

const { pageParams } = useParkElectricPrice()
</script>


<template>
    
    <SubTitle class="mb-[16px]" />

    <div class="p-[24px] box-border bg-[var(--theme-white-bg)]">
        
    </div>

</template>