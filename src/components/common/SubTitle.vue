<script lang="ts" setup>
import { useRoute } from 'vue-router'

const route = useRoute()

</script>


<template>

    <div class="flex items-center  text-[24px] font-medium mb-[10px]"> {{ route.meta?.title }} </div>

</template>