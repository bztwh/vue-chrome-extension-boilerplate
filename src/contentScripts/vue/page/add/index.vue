<template>
  <div>
    <div>
      <input type="text" v-model="insert.title" placeholder="标题" />
      <input type="text" v-model="tags" placeholder="标签 空格分割" />
      <button @click="insertBooks()">添加</button>
    </div>
  </div>
</template>
<script>
import { sendMessage } from '../../../utils/message.js'
import dayjs from 'dayjs'
export default {
  name: 'add',
  data() {
    return {
      insert: {
        title: document.querySelector('title').text,
        url: window.location.href,
        host: /((?<=:\/\/).*?)\//g.exec(window.location.href)[1],
      },
      tags: '',
    }
  },
  computed: {
    data() {
      return {
        ...this.insert,
        tags: this.tags.split(/\s{1,}/),
      }
    },
  },
  methods: {
    insertBooks() {
      sendMessage({
        name: 'insertBooks',
        data: {
          ...this.data,
          createDate: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        },
      }).then(res => {
        console.log(res)
      })
    },
  },
  mounted() {},
}
</script>
<style lang="scss" scoped>
</style>