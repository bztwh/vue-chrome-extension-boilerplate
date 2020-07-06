import {
  books
} from './books/index'
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  sendResponse(event[request.name](request.data))
});
const event = {
  getBlockList() {
    return '测试'
  },
  getBooks() {
    return books.db.data;
  },
  insertBooks(data) {
    return books.insert(data)
  },
  removeBooks(data) {
    console.log(data);
    books.remove(data)
  },
}
