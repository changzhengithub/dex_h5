<template>
<!-- s 助力分享-注册 -->
  <section class="index-modal" @touchmove="touchMove($event)">
    <div class="modal-content">
      <!-- s 背景 -->
      <div class="content-bg" :class="{active: isNewUser}"></div>
      <div class="content-decorate">
        <div class="decorate-top">
          <img src="../../assets/image/modal-decorate.png">
        </div>
      </div>
      <!-- e 背景 -->
      <!-- s form -->
      <div class="content-register">
        <div class="register-form">
          <ul class="form-list">
            <li class="list-item">
              <div class="item-input" >
                <input class="input" ref="phone" type="number" maxlength="11" oninput="if(value.length>11) value = value.slice(0,11)" v-model="phoneNo" placeholder="请输入手机号码"  @click="getFocus($event)">
              </div>
            </li>
            <li class="list-item">
              <div class="item-input">
                <input class="input" type="text" maxlength="4" v-model="graphCode" placeholder="请输入图形验证码" @click="getFocus($event)">
              </div>
              <div class="item-graph" @click="getGraphCodeUrl">
                <img :src="graphCodeUrl" alt="图形验证码">
              </div>
            </li>
            <li class="list-item" v-show="isNewUser">
              <div class="item-input">
                <input class="input" type="text" maxlength="6" v-model="verificationCode" placeholder="请输入短信验证码" @click="getFocus($event)">
              </div>
              <button class="item-verification" :class="{'verification-active': codeStyleShow}" :disabled="disabledShow" @click="getVerificationCode">{{verificationCodeName}}</button>
            </li>
          </ul>
        </div>
        <div class="register-protocols" v-show="isNewUser">
          <div class="protocols-switch" @click="switchProtocol">
            <img v-if="switchShow" src="../../assets/image/select-switch.png">
            <img v-else-if="!switchShow" src="../../assets/image/select.png">
          </div>
          <span @click="switchProtocol">我已阅读并同意</span>
          <span class="protocols">《呆小二注册服务协议》</span>
        </div>
        <div class="register-submit" v-show="isNewUser" @click="submit" >
          <div class="submit-bg">
            <img src="../../assets/image/index-btn.png">
          </div>
          <div class="submit-text"><span>立即注册</span></div>
        </div>
        <div class="register-check" v-if="!isNewUser" @click="checkUser" >
          <div class="check-bg">
            <img src="../../assets/image/index-btn.png">
          </div>
          <div class="check-text"><span>帮好友助力</span></div>
        </div>
        <div class="register-close" @click="closeRegister">
          <img src="../../assets/image/close.png" alt="返回">
        </div>
      </div>
      <!-- e form -->
    </div>
    <!-- s 加载提示 -->
    <div class="register-loading" v-if="loadingShow">
      <div class="loading-box">
        <div class="box"></div>
      </div>
      <div class="loading-text"><span>加载中...</span></div>
    </div>
    <!-- e 加载提示 -->
  </section>
<!-- e 助力分享-注册 -->
</template>

