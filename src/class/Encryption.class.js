import crypto from 'crypto'
export default class Encryption {
  static access_token (token, udid, id, md5key) {
    // let md5key = 'xxxxx'
    let ticks = Date.now()
    return {
      c: this.getmd5(ticks + token + udid + md5key),
      t: ticks,
      token: token,
      id: udid,
      udid: id
    }
  }
  static getmd5 (hexData) {
    let md5 = crypto.createHash('md5')
    md5.update(hexData)
    let hex = md5.digest('hex')
    return hex
  } 
}
