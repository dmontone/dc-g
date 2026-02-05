/**
 * Constantes globais da aplicação
 */

export const APP_CONFIG = {
  NAME: 'DC-G',
  VERSION: '1.0.0',
  DESCRIPTION: 'Electron 3D Application with ECSY + Three.js'
} as const

export const RENDER_SETTINGS = {
  FPS: 60,
  NEAR_PLANE: 0.1,
  FAR_PLANE: 1000,
  FOV: 75
} as const

export const CANVAS_CONFIG = {
  BACKGROUND_COLOR: '#87CEEB',
  ANTIALIAS: true,
  SHADOWS: true
} as const
