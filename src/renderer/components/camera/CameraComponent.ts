import { Component, Types } from 'ecsy'
import * as THREE from 'three'

/**
 * Componente que define uma entidade como uma câmera no mundo do jogo.
 * 
 * @property {number} fov - Campo de visão em graus (padrão: 75)
 * @property {number} near - Plano próximo de recorte (padrão: 0.1)
 * @property {number} far - Plano distante de recorte (padrão: 1000)
 * @property {number} zoom - Nível de zoom (padrão: 1)
 * @property {number} aspect - Proporção da tela (largura/altura)
 * @property {THREE.PerspectiveCamera} [instance] - Instância da câmera THREE.js (gerenciada internamente)
 */
export class CameraComponent extends Component<CameraComponent> {
  fov!: number
  near!: number
  far!: number
  zoom!: number
  aspect!: number
  
  // Esta propriedade será gerenciada pelo sistema
  instance?: THREE.PerspectiveCamera
  
  static schema = {
    fov: { type: Types.Number, default: 10 },
    near: { type: Types.Number, default: 0.1 },
    far: { type: Types.Number, default: 1000 },
    zoom: { type: Types.Number, default: 0.5 },
    aspect: { type: Types.Number, default: window.innerWidth / window.innerHeight },
    // instance não é serializado no schema
  } as const
  
  static isComponent = true as const
}
