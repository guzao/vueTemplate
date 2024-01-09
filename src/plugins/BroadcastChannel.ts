import { useI18nStore } from '@/store'
import type { App, InjectionKey } from "vue"
import { notInsideSystemPage } from '@/HTTP/responseHandle'

type PostMeaageType = 'DarkModel' | 'I18n' | 'userlogOut' | 'WorkOrder'

enum PostMeaageTypeEnum {
    /** 暗黑模式 */
    DarkModel = 'DarkModel',
    /** 国际化 */
    I18n = 'I18n',
    /** 用户登出系统 */
    userlogOut = 'userlogOut',
    /** 工单处理 */
    WorkOrder = 'WorkOrder',
}

type MeaageTypeData = {
    name: PostMeaageType,
    params: Record<string, any>
}

export const SmartOpsBroadcastChannelConextKey: InjectionKey<SmartOpsBroadcastChannel> = Symbol('SmartOpsBroadcastChannelConextKey')

class SmartOpsBroadcastChannel {



    private channel: BroadcastChannel = new BroadcastChannel('SmartOpsBroadcastChannel')

    private app: App<Element>

    constructor(app: App<Element>) {
        this.install()
        this.app = app
        this.app.provide(SmartOpsBroadcastChannelConextKey, this)
    }

    install() {
        this.onMessage()
        this.close()
    }

    /**
     * 广播事件处理
    */
    onMessage() {
        this.channel.onmessage = (event: { data: MeaageTypeData }) => this.typeHandle(event)
        this.channel.onmessageerror = (event) => console.warn(event)
    }

    typeHandle(event: { data: MeaageTypeData }) {

        if (notInsideSystemPage()) return

        const { name, params } = event.data
        switch (name) {
            case PostMeaageTypeEnum.DarkModel:
                console.log(params, '暗黑模式')
                break;
            case PostMeaageTypeEnum.I18n:
                this.setLang(params.lang)
                break;
            case PostMeaageTypeEnum.userlogOut:
                location.reload()
                break;
            case PostMeaageTypeEnum.WorkOrder:
                console.log('工单处理')
                break;
            default:
                break;
        }
    }

    setLang(lang: string) {
        const i18nStore = useI18nStore()
        i18nStore.setLang(lang)
    }

    close() {
        window.addEventListener('beforeunload', e => this.channel.close())
    }

    onPostMessage(type: PostMeaageType, params: Record<string, any>) {
        this.channel.postMessage({ name: type, params })
    }

}


/**
 * 应用广播
*/
export function useSmartOpsBroadcastChannel(app: App<Element>) {
    const smartOpsBroadcastChannelInstance = new SmartOpsBroadcastChannel(app)
    smartOpsBroadcastChannelInstance.install()
    return smartOpsBroadcastChannelInstance
}
