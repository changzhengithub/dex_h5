import axios from 'axios'
import Url from './url.class.js'
export default class Http {
  successCallback = null
  failCallback = null
  defaultCallback = null
  static send (args) {
    let instance = new Http()
    let headers = {
      'Access-Control-Allow-Origin': '*'
    }
    args.data = args.data ? args.data : {}
    axios({
      url: Url[args.url],
      method: 'post',
      // baseURL: 'https://pay.hefeidaixiaoer.com:8088',
      baseURL: 'http://192.168.0.178:8080',
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
      case '0':
        if (this.successCallback) this.successCallback(response.data)
        break
      default:
        if (this.failCallback) this.failCallback(response)
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