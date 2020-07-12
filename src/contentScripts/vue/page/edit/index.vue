<template>
  <div class="sky-edit">
    <input name="title" placeholder="标题" v-model="data.title" />
    <!-- <input name="description" placeholder="描述" v-model="" /> -->
    <input name="url" placeholder="地址" v-model="data.url" />
    <input name="tags" placeholder="标签" v-model="tags" />
    <button @click="updata()">确认</button>
  </div>
</template>

<script>
import { sendMessage } from '../../../utils/message.js'
import dayjs from 'dayjs'

export default {
  name: 'edit',
  props: {
    show: Boolean,
    loki: Number || String,
  },
  data() {
    return {
      data: {},
      tags: '',
    }
  },
  methods: {
    updata() {
      this.data.tags = this.tags.split(/\s{1,}/)
      this.data.update = dayjs().format('YYYY-MM-DD HH:mm:ss')
      sendMessage({ name: 'updatedBooks', data: [this.data] })
      this.$emit('update:show', false)
    },
  },
  mounted() {
    sendMessage({ name: 'getBook', data: { id: this.loki } }).then(res => {
      this.data = res
      this.tags = (res?.tags ?? []).join(' ')
    })
  },
}
</script>

<style lang="scss">
.sky-edit {
  width: 500px;
  height: auto;
  background: #fff;
  input {
    display: block;
  }
}
</style>