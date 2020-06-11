<template>
  <div>
    <h1 @click="send()">{{ msg }}</h1>
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
    sendMessageToContentScript(message, callback) {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, message, function(response) {
          if (callback) callback(response)
        })
      })
    },
    send() {
      this.sendMessageToContentScript(
        { cmd: 'test', value: '你好，我是popup！' },
        function(response) {
          console.log(response)
        }
      )
    },
  },
}
</script>

<style lang="scss"></style>
