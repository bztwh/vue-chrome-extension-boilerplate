<template>
  <div>
    {{item.name}}
    <template v-if="item.children">
      <item v-for="(e, index) in item.children" :key="index" :item="e"></item>
    </template>
  </div>
</template>

<script>
export default {
  name: 'item',
  props: {
    item: Object,
  },
  data() {
    return {}
  },
}
</script>

<style>
</style>