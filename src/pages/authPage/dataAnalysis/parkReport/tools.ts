import { t } from '@/langs'
import { EChartsOption } from "echarts"
import { conversionUnitKWh, getEfficiency, parserTime, arrayGroupByMap, getKWHZoomRatioAndUnit, writeDefault  } from "@/utils"

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

    const { chargeIndex, dischargeIndex, PCSchargeIndex, PCSdischargeIndex } = getIndex(expressions)

    const { charge, discharge, PCScharge = [], PCSdischarge = [] } = getChargeAndDiasCharge(values, chargeIndex, dischargeIndex, PCSchargeIndex, PCSdischargeIndex)


    return timestamps.map((time, index) => {

        const raw_charge = writeDefault(charge[index], 0)
        const raw_discharge = writeDefault(discharge[index], 0)
        const PCSraw_charge = writeDefault(PCScharge[index], 0)
        const PCSraw_discharge = writeDefault(PCSdischarge[index], 0)

        const { size: chargeSize, unit: chargeUnit } = conversionUnitKWh(charge[index])
        const { size: dischargeSize, unit: dischargeUnit } = conversionUnitKWh(discharge[index])

        const { size: PCSchargeSize, unit: PCSchargeUnit } = conversionUnitKWh(PCScharge[index])
        const { size: PCSdischargeSize, unit: PCSdischargeUnit } = conversionUnitKWh(PCSdischarge[index])

        const efficiency = getEfficiency(raw_charge, raw_discharge)
        const PCSefficiency = getEfficiency(PCSraw_charge, PCSraw_discharge)

        return {
            date: time,
            time: parserTime(time, 'YYYY-MM-DD'),
            charge: chargeSize,
            chargeUnit,
            discharge: dischargeSize,
            dischargeUnit,
            raw_charge,
            raw_discharge,
            efficiency,
            PCSefficiency,
            PCSchargeSize,
            PCSchargeUnit,
            PCSdischargeSize,
            PCSdischargeUnit
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
                name: t('common.charge'),
            },
            {
                data: disCharges,
                type: 'line',
                name: t('common.discharge'),
            },
            {
                data: efficiencys,
                type: 'line',
                name: t('common.efficiency'),
            }
        ]
    })
}


// 历史数据
export const processTableRowData = (item: any, splitSymbol: any) => {
    const tableDataItem = {} as Record<string, string>
    const { id, charge, time, name, disCharge, pcsCharge, pcsDisCharge } = item as any
    const chargeKey = `charge_${id}`
    const disChargeKey = `discharge_${id}`
    const PCSchargeKey = `PCScharge_${id}`
    const PCSdisChargeKey = `PCSdisCharge_${id}`
    const nameKey = `${name}${splitSymbol}${id}`
    const idKey = `${id}`
    tableDataItem.time = time
    tableDataItem[chargeKey] = charge
    tableDataItem[disChargeKey] = disCharge
    tableDataItem[PCSchargeKey] = pcsCharge
    tableDataItem[PCSdisChargeKey] = pcsDisCharge
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
            name: key + t('common.charge'),
            type: 'line',
        })
        series.push({
            data: dischange,
            name: key + t('common.discharge'),
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

function getChargeAndDiasCharge(values: number[][], chargeIndex: number, dischargeIndex: number, PCSchargeIndex: number, PCSdischargeIndex: number) {
    const charge = values[chargeIndex]
    const discharge = values[dischargeIndex]
    const PCScharge = values[PCSchargeIndex]
    const PCSdischarge = values[PCSdischargeIndex]
    return { charge, discharge, PCScharge, PCSdischarge }
}

function getIndex(expressions: string[]) {

    const chargeIndex = expressions.indexOf('charge')

    const dischargeIndex = expressions.indexOf('disCharge')

    const PCSchargeIndex = expressions.indexOf('pcsCharge')

    const PCSdischargeIndex = expressions.indexOf('pcsDisCharge')

    return { chargeIndex, dischargeIndex, PCSchargeIndex, PCSdischargeIndex }
}
