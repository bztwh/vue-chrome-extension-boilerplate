<template>
  <div>
    <div>
      <button @click="getList()">刷新</button>
      <button @click="insertBooks()">添加文件夹</button>
      <input v-model="name" type="text" placeholder="文件夹名称" />
    </div>
    <div>
      <template v-for="(item, index) in list">
        <item :key="index" @make-folder="makeFolder" :item="item"></item>
      </template>
    </div>
  </div>
</template>

<script>
import { sendMessage } from '../../../utils/message.js'
import item from './item.vue'
export default {
  name: 'folder',
  components: {
    item,
  },
  data() {
    return {
      list: [],
      name: null,
      previousItem: null,
    }
  },
  methods: {
    getList() {
      sendMessage({ name: 'getFolderTree' }).then((res) => {
        this.recursiveTraverse(res, (e) => {
          e.check = false
        })
        this.list = res
      })
    },
    recursiveTraverse(node, action) {
      if (node instanceof Array && node.length != 0) {
        node.forEach((item, index) => {
          this.recursiveTraverse(item, action)
        })
      }
      action(node)
      if (!node || !node.children) {
        return
      }
      node.children.forEach((item, index) => {
        this.recursiveTraverse(item, action)
      })
    },
    insertBooks() {
      sendMessage({
        name: 'insertFolder',
        data: {
          name: this.name,
          pid: 1,
          sort: 0,
        },
      }).then((res) => {})
    },
    makeFolder: function (item) {
      if (this.previousItem?.$loki == item.$loki) {
        item.check = !item.check
      } else {
        item.check = true
        this.previousItem && (this.previousItem.check = false)
        this.previousItem = item
      }
      // Vue.set(item, 'children', [])
      this.$emit('change', (item.check && item) || null)
    },
  },
  mounted() {
    this.getList()
  },
}
</script>

<style lang="scss">
</style>