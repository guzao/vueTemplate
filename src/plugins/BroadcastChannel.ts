import { useI18nStore } from '@/store'
import type { App, InjectionKey } from "vue"

type PostMeaageType = 'DarkModel' | 'I18n'

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
    }

    onMessage() {
        this.channel.onmessage = (event: { data: MeaageTypeData }) => this.typeHandle(event)
        this.channel.onmessageerror = (event) => console.warn(event)
    }

    typeHandle (event: { data: MeaageTypeData }) {
        const { name, params } = event.data
        switch (name) {
            case 'DarkModel':
                console.log(params)
                break;
            case 'I18n':
                this.setLang(params.lang)
                break;
            default:
                break;
        }
    }

    setLang (lang: string) {
        const i18nStore = useI18nStore()
        i18nStore.setLang(lang)
    }

    close() {
        this.channel.close()
    }

    onPostMessage(type: PostMeaageType, params: Record<string, any>) {
        this.channel.postMessage({
            name: type,
            params
        })
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
