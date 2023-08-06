<script lang="ts" setup>
import { computed } from 'vue'
import { sliderConfig, } from '@/config'
import { arrayIsNotEmpty } from '@/utils'
import { useAppData, useLayout } from '@/store'
import { useRoute, useRouter } from 'vue-router'

import { loaclRouter } from '@/routers'

import { Location, Setting } from '@element-plus/icons-vue'

const appData = useAppData()
const layout = useLayout()

const route = useRoute()
const router = useRouter()
const defaultActive = computed(() => route.path)

const routerPush = (data: UserRouter) => {
    const urlQuery = { ...route.query, stationCode: appData.currentParkSerial }
    router.push({ path: data.path, query: urlQuery })
    layout.scrollTop()
}


</script>

<template>
    <div class="flex-1 overflow-x-auto">

        <el-menu :active-text-color="sliderConfig.activeTextColor" :default-active="defaultActive" class="el-menu-demo"
            mode="horizontal" style="border: none;">

            <template v-for="router in loaclRouter">

                <el-sub-menu :index="router?.path" v-if="arrayIsNotEmpty(router!.children || [])">

                    <template #title>
                        <el-icon>
                            <location />
                        </el-icon>
                        <span>{{ router?.meta.title }}</span>
                    </template>

                    <template v-for="item in router?.children" :key="item.name">
                        <el-menu-item v-if="!item.hidden" :index="item.path"  @click="routerPush(item as any)">
                            {{ item?.meta.title }}
                        </el-menu-item>
                    </template>

                </el-sub-menu>

                <template v-else>

                    <el-menu-item :index="router?.path" v-if="!router!.hidden" @click="routerPush(router as any)">
                        <el-icon>
                            <Setting />
                        </el-icon>
                        <template #title> {{ router?.meta.title }} </template>
                    </el-menu-item>

                </template>

            </template>

        </el-menu>

    </div>
</template>

