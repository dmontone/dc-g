import * as THREE from 'three'

export const RENDER_CONFIG = {
  antialias: true,
  pixelRatio: window.devicePixelRatio,
  shadowMap: true,
  shadowMapType: THREE.PCFSoftShadowMap
} as const
