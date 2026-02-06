import * as THREE from 'three'
import { Entity } from 'ecsy'

type CameraChangedCallback = (camera: THREE.Camera) => void

class CameraManagerClass {
  private camera: THREE.Camera | null = null
  private entity: Entity | null = null
  private listeners: CameraChangedCallback[] = []

  public getActiveCamera(): THREE.Camera {
    if (!this.camera) throw new Error('Nenhuma câmera ativa encontrada')
    return this.camera
  }

  public getActiveCameraEntity(): Entity {
    if (!this.entity) throw new Error('Nenhuma entidade de câmera ativa encontrada')
    return this.entity
  }

  public setActiveCamera(camera: THREE.Camera, entity: Entity): void {
    if (this.camera === camera) return
    
    this.camera = camera
    this.entity = entity
    
    for (const listener of this.listeners) {
      try {
        listener(camera)
      } catch (error) {
        console.error('Erro ao notificar mudança de câmera:', error)
      }
    }
  }

  public onCameraChanged(callback: CameraChangedCallback): () => void {
    this.listeners.push(callback)
    if (this.camera) callback(this.camera)

    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback)
    }
  }
}

export const CameraManager = new CameraManagerClass()

export default CameraManager
