import { useThemeColor } from '@/utils'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { 
    Scene, PerspectiveCamera, WebGLRenderer, GridHelper, Vector3, Mesh, Texture, Color, HemisphereLight, AmbientLight, FileLoader, 
    DefaultLoadingManager, LoaderUtils, Vector2, sRGBEncoding 
} from "three"
import { GLTFLoader } from 'three/examples/jsm/Addons'
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js"
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js"
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js"
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader.js"


/**
 * 场景引擎
*/
export class TEngine {

    loopId: number = 0
    callbacks: Function[] = []
    scene: Scene = new Scene()
    GLRenderer: WebGLRenderer = new WebGLRenderer({ antialias: true })
    camera: PerspectiveCamera = new PerspectiveCamera()
    controls: OrbitControls = new OrbitControls(this.camera, this.GLRenderer.domElement)
    mountDom: HTMLElement | null = null
    composer: EffectComposer | null = null
    outlinePass: OutlinePass | null = null
    renderPass: RenderPass | null = null

    constructor(config: { openOrbitControls: boolean }) {
        if (!config.openOrbitControls) {
            this.controls.dispose()
        }
    }

    /**
     * @param rendererDom 场景挂载节点
    */
    mountTEngine(rendererDom: HTMLElement) {
        this.mountDom = rendererDom
        this.initCamera(rendererDom)
        this.controls.enableDamping = true
        const { offsetHeight, offsetWidth } = rendererDom
        this.GLRenderer.setSize(offsetWidth, offsetHeight)
        this.GLRenderer.setPixelRatio(window.devicePixelRatio)
        rendererDom?.appendChild(this.GLRenderer.domElement)
        this.scene.background = new Color().setRGB(255, 255, 255)
        this.scene.add(new HemisphereLight(0xffffff, 0x8d8d8d, 3))
        this.scene.add(new AmbientLight(0x8d8d8d))
        this.addModel()
        this.renderer()
    }

    addHelp() {
        const { getuseThemeColor } = useThemeColor()
        this.scene.add(new GridHelper(200, 50, 10, getuseThemeColor()))
    }

    resize() {
        const { offsetHeight, offsetWidth } = this.mountDom!
        this.GLRenderer.domElement.width = offsetWidth
        this.GLRenderer.domElement.height = offsetHeight
        this.GLRenderer.setSize(offsetWidth, offsetHeight)
        this.camera.aspect = offsetWidth / offsetHeight
        this.camera.updateProjectionMatrix()
        this.GLRenderer.render(this.scene, this.camera)
    }

    initCamera(rendererDom: HTMLElement) {
        const { offsetHeight, offsetWidth } = rendererDom
        this.camera.aspect = offsetWidth / offsetHeight
        this.camera.position.set(0, 60, 100)
        this.camera.lookAt(new Vector3(0, 0, 0))
        //  重置过相机的比例一定要更新相机的矩阵
        this.camera.updateProjectionMatrix()
    }


    addModel() {
        const gltfLoader = new GLTFLoader()
        const loader = new FileLoader(DefaultLoadingManager)
        loader.setResponseType('arraybuffer')
        loader.load('/json/datacenter.glb', data => {
            const resourcePath = LoaderUtils.extractUrlBase('/json/datacenter.glb')
            console.log(resourcePath)
            gltfLoader.parse(data, resourcePath, ({ scene, scenes, cameras }) => {
                scene.scale.set(10, 10, 10)
                scene.rotateY(200)
                this.scene.add(scene)
            },)
        })
    }

      

    /** 渲染器回调函数 */
    rendererCakkback(callback: () => void) {
        this.callbacks.push(callback)
    }

    renderer() {
        this.loopId = requestAnimationFrame(this.renderer.bind(this))
        this.callbacks.forEach((item: any) => item && item())
        this.controls.update()
        this.GLRenderer.render(this.scene, this.camera)
        if (this.composer) {
            this.composer.render()
        }
    }


    dispose() {
        this.callbacks.length = 0
        cancelAnimationFrame(this.loopId)

        this.GLRenderer.domElement.remove()

        this.scene.traverse(mesh => {
            if (mesh instanceof Mesh) {
                mesh.geometry.dispose()
                mesh.material.dispose()
            }
            if (mesh instanceof Texture) {
                (mesh as any)?.dispose()
            }
        })

        while (this.scene.children.length) {
            this.scene.remove(this.scene.children[0])
        }

        this.scene?.clear()

        this.controls?.dispose()

        this.GLRenderer?.dispose()

        this.GLRenderer?.forceContextLoss()
        this.camera = null as any
        this.controls = null as any
    }

}

