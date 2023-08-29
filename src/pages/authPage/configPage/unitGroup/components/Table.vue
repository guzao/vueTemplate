<script lang="ts" setup>
import { t } from '@/langs'
import { useTable } from './useTable'
import { Edit, Delete } from '@element-plus/icons-vue'
import ConfirmButton from '@/components/common/ConfirmButton.vue'

const { addGroup, addUint, editGroup, editUint, deletGroup, deltUint, expandChange } = useTable()

defineProps({
    tableData: Array
})

</script>

<template>
    <el-table :data="tableData" style="width: 100%" @expand-change="expandChange">

        <el-table-column type="expand" >

            <template #default="props">

                <div class="pl-[40px]">
                    <el-table :data="props.row.family">
                        <el-table-column label="Name" prop="name" />
                        <el-table-column label="State" prop="state" />
                        <el-table-column label="City" prop="city" />
                        <el-table-column label="Address" prop="address" />
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

        <el-table-column label="Date" prop="date" />

        <el-table-column label="Name" prop="name" />

        <el-table-column label="操作" align="center">

            <el-button text size="small" type="success" @click="editGroup" :icon="Edit"> {{ t('common.edit') }} </el-button>

            <el-button text size="small" type="success" @click="addUint" :icon="Edit"> {{ t('common.add') }} </el-button>

            <ConfirmButton :text="true" type="danger" size="default" title="是否确认" :icon="Delete" @confirm="deletGroup">
                {{ t('common.remove') }}
            </ConfirmButton>

        </el-table-column>

    </el-table>
</template>