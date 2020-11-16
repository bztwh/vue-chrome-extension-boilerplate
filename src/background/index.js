import {
  dbData
} from './books/index'
import {
  createClient
} from "webdav/web";
const client = createClient(
  "https://dav.jianguoyun.com/dav/", {
    username: "767103340@qq.com",
    password: "at8hqkh8fkguazpr"
  }
);

function test() {
  return new Promise((resolve, reject) => {
    client.getDirectoryContents("/").then(res => {
      console.log(res);
      console.log('wwwwwwwwwwwwwwww');
    })
  })
}
test();
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  sendResponse(event[request.name](request.data))
});
let db = null;
dbData().then(res => {
  db = res;
})
const event = {
  getBlockList() {
    return '测试'
  },
  getFolder() {
    return db.folder.db.data;
  },
  getAllBooks() {
    return db.books.db.data;
  },
  getBooks(data) {
    return db.books.db.find({
      '$or': [{
        ...data
      }]
    });
  },
  insertBooks(data) {
    return db.books.insert(data)
  },
  insertFolder(data) {
    return db.folder.insert(data)
  },
  getFolderTree() {
    return db.folder.folderTree();
  },
  removeBooks(data) {
    db.books.remove(data)
  },
  updatedBooks(data) {
    db.books.updated(data);
  },
  getBook(data) {
    const {
      id
    } = data
    return db.books.db.get(id);
  },
  booksFindOne(data) {
    return db.books.db.findOne(data);
  }
}
