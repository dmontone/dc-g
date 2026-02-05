/**
 * Tipos compartilhados entre processos Main e Renderer
 */

export interface Vector3D {
  x: number
  y: number
  z: number
}

export interface AppConfig {
  name: string
  version: string
  development: boolean
}

export interface IPCMessage {
  type: string
  payload?: any
  timestamp: number
}
