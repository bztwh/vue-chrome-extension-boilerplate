class messag {
  /**
   * 发送消息到ContentScript
   */
  sendToContentScript(message, callback) {
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
        if (callback) callback(response);
      });
    });
  }
  /**
   * 发送消息到background,popup
   */
  sendToBackground() {
    chrome.runtime.sendMessage({}, function (response) {
      console.log(response);
    });
  }
  /**
   * 监听来自background,popup的消息
   */
  onContentScript() {
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
      console.log(request, sender, sendResponse);
    });
  }
  /**
   * 监听来自content-script的消息
   */
  onBackground() {
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
      console.log('收到来自content-script的消息：');
      console.log(request, sender, sendResponse);
      sendResponse('我是后台，我已收到你的消息：' + JSON.stringify(request));
    });
  }
}