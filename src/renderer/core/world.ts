import { World as ECSYWorld } from 'ecsy'
import { Engine } from './engine'
import { RenderSystem } from '../systems/RenderSystem'
import { TransformSystem } from '../systems/TransformSystem'

/**
 * Mundo ECSY + Three.js
 * Gerencia o mundo de entidades e coordena com a engine 3D
 */
export class World {
  public readonly ecsyWorld: ECSYWorld
  public readonly engine: Engine

  constructor(engine: Engine) {
    this.engine = engine
    
    // Inicializa o mundo ECSY
    this.ecsyWorld = new ECSYWorld()

    // Registra sistemas
    this.registerSystems()
  }

  /**
   * Registra todos os sistemas ECSY
   */
  private registerSystems(): void {
    this.ecsyWorld.registerSystem(RenderSystem)
    this.ecsyWorld.registerSystem(TransformSystem)
    
    // Configura os sistemas após registro
    this.ecsyWorld.execute(0) // Executa uma vez para inicializar
    
    const renderSystem = this.ecsyWorld.getSystem(RenderSystem)
    if (renderSystem) {
      renderSystem.setScene(this.engine.scene)
    }
  }

  /**
   * Inicia o loop principal do mundo
   */
  public start(): void {
    const animate = () => {
      requestAnimationFrame(animate)
      
      // Executa um passo do mundo ECSY
      this.ecsyWorld.execute(1/60) // 60 FPS
      
      // Renderiza a cena Three.js através da engine
      this.engine.render()
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
    this.engine.dispose()
    // TODO: Implementar limpeza correta das entidades ECSY quando necessário
    // Por enquanto, apenas limpa o renderer Three.js
  }
}
