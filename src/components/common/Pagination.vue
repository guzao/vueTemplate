<script lang="ts" setup>
import type { PropType } from 'vue';
import { usePagination } from '@/hooks'

type PageParams = {
    pageNum: number;
    pageSize: number;
    total: number;
}

const props = defineProps({

    /** 分页器变化的回调 */
    callback: {
        type: Function,
        default: () => {}
    },

    /** 基础参数 */
    pageParams: {
        type: Object as PropType<PageParams>,
        default: { pageNum: 1, pageSizes: 10  }
    }
    
})

const { pageParams, resteParams, pageSizes } = usePagination({ ...props.pageParams, total: props.pageParams.total , callback: () => props?.callback() })

defineExpose({
    resteParams
})

</script>

<template>
    <div class="flex justify-end mt-[26px]">
        <el-pagination v-model:current-page="pageParams.pageNum" v-model:page-size="pageParams.pageSize"
            :page-sizes="pageSizes" background layout="total, sizes, prev, pager, next, jumper" :total="pageParams.total" />
    </div>
</template>

