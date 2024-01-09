import { t } from "@/langs"
import { useAppData, } from '@/store'
import { useEventListener } from '@vueuse/core'
import { Ref, ref, shallowRef, watch, computed, reactive } from 'vue'
import { useReactiveHttp_, useFormInstance, useEcharts } from '@/hooks'
import { getFirstElement, getLastElement, hasError, subtractDate, parserTime, getArrayLength, isTrue, } from "@/utils"
import { getUnitGroupList, getBindEnergyStorageUnit, getScatterTrendChart, getGroupCluster, getScatter } from '@/API'



export function useConsistentScatter() {


    const { formInstance, validate } = useFormInstance()

    const { formInstance: pointFormIntance, validate: pointFormValidate } = useFormInstance()

    const appData = useAppData()

    const timeIndex = ref(-1)

    const { chartRef: lineChartRef, renderChart: renderLineChart, chartInstance } = useEcharts(300)

    const lineFrom = ref(createLineFrom(appData))

    const [unitGroupList, getUnitGroupListData, unitGroupListLoading] = useReactiveHttp_({
        initData: [] as UnitListData[],
        request: () => getUnitGroupList({ stationSerial: appData.currentParkSerial }),
        requestCallback: res => res.data
    })

    const [unitData, getUnitData, unitDataLoading] = useReactiveHttp_({
        initData: [] as BindEnergyStorageUnit[],
        request: () => getBindEnergyStorageUnit({ stationSerial: appData.currentParkSerial, assetSerial: getLastElement(lineFrom.value.deviceNode) }),
        requestCallback: res => res.data,
        Immediately: false
    })


    const unitGroupChange = async (value: UnitListData) => {
        await getUnitData()
        pointForm.value.devCode = ''
        lineFrom.value.unit = getFirstElement(unitData.value).serial
        getTrendData()
    }


    const lineLoaing = ref(false)
    const lineData = shallowRef<any[]>([])
    const prevDisabled = computed(() => timeIndex.value <= 0)
    const nextDisabled = computed(() => getArrayLength(lineData.value) - 1 >= timeIndex.value)

    const position = reactive({
        x: 0,
        y: 40,
        time: 0,
        info: ''
    })
    const cardTipLinePosition = ref<'left' | 'right'>('left')

    const getTrendData = async () => {
        try {
            await validate()
            lineLoaing.value = true
            const { deviceNode, duration: [star, end], pointType, unit } = lineFrom.value
            const params = {
                stationSerial: appData.currentParkSerial,
                startTime: star,
                endTime: end,
                devCode: `${getLastElement(deviceNode)}.${unit}.S01`,
                pointType
            }
            getScatterTrendChart(params).then(res => {
                lineLoaing.value = false
                if (hasError(res)) return
                lineData.value = res.data
                renderLineChart(renderLineChartOtions(lineData.value) as any).then(chart => {
                    chart.getZr().off('click')
                    chart.getZr().on('click', ({ offsetX, offsetY, event }) => {
                        const { offsetWidth } = event.srcElement as HTMLElement
                        const pointInPixel = [offsetX, offsetY]
                        if (chart.containPixel('grid', pointInPixel)) {
                            const index = chart.convertFromPixel({ seriesIndex: 0 }, pointInPixel)[0]
                            timeIndex.value = index
                            const value = res.data[0].pointList[index]
                            pointForm.value.time = value[0]
                            if ((offsetX + 200) >= offsetWidth) {
                                position.x = offsetX - 200
                                cardTipLinePosition.value = 'right'
                            } else {
                                position.x = offsetX
                                cardTipLinePosition.value = 'left'
                            }
                            position.time = value[0]
                            position.info = value[1]
                            getScatterChart()
                        }
                    })
                })
            }).catch(err => lineLoaing.value = false)
        } catch (error) {
            console.log(error)
        }
    }




    const pointForm = ref(createPointForm())

    const getScatterChart = async () => {
        try {
            await pointFormValidate()
            getScatterData()
        } catch (error) {
            console.log(error);
        }
    }

    const [clusterData, getCluster, clusterLoading] = useReactiveHttp_({
        initData: [] as BindEnergyStorageUnit[],
        request: () => {
            const unitId = unitData.value.find(item => item.serial == pointForm.value.devCode)?.id
            return getGroupCluster({ unitId })
        },
        requestCallback: (res) => res.data,
        Immediately: false
    })

    const uniChange = async () => {
        clusterData.value.length = 0
        pointForm.value.cluster = ''
        await getCluster()
        getScatterChart()
    }

    const [scatterData, getScatterData, scatterLoading] = useReactiveHttp_({
        initData: { midIndex: [], unit: '', min: '', scatterData: [], max: '', lastIndex: [] } as ScatteDta,
        request: () => {
            const { time, devCode, type, cluster } = pointForm.value
            const { deviceNode } = lineFrom.value
            const params = { stationSerial: appData.currentParkSerial, time: parserTime(time, 'YYYY-MM-DD HH:mm:ss'), devCode: `${getLastElement(deviceNode)}.${devCode}.S01`, type, cluster }
            return getScatter(params)
        },
        requestCallback: res => {
            const { midIndex, scatterData } = res.data as ScatteDta
            renderScatterChart({
                legend: {},
                grid: {
                    left: '2%',
                    right: '1%',
                    bottom: '4%',
                    top: '14%',
                    containLabel: true
                },
                dataset: {
                    sourceHeader: false, // 第一行/列直接开始是数据
                    dimensions: ['value', 'locationNo'], // 维度命名
                    source: scatterData
                },
                xAxis: {
                    type: 'category',
                    axisTick: {
                        show: false,
                    },
                    axisLabel: {
                        show: true,
                        interval: 0,
                        fontWeight: 'bold',
                        fontFamily: 'Microsoft YaHei',
                        formatter: (value, index) => {
                            if (midIndex.includes(index)) return value
                            return ''
                        }
                    },
                    splitLine: {
                        show: false,
                        lineStyle: {
                            width: 1,
                            type: "dashed",
                            color: "RGBA(51, 64, 89, .05)",
                        },
                    },
                    axisPointer: {

                    },
                },
                yAxis: {
                    name: '[]',
                    type: 'value',
                    min: 'dataMin'
                },
                series: [
                    {
                        encode: {
                            x: 'locationNo',
                            y: 'value',
                        },
                        symbolSize: 10,
                        type: 'scatter',
                    }
                ]
            })
            return res.data
        },
        Immediately: false
    })

    const { chartRef: scatterChartRef, renderChart: renderScatterChart } = useEcharts()

    const prevTime = () => {
        if (isTrue(scatterLoading.value)) return
        if (timeIndex.value <= 0) return
        timeIndex.value--
        const pointList = lineData.value[0].pointList
        let index = findTimeIndex()
        pointForm.value.time = pointList[index == 0 ? 0 : --index][0]
        const { offsetWidth } = lineChartRef.value!
        position.x = getPix(index)
        position.time = pointForm.value.time as any
        position.info = pointList[index][1]
        getScatterChart()
    }

    const nextTime = () => {
        if (isTrue(scatterLoading.value)) return
        const pointList = lineData.value[0].pointList
        const maxIndex = getArrayLength(pointList) - 1
        if (timeIndex.value >= maxIndex) return
        timeIndex.value++
        let index = findTimeIndex()
        pointForm.value.time = pointList[index == maxIndex ? maxIndex : ++index][0]
        const { offsetWidth } = lineChartRef.value!
        position.x = getPix(index)
        position.time = pointForm.value.time as any
        position.info = pointList[index][1]
        getScatterData()
    }

    const getPix = (index: number) => chartInstance.value?.convertToPixel({ xAxisIndex: 0 }, [index])! as unknown as number

    const findTimeIndex = () => lineData.value[0].pointList.findIndex((item: any) => item[0] == pointForm.value.time)


    useEventListener('keyup', async ({ key }) => {
        try {
            await validate()
            if (key == 'ArrowLeft') return prevTime()
            if (key == 'ArrowRight') return nextTime()
        } catch (error) {
        }
    })

    watch(() => appData.currentParkSerial, () => {
        getUnitGroupListData()
        lineFrom.value = createLineFrom(appData)
        unitGroupList.value.length = 0
        unitData.value.length = 0
        lineData.value.length = 0

        pointForm.value = createPointForm()
        clusterData.value.length = 0
    })

    return {
        position,
        cardTipLinePosition,
        lineFrom,
        formInstance,
        lineFromRules,
        lineChartRef,
        unitGroupList,
        unitGroupListLoading,
        unitData,
        getTrendData,
        unitDataLoading,
        unitGroupChange,

        lineData,
        pointForm,
        lineLoaing,
        getScatterChart,
        scatterFromRules,
        clusterData,
        clusterLoading,
        uniChange,
        scatterData,
        scatterLoading,
        scatterChartRef,
        prevTime,
        nextTime,
        prevDisabled,
        nextDisabled
    }

}



