import { World as ECSYWorld } from 'ecsy'
import * as THREE from 'three'

/**
 * Mundo ECSY + Three.js
 * Gerencia o mundo da entidade e o cena Three.js
 */
export class World {
  public readonly ecsyWorld: ECSYWorld
  public readonly scene: THREE.Scene
  public readonly camera: THREE.PerspectiveCamera
  public readonly renderer: THREE.WebGLRenderer

  constructor(canvas: HTMLCanvasElement) {
    // Inicializa o mundo ECSY
    this.ecsyWorld = new ECSYWorld()

    // Inicializa a cena Three.js
    this.scene = new THREE.Scene()
    
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
      antialias: true 
    })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setPixelRatio(window.devicePixelRatio)

    // Configura luz básica
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    this.scene.add(ambientLight)
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(10, 10, 5)
    this.scene.add(directionalLight)

    // Handle resize
    this.handleResize()
  }

  /**
   * Inicia o loop principal do mundo
   */
  public start(): void {
    const animate = () => {
      requestAnimationFrame(animate)
      
      // Executa um passo do mundo ECSY
      this.ecsyWorld.execute(1/60) // 60 FPS
      
      // Renderiza a cena Three.js
      this.renderer.render(this.scene, this.camera)
    }
    
    animate()
  }

  /**
   * Para o loop do mundo
   */
  public stop(): void {
    // Implementar lógica de parada se necessário
  }

  /**
   * Limpa recursos
   */
  public dispose(): void {
    this.renderer.dispose()
    // TODO: Implementar limpeza correta das entidades ECSY quando necessário
    // Por enquanto, apenas limpa o renderer Three.js
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
