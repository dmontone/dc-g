import { System } from 'ecsy'
import { Position } from '../components/Position'
import { Rotation } from '../components/Rotation'
import { Scale } from '../components/Scale'
import { Object3D } from '../components/Object3D'

export class TransformSystem extends System {
  static queries = {
    transform: {
      components: [Position, Rotation, Scale, Object3D]
    }
  }

  execute(delta: number): void {
    const entities = this.queries.transform.results

    entities.forEach(entity => {
      const position = entity.getComponent(Position)!
      const rotation = entity.getComponent(Rotation)!
      const scale = entity.getComponent(Scale)!
      const object3D = entity.getComponent(Object3D)!

      const threeObject = object3D.value
      threeObject.position.copy(position.value)
      threeObject.rotation.copy(rotation.value)
      threeObject.scale.copy(scale.value)
    })
  }
}
