import './index.css'
import { World } from './core/world.js'
import { Engine } from './core/engine.js'

console.log('🎮 DC-G Renderer Process Started')

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement
  const loading = document.getElementById('loading')
  
  if (!canvas) {
    console.error('Canvas element not found!')
    return
  }

  try {
    // Initialize the 3D engine
    const engine = new Engine(canvas)
    const world = new World(engine)

    // Hide loading message
    if (loading) {
      loading.style.display = 'none'
    }

    // Start the application
    world.start()

    console.log('✅ 3D World initialized successfully')
  } catch (error) {
    console.error('❌ Failed to initialize 3D world:', error)
    if (loading) {
      loading.textContent = 'Failed to load application'
      loading.style.color = 'red'
    }
  }
})
