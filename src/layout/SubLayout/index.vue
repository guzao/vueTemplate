<script setup lang="ts">
import { useLayout } from '@/store'
import { layoutConfig } from '@/config'
import { ref, onMounted } from "vue";
import { ElScrollbar } from 'element-plus'
import { Top } from '@element-plus/icons-vue'
import Header from "./components/Header.vue";
import Footer from './components/Footer.vue';

const layout = useLayout()
const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()
onMounted(() => layout.setScrollbarRefInstance(scrollbarRef.value))

</script>

<template>
    <el-container class="relative">

        <el-header class="absolute top-0 right-0 left-0 z-10" :class="layout.hasShowHeader ? 'block' : 'hidden'"
            style="padding: 0;">
            <Header />
        </el-header>

        <el-container>


            <el-aside style="width: auto;" class="h-[100vh]">
                <div :style="layout.getLayoutMargingTop">

                    <el-scrollbar :style="`height:calc(100vh - ${ layoutConfig.offset }px);`">

                        <slot name="left" />

                    </el-scrollbar>

                </div>
            </el-aside>


            <el-scrollbar ref="scrollbarRef" height="100vh" class="flex-1 " @scroll="layout.scrollEvent">
                <div style="min-height:calc(100vh - 66px);" class="px-[12px] box-border flex flex-col mt-[66px]">

                    <div class="flex-1 flex flex-col flex-wrap">

                        <slot />

                    </div>

                    <Footer />

                </div>
            </el-scrollbar>

        </el-container>

        <div class="fixed right-[40px] bottom-20 z-50">
            <el-button @click="layout.scrollTop" v-if="!layout.hasShowHeader" :icon="Top" circle />
        </div>


    </el-container>
</template>
  