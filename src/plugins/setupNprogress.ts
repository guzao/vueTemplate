import * as nProgress from 'nprogress'
import 'nprogress/nprogress.css'

import { nprogressConfigure } from '@/config'

/**
 * 使用进度条的配置
*/
export function useNprogress() {
    nProgress.configure(nprogressConfigure)
}


export default nProgress