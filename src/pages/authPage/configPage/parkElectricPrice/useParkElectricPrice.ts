import { usePagination } from '@/hooks'

export function useParkElectricPrice() {


    const { resteParams, pageParams } = usePagination({callback: () => {} })
    
    return {
        pageParams
    }
}