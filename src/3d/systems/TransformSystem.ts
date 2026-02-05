import { System } from 'ecsy'
import { Transform } from '../components/Transform'
import { Object3D } from '../components/Object3D'

/**
 * Sistema que sincroniza o componente Transform com o objeto Three.js
 * Executa a cada frame para manter a visualização atualizada
 */
export class TransformSystem extends System {
  static queries = {
    transform: {
      components: [Transform, Object3D]
    }
  }

  /**
   * Executado a cada frame
   */
  execute(delta: number): void {
    const entities = this.queries.transform.results

    entities.forEach(entity => {
      const transform = entity.getComponent(Transform)!
      const object3D = entity.getComponent(Object3D)!

      // Aplica o transform ao objeto Three.js
      transform.applyToObject3D(object3D.getObject3D())
    })
  }
}
