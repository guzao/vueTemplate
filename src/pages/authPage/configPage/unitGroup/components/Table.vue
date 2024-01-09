<script lang="ts" setup>
import { t } from '@/langs'
import { PropType } from 'vue'
import { Type } from '@/enum'
import { useTable } from './useTable'
import { useDicts } from '@/store'
import { Edit, Delete, Plus } from '@element-plus/icons-vue'
import DbClickInput from '@/components/common/DbClickInput.vue'
import ConfirmButton from '@/components/common/ConfirmButton.vue'
import Icon from '@/components/common/Icon.vue'

const props = defineProps({
    tableData: Array as PropType<UnitGroupData[]>
})

const dicts = useDicts()

const { addGroup, addUint, editGroup, editUint, deletGroup, deltUint, expandChange, tableDataMap } = useTable(props)

</script>

<template>
    <el-table :data="tableData" style="width: 100%" @expand-change="expandChange">

        <el-table-column type="expand">

            <template #default="props">

                <div class="pl-[40px]" v-loading="tableDataMap[props.row.id].loading">
                    <el-table :data="tableDataMap[props.row.id].data">

                        <el-table-column label="单元名称" prop="name">
                            <template #default="{ row }">
                                <DbClickInput v-model:model-value="row.name"> {{ row.name }} </DbClickInput>
                            </template>
                        </el-table-column>

                        <el-table-column label="编号" prop="serial" />

                        <el-table-column label="单元类型" prop="name">
                            <template #default="{ row }">
                                <div class="flex items-center">
                                    <Icon :size="28" :icon="row.unitType == Type.CABINET ? 'icon_cng' : 'icon_cnx'"
                                        class="mr-1" />
                                    {{ dicts.eosUnitypeDict.dictLabel[row.unitType] }}
                                </div>
                            </template>
                        </el-table-column>

                        <el-table-column label="排序" prop="name">
                            <template #default="{ row }">
                                <DbClickInput v-model:model-value="row.sort"> {{ row.sort }} </DbClickInput>
                            </template>
                        </el-table-column>

                        <el-table-column label="操作" align="center">

                            <el-button text size="small" type="success" @click="editUint" :icon="Edit">
                                {{ t('common.edit') }}
                            </el-button>

                            <ConfirmButton :text="true" type="danger" size="default" title="是否确认" :icon="Delete"
                                @confirm="deltUint">
                                {{ t('common.remove') }}
                            </ConfirmButton>

                        </el-table-column>
                    </el-table>
                </div>

            </template>

        </el-table-column>


        <el-table-column label="组名称" prop="name">
            <template #default="{ row }">
                <DbClickInput v-model:model-value="row.name"> {{ row.name }} </DbClickInput>
            </template>
        </el-table-column>


        <el-table-column label="排序" prop="name">
            <template #default="{ row }">
                <DbClickInput v-model:model-value="row.sort"> {{ row.sort }} </DbClickInput>
            </template>
        </el-table-column>

        <el-table-column label="操作" align="center">

            <el-button text size="small" type="success" @click="editGroup" :icon="Edit"> {{ t('common.edit') }} </el-button>

            <el-button text size="small" type="success" @click="addUint" :icon="Plus"> {{ t('common.add') }} </el-button>

            <ConfirmButton :text="true" type="danger" size="small" title="是否确认" :icon="Delete" @confirm="deletGroup">
                {{ t('common.remove') }}
            </ConfirmButton>

        </el-table-column>

    </el-table>
</template>