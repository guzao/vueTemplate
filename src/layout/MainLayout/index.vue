<script setup lang="ts">
import { useLayout, useAppData } from '@/store'
import { ref, onMounted } from "vue";
import { ElScrollbar } from 'element-plus'
import { Top } from '@element-plus/icons-vue'
import Header from "./components/Header.vue";
import Sider from './components/Sider.vue'
import Footer from './components/Footer.vue';

const layout = useLayout()
const appData = useAppData()

const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()
onMounted(() => layout.setScrollbarRefInstance(scrollbarRef.value))



</script>

<template>

    <el-container class="relative" >

        <el-header class="absolute top-0 right-0 left-0 z-10" :class="layout.hasShowHeader ? 'block' : 'hidden'"
            style="padding: 0;">
            <Header />
        </el-header>

        <el-container>

            <el-aside style="width: auto;" class="h-[100vh]" v-show="appData.isCollapse">
                <div :style="layout.getLayoutMargingTop">
                    <Sider />
                </div>
            </el-aside>

            <el-scrollbar ref="scrollbarRef" height="100vh" class="flex-1" @scroll="layout.scrollEvent">
                <div :style="layout.getLayoutMargingTop" style="min-height:calc(100vh - 66px);" class="px-[10px] box-border flex flex-col flex-1">

                    <div class="flex-1 flex flex-col flex-wrap">
                        <router-view></router-view>
                    </div>

                    <Footer />

                </div>
            </el-scrollbar>

        </el-container>

        <div class="fixed right-[10px] bottom-20 z-50">
            <template v-if="layout.showGoTop">
                <el-button @click="layout.scrollTop" v-if="!layout.hasShowHeader" :icon="Top" circle />
            </template>
        </div>


    </el-container>


</template>
  