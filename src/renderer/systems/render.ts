import * as THREE from 'three'
import { System } from 'ecsy'
import { CameraTag, RendererTag, SceneTag } from '@/components/tags'
import { RendererComponent, SceneComponent } from '@/components'
import { CameraInstanceComponent } from '@/components/camera'

export class RenderSystem extends System {
  static queries = {
    renderer: { components: [RendererTag] },
    camera: { components: [CameraTag] },
    scene: { components: [SceneTag] }
  }

  execute(_delta: number): void {
    const { renderer } = this.queries.renderer.results?.[0]?.getComponent(RendererComponent)
    const { value: instance } = this.queries.camera.results?.[0]?.getComponent(CameraInstanceComponent)
    const { value: scene } = this.queries.scene.results?.[0]?.getComponent(SceneComponent)
    
    if (renderer && instance && scene) this.update(renderer, instance, scene)
  }
  
  private update(renderer: THREE.WebGLRenderer, camera: THREE.Camera, scene: THREE.Scene): void {
    // console.log('[RenderSystem]: update')
    renderer.render(scene, camera)
  }
}
