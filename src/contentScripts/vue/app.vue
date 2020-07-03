<template>
  <div class="extension" :style="{zIndex:zIndex}">
    <div v-if="show">hello</div>
    <sidebar></sidebar>
  </div>
</template>
<script>
import sidebar from './page/sidebar/sidebar.vue'
function getMaxZIndex() {
  let arr = [...document.all].map(e => +window.getComputedStyle(e).zIndex || 0)
  return arr.length ? Math.max(...arr) : 0
}
export default {
  data() {
    return {
      show: false,
      zIndex: 0,
    }
  },
  components: {
    sidebar,
  },
  methods: {
    event(e) {
      console.log(e)
    },
  },
  mounted() {
    console.log('vue初始化')
    document.addEventListener('dragstatus', e => {
      this.show = e.detail.status
    })
    this.zIndex = getMaxZIndex()
  },
}
</script>
<style lang="scss" scope>
.extension {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
}
</style>
