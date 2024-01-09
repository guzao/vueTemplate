<script setup lang="ts">
import { ref, onMounted } from "vue";
import { layoutConfig } from '@/config'
import { ElScrollbar } from 'element-plus'
import { Top } from '@element-plus/icons-vue'
import { useLayout, useAppData, useSystemConfig } from '@/store'

import Sider from './components/Sider.vue'
import Header from './components/Header.vue'
import Footer from '@/components/common/Footer.vue'

const layout = useLayout()
const appData = useAppData()
const systemConfig = useSystemConfig()

const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()
onMounted(() => layout.setScrollbarRefInstance(scrollbarRef.value))

</script>

<template>
    <el-container class="relative">

        <!-- header -->
        <el-header class="absolute top-0 right-0 left-0 z-10 transition-all"
            :class="layout.hasShowHeader ? 'top-0' : 'top-[-70px]'" style="padding: 0;">
            <Header />
        </el-header>

        <!-- 容器 -->
        <el-container>

            <!-- 侧边栏 -->
            <el-aside style="width: auto;" class="h-[100vh]" v-show="appData.isCollapse">

                <div :style="layout.getLayoutMargingTop">
                    <el-scrollbar :style="`height:calc(100vh - ${layoutConfig.offset}px);`">
                        <Sider />
                    </el-scrollbar>
                </div>

            </el-aside>

            <!-- 右侧主容器 -->
            <el-scrollbar ref="scrollbarRef" height="100vh" class="flex-1" @scroll="layout.scrollEvent">

                <!-- 主体容器 -->
                <div class="px-[10px] box-border flex flex-col flex-1"
                    :style="`margin-top: ${layoutConfig.headerHeight + 12}px;min-height:calc(100vh - ${layoutConfig.headerHeight + 12}px);`">

                    <div class="flex-1 flex flex-col flex-wrap overflow-hidden">

                        
                        <!-- 路由出口 使用动画 -->
                        <router-view v-if="systemConfig.routerTransition" v-slot="{ Component, route }">
                            <transition :name="systemConfig.routerTransition">
                                <div :key="route.path" class="flex-1 flex flex-col flex-wrap overflow-hidden w-full">
                                    <component :is="Component" />
                                </div>
                            </transition>
                        </router-view>

                        <!-- 路由出口 不使用动画 -->
                        <router-view v-else />

                    </div>

                    <!-- footer -->
                    <Footer />

                </div>

            </el-scrollbar>

        </el-container>

        <!-- 返回顶部 -->
        <div class="fixed right-[10px] bottom-20 z-[999]">
            <template v-if="!layout.showGoTop">
                <el-button @click="layout.scrollTop" :icon="Top" circle />
            </template>
        </div>

    </el-container>
</template>

<style lang="scss">
@import url(../../assets/styles/transition.scss);
</style>
