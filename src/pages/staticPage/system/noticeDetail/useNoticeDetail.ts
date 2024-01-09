import { getNoticeDetail } from '@/API'
import { useReactiveHttp } from '@/hooks'
import { urlQueryToObject } from '@/utils'

export function useNoticeDetail() {

    const noticeId = urlQueryToObject()?.noticeId

    const { result, loading } = useReactiveHttp({
        initData: {} as NoticeItem,
        request: () => getNoticeDetail(noticeId)
    })

    return {
        loading,
        result
    }

}