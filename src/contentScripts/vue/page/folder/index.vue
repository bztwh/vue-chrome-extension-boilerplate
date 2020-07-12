<template>
  <div>
    <div>
      <button @click="getList()">刷新</button>
      <button @click="insertBooks()">添加标签</button>
      <input v-model="name" type="text" placeholder="标签名称" />
    </div>
    <div>
      <template v-for="(item, index) in list">
        <item :key="index" :item="item"></item>
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
    }
  },
  methods: {
    getList() {
      sendMessage({ name: 'getFolderTree' }).then(res => {
          console.log(res);
        this.list = res;
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
      }).then(res => {
      })
    },
  },
  mounted() {
    this.getList()
  },
}
</script>

<style lang="scss">
</style>