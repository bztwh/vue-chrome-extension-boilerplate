<template>
  <div>
    <div class="sidebar-main" @click.right.prevent="show = !show"></div>
    <list v-if="show"></list>
  </div>
</template>
<script>
import list from '../list/index.vue'
export default {
  name: 'sidebar',
  data() {
    return {
      show: false,
    }
  },
  components: {
    list,
  },
  methods: {},
}
</script>
<style lang="scss" scope>
.sidebar-main {
  --indicator-width: 1px;
  --indicator-height: 100vh;
  --alpha: 0;
  width: var(--indicator-width);
  height: var(--indicator-height);
  background: rgba($color: #000000, $alpha: var(--alpha));
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: auto;
  transition: 0.2s;
  &:hover {
    --indicator-width: 10px;
    --alpha: 0.5;
  }
}
</style>