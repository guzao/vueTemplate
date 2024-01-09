import { PerspectiveCamera, WebGLRenderer } from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { TransformControls } from "three/examples/jsm/controls/TransformControls"
import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls"



/**
 * 场景控制器
*/
export class TEngineControls  {

    readonly name = 'TEngineControls'

    /** 场景控制器 */
    public orbitControls: OrbitControls| null = null

    /** 转换控制器 */
    public transformControls: TransformControls| null = null

    /** 第一人称控制器 */
    public firstPersonControls: FirstPersonControls | null = null
    
    constructor (public camera: PerspectiveCamera, public GLRenderer:WebGLRenderer ) { }

    addOrbitControls () {
        this.orbitControls = new OrbitControls(this.camera, this.GLRenderer.domElement)
        this.orbitControls.enableDamping = true
    }

    removeOrbitControls () {
        this.orbitControls?.dispose()
        this.orbitControls = null
    }


    addTransformControls () {
        this.transformControls = new TransformControls(this.camera, this.GLRenderer.domElement)
    }

    removeTransformControls () {
        this.transformControls?.dispose()
        this.transformControls = null
    }


    addFirstPersonControls () {
        this.firstPersonControls = new FirstPersonControls(this.camera, this.GLRenderer.domElement)
    }

    removeFirstPersonControls () {
        this.firstPersonControls?.dispose()
        this.firstPersonControls = null
    }

    
    update () {
        this.orbitControls?.update()
    }

    dispose () {
        this.camera = null as any
        this.GLRenderer = null as any
        this.removeOrbitControls()
        this.removeTransformControls()
        this.removeFirstPersonControls()
    }

}