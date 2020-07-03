<template>
  <div>
    <div class="sidebar-main">
    </div>
  </div>
</template>
<script>
export default {
  name: 'sidebar',
  data() {
    return {}
  },
}
</script>
<style lang="scss" scope>
.sidebar-main {
  --indicator-width: 0px;
  --indicator-height: 100vh;
  --background: #40b181;
  width: var(--indicator-width);
  height: var(--indicator-height);
  //   background: rgba($color: #000000, $alpha: 0.1);
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: auto;
}
</style>