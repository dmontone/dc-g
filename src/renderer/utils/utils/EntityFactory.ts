import { World, Entity } from 'ecsy'
import * as THREE from 'three'
import { Position } from '../components/Position'
import { Rotation } from '../components/Rotation'
import { Scale } from '../components/Scale'
import { Object3D } from '../components/Object3D'
import { Visible } from '../components/Visible'

export class EntityFactory {
  constructor(private world: World, private scene: THREE.Scene) {}

  createCube(position = { x: 0, y: 0, z: 0 }, size = 1, color = 0x00ff00): Entity {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(size, size, size), new THREE.MeshPhongMaterial({ color }))
    return this.createEntityWithMesh(mesh, position)
  }

  createSphere(position = { x: 0, y: 0, z: 0 }, radius = 0.5, color = 0xff0000): Entity {
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(radius, 32, 32), new THREE.MeshPhongMaterial({ color }))
    return this.createEntityWithMesh(mesh, position)
  }

  createEntityWithMesh(mesh: THREE.Mesh, position = { x: 0, y: 0, z: 0 }): Entity {
    const entity = this.world.createEntity()
    entity.addComponent(Position)
    entity.getComponent(Position)!.value.set(position.x, position.y, position.z)
    entity.addComponent(Rotation)
    entity.addComponent(Scale)
    entity.addComponent(Object3D)
    entity.getMutableComponent(Object3D)!.value = mesh
    entity.addComponent(Visible)
    return entity
  }

  removeEntity(entity: Entity): void {
    const object3D = entity.getComponent(Object3D)
    if (object3D) {
      const mesh = object3D.value as THREE.Mesh
      this.scene.remove(mesh)
      mesh.geometry.dispose()
      if (mesh.material instanceof THREE.Material) mesh.material.dispose()
    }
    entity.remove()
  }
}
