import Vue from 'vue'
import App from './app.vue'
/**
 * 
 * @param {string} vueRootId - 节点
 */
function createAppView(vueRootId) {
  let app = new Vue({
    render: (h) => h(App)
  }).$mount(vueRootId)
  return app;
}
export {
  createAppView,
}