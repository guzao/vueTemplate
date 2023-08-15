import { ref } from 'vue'
import type { FormInstance } from 'element-plus'



export function useFormInstance () {

    const formInstance = ref<FormInstance>()

    const validate = async () => await formInstance.value?.validate()

    const resetFields = () => formInstance.value?.resetFields()

    return {
        /** 校验 */
        validate,
        /** 状态重置 */
        resetFields,
        /** 表单实例 */
        formInstance,
    }

}