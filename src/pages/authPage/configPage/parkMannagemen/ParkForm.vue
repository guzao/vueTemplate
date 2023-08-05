
<script lang="ts" setup>
import { ref } from 'vue';
import { useDicts } from '@/store'
import type { PropType } from 'vue';
import type { FormInstance } from 'element-plus'
import { ruleForm } from './useParkList'

const formInstance = ref<FormInstance>()

const dicts = useDicts()

defineProps({
    parkForm: {
        type: Object as PropType<ParkListData>,
        default: {}
    },
    isEdit: {
        type: Boolean,
        default: false
    }
})

defineExpose({
    formInstance: formInstance
})

</script>

<template>
    <el-form label-position="left" :rules="ruleForm" ref="formInstance" label-width="100px" :model="parkForm" :disabled="isEdit">

        <el-row :gutter="20">

            <el-col :span="12">
                <el-form-item label="场站全称" prop="fullName">
                    <el-input v-model="parkForm.fullName" style="width: 100%;" />
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="场站简称" prop="name">
                    <el-input v-model="parkForm.name" style="width: 100%;" />
                </el-form-item>
            </el-col>

        </el-row>

        <el-row :gutter="20">

            <el-col :span="12">
                <el-form-item label="场站编号"  prop="serial">
                    <el-input v-model="parkForm.serial" style="width: 100%;" />
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="行业类型" prop="industryType">
                    <el-select v-model="parkForm.industryType" placeholder="Activity zone" style="width: 100%;">
                        <el-option v-for="item in dicts.industryTypeDict.dictValue" :label="item.dictLabel"
                            :value="item.dictValue" />
                    </el-select>
                </el-form-item>
            </el-col>

        </el-row>

        <el-row :gutter="20">

            <el-col :span="12">
                <el-form-item label="电站类型" prop="type">
                    <el-select v-model="parkForm.type" placeholder="Activity zone" style="width: 100%;">
                        <el-option v-for="item in dicts.parkTypeDict.dictValue" :label="item.dictLabel"
                            :value="item.dictValue" />
                    </el-select>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="用途类型" prop="useType">
                    <el-select v-model="parkForm.useType" placeholder="Activity zone" style="width: 100%;">
                        <el-option v-for="item in dicts.parkUseTypeDict.dictValue" :label="item.dictLabel"
                            :value="item.dictValue" />
                    </el-select>
                </el-form-item>
            </el-col>

        </el-row>

        <el-row :gutter="20">

            <el-col :span="12">
                <el-form-item label="额定能量" prop="energy">
                    <el-input v-model="parkForm.energy" style="width: 100%;" />
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="额定功率"  prop="totalPower">
                    <el-input v-model="parkForm.totalPower" style="width: 100%;" />
                </el-form-item>
            </el-col>

        </el-row>

        <el-row :gutter="20">

            <el-col :span="12">
                <el-form-item label="场站状态" prop="status">
                    <el-radio-group v-model="parkForm.status">
                        <el-radio :label="item.dictValue" v-for="item in dicts.parkStatusDict.dictValue"> {{ item.dictLabel
                        }}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="排序">
                    <el-input-number v-model="parkForm.sort" style="width: 100%;" />
                </el-form-item>
            </el-col>

        </el-row>

        <el-row :gutter="20">

            <el-col :span="24">
                <el-form-item label="备注">
                    <el-input type="textarea" v-model="parkForm.remark" style="width: 100%;" />
                </el-form-item>
            </el-col>

        </el-row>


        <el-divider />

        <el-row :gutter="20">

            <el-col :span="13">
                <el-form-item label="建设状态">
                    <el-radio-group v-model="parkForm.buildStatus">
                        <el-radio :label="item.dictValue" v-for="item in dicts.gridStatusDict.dictValue"> {{ item.dictLabel
                        }}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-col>

            <el-col :span="11">
                <el-form-item label="建设时间" prop="buildTime">
                    <el-date-picker v-model="parkForm.buildTime" type="date" style="width: 100%;" 
                        placeholder="Pick a day" />
                </el-form-item>
            </el-col>

        </el-row>

        <el-row :gutter="20">

            <el-col :span="12">
                <el-form-item label="运行状态">
                    <el-radio-group v-model="parkForm.runStatus">
                        <el-radio :label="item.dictValue" v-for="item in dicts.parkRunStatusDict.dictValue"> {{
                            item.dictLabel
                        }}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="投运时间" prop="operateTime">
                    <el-date-picker v-model="parkForm.operateTime" style="width: 100%;" type="date"
                        placeholder="Pick a day" />
                </el-form-item>
            </el-col>

        </el-row>



        <el-divider />

        <el-row :gutter="20">

            <el-col :span="12">
                <el-form-item label="经　度">
                    <el-input v-model="parkForm.latitude" style="width: 100%;" />
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="纬　度">
                    <el-input v-model="parkForm.longitude" style="width: 100%;" />
                </el-form-item>
            </el-col>

        </el-row>

        <el-row :gutter="20">

            <el-col :span="12">
                <el-form-item label="区域编号">
                    <el-input v-model="parkForm.areaId" style="width: 100%;" />
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="区域表编号">
                    <el-input v-model="parkForm.countryId" style="width: 100%;" />
                </el-form-item>
            </el-col>

        </el-row>

        <el-row :gutter="20">

            <el-col :span="24">
                <el-form-item label="地址">
                    <el-input type="textarea" v-model="parkForm.address" style="width: 100%;" />
                </el-form-item>
            </el-col>

        </el-row>


    </el-form>
</template>