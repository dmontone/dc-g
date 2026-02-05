import * as THREE from 'three'

/**
 * Configurações do renderizador 3D
 */
export const RENDER_CONFIG = {
  antialias: true,
  pixelRatio: window.devicePixelRatio,
  shadowMap: true,
  shadowMapType: THREE.PCFSoftShadowMap
} as const

/**
 * Engine Three.js - Configuração básica da cena 3D
 * Responsável por gerenciar cena, câmera, renderer e iluminação básica
 */
export class Engine {
  public readonly scene: THREE.Scene
  public readonly camera: THREE.PerspectiveCamera
  public readonly renderer: THREE.WebGLRenderer

  constructor(canvas: HTMLCanvasElement) {
    // Inicializa a cena Three.js
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0x87CEEB) // Sky blue
    
    // Configura a câmera
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    this.camera.position.z = 5

    // Configura o renderer
    this.renderer = new THREE.WebGLRenderer({ 
      canvas,
      antialias: RENDER_CONFIG.antialias
    })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setPixelRatio(RENDER_CONFIG.pixelRatio)
    this.renderer.shadowMap.enabled = RENDER_CONFIG.shadowMap
    this.renderer.shadowMap.type = RENDER_CONFIG.shadowMapType

    // Configura iluminação básica
    this.setupLighting()

    // Handle resize
    this.handleResize()
  }

  /**
   * Configura iluminação básica da cena
   */
  private setupLighting(): void {
    // Luz ambiente para iluminação geral
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    this.scene.add(ambientLight)
    
    // Luz direcional para sombras
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(10, 10, 5)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 2048
    directionalLight.shadow.mapSize.height = 2048
    directionalLight.shadow.camera.near = 0.5
    directionalLight.shadow.camera.far = 50
    this.scene.add(directionalLight)
  }

  /**
   * Renderiza um frame da cena
   */
  public render(): void {
    this.renderer.render(this.scene, this.camera)
  }

  /**
   * Limpa recursos do renderer
   */
  public dispose(): void {
    this.renderer.dispose()
  }

  /**
   * Configura handlers para resize da janela
   */
  private handleResize(): void {
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(window.innerWidth, window.innerHeight)
    })
  }
}
