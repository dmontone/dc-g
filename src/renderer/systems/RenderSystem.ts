import { System } from 'ecsy'
import { Object3D } from '../components/Object3D'
import { Visible } from '../components/Visible'
import * as THREE from 'three'

export class RenderSystem extends System {
  private scene: THREE.Scene

  setScene(scene: THREE.Scene): void { this.scene = scene }

  static queries = { visible: { components: [Object3D, Visible] } }

  execute(delta: number): void {
    if (!this.scene) return
    
    this.queries.visible.results.forEach(entity => {
      const object3D = entity.getComponent(Object3D)!
      const visible = entity.getComponent(Visible)!
      const threeObject = object3D.value
      threeObject.visible = visible.value
      if (!threeObject.parent && visible.value) this.scene.add(threeObject)
      else if (threeObject.parent && !visible.value) this.scene.remove(threeObject)
    })
  }
}
