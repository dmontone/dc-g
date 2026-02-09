import { System } from 'ecsy'
import { Position, Rotation, Scale, Object3D } from '@/components'

export class TransformSystem extends System {
  static queries = { transform: { components: [Position, Rotation, Scale, Object3D] } }

  execute(_delta: number): void {
    this.queries.transform.results.forEach((entity) => {
      const position = entity.getComponent(Position)!
      const rotation = entity.getComponent(Rotation)!
      const scale = entity.getComponent(Scale)!
      const object3D = entity.getComponent(Object3D)!
      const threeObject = object3D.value

      if (!threeObject) return
      if (!position.value || !rotation.value || !scale.value) return

      threeObject.position.copy(position.value)
      threeObject.rotation.copy(rotation.value)
      threeObject.scale.copy(scale.value)
    })
  }
}
