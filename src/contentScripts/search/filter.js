let reList = [
  'www.hotbak.net',
  'www.voorp.com'
]

function load() {
  if (/^(http|https):\/\/www.google.*(\/search)\?*/.test(window.location.href)) {
    google();
  }
}

function google() {
  let map = document.querySelectorAll('#rso .g.GjRtuc'),
    style = document.createElement('style');
  // 插入样式
  style.innerText = `
  .hide-search{
    display:none !important;
  }
  `
  document.body.appendChild(style);
  // 遍历列表
  map.forEach(e => {
    // console.log(e);
    let url = e.querySelector('.r > a').href;
    if (url != null) {
      // 添加dom
      let menuDom = e.querySelector('.eFM0qc'),
        button = document.createElement('a');
      button.classList.add('fl');
      button.dataset.url = url.split("//")[1].split('/')[0];
      button.innerHTML = "添加黑名单";
      button.style.cursor = 'pointer';
      button.addEventListener('click', setBlockList)
      menuDom.appendChild(button);
      // 删除dom
      reList.some((e2) => new RegExp(`^(http|https):\/\/${e2}*`).test(url)) ? e.classList.add('hide-search') : '';
    }
  })
}

function setBlockList(event) {
  const url = event.target.dataset.url;
  if (confirm(`是否将${url}加入黑名单`)) {
    chrome.runtime.sendMessage({
      type: 'setBlockList',
      data: {
        url: url,
      }
    }, function (response) {
      response & alert('添加成功');
    });
  }
}

export {
  load
}
