import { ref } from 'vue'
import { isFalse } from '@/utils'
import { useLang } from '@/utils'
import { getDictType } from '@/API'
import { useReactiveHttp } from "./useReactiveHttp"

const { getLang } = useLang()



/** 字典表 */
export function useDict (type: DictType, Immediately = false) {

    /** 数值标识 映射数值名称 */
    const dictLabel = ref<Record<string, string>>({})

    const { result, getResult, loading } =  useReactiveHttp({
        initData: [] as DictTypeData [],
        request: () => getDictType(type),
        Immediately: Immediately,
        requestCallback: ({ data }) => {
            data.forEach((item: DictTypeData) => {
                const { dictLabel, dictLabelEn } = item
                // 根据语言类型展示不通过的格式
                item.dictLabel = getLang() == 'zh_CN' ? dictLabel : dictLabelEn;
            });
            dictLabel.value = createDictLabel(data)
            return data
        }
    })

    return {
        getResult,
        result,
        dictLabel,
        loading
    }

}


function createDictLabel (rows: DictTypeData []) {
    return rows.reduce((acc, cur) => {
        const { dictLabel, dictValue } = cur
        if (isFalse(acc[dictValue])) {
            acc[ dictValue ] = dictLabel
        }
        return acc
    }, {} as Record<string, string>)
}