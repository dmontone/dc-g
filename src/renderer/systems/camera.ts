import * as THREE from 'three'
import { Entity, System } from 'ecsy'
import { DirtyTag, CameraTag } from '@/components/tags'
import { CameraInstanceComponent, OrthographicConfig, CameraPositionComponent, CameraTargetComponent } from '@/components/camera'

export class CameraSystem extends System {
  static queries = {
    new: { components: [CameraTag], listen: { added: true } },
    dirty: { components: [CameraTag, DirtyTag] }
  }

  execute(_delta: number): void {
    this.queries.new.added?.forEach(e => this.setup(e))
    this.queries.dirty.results?.forEach(e => this.update(e))
  }

  private setup(entity: Entity): void {
    const instance = entity.getMutableComponent(CameraInstanceComponent)
    const config = entity.getComponent(OrthographicConfig)

    const aspect = window.innerWidth / window.innerHeight

    // Inicialização da Câmera Ortográfica
    const camera = new THREE.OrthographicCamera(
      (-config.viewSize * aspect) / 2,
      (config.viewSize * aspect) / 2,
      config.viewSize / 2,
      -config.viewSize / 2,
      config.near,
      config.far
    )

    // Estado da Arte: Z-Up para jogos de estratégia/grid
    camera.up.set(0, 0, 1)
    instance.value = camera

    // Listener de Resize (Garante que o aspecto não quebre)
    window.addEventListener('resize', () => {
      const newAspect = window.innerWidth / window.innerHeight
      camera.left = (-config.viewSize * newAspect) / 2
      camera.right = (config.viewSize * newAspect) / 2
      camera.top = config.viewSize / 2
      camera.bottom = -config.viewSize / 2
      camera.updateProjectionMatrix()

      if (!entity.hasComponent(DirtyTag)) entity.addComponent(DirtyTag)
    })

    console.log('[CameraSystem]: Orthographic Camera Context Created')
    entity.addComponent(DirtyTag)
  }

  private update(entity: Entity): void {
    const instance = entity.getComponent(CameraInstanceComponent).value as THREE.OrthographicCamera
    if (!instance) return

    const position = entity.getComponent(CameraPositionComponent).value
    const target = entity.getComponent(CameraTargetComponent).value
    const config = entity.getComponent(OrthographicConfig)

    // Sincroniza posição e foco
    instance.position.set(position.x, position.y, position.z)
    instance.lookAt(target.x, target.y, target.z)

    // ATUALIZA O FRUSTUM (Importante para o Zoom na Ortográfica)
    const aspect = window.innerWidth / window.innerHeight
    instance.left = (-config.viewSize * aspect) / 2
    instance.right = (config.viewSize * aspect) / 2
    instance.top = config.viewSize / 2
    instance.bottom = -config.viewSize / 2

    instance.updateProjectionMatrix()
  }
}
