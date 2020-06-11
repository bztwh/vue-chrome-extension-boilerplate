// OnInstall handler
chrome.runtime.onInstalled.addListener(details => {
  console.log(details)
})

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(request, sender, sendResponse);
  if (request.type == 'setBlockList') {
    setItem('blockList', request.data.url)
    sendResponse(true);
  } else if (request.type == 'getBlockList') {
    sendResponse(getItem('blockList'));
  } else {
    sendResponse('www');
  }
});

function setItem(key, value) {
  let item = localStorage.getItem(key);
  item != null && item != '' ? item = JSON.parse(item) : item = [];
  item.push(value);
  localStorage.setItem(key, JSON.stringify(item));
}

function getItem(key) {
  let item = localStorage.getItem(key);
  item != null && item != '' ? '' : item = [];
  return item;
}
console.log('www');
console.log(localStorage.getItem('blockList'));