<template>
  <!-- s 签到 -->
  <section class="sign">
    <main class="sign-main">
      <div class="mian-content">
        <div class="content-panel">
          <div class="panel-sign">
            <div class="sign-title">
              <p class="title-text">累计红包金额<span>{{isLogin ? signInfo.VipCash : '0'}}</span>元</p>
              <div class="title-days">
                <span>已连续签到</span>
                <span>{{isLogin ? signInfo.CheckinDays : '0'}}天</span>
              </div>
            </div>
            <!-- s 未登录状态 -->
            <div class="sign-virtual" v-show="!isLogin">
              <div class="virtual-item" v-for="(item, index) in virtualData" :key="index">
                <div class="item-days"><span>{{item.Day}}</span><span>天</span></div>
                <div class="item-card">
                  <div class="card-icon">
                    <img src="../../assets/image/small-package.png" alt="">
                  </div>
                  <div class="card-text">
                    <span>{{item.textName}}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="sign-btn" v-show="!isLogin">
              <button class="btn" :disabled="isDisabled" @click="loginSign">{{buttonName}}</button>
            </div>
            <!-- e 未登录状态 -->
            <!-- s 登录状态 -->
            <div class="sign-list" v-show="isLogin">
              <div class="list-item" :class="{active: index < signInfo.CheckinDays && !item.isSignToday, 'current-active': item.isSignToday}" v-for="(item, index) in formualList" :key="index">
                <div class="item-days"><span>0{{index + 1}}</span><span>天</span></div>
                <div class="item-card">
                  <div class="card-icon">
                    <img v-if="index < signInfo.CheckinDays && !item.isSignToday" src="../../assets/image/sign-already.png" alt="">
                    <img v-if="item.isSignToday" src="../../assets/image/big-package.png" alt="">
                    <img v-if="index >= signInfo.CheckinDays" src="../../assets/image/small-package.png" alt="">
                  </div>
                  <div class="card-text">
                    <img v-if="item.isSignToday" src="../../assets/image/sign-success.png" alt="">
                    <span>{{ index >= signInfo.CheckinDays ? item.textName : '已领取'}}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="sign-btn" v-show="isLogin">
              <button class="btn" @click="signSuccess">{{buttonName}}</button>
            </div>
            <div class="sign-tip"><span>连续签到可提高红包额度哦</span></div>
            <!-- e 登录状态 -->
          </div>
        </div>
      </div>
    </main>
    <!-- s 签到成功弹框和兑换优惠券弹框 -->
    <transition name="fade">
      <Success v-if="successShow" :isShowComponent="isShowComponent" :checkCash="signCash"  @CLOSE_SUCCESS_EVENT="closeSuccess"></Success>
    </transition>
    <!-- e 签到成功弹框和兑换优惠券弹框 -->
  </section>
  <!-- e 签到 -->
</template>

