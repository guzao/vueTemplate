<script lang="ts" setup>
import { ref } from 'vue'
import { useSelectAll } from '@/hooks'

const cities = ref(['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen'].map((item, index) => ({ value: item, id: index })))

const { checkAll, handleCheckAllChange, handleCheckedIdsChange, isIndeterminate, checkedIds } = useSelectAll(cities, 'id')

</script>


<template>
  <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">Check all</el-checkbox>
  <el-checkbox-group v-model="checkedIds" @change="handleCheckedIdsChange">
    <el-checkbox v-for="city in cities" :key="city.id" :label="city.id">{{
      city.value
    }}</el-checkbox>
  </el-checkbox-group>
</template>

