import { Component, Types } from 'ecsy'
import * as THREE from 'three'

/**
 * Componente que define uma entidade como uma câmera no mundo do jogo.
 * Configurado para OrthographicCamera (estilo League of Legends).
 * 
 * @property {number} left - Plano esquerdo do frustum
 * @property {number} right - Plano direito do frustum
 * @property {number} top - Plano superior do frustum
 * @property {number} bottom - Plano inferior do frustum
 * @property {number} near - Plano próximo de recorte
 * @property {number} far - Plano distante de recorte
 * @property {number} zoom - Nível de zoom
 * @property {THREE.OrthographicCamera} [instance] - Instância da câmera THREE.js (gerenciada internamente)
 */
export class CameraComponent extends Component<CameraComponent> {
  left!: number
  right!: number
  top!: number
  bottom!: number
  near!: number
  far!: number
  zoom!: number
  
  instance?: THREE.OrthographicCamera
  
  static schema = {
    left: { type: Types.Number, default: -20 },
    right: { type: Types.Number, default: 20 },
    top: { type: Types.Number, default: 15 },
    bottom: { type: Types.Number, default: -15 },
    near: { type: Types.Number, default: 1 },
    far: { type: Types.Number, default: 2000 },
    zoom: { type: Types.Number, default: 1 },
  } as const
  
  static isComponent = true as const
}