const createLineFrom = (appData: ReturnType<typeof useAppData>) => {
    const baseTiime = new Date(appData.currentLastTime || Date.now())
    return {
        duration: [subtractDate(baseTiime, 1), baseTiime], // 时间范围
        deviceNode: [], // 节点到箱子
        unit: '', // 储能单元
        pointType: 1, // vol/temp/soc
    }
}


const lineFromRules = {
    duration: [{ required: true, message: 'Please input Activity name', trigger: 'blur' },],
    deviceNode: [{ required: true, message: 'Please input Activity name', trigger: 'change' },],
    unit: [{ required: true, message: 'Please input Activity name', trigger: 'change' },],
    pointType: [{ required: true, message: 'Please input Activity name', trigger: 'change' },],
}


const createPointForm = () => {
    return {
        time: new Date(),
        devCode: '',
        type: "1",
        cluster: "",
    }
}


const scatterFromRules = {
    time: [{ required: true, message: 'Please input Activity name', trigger: 'blur' },],
    devCode: [{ required: true, message: 'Please input Activity name', trigger: 'change' },],
    cluster: [{ required: false, message: 'Please input Activity name', trigger: 'change' },],
    type: [{ required: true, message: 'Please input Activity name', trigger: 'change' },],
}


function renderLineChartOtions(lineData: any) {
    return {
        legend: {
            type: "scroll",
            top: "5%"
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                axis: 'auto',
                lineStyle: {
                    width: 2,
                    color: '#CDE7D6',
                },
            },
            backgroundColor: 'rgba(26, 27, 28, 0.9);',
            textStyle: {
                color: '#fff',
                fontSize: 12
            },
        },
        animation: false,
        grid: {
            left: '2%',
            right: '1%',
            bottom: '4%',
            top: '14%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            xAxisId: 'x0',
            axisLabel: {
                color: 'rgba(153, 153, 153, 1)',
                fontSize: 12,
                formatter: function (value: any) {
                    let arr = parserTime(+value, 'YYYY-MM-DD HH:mm').split(" ").reverse();
                    return [...arr].join("\n");
                }
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#EBECF0'
                }
            },

            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dashed',
                    color: 'rgba(205, 231, 214, 0.6)'
                }
            },
        },
        axisPointer: {
            lineStyle: {
                width: 3,
                type: 'solid',
            }
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            axisLabel: {
                color: 'rgba(153, 153, 153, 1)',
                fontSize: 12
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#EBECF0'
                }
            },
            min: 'dataMin',
            splitLine: {
                lineStyle: {
                    type: 'dashed',
                    color: 'rgba(205, 231, 214, 0.6)'
                }
            },
        },
        series: lineData.map(({ name, pointList }: any) => {
            return {
                name: name,
                type: 'line',
                symbol: 'none',
                showSymbol: false,
                legendHoverLink: false,
                data: pointList
            }
        })
    }
}
