import { World, Entity } from 'ecsy'
import * as THREE from 'three'
import { Position } from '../components/Position'
import { Rotation } from '../components/Rotation'
import { Scale } from '../components/Scale'
import { Object3D } from '../components/Object3D'
import { Visible } from '../components/Visible'

/**
 * Utilitário para criar entidades 3D facilmente
 */
export class EntityFactory {
  private world: World
  private scene: THREE.Scene

  constructor(world: World, scene: THREE.Scene) {
    this.world = world
    this.scene = scene
  }

  /**
   * Cria uma entidade básica com um cubo
   */
  createCube(
    position = { x: 0, y: 0, z: 0 },
    size = 1,
    color = 0x00ff00
  ): Entity {
    const geometry = new THREE.BoxGeometry(size, size, size)
    const material = new THREE.MeshPhongMaterial({ color })
    const mesh = new THREE.Mesh(geometry, material)

    return this.createEntityWithMesh(mesh, position)
  }

  /**
   * Cria uma entidade básica com uma esfera
   */
  createSphere(
    position = { x: 0, y: 0, z: 0 },
    radius = 0.5,
    color = 0xff0000
  ): Entity {
    const geometry = new THREE.SphereGeometry(radius, 32, 32)
    const material = new THREE.MeshPhongMaterial({ color })
    const mesh = new THREE.Mesh(geometry, material)

    return this.createEntityWithMesh(mesh, position)
  }

  /**
   * Cria uma entidade com um mesh personalizado
   */
  createEntityWithMesh(
    mesh: THREE.Mesh,
    position = { x: 0, y: 0, z: 0 }
  ): Entity {
    const entity = this.world.createEntity()

    entity.addComponent(Position)
    entity.getComponent(Position)!.value.set(position.x, position.y, position.z)

    entity.addComponent(Rotation)
    entity.addComponent(Scale)
    entity.addComponent(Object3D)
    const object3DComp = entity.getMutableComponent(Object3D)!
    object3DComp.value = mesh
    entity.addComponent(Visible)

    return entity
  }

  /**
   * Remove uma entidade e limpa seus recursos
   */
  removeEntity(entity: Entity): void {
    const object3D = entity.getComponent(Object3D)
    if (object3D) {
      const mesh = object3D.value as THREE.Mesh
      
      // Remove da cena
      this.scene.remove(mesh)
      
      // Limpa geometria e material
      mesh.geometry.dispose()
      if (mesh.material instanceof THREE.Material) {
        mesh.material.dispose()
      }
    }

    // Remove a entidade do mundo ECSY
    entity.remove()
  }
}
