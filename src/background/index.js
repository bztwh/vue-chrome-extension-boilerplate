import {
  books
} from './books/index'
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(request, sender, sendResponse);
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
    books.insert(data)
  }
}