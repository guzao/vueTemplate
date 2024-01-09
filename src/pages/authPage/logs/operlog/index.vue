<script lang="ts" setup>
import { useDicts } from '@/store'
import { getOperlogList } from '@/API'
import { useReactiveHttp, usePagination } from '@/hooks'
import SubTitle from '@/components/common/SubTitle.vue'

const dicts = useDicts()

const { pageParams, pageSizes } = usePagination({ callback: () => getResult(), pageSize: 10 })

const { result, loading, getResult } = useReactiveHttp({
    initData: [] as Operlog[],
    request: () => getOperlogList(pageParams),
    requestCallback: (res) => {
        pageParams.total = res.total
        return res.rows
    }
})

</script>


<template>
    <div class="w-full overflow-hidden flex-1 flex-col flex">

        <SubTitle />


        <div class="p-[24px] box-border bg-[var(--theme-white-bg)]  flex-1 flex-col flex">

            <el-table class="flex-1" :data="result" stripe style="width: 100%" v-loading="loading">

                <el-table-column prop="title" label="名称" />

                <el-table-column prop="operName" label="用户" />

                <el-table-column prop="operatorType" label="操作类型">
                    <template #default="{ row }">
                        <el-tag type="info"> {{ dicts.operTypeDict.dictLabel[row.operatorType] }} </el-tag>
                    </template>
                </el-table-column>

                <el-table-column prop="requestMethod" label="操作方式" />

                <el-table-column prop="operIp" label="操作IP" />

                <el-table-column prop="operLocation" label="操作地点" />

                <el-table-column prop="status" label="操作状态">
                    <template #default="{ row }">
                        <el-tag v-if="row.status == '0'" type="success"> {{ dicts.commonStatusDict.dictLabel[row.status]
                        }} </el-tag>
                        <el-tag v-else type="danger"> {{ dicts.commonStatusDict.dictLabel[row.status] }} </el-tag>
                    </template>
                </el-table-column>

                <el-table-column prop="operTime" label="操作日期" />

            </el-table>

            <div class="flex justify-end mt-[26px]">
                <el-pagination v-model:current-page="pageParams.pageNum" v-model:page-size="pageParams.pageSize"
                    :page-sizes="pageSizes" background layout="total, sizes, prev, pager, next, jumper"
                    :total="pageParams.total" />

            </div>

        </div>

    </div>
</template>