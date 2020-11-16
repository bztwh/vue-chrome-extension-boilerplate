import {
  createAppView,
} from './vue/index.js'
/**
 * 创建vue
 */
let appView = document.createElement('div');
appView.setAttribute('id', 'inject-vue-view');
document.body.append(appView)
createAppView('#inject-vue-view')
/**
 * 拖拽事件
 */
document.body.addEventListener('dragstart', (event) => {
  console.log(event.target.nodeName);
  console.log(event.dataTransfer.getData('text'));
  // 触发事件
  const dragstatus = new CustomEvent("dragstatus", {
    detail: {
      'status': true
    }
  });
  document.dispatchEvent(dragstatus);
})
document.body.addEventListener('dragend', (event) => {
  // 触发事件
  const dragstatus = new CustomEvent("dragstatus", {
    detail: {
      'status': false
    }
  });
  document.dispatchEvent(dragstatus);
})
console.log('加载完成');

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(request, sender, sendResponse);
});

function sendMessage(val) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(val, (response) => {
      resolve(response);
    })
  })
}
// sendMessage({
//   name: 'insertBooks',
//   data: {
//     title: 'www'
//   }
// }).then(res => {
//   console.log(res);
// })