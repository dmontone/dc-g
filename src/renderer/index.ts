import { World } from './world'
import { InputState } from './input'

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement
  if (!canvas) return

  console.log('Creating world...')
  
  InputState.initialize()

  const world = new World(canvas)
  world.start()
})
