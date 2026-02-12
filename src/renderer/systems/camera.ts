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

    // Inicialização da Câmera Ortográfica
    const camera = new THREE.OrthographicCamera(
      0,
      0,
      0,
      0,
      config.near,
      config.far
    )

    // Estado da Arte: Z-Up para jogos de estratégia/grid
    camera.up.set(0, 0, 1)
    instance.value = camera

    // Listener de Resize (Garante que o aspecto não quebre)
    window.addEventListener('resize', () => {
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
    this.updateProjection(instance, config)
  }

  private updateProjection(camera: THREE.OrthographicCamera, config: OrthographicConfig): void {
    const aspect = window.innerWidth / window.innerHeight
    const halfHeight = config.viewSize / 2
    const halfWidth = halfHeight * aspect

    camera.left = -halfWidth
    camera.right = halfWidth
    camera.top = halfHeight
    camera.bottom = -halfHeight

    camera.updateProjectionMatrix()
  }
}
