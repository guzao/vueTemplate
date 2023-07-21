<script lang="ts" setup>
    import { ref } from 'vue'

    const watermarkState = ref(false)
    const clear = () => watermarkState.value = !watermarkState.value
</script>

<template>
    <div class="h-[100vh]" v-watermark="{ markSatate: watermarkState, text: 'Testing', color: 'red' }">
        login
        <button @click="clear" > clear </button>
    </div>
</template>

<style lang="scss" scoped></style>