<script lang="ts" setup generic="T extends Object">
import { t } from '@/langs'
import { PropType } from 'vue'
import GFormRadioGroup from './GFormRadioGroup.vue';
defineProps({
    form: Object,
    config: {
        type: Array as PropType<any []>
    }
})


</script>

<template>

    <el-form :model="form" class="demo-ruleForm mt-[36px] mb-[56px]" status-icon>


        <el-form-item
        v-for="item in config"
         :label="item.label" :prop="item.type">


            <GFormRadioGroup  :form-data="form" />


        </el-form-item>


    </el-form>

</template> 