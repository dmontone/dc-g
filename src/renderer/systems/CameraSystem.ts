import { System, Component, Entity } from 'ecsy'
import * as THREE from 'three'
import { CameraComponent, CameraTarget } from '@/components/camera'
import { CameraManager } from '@/core/camera/CameraManager'
import { Object3D } from '@/components/Object3D'
import { Position } from '@/components'

export class CameraSystem extends System {
  static queries = {
    cameras: {
      components: [CameraComponent, Object3D],
      listen: {
        added: true,
        changed: [CameraComponent]
      }
    }
  }

  private resizeObserver?: ResizeObserver

  init() {
    this.setupResizeObserver()
  }

  execute() {
    const entity = this.queries.cameras.results[0]!
    const changed = this.queries.cameras.changed

    this.setupCamera(entity)
    this.updateCamera(changed[0])
  }

  private setupCamera(entity: Entity) {
    if (!entity) return

    const component = entity.getMutableComponent(CameraComponent)!
    const position = entity.getMutableComponent(Position)!
    const target = entity.getMutableComponent(CameraTarget)!
    const object = entity.getMutableComponent(Object3D)!
    
    if (component.instance) return

    const camera = new THREE.OrthographicCamera(component.left, component.right, component.top, component.bottom, component.near, component.far)
    camera.position.copy(position.value)
    camera.lookAt(target.value)
    camera.zoom = component.zoom
    camera.updateProjectionMatrix()

    object.value = camera
    component.instance = camera

    CameraManager.setActiveCamera(camera, entity)
  }

  private updateCamera(entity: Entity) {
    if (!entity) return

    const cameraComp = entity.getComponent(CameraComponent)!
    if (!cameraComp.instance) return

    const { left, right, top, bottom, near, far, zoom } = cameraComp
    const camera = cameraComp.instance as THREE.OrthographicCamera

    const needsUpdate = Object.entries({ left, right, top, bottom, near, far, zoom }).some(([prop, value]) => 
      camera[prop as keyof typeof camera] !== value
    )

    if (needsUpdate) {
      Object.assign(camera, { left, right, top, bottom, near, far, zoom })
      camera.updateProjectionMatrix()
    }
  }

  private setupResizeObserver() {
    this.resizeObserver = new ResizeObserver(entries => {
      const entity = this.queries.cameras.results[0]
      if (!entity) return

      const entry = entries[0]
      if (!entry) return

      const component = entity.getMutableComponent(CameraComponent)
      if (!component || !component.instance) return

      const { width, height } = entry.contentRect
      const aspect = width / height
      const scale = 20 // Base scale for the orthographic camera
      
      component.left = -scale * aspect
      component.right = scale * aspect
      component.top = scale
      component.bottom = -scale
    })

    const canvas = document.querySelector('canvas')
    if (canvas) this.resizeObserver.observe(canvas)
  }

  dispose() {
    this.resizeObserver?.disconnect()
  }
}
