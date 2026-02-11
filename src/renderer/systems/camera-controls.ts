// src/systems/CameraControlSystem.ts
import { System } from 'ecsy'
import { InputState } from '@/input'
import { DirtyTag, CameraTag } from '@/components/tags'
import { CameraPositionComponent, CameraTargetComponent, OrthographicConfig } from '@/components/camera'
import * as THREE from 'three'

const DEG2RAD = Math.PI / 180
const MIN_ANGLE = 30 * DEG2RAD
const MAX_ANGLE = 60 * DEG2RAD

export class CameraControlSystem extends System {
  static queries = {
    camera: { components: [CameraTag] }
  }

  private angleAtClick: number | null = null

  execute(): void {
    this.queries.camera.results.forEach(entity => {
      const pos = entity.getMutableComponent(CameraPositionComponent).value
      const target = entity.getComponent(CameraTargetComponent).value
      const config = entity.getMutableComponent(OrthographicConfig)
      const setDirty = () => !entity.hasComponent(DirtyTag) && entity.addComponent(DirtyTag)

      // 1. Zoom
      if (InputState.wheel !== 0) {
        config.viewSize = THREE.MathUtils.clamp(config.viewSize + InputState.wheel * 0.010, 20, 25)
        setDirty()
      }

      // 2. Rotação Orbital Limitada
      if (InputState.isMouseButtonDown(1)) {
        if (this.angleAtClick === null) {
          const currentAbsAngle = Math.atan2(pos.y - target.y, pos.x - target.x)
          this.angleAtClick = currentAbsAngle
        }

        const sensitivity = 0.0075
        const currentMouseX = (InputState.mouse.x + 1) * (window.innerWidth / 2)
        const mouseDiff = currentMouseX - InputState.dragStart.x

        let newAngle = this.angleAtClick + mouseDiff * sensitivity
        newAngle = THREE.MathUtils.clamp(newAngle, MIN_ANGLE, MAX_ANGLE)

        const dx = pos.x - target.x
        const dy = pos.y - target.y
        const radius = Math.sqrt(dx * dx + dy * dy)

        const nextX = target.x + radius * Math.cos(newAngle)
        const nextY = target.y + radius * Math.sin(newAngle)

        if (pos.x !== nextX || pos.y !== nextY) {
          pos.x = nextX
          pos.y = nextY
          setDirty()
        }
      } else {
        this.angleAtClick = null
      }
    })
  }
}
