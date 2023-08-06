import { ref, defineEmits } from 'vue';
import { getParkInfo } from '@/API'
import { useReactiveHttp } from '@/hooks'
import { useAppData, useDicts } from '@/store'
import { deepCloe } from '@/utils'
import ParkForm from './ParkForm.vue'


export function useParkList(emits: any) {

    const appData = useAppData()



    const formInstance = ref<InstanceType<typeof ParkForm>>()

    const confirm = async () => {
        try {
            await formInstance.value?.formInstance?.validate()
            emits('update')
        } catch (error) {
            console.log(error)
        }
    }

    const baseData = {
        "createBy": '',
        "createTime": "",
        "updateBy": "",
        "updateTime": "",
        "remark": null,
        "fullName": "",
        "name": "",
        "serial": appData.currentParkSerial,
        "industryType": "",
        "type": "0",
        "useType": "",
        "status": "1",
        "totalPower": "",
        "energy": "",
        "buildTime": "",
        "buildStatus": "",
        "operateTime": "",
        "runStatus": "",
        "countryId": null,
        "areaId": null,
        "address": "",
        "longitude": null,
        "latitude": null,
        "delFlag": 0,
        "releaseStatus": "0",
        "sort": 0
    } as ParkListData

    const parkId = ref('')

    const { result, getResult, loading } = useReactiveHttp({
        initData: deepCloe(baseData),
        request: () => getParkInfo(parkId.value),
        Immediately: false
    })

    const dicts = useDicts()

    const drawerState = ref(false)

    const title = ref('')
    const isEdit = ref(false)

    const addPark = () => {
        isEdit.value = false
        title.value = '添加电站'
        result.value = deepCloe(baseData)
        drawerState.value = true
    }

    const editPark = async (park: ParkListData) => {
        title.value = '编辑电站'
        isEdit.value = false
        parkId.value = park.id as any
        getResult()
        drawerState.value = true
    }

    const checkPark = async (park: ParkListData) => {
        title.value = '查看电站'
        isEdit.value = true
        parkId.value = park.id as any
        getResult()
        drawerState.value = true
    }

    return {
        parkId,
        result, 
        getResult, 
        loading,
        drawerState,
        dicts,
        title,
        isEdit,
        addPark,
        editPark,
        checkPark,
        confirm,
        formInstance,
        emits,
        appData
    }

}


export const ruleForm = {
    fullName: [  { required: true, message: 'Please input Activity name', trigger: 'blur' }, ],
    name:  [  { required: true, message: 'Please input Activity name', trigger: 'blur' }, ],
    serial:  [  { required: true, message: 'Please input Activity name', trigger: 'blur' }, ],
    industryType:  [  { required: true, message: 'Please input Activity name', trigger: 'blur' }, ],
    type:  [  { required: true, message: 'Please input Activity name', trigger: 'blur' }, ],
    useType:  [  { required: true, message: 'Please input Activity name', trigger: 'blur' }, ],
    totalPower:  [  { required: true, message: 'Please input Activity name', trigger: 'blur' }, ],
    energy:  [  { required: true, message: 'Please input Activity name', trigger: 'blur' }, ],
    status:  [  { required: true, message: 'Please input Activity name', trigger: 'blur' }, ],
    operateTime:  [  { required: true, message: 'Please input Activity name', trigger: 'blur' }, ],
    buildTime:  [  { required: true, message: 'Please input Activity name', trigger: 'blur' }, ],
}