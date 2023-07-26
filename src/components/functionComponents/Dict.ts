import { defineComponent, h,Fragment, provide } from "vue";
import { useReactiveHttp } from '@/hooks'
import { getDictType } from '@/API'

export default defineComponent({
    name: 'dictMap',
    setup (ctx, { slots, emit,  }) {

        const { result, loading, getResult } =  useReactiveHttp({
            initData: [] as any,
            request: () => getDictType(ctx.type),
            Immediately: false
        })

        provide('dictType', result)

        getResult().then(res => {
            console.log(result)
        })

        return () => {
            return h(Fragment,[ slots.default?.() ])
        }

    },
    props: {
        /** 字典项 */
        type: {
            type: String,
            default: () => 'eos_park_type'
        },
        installFn: {
            type: Function,
            default: () => {}
        }
    },
})