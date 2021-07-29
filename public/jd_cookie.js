var oMask, qrcontainer, qrbox, qrcode, refresh, tip, time = null, time2 = null, jdCode = '', loginUrl = '', msgInput = '', jumpMsg = '';
window.qrLogin = function (api = '.') {
  // var script = document.createElement('script');
  // script.type = 'text/javascript';
  // script.src =
  //   'https://cdn.jsdelivr.net/npm/davidshimjs-qrcodejs@0.0.2/qrcode.min.js';
  // script.onload = function () {
  //   open();
  // };
  // document.getElementsByTagName('head')[0].appendChild(script);
  open();
  function checkLogin(user) {
    time = setInterval(() => {
      let timeStamp = new Date().getTime();
      ajax({
        url: api + '/cookie?t=' + timeStamp,
        method: 'post',
        data: { user, msg: msgInput.value || document.getElementById('msg').value },
        success: function (data) {
          let userMsg;
          if (data.err === 0) {
            clearInterval(time);
            qrcode.clear();
            qrbox.remove();
            userMsg = msgInput.value;
            msgInput.remove();
            tip.innerHTML =
                '<span>' +
                userMsg +
                '</span>' +
                '<p>' +
                data.cookie +
                '</p><button id="copyToClip">复制</button>';
            document.getElementById('copyToClip').onclick = function () {
              var aux = document.createElement('input');
              aux.setAttribute('value', data.cookie);
              document.body.appendChild(aux);
              aux.select();
              document.execCommand('copy');
              document.body.removeChild(aux);
              alert('复制成功');
            };
          } else if (data.err === 21) {
            //二维码已失效
            clearInterval(time);
            refresh.style.display = 'flex';
            const confirm = window.confirm("二维码已失效，刷新浏览器重新操作？")
            if (confirm) {
              window.location.reload();
            }
          }
        },
      });
    }, 3000);
  }

  function get_code() {
    let timeStamp = new Date().getTime();
    ajax({
      url: api + '/qrcode?t=' + timeStamp,
      method: 'get',
      success: function (data) {
        if (data.err === 0) {
          refresh.style.display = 'none';
          qrcode.clear();
          qrcode.makeCode(data.qrcode);
          if (time2) clearInterval(time2);
          checkLogin(data.user);
        }
      },
    });
  }

  function open() {
    // 创建遮罩层
    oMask = document.createElement('div');
    oMask.id = 'mask';
    oMask.style.position = 'fixed';
    oMask.style.top = 0;
    oMask.style.right = 0;
    oMask.style.bottom = 0;
    oMask.style.left = 0;
    oMask.style.height = '100%';
    oMask.style.display = 'flex';
    oMask.style.justifyContent = 'center';
    oMask.style.alignItems = 'center';
    oMask.style.textAlign = 'center';
    oMask.style.backgroundColor = 'rgba(0, 0, 0, 0.45)';
    oMask.style.zIndex = 1001;
    document.body.appendChild(oMask);

    // 二维码容器
    qrcontainer = document.createElement('div');
    qrcontainer.style.position = 'relative';
    qrcontainer.style.width = '256px';
    qrcontainer.style.padding = '16px';
    qrcontainer.style.borderRadius = '8px';
    qrcontainer.style.border = '#6d8a88 1px solid';
    qrcontainer.style.backgroundColor = '#fff';
    qrcontainer.style.boxShadow = '0px 0px 7px 3px rgb(0 0 0 / 20%)';
    qrcontainer.style.boxSizing = 'content-box';
    oMask.appendChild(qrcontainer);

    // 二维码
    qrbox = document.createElement('div');
    qrbox.id = 'qrcode';
    qrcontainer.appendChild(qrbox);
    qrcode = new QRCode(qrbox, {
      text: '二维码生成中，请稍等片刻！',
      correctLevel: QRCode.CorrectLevel.L,
    });

    // 刷新
    refresh = document.createElement('div');
    refresh.style.position = 'absolute';
    refresh.style.top = '16px';
    refresh.style.left = '16px';
    refresh.style.width = '256px';
    refresh.style.height = '256px';
    refresh.style.display = 'none';
    refresh.style.justifyContent = 'center';
    refresh.style.alignItems = 'center';
    refresh.style.color = '#ffffff';
    refresh.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    refresh.innerHTML = '<h3>二维码已失效</h3>';
    qrcontainer.appendChild(refresh);

    // 备注
    msgInput = document.createElement('input');
    msgInput.id = 'msg';
    msgInput.placeholder = '请输入备注信息，方便识别账号';
    msgInput.style.width = '256px';
    msgInput.style.height = '30px';
    msgInput.style.lineHeight = '30px';
    msgInput.style.boxSizing = 'border-box';
    msgInput.style.marginTop = '16px';
    qrcontainer.appendChild(msgInput);

    // tip
    tip = document.createElement('div');
    tip.style.wordBreak = 'break-word';
    tip.style.paddingTop = '16px';
    tip.innerHTML =
      '请使用京东APP扫码<br>或截图用京东APP扫码<br><br><span style="color: red">请无视京东APP升级提示</span>';
    qrcontainer.appendChild(tip);

    get_code();
    oMask.onclick = function (event) {
      console.log(event.target.id);
      if (event.target.id === 'mask') {
        clearInterval(time);
        oMask.remove();
        window.get_code2(api);
      }
    };
  }
};
window.jdCodeLogin = function (api) {
  console.log('jdCode', jdCode)
  if (jdCode) {
    copyText(jdCode);
    alert(`${jdCode}\n\n口令复制成功，请在京东APP中打开登录`);
    // window.open('openapp.jdmobile://');
  } else {
    alert('还没加载好，请稍后重试');
  }
}
window.jumpAppLogin = function (api) {
  if (loginUrl) {
    jumpMsg = window.prompt('请输入您的备注信息，方便识别账号');
    console.log('备注的信息', jumpMsg);
    const confirm = window.confirm("即将跳转到京东APP，如无跳转请使用手机自带浏览器打开\n\n京东APP点登录后再返回到此处")
    if (confirm) {
      window.location.href = `openapp.jdmobile://virtual/ad?params=${encodeURI(
          JSON.stringify({
            category: 'jump',
            des: 'ThirdPartyLogin',
            action: 'to',
            onekeylogin: 'return',
            url: loginUrl,
            authlogin_returnurl: 'weixin://',
            browserlogin_fromurl: window.location.host,
          })
      )}`;
    }
  } else {
    alert('还没加载好，请稍后重试');
  }
}
function get_code2(api = '.') {
  let timeStamp = new Date().getTime();
  ajax({
    url: './qrcode?t=' + timeStamp,
    method: 'get',
    success: function (data) {
      if (data.err === 0) {
        checkLogin2(data.user, api);
        console.log('jdCode:' + data.jdCode);
        jdCode = data.jdCode;
        loginUrl = data.qrcode;
      }
    },
  });
}
function checkLogin2(user, api) {
  time2 = setInterval(() => {
    let timeStamp = new Date().getTime();
    ajax({
      url: api + '/cookie?t=' + timeStamp,
      method: 'post',
      data: { user, msg: jumpMsg || '' },
      success: function (data) {
        if (data.err === 0) {
          clearInterval(time2);
          jdCode = '';
          loginUrl = '';
          console.log('cookie:' + data.cookie);
          if (document.getElementById('qr')) document.getElementById('qr').style.display = 'none';
          if (document.getElementById('res')) document.getElementById('res').style.display = 'flex';
          if (document.getElementById('cookie')) document.getElementById('cookie').innerHTML =
              '<span>' +
              jumpMsg +
              '</span>' +
              '<p>' +
              data.cookie +
              '</p><button id="copyToClip">复制</button>';
          document.getElementById('copyToClip').onclick = function () {
            copyText(data.cookie);
            alert('复制成功');
          };
          document.getElementById('res').onclick = function (event) {
            console.log(event.target.id);
            if (event.target.id === 'res') {
              if (document.getElementById('res')) document.getElementById('res').remove();
              window.get_code2();
              time2 = null;
            }
          };
        } else if (data.err === 21) {
          const confirm = window.confirm("已超时，刷新浏览器重新操作？")
          clearInterval(time2);
          jdCode = '';
          loginUrl = '';
          if (confirm) {
            window.location.reload();
          }
        }
      },
    });
  }, 3000);
}
function ajax(options) {
  var url = options.url;
  var method = options.method;
  var data = options.data;
  var success = options.success;
  var ajax = new XMLHttpRequest();
  ajax.open(method, url);
  if (method == 'post') {
    ajax.setRequestHeader('Content-type', 'application/json');
  }
  ajax.send(JSON.stringify(data));
  ajax.onreadystatechange = function () {
    if (ajax.readyState == 4 && ajax.status == 200) {
      success(JSON.parse(ajax.responseText));
    }
  };
}

