import { getNoticeList } from '@/API'
import { objectToUrlQuery } from '@/utils'
import { useReactiveHttp, usePagination } from '@/hooks'

export function useNotice() {

    const { pageParams, currentChange } = usePagination({
        total: 0,
        pageSize: 100,
        callback: () => getResult()
    })

    const { result, getResult, loading } = useReactiveHttp({
        initData: [] as NoticeItem[],
        request: () => getNoticeList(pageParams),
        requestCallback: res => {
            pageParams.total = res.total
            return res.rows
        }
    })

    const checkDetail = ({ noticeId }: NoticeItem) => {
        const urlQuery = objectToUrlQuery({ noticeId } as any)
        window.open('/noticeDetail' + urlQuery)
    }

    const goNoticeList = () => window.open('/noticeList')

    return {
        pageParams,
        result,
        loading,
        checkDetail,
        goNoticeList,
        currentChange
    }

}