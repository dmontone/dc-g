import * as THREE from 'three'
import { Entity, System } from 'ecsy'
import { DirtyTag, CameraTag } from '@/components/tags'
import { CameraInstanceComponent, OrthographicConfig, CameraPositionComponent, CameraTargetComponent } from '@/components/camera'

export class CameraSystem extends System {
  static queries = {
    new: {
      components: [CameraTag],
      listen: { added: true }
    },
    dirty: { components: [CameraTag, DirtyTag] }
  }

  execute(_delta: number): void {
    this.queries.new.added?.forEach(e => this.setup(e))
    this.queries.dirty.results?.forEach(e => this.update(e))
  }

  private setup(entity: Entity): void {
    console.log('[CameraSystem]: setup')
    let instance = entity.getMutableComponent(CameraInstanceComponent)

    const config = entity.getComponent(OrthographicConfig)

    const aspect = window.innerWidth / window.innerHeight
    instance.value = new THREE.OrthographicCamera(
      -config.viewSize * aspect / 2,
       config.viewSize * aspect / 2,
       config.viewSize / 2,
      -config.viewSize / 2,
       config.near,
       config.far
    )

    instance.value.up.set(0, 0, 1)
    instance.value.updateProjectionMatrix()

    entity.addComponent(DirtyTag)
  }

  private update(entity: Entity): void {
    console.log('[CameraSystem]: update')

    let instance = entity.getMutableComponent(CameraInstanceComponent)

    const position = entity.getComponent(CameraPositionComponent).value
    instance.value.position.set(position.x, position.y, position.z)

    const target = entity.getComponent(CameraTargetComponent).value
    instance.value.lookAt(target.x, target.y, target.z)
  }
}
