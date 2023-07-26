  
<script lang="ts" setup>
import { PropType } from 'vue'
import { arrayIsNotEmpty } from '@/utils'
import { Location, Setting, } from '@element-plus/icons-vue'
defineProps({
    router: {
        type: Object as PropType<UserRouter>,
    }
})
</script>


<template>
    <el-sub-menu :index="router?.path" v-if="arrayIsNotEmpty(router!.children)">

        <template #title>
            <el-icon>
                <location />
            </el-icon>
            <span>{{ router?.meta.title }}</span>
        </template>

        <template v-for="item in router?.children" :key="item.name">
            <el-menu-item v-if="!item.hidden" :index="item.path" >
                {{ item?.meta.title }}
            </el-menu-item>
        </template>

    </el-sub-menu>



    <el-menu-item :index="router?.path" v-else>
        <el-icon>
            <setting />
        </el-icon>
        <template #title> {{ router?.meta.title }} </template>
    </el-menu-item>



</template>

  
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
}
</style>
  