import * as THREE from 'three'
import { RENDER_CONFIG } from './engine.constants'

export class Engine {
  public readonly scene: THREE.Scene
  public readonly camera: THREE.PerspectiveCamera
  public readonly renderer: THREE.WebGLRenderer
  public readonly container: THREE.Group

  constructor(canvas: HTMLCanvasElement) {
    this.scene = new THREE.Scene()
    this.container = new THREE.Group()
    this.container.rotation.x = -Math.PI / 2
    this.container.rotation.z = -Math.PI / 2
    this.scene.add(this.container)

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.camera.position.set(5, 5, 10)
    this.camera.lookAt(0, 0, 0)

    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: RENDER_CONFIG.antialias })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setPixelRatio(RENDER_CONFIG.pixelRatio)
    this.renderer.shadowMap.enabled = RENDER_CONFIG.shadowMap
    this.renderer.shadowMap.type = RENDER_CONFIG.shadowMapType

    this.setupLighting()
    this.container.add(new THREE.AxesHelper(5))
  }

  private setupLighting(): void {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    this.container.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(10, 10, 5)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 2048
    directionalLight.shadow.mapSize.height = 2048
    directionalLight.shadow.camera.near = 0.5
    directionalLight.shadow.camera.far = 50
    this.container.add(directionalLight)
  }

  public render(): void {
    if (!this.scene || !this.camera) return
    this.renderer?.render(this.scene, this.camera)
  }

  public dispose(): void { this.renderer.dispose() }
}
