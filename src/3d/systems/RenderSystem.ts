import { System } from 'ecsy'
import { Object3D } from '../components/Object3D'
import { Visible } from '../components/Visible'
import * as THREE from 'three'

/**
 * Sistema que gerencia a renderização e visibilidade dos objetos
 * Adiciona/remove objetos da cena Three.js baseado no componente Visible
 */
export class RenderSystem extends System {
  private scene: THREE.Scene

  constructor(scene: THREE.Scene) {
    super()
    this.scene = scene
  }

  static queries = {
    visible: {
      components: [Object3D, Visible]
    }
  }

  /**
   * Executado a cada frame
   */
  execute(delta: number): void {
    const entities = this.queries.visible.results

    entities.forEach(entity => {
      const object3D = entity.getComponent(Object3D)!
      const visible = entity.getComponent(Visible)!
      const threeObject = object3D.value

      // Gerencia visibilidade
      threeObject.visible = visible.isVisible()

      // Garante que o objeto está na cena
      if (!threeObject.parent && visible.isVisible()) {
        this.scene.add(threeObject)
      } else if (threeObject.parent && !visible.isVisible()) {
        this.scene.remove(threeObject)
      }
    })
  }
}
