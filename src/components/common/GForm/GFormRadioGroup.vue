<script lang="ts" setup generic="T extends Object">
defineProps({
    formData: {
        type: Object,
        required: true,
        default: () => ({})
    },
    data: {
        type: Array,
        required: true,
        default: () => ([])
    },
    event: {
        type: Function,
        default: () => {}
    }
})

</script>

<template>

    <el-radio-group v-model="formData.type" @change="event">
        <el-radio-button 
        v-for="item in data" :key="item"
        :label="item"> {{item }} </el-radio-button>
    </el-radio-group>

</template> 