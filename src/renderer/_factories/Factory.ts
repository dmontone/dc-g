import * as THREE from 'three'
import { World } from 'ecsy'

export abstract class BaseEntityFactory {
  constructor(
    protected world: World,
    protected scene: THREE.Scene | THREE.Group,
    autoCreate: boolean = true
  ) {
    if (autoCreate) this.create()
  }

  protected createBaseEntity(components: any[] = []) {
    const entity = this.world.createEntity()
    components.forEach((c) => entity.addComponent(c))
    return entity
  }
  
  protected abstract create(): void
}
