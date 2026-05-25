import { createApp, type App } from 'vue'
import AppComponent from './App.vue'

export function mount(el: HTMLElement): App {
  const app = createApp(AppComponent)
  app.mount(el)
  return app
}

export function unmount(app: App) {
  app.unmount()
}
