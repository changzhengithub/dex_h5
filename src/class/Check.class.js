import Toast from '../components/common/toast/toast.js'
export default class Check {
  static name (name) {
    name = name ? name.replace(/\s+/g, '') : name
    if (!name) {
      Toast({
        content: '请输入姓名'
      })
      return false
    } else {
      let reg = new RegExp('^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$')
      if (!reg.test(name)) {
        Toast({
          content: '姓名格式错误'
        })
        return false
      }
      return true
    }
  }
  static phone (phone) {
    phone = phone ? phone.replace(/\s+/g, '') : phone
    if (!phone) {
      Toast({
        content: '请输入手机号'
      })
      return false
    }
    if (phone.length < 11) {
      Toast({
        content: '手机号长度不足11位'
      })
      return false
    } else {
      let reg = new RegExp('^(?:13|14|15|16|17|18|19)[0-9]{9}$', 'i')
      if (!reg.test(phone)) {
        Toast({
          content: '手机号格式错误'
        })
        return false
      }
      return true
    }
  }

  static email (email) {
    email = email ? email.replace(/\s+/g, '') : email
    if (!email) {
      Toast({
        content: '请输入邮箱'
      })
      return false
    } else {
      let reg = new RegExp(/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/)
      if (!reg.test(email)) {
        Toast({
          content: '邮箱格式错误'
        })
        return false
      }
      return true
    }
  }

  static code (code) {
    code = code ? code.replace(/\s+/g, '') : code
    if (!code) {
      Toast({
        content: '请输入验证码'
      })
      return false
    } else {
      let reg = new RegExp('^[0-9]{6}$', 'i')
      if (!reg.test(code)) {
        Toast({
          content: '验证码格式错误'
        })
        return false
      }
    }
    return true
  }

  static graphCode (graphCode) {
    graphCode = graphCode ? graphCode.replace(/\s+/g, '') : graphCode
    if (!graphCode) {
      Toast({
        content: '请输入图形验证码'
      })
      return false
    } else {
      let reg = new RegExp('^[a-zA-Z0-9]{4}$', 'i')
      if (!reg.test(graphCode)) {
        Toast({
          content: '图形验证码格式错误'
        })
        return false
      }
    }
    return true
  }

  static password (password) {
    password = password ? password.replace(/\s+/g, '') : password
    if (!password) {
      Toast({
        content: '密码不能为空'
      })
      return false
    } else {
      let pat = new RegExp(/^[a-zA-Z0-9]{6,16}$/)
      if (!pat.test(password)) {
        Toast({
          content: '密码格式错误'
        })
        return false
      }
    }
    return true
  }

  // check money
  static money (money) {
    money = money ? money.replace(/\s+/g, '') : money
    if (!money) {
      Toast({
        content: '请输入金额'
      })
      return false
    }
    if (!parseFloat(money)) {
      Toast({
        content: '请输入大于0的金额'
      })
      return false
    }
    if (isNaN(money)) {
      Toast({
        content: '请输入数字'
      })
      return false
    }
    let composition = money.split('.')
    if (composition[1] && composition[1].length > 2) {
      Toast({
        content: '请注意金额格式'
      })
      return false
    }
    return true
  }
  // check identityNumber
  static id (id) {
    id = id ? id.replace(/\s+/g, '') : id
    if (!id) {
      Toast({
        content: '身份证号不能为空'
      })
      return false
    } else {
      let reg = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/)
      if (!reg.test(id)) {
        Toast({
          content: '身份证号错误'
        })
        return false
      }
    }
    return true
  }

  static card (card) {
    card = card ? card.replace(/\s+/g, '') : card
    if (!card) {
      Toast({
        content: '银行卡号不能为空'
      })
      return false
    } else {
      let reg = new RegExp(/^([1-9]{1})(\d{14}|\d{18})$/)
      if (!reg.test(card)) {
        Toast({
          content: '银行卡号格式不对'
        })
        return false
      }
      return true
    }
  }
}
