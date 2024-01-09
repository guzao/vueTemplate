import { useDict } from '@/hooks'
import { useNotice } from '@/pages/staticPage/hooks/useNotice'

export function useNoticeData() {

    const { result, loading, pageParams, currentChange } = useNotice()
    const { result: noticeType, dictLabel: noticeTypeLabel } = useDict("sys_notice_type", true)
    const { result: noticeState, dictLabel: noticeStateLabel } = useDict('sys_notice_status', true)

    return {
        result, loading, pageParams, currentChange,
        noticeType, noticeTypeLabel,
        noticeState, noticeStateLabel
    }

}