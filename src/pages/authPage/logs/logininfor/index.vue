<script lang="ts" setup>
import { useLogininfor } from './useLogininfor'

import SubTitle from '@/components/common/SubTitle.vue';


const { dicts, pageParams, currentChange, result, loading, getResult, searchForm } = useLogininfor()

</script>


<template>
    <div class="w-full overflow-hidden">

        <SubTitle />

        <div class="p-[24px] box-border bg-[var(--theme-white-bg)]">

            <el-form v-if="0" :inline="true" :model="searchForm" class="demo-form-inline mb-[10px]" >

                <el-form-item label="登录地址">
                    <el-input v-model="searchForm.ipaddr" placeholder="Approved by" clearable />
                </el-form-item>

                <el-form-item label="用户名">
                    <el-input v-model="searchForm.userName" placeholder="Approved by" clearable />
                </el-form-item>

                <el-form-item label="登录状态">
                    <el-input v-model="searchForm.status" placeholder="Approved by" clearable />
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" >Query</el-button>
                </el-form-item>

            </el-form>

            <el-table :data="result" stripe style="width: 100%" v-loading="loading">

                <el-table-column prop="userName" label="名称" />

                <el-table-column prop="ipaddr" label="登录地址" />

                <el-table-column prop="loginLocation" label="登录地点" />

                <el-table-column prop="browser" label="浏览器" />

                <el-table-column prop="os" label="操作系统" />

                <el-table-column prop="status" label="登录状态">
                    <template #default="{ row }">
                        <el-tag v-if="row.status == '0'" type="success"> {{ dicts.commonStatusDict.dictLabel[row.status]
                        }} </el-tag>
                        <el-tag v-else type="danger"> {{ dicts.commonStatusDict.dictLabel[row.status] }} </el-tag>
                    </template>
                </el-table-column>

                <el-table-column prop="msg" label="操作信息" />

                <el-table-column prop="loginTime" label="登录日期" />

            </el-table>

            <div class="flex justify-end mt-[26px]">
                <el-pagination background layout="total, prev, pager, next " :pageSize="pageParams.pageSize"
                    :total="pageParams.total" @currentChange="currentChange" />
            </div>


        </div>

    </div>
</template>