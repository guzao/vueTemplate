import { reactive } from 'vue'
import { getParkList } from '@/API'
import { getArrayLength } from '@/utils'
import { useReactiveHttp } from '@/hooks'




export function useParkMannagemen() {

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


    return {
        loading,
        parkList,
        getResult,
        parkListInfo,
        accParkListInfo,
    }

}