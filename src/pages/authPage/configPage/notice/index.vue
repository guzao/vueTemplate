<script setup lang="ts">
import { t } from '@/langs'
import { useNoticeData } from './useNotice'
import SubTitle from '@/components/common/SubTitle.vue'
import { Edit, Delete, Plus } from '@element-plus/icons-vue'
import ConfirmButton from '@/components/common/ConfirmButton.vue'

const {
    result, loading, pageParams, currentChange,
    noticeType, noticeTypeLabel,
    noticeState, noticeStateLabel
} = useNoticeData()
</script>

<template>
    <div class="w-full overflow-hidden flex-1 flex-col flex">

        <SubTitle />

        <div class="p-[24px] box-border bg-[var(--theme-white-bg)] flex-1 flex-col flex">

            <div class="mb-[16px]">
                <el-button size="default" type="primary" :icon="Plus"> {{ t('common.add') }} </el-button>
            </div>

            <el-table :data="result" stripe style="width: 100%" v-loading="loading" class="flex-1">

                <el-table-column label="公告标题" align="center" prop="noticeTitle" :show-overflow-tooltip="true" />

                <el-table-column label="公告类型" align="center" prop="status">
                    <template #default="{ row }">
                        <el-tag class="ml-2" size="default" type="success">{{ noticeTypeLabel[row.noticeType] }}</el-tag>
                    </template>
                </el-table-column>

                <el-table-column label="状态" align="center" prop="status">
                    <template #default="{ row }">
                        <el-tag class="ml-2" size="default" type="info">{{ noticeStateLabel[row.status] }}</el-tag>
                    </template>
                </el-table-column>

                <el-table-column label="创建者" align="center" prop="createBy" />

                <el-table-column label="创建时间" align="center" prop="createTime" />

                <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="280">
                    <template #default="{ row }">

                        <el-button text size="default" type="success" :icon="Edit">
                            {{ t('common.edit') }}
                        </el-button>

                        <ConfirmButton :text="true" type="danger" size="default" title="是否确认" :icon="Delete"
                            @confirm="() => { }">
                            {{ t('common.remove') }}
                        </ConfirmButton>


                    </template>
                </el-table-column>

            </el-table>

            <div class="flex justify-end mt-[26px]">
                <el-pagination background layout="total, prev, pager, next " :pageSize="pageParams.pageSize"
                    :total="pageParams.total" @currentChange="currentChange" />
            </div>

        </div>

    </div>
</template>