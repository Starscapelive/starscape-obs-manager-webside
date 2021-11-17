/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface Window {
  mixpanel:any,
  obsPathGet:Function,
  obsPluginGet:Function,
  obsPluginInstall:Function,
  obsPluginUpdate:Function,
  obsPluginRemove:Function,
  obsPathModify:Function,
  obsCheckRunning:Function,
  obsClose:Function,
  AppWindowClose:Function,
  AppWindowMin:Function,
  obsMessage:Function,
  getAppVersion:Function,
  handleResponse:Function,
}
interface ImportMetaEnv {
  VITE_API_HOST: string;
}
