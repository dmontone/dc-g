import * as THREE from 'three'
import { Entity, System } from 'ecsy'
import { RendererComponent } from '@/components'
import { DirtyTag } from '@/components/tags'

export class RendererSystem extends System {
  static queries = {
    new: { components: [RendererComponent], listen: { added: true } },
    dirty: { components: [RendererComponent, DirtyTag] }
  }

  execute(_delta: number): void {
    this.queries.new.added?.forEach((e) => this.setup(e))
    this.queries.dirty.results?.forEach((e) => this.update(e))
  }

  private setup(e: Entity): void {
    const component = e.getMutableComponent(RendererComponent)
    
    const renderer = new THREE.WebGLRenderer({ 
      canvas: component.canvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
      precision: 'highp',
    })
    
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    
    // Disables threejs internal error checks - performance
    renderer.debug.checkShaderErrors = false 
    
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.outputColorSpace = THREE.SRGBColorSpace
    
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.shadowMap.autoUpdate = true
    
    component.renderer = renderer

    console.log('[RendererSystem]: WebGL Context Created')
  }

  private update(e: Entity): void {
    const component = e.getComponent(RendererComponent)
    const renderer = component.renderer
    if (!renderer) return

    renderer.setSize(window.innerWidth, window.innerHeight)
    
    console.log('[RendererSystem]: Viewport adjusted')
  }

  private dispose(e: Entity): void {
    const component = e.getComponent(RendererComponent)
    if (component?.renderer) {
      component.renderer.dispose()
      component.renderer.forceContextLoss()
      console.log('[RendererSystem]: WebGL Context Released')
    }
  }
}