<script>
// clsss
import Register from '@/class/Register.class.js'
import Check from '@/class/Check.class.js'
// axios
import axios from 'axios'
export default {
  name: "RegisterComponent",
  data() {
    return {
      switchShow: false,
      verificationCodeName: '获取验证码',
      phoneNo: '',
      verificationCode: '',
      graphCodeUrl: '',
      graphCode: '',
      disabledShow: false,
      loadingShow: false,
      sessionId: '',
      downloadUrl: '',
      taskNo: '',
      codeStyleShow: false,
      isAndroid: false,
      isiOS: false,
      isNewUser: false,
      submitBtnName: '帮好友助力'
    }
  },
  created () {
    if (window.TaskNo) this.taskNo = window.TaskNo
    this.checkPhoneType()
    this.inputFocus()
    this.sessionId = this.getUuid()
    this.getGraphCodeUrl()
  },
  mounted() {

  },
  methods: {
    // 获取图形验证码
    getGraphCodeUrl () {
      this.graphCodeUrl = `https://h5.hefeidaixiaoer.com//Common/GrapheCode?sessionId=${this.sessionId}&t=${Math.random()}`
    },
    // 生成UID用来获取图形验证码
    getUuid () {
      let s = []
      let hexDigits = '0123456789abcdef'
      for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
      }
      s[14] = '4'  // bits 12-15 of the time_hi_and_version field to 0010
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)  // bits 6-7 of the clock_seq_hi_and_reserved to 01
      s[8] = s[13] = s[18] = s[23] = '-'
      let uuid = s.join('')
      return uuid
    },
    // 发送验证码
    getVerificationCode () {
      if (!Check.phone(this.phoneNo)) return
      if (!Check.graphCode(this.graphCode)) return
      axios({
        url: '/Common/SendSMS',
        method: 'post',
        baseURL: 'https://h5.hefeidaixiaoer.com',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        params: {
          id: '',
          phone: this.phoneNo,
          graphicalCode: this.graphCode,
          type: '1',
          sessionId: this.sessionId
        }
      }).then(response => {
        if (response.data.code == 200) {
          this.getGraphCodeUrl()
          this.countDown()
        } else {
          this.$toast({
            content: response.data.message
          })
        }
      }).catch(() => {
        this.loadingShow = false
        this.$toast({
          content: '出错了，请关闭重试'
        })
      })
    },
    // 检查是否是新老用户
    checkUser() {
      if (!Check.phone(this.phoneNo)) return
      if (!Check.graphCode(this.graphCode)) return
      Register.send({
        url: 'IsNewCustomer',
        data: {
          phoneNo: this.phoneNo
        }
      }).success(data => {
        if (data === 1) {
          this.$toast({
            content: '你已注册，无法助力'
          })
          try {
            localStorage.setItem(window.TaskNo, window.TaskNo)
          } catch (e) {
            alert('您处于无痕浏览，无法为您保存')
          }
          this.closeRegister('old')
        }
        if (data === 0) {
          this.isNewUser = true
          this.getVerificationCode()
        }
      }).fail(data => {
        this.$toast({
          content: data
        })
      })
    },
    // 注册
    submit () {
      if (!Check.phone(this.phoneNo)) return
      if (!Check.code(this.verificationCode)) return
      if (this.switchShow) {
        this.$toast({
          content: '请选择协议并同意'
        })
        return
      }
      this.loadingShow = true
      // 注册
      axios({
        url: 'Home/InviteRegister',
        method: 'post',
        baseURL: 'https://h5.hefeidaixiaoer.com',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        params: {
          code: this.verificationCode,
          PhoneNo: this.phoneNo,
          RegistFromUser: 0,
          RegFromInviteTaskNo: this.taskNo
        }
      }).then(response => {
        this.loadingShow = false
        if (response.data.code == 200) {
          this.$toast({
            content: response.data.message
          })
          try {
            localStorage.setItem(window.TaskNo, window.TaskNo)
          } catch (e) {
            alert('您处于无痕浏览，无法为您保存')
          }
          setTimeout(() => {
            window.location.href = window.location.href + '&old=isOldUser'
          }, 1000)
        } else {
          this.$toast({
            content: response.data.message
          })
        }
      }).catch(() => {
        this.loadingShow = false
        this.$toast({
          content: '出错了，请关闭重试'
        })
      })
    },
    // 判断是安卓还是ios
    checkPhoneType () {
      let u = navigator.userAgent
      this.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
      this.isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    },
    // 判断安卓是否是微信或者QQ
    isWxQq() {
      var ua = navigator.userAgent.toLowerCase()
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return 'WX'
      } else if (ua.match('qq/') == 'qq/' && ua.match(/MQQBrowser/i) == 'mqqbrowser') {
        return 'QQ'
      }
    },
    countDown () {
      this.disabledShow = true
      this.codeStyleShow = true
      this.verificationCodeName = '60s'
      let seconds = 59
      let timer = setInterval(() => {
        if (seconds > 0) {
          this.verificationCodeName = `${seconds}s`
          seconds--
        } else {
          clearInterval(timer)
          this.verificationCodeName = '获取验证码'
          this.disabledShow = false
          this.codeStyleShow = false
        }
      }, 1000)
    },
    // 禁止滑动遮罩层
    touchMove (e) {
      e.preventDefault()
    },
    getFocus (e) {
      e.target.focus()
    },
    // 解决输入框失去焦点页面错位问题
    inputFocus () {
      let u = navigator.userAgent
      let flag
      let myFunction
      let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
      if (isIOS) {
        document.body.addEventListener('focusin', () => {  //软键盘弹起事件
          flag = true
          clearTimeout(myFunction)
        })
        document.body.addEventListener('focusout', () => { //软键盘关闭事件
          flag = false
          if (!flag) {
            myFunction = setTimeout(function () {
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" })//重点  =======当键盘收起的时候让页面回到原始位置(这里的top可以根据你们个人的需求改变，并不一定要回到页面顶部)
            }, 200)
          } else {
            return
          }
        })
      } else {
        return
      }
    },
    closeRegister (isNew) {
      this.$emit('CLOSE_REGISTER_EVENT', isNew)
    },
    switchProtocol () {
      this.switchShow = !this.switchShow
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "./register.scss";
</style>