<script>
// 组件
import Success from '@/components/success/success.vue' // 签到成功提示框
// class
import Http from '@/class/Http.class.js'
export default {
  name: 'SignComponent',
  data() {
    return {
      signInfo: {}, // 签到信息
      formualList: [], // 每天签到金币
      buttonName: '签到领红包',
      signDay: '',
      signMouth: '',
      signYear: '',
      CurrentDay: '',
      currentMouth: '',
      currentYear: '',
      signCash: '',
      successShow: false,
      isDisabled: false, // 按钮是否可以点击
      isShowComponent: true, // 签到成功提示哪个
      isLogin: false, // 是否登录
      // 未登录状态，虚拟签到信息
      virtualData: [
        {
          Day: '01',
          textName: '最高8元'
        },
        {
          Day: '02',
          textName: '最高18元'
        },
        {
          Day: '03',
          textName: '最高28元'
        },
        {
          Day: '04',
          textName: '最高38元'
        },
        {
          Day: '05',
          textName: '最高48元'
        },
        {
          Day: '06',
          textName: '最高58元'
        },
        {
          Day: '07',
          textName: '最高88元'
        }
      ]
    }
  },
  components: {
    Success,
  },
  created () {
    this.init()
    this.judgeLogin()
  },
  mounted () {},
  methods: {
    // 标题
    init () {
      Http.sendTitleText('签到领红包')
    },
    // 判断是否登录
    judgeLogin () {
      window.customerId = null
      window.token = null
      window.Init()
      setTimeout(() => {
        if (window.customerId && window.token && window.phone) {
          this.getData()
        }
      }, 50)
    },
    // 登录成功获取签到信息
    getData () {
      Http.send({
        url: 'GetCusCheckin',
        data: {
          CustomerId: window.customerId
        }
      }).success(data => {
        this.disposeData(data)
        this.isLogin = true
      }).fail(data => {
        this.$toast({
          content: data
        })
      })
    },
    // 处理签到信息
    disposeData(data) {
      this.signInfo = data.Info
      this.formualList = data.FormualList
      var cashNumberText = ['最高8元', '最高18元', '最高28元', '最高38元', '最高48元', '最高58元', '最高88元']
      cashNumberText.forEach((item, index) => {
        this.formualList[index].textName = item
        this.formualList[index].isSignToday = false
      })
      // 处理签到日期
      if (!this.signInfo.LastsignTime) return
      let date = new Date(this.signInfo.LastsignTime.replace(/-/g, '/'))
      this.signDay = date.getDate()
      this.signMouth = date.getMonth()
      this.signYear = date.getFullYear()
      this.currentDay = (new Date()).getDate()
      this.currentMouth = (new Date()).getMonth()
      this.currentYear = (new Date()).getFullYear()
      // 判断今天是否已经签到
      if (this.signYear === this.currentYear && this.signMouth === this.currentMouth && this.signDay === this.currentDay && this.signInfo.CheckinDays > 0) {
        this.formualList[this.signInfo.CheckinDays - 1].isSignToday = true
        this.buttonName = '连续签到得更多红包'
      } else {
        // 当天未签到
        if (this.signYear === this.currentYear && this.signMouth == this.currentMouth && this.currentDay - this.signDay == 1 ) {
          // 已经签到7天后从0开始签到
          if (this.signInfo.CheckinDays >= 7) {
            this.signInfo.CheckinDays = 0
            this.buttonName = '签到领红包'
          }
        }
        // 连续两天未签到从0 开始
        if (this.signYear !== this.currentYear || this.signMouth !== this.currentMouth || this.currentDay - this.signDay >= 2 ) this.signInfo.CheckinDays = 0
      }
    },
    // 点击签到
    signSuccess() {
      // 第一次签到
      if (!this.signInfo.LastsignTime) {
        this.applySign()
        return
      }
      // 判断是否已签到
      if (this.signYear === this.currentYear && this.signMouth === this.currentMouth && this.signDay === this.currentDay && this.signInfo.CheckinDays > 0) {
        this.$toast({
          content: '今日红包已领取'
        })
      } else {
        this.applySign()
      }
    },
    // 点击未登录签到按钮
    loginSign () {
      window.customerId = null
      window.token = null
      window.phone = null
      window.Init()
      setTimeout(() => {
        if (window.customerId && window.token && window.phone) {
          this.isDisabled = true
          Http.send({
            url: 'GetCusCheckin',
            data: {
              CustomerId: window.customerId
            }
          }).success(data => {
            this.disposeData(data)
            this.isLogin = true
            setTimeout(() => {
              this.isDisabled = false
              this.signSuccess()
            }, 1200)
          }).fail(data => {
            this.$toast({
              content: data
            })
          })
        } else {
          try {
            if (typeof (JsInterface) !== 'undefined') {
              JsInterface.RightLogin()
            } else {
              window.webkit.messageHandlers.RightLogin.postMessage('login')
            }
          } catch (error) {
            this.$toast({
              content: '登录失败'
            })
          }
        }
      }, 50)
    },
    // 签到
    applySign () {
      Http.send({
        url: 'AddCusCheckin',
        data: {
          CustomerId: window.customerId
        }
      }).success((data) => {
        this.signCash = data.CheckCash
        this.getData()
        this.successShow = true
      }).fail(() => {
        this.$toast({
          content: '签到失败'
        })
      })
    },
    // 关闭签到成功提示框
    closeSuccess() {
      this.successShow = false
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./sign-copy.scss";
</style>