<template>
  <div>
    <h1 @click="send">{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: '测试',
    }
  },
  methods: {

  },
  mounted() {},
}
// json
const temp = [
  {
    host: ['', ''],
    href: ['', ''],
  },
]
</script>

<style lang="stylus"></style>