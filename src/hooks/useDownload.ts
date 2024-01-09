import { ref } from 'vue'
import { useAppData } from '@/store'
import { ElNotification } from 'element-plus'
import { getDownloadFileName, sleep, errorMessage, getLocalLangMessage, writeDefault } from '@/utils'

/**
 * 文件下载参数
*/
type UseDownload = {
    /** 文件下载接口 */
    downloadFn: () => Promise<ResponseData | ResponseBlobData>,
    /** 文件前缀名称 */
    prevfixName?: string
}


/**
 * 文件下载
*/
export function useDownload({ downloadFn, prevfixName = '' }: UseDownload) {

    const fileLoading = ref(false)
    const appdate = useAppData()
    const downloadFile = async () => {
        fileLoading.value = true
        const notiInfo = ElNotification.info(getLocalLangMessage()['tipsInfo']['downloading'])
        try {
            const res = await downloadFn()
            fileLoading.value = false
            const notiSuccess = ElNotification.success(getLocalLangMessage()['tipsInfo']['downloadSuccess'])
            const a = document.createElement("a");
            const blob = new Blob([res as any])
            prevfixName = appdate.getCurrentPark().name
            a.download = `${prevfixName}${getDownloadFileName(res.disposition)}`;
            a.href = window.URL.createObjectURL(blob);
            a.click();
            a.remove();
            notiInfo.close()
            await sleep(2000)
            notiSuccess.close()
        } catch (error) {
            fileLoading.value = false
            notiInfo.close()
            errorMessage(getLocalLangMessage()['tipsInfo']['passeringError'])
        }
    }

    return {
        /** 文件下载方法 */
        downloadFile,
        /** 文件下载进度 */
        fileLoading
    }

}

