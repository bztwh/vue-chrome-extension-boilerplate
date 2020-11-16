<template>
  <div style="pointer-events: auto;">
    <div class="sky-list">
      <folder @change="changeChange"></folder>
      <div>
        <button @click="getData()">刷新</button>
        <div v-if="isCurrentUrl">已收藏</div>
        <add :folder-id="folderId"></add>
        <div class="sky-list_container">
          <ul class="books-ul">
            <li class="books-li" v-for="(item, index) in list" :key="index">
              <a :href="item.url">{{item.title}}{{item.createDate}}</a>
              <button @click="editBooks(item.$loki)">编辑</button>
              <button @click="removeBooks(item.$loki,index)">删除</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <edit v-if="showEdit" :show.sync="showEdit" :loki="editLoki"></edit>
  </div>
</template>

<script>
import { sendMessage } from '../../../utils/message.js'
import edit from '../edit/index.vue'
import add from '../add/index.vue'
import folder from '../folder/index.vue'
export default {
  name: 'list',
  components: {
    add,
    edit,
    folder,
  },
  data() {
    return {
      insert: {
        title: '',
      },
      list: [],
      showEdit: false,
      editLoki: null,
      isCurrentUrl: false,
      folderId: null,
    }
  },
  methods: {
    getData() {
      sendMessage({
        name: 'getAllBooks',
        data: {
          folderId: this.folderId,
        },
      }).then((res) => {
        console.log(res)
        this.list = res
      })
    },
    removeBooks(data, index) {
      console.log(data)
      sendMessage({
        name: 'removeBooks',
        data: [data],
      }).then((res) => {
        this.list.splice(index, 1)
      })
    },
    editBooks(id) {
      console.log(id)
      this.showEdit = true
      this.editLoki = id
    },
    changeChange(e) {
      this.folderId = e?.$loki ?? null
      console.log({ folderId: this.folderId })
      sendMessage({
        name: 'getBooks',
        data: {
          folderId: this.folderId,
        },
      }).then((res) => {
        console.log(res)
        this.list = res
      })
    },
  },
  mounted() {
    this.getData()
    sendMessage({
      name: 'booksFindOne',
      data: { url: window.location.href },
    }).then((res) => {
      if (res != null) this.isCurrentUrl = true
    })
  },
}
</script>

<style lang="scss" scoped>
.sky-list {
  --sky-opacity: 0.95;
  pointer-events: auto;
  position: relative;
  display: flex;
  &::after {
    content: '';
    background: #fff;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    opacity: var(--sky-opacity);
  }
  .books-ul {
    font-size: 16px;
  }
  .books-li {
    display: flex;
    align-items: center;
  }
}
.sky-list_container {
  display: flex;
}
</style>