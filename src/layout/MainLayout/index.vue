<script setup lang="ts">
import { ref, onMounted } from "vue";
import { layoutConfig } from '@/config'
import { ElScrollbar } from 'element-plus'
import { useLayout, useAppData } from '@/store'
import { Top } from '@element-plus/icons-vue'

import Sider from './components/Sider.vue'
import Header from "./components/Header.vue"
import Footer from './components/Footer.vue'

const layout = useLayout()
const appData = useAppData()

const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()
onMounted(() => layout.setScrollbarRefInstance(scrollbarRef.value))



</script>

<template>
    <el-container class="relative">

        <el-header class="absolute top-0 right-0 left-0 z-10 transition-all"
            :class="layout.hasShowHeader ? 'top-0' : 'top-[-70px]'" style="padding: 0;">
            <Header />
        </el-header>

        <el-container>

            <el-aside style="width: auto;" class="h-[100vh]" v-show="appData.isCollapse">
                
                <div :style="layout.getLayoutMargingTop">
                    <el-scrollbar :style="`height:calc(100vh - ${layoutConfig.offset}px);`">
                        <Sider />
                    </el-scrollbar>
                </div>

            </el-aside>

            <el-scrollbar ref="scrollbarRef" height="100vh" class="flex-1" @scroll="layout.scrollEvent">

                <div class="px-[10px] box-border flex flex-col flex-1"
                    :style="`margin-top: ${layoutConfig.headerHeight + 12}px;min-height:calc(100vh - ${layoutConfig.headerHeight + 12}px);`">
                    <div class="flex-1 flex flex-col flex-wrap">
                        <router-view></router-view>
                    </div>

                    <Footer />

                </div>

            </el-scrollbar>

        </el-container>

        <div class="fixed right-[10px] bottom-20 z-[999]">
            <template v-if="layout.showGoTop">
                <el-button @click="layout.scrollTop" v-if="!layout.hasShowHeader" :icon="Top" circle />
            </template>
        </div>

    </el-container>
</template>
  