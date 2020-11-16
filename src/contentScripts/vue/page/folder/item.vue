<template>
  <div @click.stop="makeFolder()" class="sky-tree_item">
    <div
      :class="{'sky-active':item.check == true}"
      :style="'margin-left:' + (zIndex * 15) + 'px'"
    >{{item.name}}</div>
    <template v-if="item.children">
      <item
        @make-folder="makeFolder"
        v-for="(e, index) in item.children"
        :key="index"
        :item="e"
        :z-index="zIndex + 1"
      ></item>
    </template>
  </div>
</template>

<script>
export default {
  name: 'item',
  props: {
    item: Object,
    zIndex: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {}
  },
  watch: {},
  methods: {
    log(e) {
      console.log(e)
    },
    makeFolder: function (item) {
      if (item == null) {
        this.$emit('make-folder', this.item)
      } else {
        this.$emit('make-folder', item)
      }
    },
  },
}
</script>

<style lang="scss">
.sky-tree_item {
  cursor: pointer;
  .sky-active {
    color: blue;
  }
}
</style>