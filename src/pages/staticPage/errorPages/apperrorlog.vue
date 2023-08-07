
<script lang="ts" setup>
import { appErrorPool } from '@/systemRuntimeInfoTrack'
</script>
  

<template>
    <el-table :data="appErrorPool" style="width: 100%">
        <el-table-column prop="date" label="Date" />
        <el-table-column prop="tag" label="tag" />
        <el-table-column prop="tagInnerText" label="tagInnerText" />
        <el-table-column prop="info" label="info" />
        <el-table-column prop="errorInfo" label="errorInfo" />
        <el-table-column prop="errorType" label="errorType" />
        <el-table-column prop="page" label="page" />
    </el-table>
</template>
  