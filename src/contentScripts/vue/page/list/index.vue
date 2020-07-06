<template>
  <div>
    <div class="main">
      <button @click="getData()">刷新</button>
      <add></add>
      <div>
        <ul class="books-ul">
          <li class="books-li" v-for="(item, index) in list" :key="index">
            <p>{{item.title}}{{item.createDate}}</p>
            <button @click="removeBooks(item.$loki,index)">删除</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { sendMessage } from '../../../utils/message.js'
import add from '../add/index.vue'
export default {
  name: 'list',
  components: {
    add,
  },
  data() {
    return {
      insert: {
        title: '',
      },
      list: [],
    }
  },
  methods: {
    getData() {
      sendMessage({
        name: 'getBooks',
      }).then(res => {
        console.log(res)
        this.list = res
      })
    },
    removeBooks(data, index) {
      console.log(data)
      sendMessage({
        name: 'removeBooks',
        data: [data],
      }).then(res => {
        this.list.splice(index, 1)
      })
    },
  },
  mounted() {
    this.getData()
  },
}
</script>

<style lang="scss" scoped>
.main {
  pointer-events: auto;
  .books-ul {
  }
  .books-li {
    display: flex;
    align-items: center;
  }
}
</style>