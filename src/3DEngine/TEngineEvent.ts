import { TEngine } from './index'
import { Raycaster, Vector2 } from "three"
import type { Object3D, Object3DEventMap } from "three"


/**
 * 场景事件处理
*/
export class TEngineEvent {

    readonly name = 'TEngineEvent'

    mousemove: any
    dbclick: any

    constructor(private tEngine: TEngine) { }

    finSceneObject(event: any) {
        const domElement = this.tEngine.GLRenderer.domElement
        var raycaster = new Raycaster()
        var mouse = new Vector2()
        mouse.x = (event.offsetX / domElement.width) * 2 - 1
        mouse.y = -(event.offsetY / domElement.height) * 2 + 1
        raycaster.setFromCamera(mouse, this.tEngine.camera)
        const intersects = raycaster.intersectObjects(this.tEngine.scene.children, true)
        if (intersects.length !== 0) {
            const selectObject = intersects[0].object;
            return selectObject
        }
    }

    addMousemove(callback?: (object: Object3D<Object3DEventMap> | undefined) => void) {
        const domElement = this.tEngine.GLRenderer.domElement

        this.mousemove = (event: MouseEvent) => {
            event.preventDefault()
            callback && callback(this.finSceneObject(event))
        }
        domElement.addEventListener('mousemove', this.mousemove)
    }

    addDBclick(callback?: (object: Object3D<Object3DEventMap> | undefined) => void) {
        const domElement = this.tEngine.GLRenderer.domElement
        this.dbclick = (event: MouseEvent) => {
            event.preventDefault()
            callback && callback(this.finSceneObject(event))
        }
        domElement.addEventListener('dblclick', this.dbclick)
    }

    dispose() {
        this.tEngine.GLRenderer.domElement.removeEventListener('mousemove', this.mousemove)
        this.tEngine.GLRenderer.domElement.removeEventListener('dblclick', this.dbclick)
        this.tEngine = null as any
    }

}
