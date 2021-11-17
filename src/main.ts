import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Element3 from 'element3'
import 'element3/lib/theme-chalk/index.css'
import './assets/styles/obsproject.css'
import './assets/styles/reset.scss'
import './assets/styles/public.scss'

declare global {
  interface Window {
    ssau: any,
    ubt: any,
  }
  interface HTMLScriptElement {
    onreadystatechange: any,
    readyState: any
  }
}

createApp(App).use(Element3).use(router).mount('#app')
