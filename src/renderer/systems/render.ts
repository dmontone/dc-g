import * as THREE from 'three'
import { System } from 'ecsy'
import { CameraTag, RendererTag, SceneTag } from '@/components/tags'
import { RendererComponent, SceneComponent } from '@/components'
import { CameraInstanceComponent } from '@/components/camera'

export class RenderSystem extends System {
  static queries = {
    renderer: { components: [RendererTag, RendererComponent], listen: { added: true, removed: true } },
    camera: { components: [CameraTag, CameraInstanceComponent], listen: { added: true, removed: true } },
    scene: { components: [SceneTag, SceneComponent], listen: { added: true, removed: true } }
  }

  private _renderer: THREE.WebGLRenderer | null = null
  private _camera: THREE.Camera | null = null
  private _scene: THREE.Scene | null = null

  execute(): void {
    this.checkRequests()
    if (!this._renderer || !this._camera || !this._scene) return
    this._renderer.render(this._scene, this._camera)
  }

  private checkRequests(): void {
    const { renderer, camera, scene } = this.queries

    if (renderer.added?.length) this._renderer = renderer.results[0].getComponent(RendererComponent).renderer
    if (camera.added?.length)   this._camera   = camera.results[0].getComponent(CameraInstanceComponent).value
    if (scene.added?.length)    this._scene    = scene.results[0].getComponent(SceneComponent).value

    if (renderer.removed?.length) this._renderer = null
    if (camera.removed?.length)   this._camera   = null
    if (scene.removed?.length)    this._scene    = null
  }
}