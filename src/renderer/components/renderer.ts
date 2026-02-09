import { Component, Types } from 'ecsy'
import * as THREE from 'three'

export class RendererComponent extends Component<RendererComponent> {
  static schema = {
    renderer: { type: Types.Ref },
    canvas: { type: Types.Ref }
  }
  
  renderer!: THREE.WebGLRenderer
  canvas!: HTMLCanvasElement
}
