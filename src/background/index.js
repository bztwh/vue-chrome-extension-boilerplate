import {
  dbData
} from './books/index'
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
  getBooks() {
    return db.books.db.data;
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
