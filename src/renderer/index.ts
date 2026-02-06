import { World } from './core/world.js'
import { Engine } from './core/engine.js'

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement
  const loading = document.getElementById('loading')
  
  if (!canvas) return

  try {
    const engine = new Engine(canvas)
    const world = new World(engine)
    
    if (loading) loading.style.display = 'none'

    world.start()
  } catch (error) {
    if (loading) {
      loading.style.color = 'red'
      loading.textContent = `Failed to load: ${error.message}`
    }
  }
})
