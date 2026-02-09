import { World } from './world'

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement
  if (!canvas) return

  console.log('Creating world...')

  const world = new World(canvas)
  world.start()
})
