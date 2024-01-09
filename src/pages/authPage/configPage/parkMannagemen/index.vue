<script lang="ts" setup>
import { useParkMannagemen } from './useParkMannagemen'

import ParkList from './ParkList.vue'
import SubTitle from '@/components/common/SubTitle.vue'
import Skeleton from '@/components/common/Skeleton.vue'
import ParkListInfoHeader from './ParkListInfoHeader.vue'

const { parkList, getResult, loading, parkListInfo } = useParkMannagemen()

</script>

<template>
    <SubTitle />

    <ParkListInfoHeader :park-list-info="parkListInfo" />

    <Skeleton :loading="loading">
        <ParkList @update="getResult" :park-list="parkList" />
    </Skeleton>
</template>