<script lang="ts" setup>
import { usePersonForm } from './usePersonForm'

const props = defineProps({
    /** 用户id */
    personId: {
        type: [Number, String],
    }
})

const {
    userDetail,
    loading,
    ruleForm,
    personForm,
    result,
    dicts,
    formInstance,
    roles,
    posts
} = usePersonForm(props)



defineExpose({
    /** 表单组价实例 */
    formInstance: formInstance
})

</script>

<template>
    <el-form label-position="left" :rules="ruleForm" ref="formInstance" label-width="100px" :model="personForm"
        v-loading="loading">

        <el-row :gutter="20">

            <el-col :span="12">
                <el-form-item label="用户昵称" prop="nickName">
                    <el-input v-model="personForm.nickName" style="width: 100%;" />
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="部门" prop="name">
                    <el-cascader v-model="personForm.deptId" value="id" :options="result" style="width: 100%;" />
                </el-form-item>
            </el-col>

        </el-row>

        <el-row :gutter="20">

            <el-col :span="12">
                <el-form-item label="手机号" prop="phonenumber">
                    <el-input v-model="personForm.phonenumber" style="width: 100%;" />
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="personForm.email" style="width: 100%;" />
                </el-form-item>
            </el-col>

        </el-row>


        <el-row :gutter="20">

            <el-col :span="12">
                <el-form-item label="用户昵称" prop="userName">
                    <el-input v-model="personForm.userName" :disabled="!!personId" style="width: 100%;" />
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="密码" prop="email">
                    <el-input v-model="personForm.password" type="password" style="width: 100%;" />
                </el-form-item>
            </el-col>

        </el-row>

        <el-row :gutter="20">

            <el-col :span="12">
                <el-form-item label="用户性别" prop="sex">
                    <el-radio-group v-model="personForm.sex">
                        <el-radio :label="item.dictValue" v-for="item in dicts.userSexTyeDict.dictValue"> {{ item.dictLabel
                        }}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="禁用状态" prop="email">
                    <el-radio-group v-model="personForm.status">
                        <el-radio :label="item.dictValue" v-for="item in dicts.normalDisableDict.dictValue"> {{
                            item.dictLabel
                        }}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-col>

        </el-row>


        <el-row :gutter="20">

            <el-col :span="12">
                <el-form-item label="职位" prop="posts">
                    <el-select v-model="personForm.postIds" multiple placeholder="Select" style="width: 100%;">
                        <el-option v-for="item in posts" :key="item.postId" :label="item.postName" :value="item.postId" />
                    </el-select>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="角色">
                    <el-select v-model="personForm.roleIds" multiple placeholder="Select" style="width: 100%;">
                        <el-option v-for="item in roles" :key="item.roleId" :label="item.roleName" :value="item.roleId" />
                    </el-select>
                </el-form-item>
            </el-col>

        </el-row>


        <el-row :gutter="20">

            <el-col :span="24">
                <el-form-item label="备注">
                    <el-input v-model="personForm.remark" type="textarea" style="width: 100%;" />
                </el-form-item>
            </el-col>

        </el-row>


    </el-form>
</template>