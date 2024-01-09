  
<script lang="ts" setup>
import { t } from '@/langs'
import { PropType } from 'vue'
import { sliderConfig } from '@/config'
import { arrayIsNotEmpty } from '@/utils'
import Icon from '@/components/common/Icon.vue'

defineProps({
    router: {
        type: Object as PropType<UserRouter>,
    }
})

const emits = defineEmits<{
    (event: 'menuClick', data: UserRouter): void
}>()

const click = (data: UserRouter) => emits('menuClick', data)

</script>


<template>
    <el-sub-menu :index="router?.path" v-if="arrayIsNotEmpty(router!.children || [])">

        <template #title>
            <Icon :icon="router?.meta.icon" :size="sliderConfig.iconSize" class="mr-[4px]" v-if="router?.meta.icon" />
            <span>{{ t(`sliderMenu.${router?.meta.i18nKey}`) || router?.meta.title }} </span>
        </template>

        <template v-for="item in router?.children" :key="item.name">
            <el-menu-item v-if="!item.hidden" :index="item.path" @click="click(item)">
                <div class="flex justify-between flex-1 items-center">
                    <span> {{ t(`sliderMenu.${item.meta.i18nKey}`) || item?.meta.title }} </span>
                    <span v-if="item.isNew" class="w-[6px] h-[6px] rounded-full bg-[var(--charge)]"></span>
                </div>
            </el-menu-item>
        </template>

    </el-sub-menu>

    <template v-else>

        <el-menu-item :index="router?.path" v-if="!router!.hidden" @click="click(router!)">
            <Icon :icon="router?.meta.icon" :size="sliderConfig.iconSize" class="mr-[4px]" v-if="router?.meta.icon" />
            <template #title> {{ t(`sliderMenu.${router?.meta.i18nKey}`) || router?.meta.title }} </template>
        </el-menu-item>

    </template>
</template>
