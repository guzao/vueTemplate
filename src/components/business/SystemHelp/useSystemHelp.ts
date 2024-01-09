import { ref } from "vue";
import { useDraggable } from '@vueuse/core'
import { useUser, useLayout } from '@/store'


export function useSystemHelp() {

    const userData = useUser()
    const layout = useLayout()
    const showHelpState = ref(false)
    const draggableDarget = ref<HTMLElement | null>(null)
    const { style } = useDraggable(draggableDarget, {
        initialValue: { y: 200, x: window.innerWidth - 480 },
        onMove(position) {
            if (position.x <= 50) position.x = 50
            if (position.x > (window.innerWidth - 440)) position.x = window.innerWidth - 440
            if (position.y <= 50) position.y = 50
            if (position.y > (window.innerHeight - 600)) position.y = window.innerHeight - 600
        },
    })

    /** 定位异常电站 */
    const goToErrorPark = () => {
        const { offsetTop = 0 } = document.getElementById('ESCNGXSH02') || {}
    }

    return {
        userData,
        layout,
        showHelpState,
        draggableDarget,
        style,
        goToErrorPark
    }
}
