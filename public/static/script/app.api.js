window.token = null // access_token
window.customerId = null // customerId
window.phone = null // phone

// api接口地址
// 测试
// window.api = 'http://192.168.0.101:8180'
// 生产
window.api = 'http://api.hefeidaixiaoer.com'

// IOS token 回调
window.GetAccessTokenCallback = function (token) {
  window.token = token;
}
// IOS customerId 回调
window.IosGetCustomerIdCallback = function (customerId) {
  window.customerId = customerId;
}

// IOS phone 回调
window.GetPhoneNoCallback = function (phone) {
  window.phone = phone
}

// 获取原生交互数据
window.Init = function () {
  try {
    // android
    if (typeof (JsInterface) !== 'undefined') {
      window.token = JsInterface.GetAccessToken();
      window.customerId = JsInterface.GetCustomerId();
      window.phone = JsInterface.GetPhoneNo();
    } else {
      // ios
      window.webkit.messageHandlers.GetAccessToken.postMessage('token');
      window.webkit.messageHandlers.GetCustomerId.postMessage('customerId');
      window.webkit.messageHandlers.GetPhoneNo.postMessage('phone');
    }
  } catch (error) {
    alert('获取用户信息失败')
  }
}


