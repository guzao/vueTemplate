<script lang="ts" setup>
import { usePerson } from './usePerson'
import { Search } from '@element-plus/icons-vue'


import PersonForm from './PersonForm.vue'
import SubTitle from '@/components/common/SubTitle.vue';
import TitleBox from '@/components/common/TitleBox.vue';

const {
    userName,
    personId,
    drawerState,
    result,
    getResult,
    loading,
    currentChange,
    personFormRef,
    addPerson,
    editPerson,
    confirm,
    confirmDelet,
    pageParams,
    stateChange
} = usePerson()

</script>

<template>
    <div class="w-full overflow-hidden flex-1 flex-col flex">

        <SubTitle />

        <div class="p-[24px] box-border bg-[var(--theme-white-bg)] flex-1 flex-col flex">

            <div class="flex h-[50px] items-center mb-[26px]">

                <el-button type="primary" class="mr-[20px]" @click="addPerson"> 新增 </el-button>

                <el-input style="width: 260px;" v-model="userName" placeholder="请输入用户名" class="input-with-select">
                    <template #append>
                        <el-button :icon="Search" @click="getResult" />
                    </template>
                </el-input>

            </div>

            <el-table :data="result" stripe style="width: 100%" v-loading="loading" class="flex-1">

                <el-table-column prop="userName" label="名称" />

                <el-table-column prop="nickName" label="昵称" />

                <el-table-column prop="nickName" label="部门">
                    <template #default="{ row }">
                        {{ row.dept.deptName }}
                    </template>
                </el-table-column>

                <el-table-column prop="phonenumber" label="手机号" />

                <el-table-column prop="status" label="状态">
                    <template #default="{ row }">
                        <el-switch active-value="0" @change="(value: string) => stateChange(value, row)" inactive-value="1"
                            size="default" v-model="row.status" />
                    </template>
                </el-table-column>

                <el-table-column prop="createTime" label="创建时间" />

                <el-table-column prop="nickName" label="操作" width="240px" align="center">
                    <template #default="{ row }">
                        <div class="flex justify-between">

                            <el-button text size="default" @click="editPerson(row)"> 编辑 </el-button>

                            <el-popconfirm title="是否确认删除用户？" @confirm="confirmDelet(row)" width="200px">
                                <template #reference>
                                    <el-button text size="default"> 删除 </el-button>
                                </template>
                            </el-popconfirm>

                            <el-button text size="default"> 更多>> </el-button>

                        </div>
                    </template>
                </el-table-column>

            </el-table>

            <div class="flex justify-end mt-[26px]">
                <el-pagination background layout="prev, pager, next, total" :pageSize="pageParams.pageSize"
                    :total="pageParams.total" @currentChange="currentChange" />
            </div>

        </div>

    </div>


    <el-drawer v-model="drawerState" size="840px">

        <template #header>
            <TitleBox> {{ personId ? '编辑' : '添加' }} </TitleBox>
        </template>

        <template #default>

            <div v-loading="loading">
                <PersonForm ref="personFormRef" :personId="personId" />
            </div>

        </template>

        <template #footer>
            <div class="flex justify-start items-center">
                <el-button type="primary" size="default" @click="confirm">提交</el-button>
            </div>
        </template>

    </el-drawer>
</template>