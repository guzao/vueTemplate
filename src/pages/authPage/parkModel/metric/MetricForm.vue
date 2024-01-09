
<script lang="ts" setup>
import { ref } from 'vue';
import { useDicts } from '@/store'
import type { PropType } from 'vue';
import type { FormInstance } from 'element-plus'

const formInstance = ref<FormInstance>()

const dicts = useDicts()

defineProps({
    metricForm: {
        type: Object as PropType<MetricModel>,
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
    <!-- :rules="ruleForm"  -->
    <el-form label-position="left" ref="formInstance" label-width="100px" :model="metricForm">

        <el-row :gutter="20">

            <el-col :span="12">
                <el-form-item label="行业类别" prop="category">
                    <el-select v-model="metricForm.category" placeholder="请输入" style="width: 100%;">
                        <el-option v-for="item in dicts.categoryTypeDict.dictValue" :label="item.dictLabel"
                            :value="item.dictValue" />
                    </el-select>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="组别标签" prop="groupTags">
                    <el-select v-model="metricForm.groupTags" placeholder="请输入" style="width: 100%;">
                        <el-option v-for="item in dicts.metricGroupTagsDict.dictValue" :label="item.dictLabel"
                            :value="item.dictValue" />
                    </el-select>
                </el-form-item>
            </el-col>

        </el-row>

        <el-row :gutter="20">

            <el-col :span="12">
                <el-form-item label="中文名称" prop="nameCn">
                    <el-input v-model="metricForm.nameCn" style="width: 100%;" />
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="英文名称" prop="nameEn">
                    <el-input v-model="metricForm.nameEn" style="width: 100%;" />
                </el-form-item>
            </el-col>

        </el-row>

        <el-row :gutter="20">

            <el-col :span="12">
                <el-form-item label="自编号" prop="serial">
                    <el-input v-model="metricForm.serial" style="width: 100%;" />
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="变量名" prop="variable">
                    <el-input v-model="metricForm.variable" style="width: 100%;" />
                </el-form-item>
            </el-col>

        </el-row>

        <el-row :gutter="20">

            <el-col :span="12">
                <el-form-item label="信号类型" prop="signalType">
                    <el-select v-model="metricForm.signalType" placeholder="请输入" style="width: 100%;">
                        <el-option v-for="item in dicts.signalTypeDict.dictValue" :label="item.dictLabel"
                            :value="item.dictValue" />
                    </el-select>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="事件类型" prop="eventType">
                    <el-select v-model="metricForm.eventType" placeholder="请输入" style="width: 100%;">
                        <el-option v-for="item in dicts.eventTypeDict.dictValue" :label="item.dictLabel"
                            :value="item.dictValue" />
                    </el-select>
                </el-form-item>
            </el-col>

        </el-row>

        <el-row :gutter="20">

            <el-col :span="12">
                <el-form-item label="测点类型" prop="type">
                    <el-select v-model="metricForm.type" placeholder="请输入" style="width: 100%;">
                        <el-option v-for="item in dicts.eosTypeDict.dictValue" :label="item.dictLabel"
                            :value="item.dictValue" />
                    </el-select>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="数据类型" prop="dataType">
                    <el-select v-model="metricForm.dataType" placeholder="请输入" style="width: 100%;">
                        <el-option v-for="item in dicts.dataTypeDict.dictValue" :label="item.dictLabel"
                            :value="item.dictValue" />
                    </el-select>
                </el-form-item>
            </el-col>

        </el-row>

        <el-row :gutter="20">

            <el-col :span="12">
                <el-form-item label="精度" prop="precision">
                    <el-input v-model="metricForm.precision" style="width: 100%;" />
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="故障等级" prop="level">
                    <el-select v-model="metricForm.level" placeholder="请输入" style="width: 100%;">
                        <el-option v-for="item in dicts.levelTypeDict.dictValue" :label="item.dictLabel"
                            :value="item.dictValue" />
                    </el-select>
                </el-form-item>
            </el-col>

        </el-row>

        <el-row :gutter="20">

            <el-col :span="12">
                <el-form-item label="单位" prop="unit">
                    <el-input v-model="metricForm.unit" style="width: 100%;" />
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="缩放因子" prop="factor">
                    <el-input v-model="metricForm.factor" style="width: 100%;" />
                </el-form-item>
            </el-col>

        </el-row>


        <el-row :gutter="20">

            <el-col :span="12">
                <el-form-item label="偏移量" prop="offset">
                    <el-input v-model="metricForm.offset" style="width: 100%;" />
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="排序" prop="sort">
                    <el-input v-model="metricForm.sort" style="width: 100%;" />
                </el-form-item>
            </el-col>

        </el-row>

        <el-row :gutter="20">

            <el-col :span="12">
                <el-form-item label="展示用户" prop="showUser">
                    <el-input v-model="metricForm.showUser" style="width: 100%;" />
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="主控名称" prop="masterName">
                    <el-input v-model="metricForm.masterName" style="width: 100%;" />
                </el-form-item>
            </el-col>

        </el-row>

        <el-row :gutter="20">

            <el-col :span="24">
                <el-form-item label="备注" prop="remark">
                    <el-input v-model="metricForm.remark" type="textarea" style="width: 100%;" />
                </el-form-item>
            </el-col>

        </el-row>



        <el-divider content-position="left" > 配置信息 </el-divider>

        <el-row :gutter="20">

            <el-col :span="12">
                <el-form-item label="组件标签" prop="componentTags">
                    <el-input v-model="metricForm.componentTags" style="width: 100%;" />
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="运算子" prop="oprators">
                    <el-input v-model="metricForm.oprators" style="width: 100%;" />
                </el-form-item>
            </el-col>

        </el-row>

        <el-row :gutter="20">

            <el-col :span="12">
                <el-form-item label="公式" prop="formula">
                    <el-input v-model="metricForm.formula" style="width: 100%;" />
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="公式参数" prop="formulaParams">
                    <el-input v-model="metricForm.formulaParams" style="width: 100%;" />
                </el-form-item>
            </el-col>

        </el-row>

        <el-row :gutter="20">

            <el-col :span="12">
                <el-form-item label="统计周期钟" prop="statPeriod">
                    <el-input v-model="metricForm.statPeriod" style="width: 100%;" />
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="行业标签" prop="industryTag">
                    <el-select v-model="metricForm.industryTag" placeholder="请输入" style="width: 100%;">
                        <el-option v-for="item in dicts.industryTypeDict.dictValue" :label="item.dictLabel"
                            :value="item.dictValue" />
                    </el-select>
                </el-form-item>
            </el-col>

        </el-row>

        <el-row :gutter="20">

            <el-col :span="12">
                <el-form-item label="统计标签" prop="statTags">
                    <el-input v-model="metricForm.statTags" style="width: 100%;" />
                </el-form-item>
            </el-col>

        </el-row>



    </el-form>
</template>