<script lang="ts" setup>
import { t } from '@/langs'
import { computed } from 'vue'
import { loaclRouter } from '@/routers'
import { sliderConfig } from '@/config'
import { useRoute, useRouter } from 'vue-router'
import { arrayIsNotEmpty, objectToUrlQuery } from '@/utils'
import { useAppData, useLayout, useSystemConfig } from '@/store'

import Icon from '@/components/common/Icon.vue'

const layout = useLayout()
const appData = useAppData()
const systemConfig = useSystemConfig()

const route = useRoute()
const router = useRouter()
const defaultActive = computed(() => route.path)

const routerPush = (data: UserRouter) => {
    const urlQuery = { ...route.query, stationCode: appData.currentParkSerial }
    if (data.layoutType == 'NewTabLayOut') {
        window.open('/dataAnalysis/thermalField' + objectToUrlQuery(urlQuery))
        return
    }
    router.push({ path: data.path, query: urlQuery })
    layout.scrollTop()
}


</script>

<template>
    <div class="flex-1">


        <el-menu :active-text-color="systemConfig.themeColor" :default-active="defaultActive" mode="horizontal"
            style="border: none;">

            <template v-for="router in loaclRouter">

                <el-sub-menu :index="router?.path" :key="router.path" v-if="arrayIsNotEmpty(router!.children || [])">

                    <template #title>
                        <Icon :icon="router?.meta.icon" :size="sliderConfig.iconSize" class="mr-[4px]"
                            v-if="router?.meta.icon" />
                        <span>{{ t(`sliderMenu.${router?.meta.i18nKey}`) || router?.meta.title }} </span>
                    </template>

                    <template v-for="item in router?.children" :key="item.name">
                        <el-menu-item v-if="!item.hidden" :index="item.path" :key="item.path"
                            @click="routerPush(item as any)">
                            <div class="flex justify-between flex-1 items-center">
                                <span> {{ t(`sliderMenu.${item.meta.i18nKey}`) || item?.meta.title }} </span>
                                <span v-if="item.isNew" class="w-[6px] h-[6px] rounded-full bg-[var(--charge)]"></span>
                            </div>
                        </el-menu-item>
                    </template>

                </el-sub-menu>

                <template v-else>

                    <el-menu-item :index="router?.path" v-if="!router!.hidden" @click="routerPush(router as any)">
                        <Icon :icon="router?.meta.icon" :size="sliderConfig.iconSize" class="mr-[4px]"
                            v-if="router?.meta.icon" />
                        <template #title> {{ t(`sliderMenu.${router?.meta.i18nKey}`) || router?.meta.title }} </template>
                    </el-menu-item>

                </template>

            </template>

        </el-menu>


    </div>
</template>

