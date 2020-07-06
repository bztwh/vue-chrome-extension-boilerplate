<template>
  <div>
    <div>
      <input type="text" v-model="insert.title" placeholder="标题" :ref="insert.title" />
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
    }
  },
  methods: {
    insertBooks() {
      sendMessage({
        name: 'insertBooks',
        data: {
          ...this.insert,
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