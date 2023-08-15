import { EChartsOption } from "echarts"
import { conversionUnitKWh, getEfficiency, paserTime, arrayGroupByMap, unitConversionEdgeProcess, KWHUnits, getKWHZoomRatioAndUnit } from "@/utils"

export type TableData = {
    time: string,
    date: number,
    charge: string,
    chargeUnit: string,
    discharge: string,
    dischargeUnit: string,
    raw_charge: number,
    raw_discharge: number,
    efficiency: number
}

export const processData = ({ expressions, timestamps, values }: ParkRunReportData) => {
    const chargeIndex = expressions.indexOf('charge')
    const dischargeIndex = expressions.indexOf('disCharge')
    const charge = values[chargeIndex]
    const discharge = values[dischargeIndex]
    return timestamps.map((time, index) => {
        const raw_charge = charge[index]
        const raw_discharge = discharge[index]
        const { size: chargeSzie, unit: chargeUnit } = conversionUnitKWh(charge[index])
        const { size: dischargeSzie, unit: dischargeUnit } = conversionUnitKWh(discharge[index])
        const efficiency = getEfficiency(raw_charge, raw_discharge)
        return {
            date: time,
            time: paserTime(time, 'YYYY-MM-DD'),
            charge: chargeSzie,
            chargeUnit,
            discharge: dischargeSzie,
            dischargeUnit,
            raw_charge,
            raw_discharge,
            efficiency
        }
    })
}

const createChartData = (data: TableData[]) => {
    const charges: (number | number)[][] = []
    const disCharges: (number | number)[][] = []
    const efficiencys: (number | number)[][] = []
    data.map(({ date, raw_charge, raw_discharge, efficiency }) => {
        charges.push([date, raw_charge])
        disCharges.push([date, raw_discharge])
        efficiencys.push([date, efficiency > 100 ? 100 : efficiency])
    })
    return {
        charges,
        disCharges,
        efficiencys
    }
}

export const render = (data: TableData[], renderChart: (oprions: EChartsOption) => void) => {
    const { charges, disCharges, efficiencys } = createChartData(data)
    renderChart({
        legend: {},
        xAxis: {
            type: 'time',
        },
        yAxis: {
            type: 'value'
        },
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(26, 27, 28, 0.9);',
            textStyle: {
                color: '#fff',
            },
        },
        grid: {
            top: '10%',
            left: '1%',
            right: '1%',
            bottom: '4%',
            containLabel: true
        },
        series: [
            {
                data: charges,
                type: 'line',
                name: '充电',
            },
            {
                data: disCharges,
                type: 'line',
                name: '放电',
            },
            {
                data: efficiencys,
                type: 'line',
                name: '效率',
            }
        ]
    })
}

export const dateFormatterType: Record<string, string> = {
    'D': 'YYYY-MM-DD',
    'M': 'YYYY-MM',
    'Y': 'YYYY',
}


// 历史数据
export const processTableRowData = (item: any, splitSymbol: any) => {
    const tableDataItem = {} as Record<string, string>
    const { id, charge, time, name, disCharge } = item as any
    const chargeKey = `charge_${id}`
    const disChargeKey = `discharge_${id}`
    const nameKey = `${name}${splitSymbol}${id}`
    const idKey = `${id}`
    tableDataItem.time = time
    tableDataItem[chargeKey] = charge
    tableDataItem[disChargeKey] = disCharge
    tableDataItem[nameKey] = name
    tableDataItem[idKey] = idKey
    return tableDataItem
}


/** 生成设备图表历史数据 */
const createLineData = (data: HistoryReportData[]) => {

    const groups = arrayGroupByMap(data, 'name')

    const series: Array<any> = []

    let maxs = [] as number[]

    groups.forEach((value, key) => {

        const change = value.map(item => [+new Date(item.time), item.charge]).sort((a: any[], b: any[]) => a[0] - b[0])
        const dischange = value.map(item => [+new Date(item.time), item.disCharge]).sort((a: any[], b: any[]) => a[0] - b[0])
        const mergeNumbers = [...change.map(item => item[1]), ...dischange.map(item => item[1])] as number[]
        const max = Math.max(...mergeNumbers)
        maxs.push(max)

        series.push({
            data: change,
            name: key + '充电',
            type: 'line',
        })
        series.push({
            data: dischange,
            name: key + '放电',
            type: 'line',
        })
    })

    const { unit, zoomLimit } = getKWHZoomRatioAndUnit(maxs)

    series.forEach((item) => {
        item.data.forEach((_item: any, _index: number) => {
            item.data[_index][1] = +_item[1] / zoomLimit
        })
    })

    return {
        series,
        unit
    }

}


export const renderLine = (data: HistoryReportData[], renderChart: (oprions: EChartsOption) => void) => {
    const { series, unit } = createLineData(data)
    renderChart({
        title: {
            text: unit,
            top: 0,
            left: '0%',
            textStyle: {
                color: '#333',
                fontSize: 14,
            }
        },
        animation: false,
        grid: {
            top: '10%',
            left: '1%',
            right: '1%',
            bottom: '4%',
            containLabel: true
        },
        xAxis: {
            type: 'time'
        },
        yAxis: {
            type: 'value'
        },
        tooltip: {
            show: true,
            trigger: 'axis',
            backgroundColor: 'rgba(26, 27, 28, 0.9);',
            textStyle: {
                color: '#fff',
            },
        },
        legend: {},
        series: series
    })
}