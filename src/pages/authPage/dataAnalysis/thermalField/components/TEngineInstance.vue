<script lang="ts" setup>
import { onBeforeUnmount, onMounted } from "vue"
import { TEngine, TEngineEvent } from '@/3DEngine'


function useThermalField() {

    let TEngineInstance = new TEngine({ openOrbitControls: true })
    TEngineInstance.addHelp()
    let engineEvent = new TEngineEvent(TEngineInstance)
    engineEvent.addDBclick((obj) => {
        console.log(obj)
    })

    let resize = TEngineInstance.resize.bind(TEngineInstance)

    onMounted(() => {
        TEngineInstance.mountTEngine(document.getElementById("renderer")!)
        window.addEventListener('resize', resize)
    })

    onBeforeUnmount(() => {
        window.removeEventListener('resize', resize)
        TEngineInstance.dispose()
        TEngineInstance = null as any
        resize = null as any
        engineEvent.dispose()
        engineEvent = null as any
    })

    return {
        TEngineInstance,
    }

}

const TEngineInstance =  useThermalField()

defineExpose({
    TEngineInstance: TEngineInstance
})

</script>

<template>
    <div id="renderer" class="overflow-hidden rounded-[6px] h-[860px]"></div>
</template>
