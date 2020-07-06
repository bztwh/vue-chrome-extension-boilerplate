/**
 * 
 * @param {*} val name-名称
 */
export function sendMessage(val) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(val, (response) => {
      resolve(response);
    })
  })
};