function copyText(text) {
  // 数字没有 .length 不能执行selectText 需要转化成字符串
  var textString = text.toString();
  var input = document.querySelector('#copy-input');
  if (!input) {
    input = document.createElement('input');
    input.id = 'copy-input';
    input.readOnly = 'readOnly'; // 防止ios聚焦触发键盘事件
    input.style.position = 'absolute';
    input.style.left = '-1000px';
    input.style.zIndex = '-1000';
    document.body.appendChild(input);
  }
  input.value = textString;
  // ios必须先选中文字且不支持 input.select();
  selectText(input, 0, textString.length);
  console.log(document.execCommand('copy'), 'execCommand');
  if (document.execCommand('copy')) {
    document.execCommand('copy');
    //alert('已复制到粘贴板');
  }
  input.blur();
  // input自带的select()方法在苹果端无法进行选择，所以需要自己去写一个类似的方法
  // 选择文本。createTextRange(setSelectionRange)是input方法
  function selectText(textbox, startIndex, stopIndex) {
    if (textbox.createTextRange) {
      //ie
      const range = textbox.createTextRange();
      range.collapse(true);
      range.moveStart('character', startIndex); //起始光标
      range.moveEnd('character', stopIndex - startIndex); //结束光标
      range.select(); //不兼容苹果
    } else {
      //firefox/chrome
      textbox.setSelectionRange(startIndex, stopIndex);
      textbox.focus();
    }
  }
}