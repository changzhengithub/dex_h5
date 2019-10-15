import axios from 'axios'
import Url from './url.class.js'
export default class Register {
  successCallback = null
  failCallback = null
  defaultCallback = null
  static send (args) {
    let instance = new Register()
    let headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    args.data = args.data ? args.data : {}
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
    return instance
  }
  dispense (response) {
    switch (response.code) {
      case 200:
        if (this.successCallback) this.successCallback(response.data)
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
}