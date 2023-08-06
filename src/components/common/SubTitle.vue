<script lang="ts" setup>
import { layoutConfig } from '@/config'
import { useRoute } from 'vue-router'

const route = useRoute()

</script>


<template>

    <div v-if="layoutConfig.hiddenSubTitle" class="flex items-center  text-[24px] font-medium mb-[10px]"> {{ route.meta?.title }} </div>

</template>