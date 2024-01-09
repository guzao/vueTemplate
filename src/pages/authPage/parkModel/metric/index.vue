<script lang="ts" setup>
import { t } from '@/langs'
import { useDicts } from '@/store'
import { useMetric } from './useMetric'
import MetricForm from './MetricForm.vue'
import CradBox from '@/components/common/CradBox.vue'
import SubTitle from '@/components/common/SubTitle.vue'
import TitleBox from '@/components/common/TitleBox.vue'
import { Edit, Delete, Plus } from '@element-plus/icons-vue'
import DbClickInput from '@/components/common/DbClickInput.vue'
import ConfirmButton from '@/components/common/ConfirmButton.vue'

const dicts = useDicts()

const { result, getResult, loading, pageParams, resteParams, pageSizes, metricModelForm, params, drawerState, isEdit, editMetric, addMetric } = useMetric()

</script>

<template>
    <SubTitle />

    <CradBox class="flex flex-1 flex-col">

        <div class="flex h-[50px] items-center mb-[26px]">
            <el-button type="primary" class="mr-[20px]" @click="addMetric"> {{ t('common.add') }} </el-button>
        </div>

        <!-- 表格 -->
        <el-table class="flex-1" :data="result" stripe style="width: 100%" v-loading="loading">

            <el-table-column prop="nameEn" show-overflow-tooltip label="中文名称">
                <template #default="{ row }">
                    <DbClickInput v-model:model-value="row.nameEn"> {{ row.nameEn }} </DbClickInput>
                </template>
            </el-table-column>

            <el-table-column prop="nameCn" show-overflow-tooltip label="英文名称">
                <template #default="{ row }">
                    <DbClickInput v-model:model-value="row.nameCn"> {{ row.nameCn }} </DbClickInput>
                </template>
            </el-table-column>

            <el-table-column width="120px" prop="serial" label="自编号">
                <template #default="{ row }">
                    <DbClickInput v-model:model-value="row.serial"> {{ row.serial }} </DbClickInput>
                </template>
            </el-table-column>

            <el-table-column width="120px" prop="variable" label="变量名">
                <template #default="{ row }">
                    <DbClickInput v-model:model-value="row.variable"> {{ row.variable }} </DbClickInput>
                </template>
            </el-table-column>

            <el-table-column width="100px" prop="offset" label="偏移量">
                <template #default="{ row }">
                    <DbClickInput v-model:model-value="row.offset"> {{ row.offset }} </DbClickInput>
                </template>
            </el-table-column>

            <el-table-column width="120px" prop="factor" label="缩放因子">
                <template #default="{ row }">
                    <DbClickInput v-model:model-value="row.factor"> {{ row.factor }} </DbClickInput>
                </template>
            </el-table-column>

            <el-table-column width="120px" prop="sort" label="排序">
                <template #default="{ row }">
                    <DbClickInput v-model:model-value="row.sort"> {{ row.sort }} </DbClickInput>
                </template>
            </el-table-column>

            <el-table-column prop="industryTag" label="标签">
                <template #default="{ row }">
                    <el-tag v-if="row.industryTag">{{ dicts.industryTypeDict.dictLabel[row.industryTag] }} </el-tag>
                </template>
            </el-table-column>

            <el-table-column prop="remark" show-overflow-tooltip label="备注" />

            <el-table-column label="操作" width="300px" align="center">
                <template #default="{ row }">
                    <div class="flex justify-between">

                        <el-button @click="editMetric(row)" text size="default" type="success" :icon="Edit"> {{
                            t('common.edit') }} </el-button>

                        <ConfirmButton :text="true" type="danger" size="default" title="是否确认" :icon="Delete"
                            @confirm="() => row"> {{ t('common.remove') }} </ConfirmButton>

                        <el-button text size="default" @click="addMetric" type="success" :icon="Plus"> {{ t('common.edit')
                        }} </el-button>

                    </div>
                </template>
            </el-table-column>

        </el-table>

        <div class="flex justify-end mt-[26px]">
            <el-pagination v-model:current-page="pageParams.pageNum" v-model:page-size="pageParams.pageSize"
                :page-sizes="pageSizes" background layout="total, sizes, prev, pager, next, jumper"
                :total="pageParams.total" />
        </div>


    </CradBox>


    <!-- 表单 -->
    <el-drawer v-model="drawerState" size="840px">

        <template #header>
            <TitleBox> {{ isEdit ? t('common.edit') : t('common.add') }} </TitleBox>
        </template>

        <template #default>
            <MetricForm ref="formInstance" v-loading="loading" :metricForm="metricModelForm" :isEdit="isEdit" />
        </template>

        <template #footer>
            <div class="flex justify-start items-center">
                <el-button type="success" size="default">提交</el-button>
            </div>
        </template>

    </el-drawer>
</template>

