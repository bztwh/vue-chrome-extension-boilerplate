import Vue from 'vue'
import App from './app.vue'

function createAppView(vueRootId) {
  let app = new Vue({
    render: (h) => h(App)
  }).$mount(vueRootId)
  return app;
}
export {
  createAppView,
}
