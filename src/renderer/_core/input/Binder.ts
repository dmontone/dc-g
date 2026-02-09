export class EventBinder {
  private listeners = new Map<EventTarget, Map<string, EventListener>>()

  bind<T extends EventTarget>(target: T, event: string, listener: EventListener): void {
    if (!this.listeners.has(target)) {
      this.listeners.set(target, new Map())
    }
    
    const targetListeners = this.listeners.get(target)!
    if (targetListeners.has(event)) {
      this.unbind(target, event)
    }
    
    targetListeners.set(event, listener)
    target.addEventListener(event, listener)
  }

  unbind<T extends EventTarget>(target: T, event: string): void {
    const targetListeners = this.listeners.get(target)
    if (targetListeners?.has(event)) {
      const listener = targetListeners.get(event)!
      target.removeEventListener(event, listener)
      targetListeners.delete(event)
    }
  }

  dispose<T extends EventTarget>(target: T, events?: string[]): void {
    const targetListeners = this.listeners.get(target)
    if (targetListeners) {
      const eventsToDispose = events || Array.from(targetListeners.keys())
      eventsToDispose.forEach(event => this.unbind(target, event))
      this.listeners.delete(target)
    }
  }
}
