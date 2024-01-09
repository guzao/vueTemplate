<script lang="ts" setup>
import { parserTime, } from '@/utils'
import { useNoticeDetail } from './useNoticeDetail'
import Skeleton from '@/components/common/Skeleton.vue';
import OutLayouPage from '../../components/OutLayouPage.vue'

const { result, loading } = useNoticeDetail()

</script>

<template>
    <OutLayouPage>

        <Skeleton :rows="10" :loading="loading">

            <mavon-editor :ishljs="false" :editable="false" :toolbarsFlag="false" boxShadowStyle="none" :subfield="false"
                :defaultOpen="'preview'" previewBackground="#fff" v-model="result.noticeContent" />

            <div class="px-[20px]">

                <div class="text-right mb-[10px]"> 此致 </div>

                <div class="text-right mb-[10px]"> 敬礼 </div>

                <div class="text-right mb-[10px] font-bold text-[16px]"> 上海电气国轩-SmartOPS开发团队 </div>

                <div class="text-right mb-[10px]"> {{ parserTime(new Date(result.createTime), 'YYYY-MM-DD') }} </div>

                <el-divider content-position="left"></el-divider>

                <div class="mb-[10px] font-bold text-[16px] mb-[10px]"> 小程序二维码 </div>

                <div class="flex justify-center">
                    <img class="w-[200px] h-[200px]" src="../../../../assets/image/login/qrcode.jpg" alt="">
                </div>

                <el-divider content-position="left"></el-divider>
                <div class="mb-[10px] font-bold text-[16px] mb-[10px]"> 联系人二维码 </div>
                <div class="flex justify-center">
                    <img class="w-[400px] h-[532px]" src="../../../../assets/image/login/img.jpg" alt="">
                </div>
            </div>

            <el-backtop target="#out_layout_main" :right="100" :bottom="100" />
        </Skeleton>
    </OutLayouPage>
</template>

