<script lang="ts" setup>
import { paserTime } from '@/utils'
import { useAppData } from '@/store'
import NavBar from '@/components/common/SubNavBar.vue'
import SubTitle from '@/components/common/SubTitle.vue'
import LastTime from '@/components/common/LastTime.vue'

const appdate = useAppData()
</script>


<template>
    <SubTitle />

    <NavBar class="mb-[16px]" :show-view-model-select="false" :show-device-state-desc="false">
        <div class="flex justify-end">
            <LastTime> {{ paserTime(appdate.currentLastTime, 'YYYY-MM-DD HH:mm:ss') }} </LastTime>
        </div>
    </NavBar>
</template>