<script lang="ts" setup>
import { reactive } from 'vue'
import { getParkList } from '@/API'
import { useReactiveHttp } from '@/hooks'
import { getArrayLength } from '@/utils'

import ParkList from './ParkList.vue'
import SubTitle from '@/components/common/SubTitle.vue'
import Skeleton from '@/components/common/Skeleton.vue'
import ParkListInfoHeader from './ParkListInfoHeader.vue'

const parkListInfo = reactive({
    total: 0,
    power: 0,
    energy: 0,
    cnx: 0,
    gsy: 0,
    byd: 0,
})

const { result: parkList, getResult, loading } = useReactiveHttp({
    initData: [] as ParkListData[],
    request: () => getParkList(),
    requestCallback: ({ rows }) => {
        accParkListInfo(rows)
        return rows
    }
})

const accParkListInfo = (data: ParkListData[]) => {
    
    let { power, energy, cnx, gsy, byd } = parkListInfo

    data.forEach(({ totalPower, energy: _energy, type }) => {
        power += +totalPower
        energy += +_energy
        if (type == '0') cnx++
        if (type == '1') gsy++
        if (type == '2') byd++
    })

    parkListInfo.power = power
    parkListInfo.energy = energy
    parkListInfo.cnx = cnx
    parkListInfo.gsy = gsy
    parkListInfo.byd = byd
    parkListInfo.total = getArrayLength(data)

}

</script>

<template>

    <!-- <div v-loading="loading"> -->
        
    <div >

        <SubTitle />

        <ParkListInfoHeader :park-list-info="parkListInfo" />

        <Skeleton :loading="loading">
            <ParkList @update="getResult" :park-list="parkList" />
        </Skeleton>
    </div>

</template>