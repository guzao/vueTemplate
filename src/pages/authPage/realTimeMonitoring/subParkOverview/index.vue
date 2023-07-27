<script lang="ts" setup>
import { useAppData } from '@/store'
import { useReactiveHttp, useDict } from '@/hooks'
import { getStationInfo, getDevicGroupList } from '@/API'
import SubNavBar from '@/components/common/SubNavBar.vue';
import StationBaseInfoCard from '@/components/common/StationBaseInfoCard.vue';
import TitleInfo from './TitleInfo.vue'
import SubParkCardList from './SubParkCardList.vue'

const appData = useAppData()


/** 子站列表 */
const { result: deivceGroupList, getResult: getDevicGroupListData } = useReactiveHttp({
    initData: [] as DeviceGroup [],
    request: () => getDevicGroupList(appData.currentParkSerial),
    requestCallback: (res) => res.data.unitGroupList,
    Immediately: false
})

/** 电站运行概览 */
const { result: parkRuningInfo, getResult, loading } = useReactiveHttp({ 
    initData: {} as ParkRuningInfo, 
    request: () => getStationInfo(appData.parkSerial), 
    requestCallback(res) {
        res.data.code = appData.currentParkSerial
        res.data.typeLabel = dictLabel.value[ res.data.type ] 
        return res.data
    },
    Immediately: false
})

/** 电站类型 */
const { dictLabel, getResult: getParkType } = useDict('eos_park_type')

getParkType().then( () => getSubParkInfo)

const getSubParkInfo = () => {
    getResult()
    getDevicGroupListData()
}

</script>

<template>

    <div v-watermark="{ markSatate: appData.currentRelease, text: 'xxxxx' }" class="sub_park_overview" v-loading="loading">

        <SubNavBar class="mb-[16px]" @park-change="getSubParkInfo" />

        <div class="bg-[var(--theme-white-bg)] px-[16px] pt-[24px] pb-[40px] box-border park_type mb-[16px]"
            :class="appData.currentParkType == '0' ? 'cnx' : 'cng'">

            <TitleInfo :park-info="parkRuningInfo" />

            <StationBaseInfoCard :sub-info-top="0" :data="parkRuningInfo" class="mt-[20px]" />

        </div>

        <SubParkCardList :deivce-group-list="deivceGroupList" />

    </div>

</template>

<style lang="scss" scoped>
.sub_park_overview {

    .park_type {
        background-size: 314px 100%;
        background-repeat: no-repeat;

        &.cnx {
            background-image: url(../../../../assets/image/common/list_item-bg.png);
        }


        &.cng {
            background-image: url(../../../../assets/image/common/list_item-bg_cng.png);
        }
    }

}
</style>