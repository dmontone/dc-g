import { Component, Types } from 'ecsy'
import * as THREE from 'three'

/**
 * Componente que armazena a referência ao objeto Three.js
 * Conecta a entidade ECSY com o objeto visual Three.js
 */
export class Object3D extends Component<Object3D> {
  static schema = {
    value: { type: Types.Ref }
  }

  value!: THREE.Object3D

  /**
   * Define o objeto Three.js
   */
  setObject3D(object: THREE.Object3D): void {
    this.value = object
  }

  /**
   * Obtém o objeto Three.js
   */
  getObject3D(): THREE.Object3D {
    return this.value
  }
}
