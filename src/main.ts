import { createSSRApp } from "vue";
import store from "./store";
import App from "./App.vue";
// import 'uno.css'
import tmui from "./tmui"
import './Interceptor'
export function createApp() {
  const app = createSSRApp(App);
  app.use(store)
  app.use(tmui)
  return {
    app,
  };
}
