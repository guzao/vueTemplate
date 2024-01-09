<script lang="ts" setup>
import { isTrue } from '@/utils';
import { useNotice } from '../../hooks/useNotice'
import Skeleton from '@/components/common/Skeleton.vue';
import OutLayouPage from '../../components/OutLayouPage.vue'

const { loading, checkDetail, result, pageParams } = useNotice()

</script>

<template>
    <OutLayouPage>

        <Skeleton :rows="8" :loading="loading">

            <div class="p-[30px] box-border flex-1">

                <ul class="border border-[#e7e7eb] border-b-[none]">
                    <li @click="checkDetail(item)"
                        class="flex h-[46px] justify-between items-center border-b px-[20px] cursor-pointer last:border-0 hover:underline"
                        v-for="item in result.reverse()" :key="item.noticeId">
                        <span class=" hover:text-[var(blue)]"> {{ item.noticeTitle }} </span>
                        <span class="text-[var(--theme-gray153)]"> {{ item.createTime }} </span>
                    </li>
                </ul>

            </div>

            <div class="flex justify-end px-[30px] box-border mb-[20px]" v-if="isTrue(pageParams.total >= 10)">
                <el-pagination v-model:current-page="pageParams.pageNum" v-model:page-size="pageParams.pageSize"
                    :page-sizes="[100, 200, 300, 400]" background layout="total, sizes, prev, pager, next, jumper"
                    :total="pageParams.total" />
            </div>
            
        </Skeleton>
    </OutLayouPage>
</template>

