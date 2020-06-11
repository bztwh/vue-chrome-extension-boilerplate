import {
  load
} from './search/filter'
import {
  createAppView,
} from './vue/index.js'
load();
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.cmd == 'test')
    alert(request.value);
  sendResponse('我收到了你的消息！');
});
// chrome.runtime.sendMessage({
//   greeting: '你好，我是content-script呀，我主动发消息给后台！'
// }, function (response) {
//   console.log('收到来自后台的回复：' + response);
// });
let appView = document.createElement('div');
appView.setAttribute('id', 'inject-vue-view');
document.body.append(appView)
createAppView('#inject-vue-view')
console.log('www');
console.log('加载');
