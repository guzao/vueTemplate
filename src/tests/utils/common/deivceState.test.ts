import { expect, it, describe } from 'vitest'
import { getRuningStateInfo, getDeviceStateInfo, getDeviceCNXBatteryMarkInfo } from '../../../utils'


describe('test array utils ', () => {


    it('getRuningStateInfo', () => {

        expect(getRuningStateInfo(1)).toEqual({ icon: 'icon_runing_chager', color: 'charge_color', text: '充电', })

        expect(getRuningStateInfo(2)).toEqual({ icon: 'icon_runing_dischager', color: 'discharge_color', text: '放电', })

        expect(getRuningStateInfo(3)).toEqual({ icon: 'icon_runing_standy', color: 'standby_color', text: '待机', })

        expect(getRuningStateInfo(4)).toEqual({ icon: 'icon_runing_alarm', color: 'alarm_color', text: '告警', })

        expect(getRuningStateInfo(5)).toEqual({ icon: 'icon_runing_weihu', color: 'weihu_color', text: '维护', })

        expect(getRuningStateInfo(6)).toEqual({ icon: 'icon_runing_offline', color: 'offline_color', text: '离线', })

    })

    it('getDeviceStateInfo', () => {

        expect(getDeviceStateInfo(1)).toEqual({ icon: 'icon_state_charge', color: 'charge_color', text: '充电', })

        expect(getDeviceStateInfo(2)).toEqual({ icon: 'icon_state_discharge', color: 'discharge_color', text: '放电', })

        expect(getDeviceStateInfo(3)).toEqual({ icon: 'icon_state_standby', color: 'standby_color', text: '待机', })

        expect(getDeviceStateInfo(4)).toEqual({ icon: 'icon_state_alarm', color: 'alarm_color', text: '告警', })

        expect(getDeviceStateInfo(5)).toEqual({ icon: 'icon_state_weihu', color: 'weihu_color', text: '维护', })

        expect(getDeviceStateInfo(6)).toEqual({ icon: 'icon_state_offline', color: 'offline_color', text: '离线', })

    })

    it('getDeviceCNXBatteryMarkInfo', () => {

        expect(getDeviceCNXBatteryMarkInfo(1)).toBe('charge_mark_cnx')
        expect(getDeviceCNXBatteryMarkInfo(1)).not.toBe('discharge_mark_cnx')

        expect(getDeviceCNXBatteryMarkInfo(2)).toBe('discharge_mark_cnx')
        expect(getDeviceCNXBatteryMarkInfo(2)).not.toBe('charge_mark_cnx')

        expect(getDeviceCNXBatteryMarkInfo(3)).toBe('standby_mark_cnx')
        expect(getDeviceCNXBatteryMarkInfo(4)).toBe('alarm_mark_cnx')
        expect(getDeviceCNXBatteryMarkInfo(5)).toBe('alarm_mark_cnx')
        expect(getDeviceCNXBatteryMarkInfo(6)).toBe('alarm_mark_cnx')

    })

})
