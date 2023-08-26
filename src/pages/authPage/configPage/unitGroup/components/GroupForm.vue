<script lang="ts" setup>
import { t } from '@/langs'
import { useGroupForm } from './useGroupForm'
import TitleBox from '@/components/common/TitleBox.vue'
import ConfirmButton from '@/components/common/ConfirmButton.vue'

const { formInstance, validate, drawerState, drawerOpen, addGroup } = useGroupForm()



defineExpose({
    /** 打开编辑、添加抽屉 */
    drawerOpen: drawerOpen
})

</script>


<template>
    <el-drawer v-model="drawerState" size="840px">

        <template #header>
            <TitleBox> 添加组 </TitleBox>
        </template>

        <template #default>
            
        </template>

        <template #footer>
            <div class="flex justify-start items-center">

                <ConfirmButton size="default" type="success" title="确认添加？" @confirm="addGroup">
                   {{ t('common.confirm') }}
                </ConfirmButton>

                <ConfirmButton size="default" type="danger" title="确认删除？">
                    {{ t('common.close') }}
                </ConfirmButton>
                
            </div>
        </template>

    </el-drawer>
</template>