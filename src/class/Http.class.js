import axios from 'axios'
import Url from './url.class.js'
import Toast from '../components/common/toast/toast.js'
export default class Http {
  successCallback = null
  failCallback = null
  defaultCallback = null
  static send (args) {
    let instance = new Http()
    let headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    let handler = setInterval(() => {
      window.Init()
      if (window.customerId && window.token) {
        window.clearInterval(handler)
        args.data = args.data ? args.data : {}
        if (args.data.hasOwnProperty('CustomerId')) {
          args.data.CustomerId = window.customerId
        }
        if (args.data.hasOwnProperty('customerId')) {
          args.data.customerId = window.customerId
        }
        args.data.access_token = window.token
        axios({
          url: Url[args.url],
          method: 'post',
          baseURL: window.api,
          headers: headers,
          params: args.data
        }).then(response => {
          instance.dispense(response.data)
        }).catch((err) => {
          if (instance.failCallback) instance.failCallback(err)
        })
      }
    }, 10)
    return instance
  }
  dispense (response) {
    switch (response.code) {
      case 200:
        if (this.successCallback) this.successCallback(response.data)
        break
      case 301:
        if (this.failCallback) this.failCallback(response)
        break
      case 401:
        if (this.failCallback) this.failCallback(response.message)
        // try {
        //   if (typeof (JsInterface) !== 'undefined') {
        //     JsInterface.RightLogin()
        //   } else {
        //     window.webkit.messageHandlers.RightLogin.postMessage('login')
        //   }
        // } catch (error) {
        //   Toast({
        //     content: '登录失败'
        //   })
        // }
        break
      default:
        if (this.failCallback) this.failCallback(response.message)
    }
  }
  success (callback) {
    this.successCallback = callback
    return this
  }
  fail (callback) {
    this.failCallback = callback
    return this
  }
  static sendTitleText (text) {
    try {
      if (typeof (JsInterface) !== 'undefined') {
        JsInterface.SendTitleText(text)
      } else {
        window.webkit.messageHandlers.SendTitleText.postMessage(text)
      }
    } catch (error) {
      Toast({
        content: error
      })
    }
  }
}