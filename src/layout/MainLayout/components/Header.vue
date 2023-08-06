<script lang="ts" setup>
    import { useAppData } from '@/store'
    import { Expand, } from '@element-plus/icons-vue'
    import BaseHeader from "@/components/common/BaseHeader.vue";
    import I18nSelect from "@/components/common/I18nSelect.vue";
    import UserDropdown from "@/components/common/UserDropdown.vue";
    const appData  = useAppData()
</script>

<template>


    <BaseHeader>

        <div class="flex justify-between  items-center h-full">

            <el-button text :icon="Expand" @click="appData.chnageIsCollapse" class="ml-[10px]"> </el-button>

            <div class="flex items-center h-full">

                <I18nSelect class="mr-[10px]" />
                
                <UserDropdown />

            </div>

        </div>
        
    </BaseHeader>


</template>

