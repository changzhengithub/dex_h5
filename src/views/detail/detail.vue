<template>
  <!-- s 助力详情 -->
  <section class="detail"  @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
    <main class="detail-main">
      <div class="mian-content">
        <!-- s 背景 -->
        <div class="content-bg">
          <img src="../../assets/image/invite-bg.png" alt="背景">
        </div>
        <!-- e 背景 -->
        <!-- s summary组件 -->
        <Summary :summary="summary"></Summary>
        <!-- e summary组件 -->
        <!--  -->
        <div class="content-panel">
          <div class="panel-item">
            <div class="item-img">
              <img :src="inviteCommodityDetail.Icon" alt="商品图片">
              <div class="img-down" v-if="inviteCommodityDetail.Status < 3">
                <div class="down-item"><span>{{countDownHour}}</span></div>
                <span>:</span>
                <div class="down-item"><span>{{countDownMiunte}}</span></div>
                <span>:</span>
                <div class="down-item"><span>{{countDownSecound}}</span></div>
              </div>
            </div>
            <div class="item-detail">
              <div class="detail-title">
                <p class="title-text">{{inviteCommodityDetail.Title}}</p>
              </div>
              <div class="detail-assistance">
                <p class="assistance-wait">需<span>{{inviteCommodityDetail.InviteNum}}</span>人助力</p>
                <p class="assistance-yet">还差<span>{{inviteCommodityDetail.LeftInviteNum}}</span>助力</p>
              </div>
              <div class="detail-btm">
                <div class="btm-price">
                  <div class="price-current">
                    <span>￥</span>
                    <span>0</span>
                  </div>
                  <div class="detail-original">
                    <span>￥</span>
                    <span>{{inviteCommodityDetail.Price}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="panel-invite">
            <div class="invite-title">
              <p class="title-text" v-if="inviteCommodityDetail.Status < 3 && isShare">再邀 <span>{{inviteCommodityDetail.LeftInviteNum}}</span> 位好友既可免费领取</p>
              <p class="title-text" v-if="inviteCommodityDetail.Status >= 3">商品兑换成功</p>
              <p class="title-text" v-if="inviteCommodityDetail.Status < 3 && !isShare">活动已过期</p>
            </div>
            <div class="invite-button">
              <button class="btn" @click="detailSubmit">{{inviteBtnName}}</button>
            </div>
            <div class="invite-pendant">
              <img src="../../assets/image/pendant.png">
            </div>
          </div>
        </div>
        <!-- s 助力详情列表 -->
        <div class="content-particular">
          <div class="particular-title"><span>好友助力详情</span></div>
          <div class="particular-list">
            <div class="list-item">
              <div class="item-userid">用户ID</div>
              <div class="item-time">助力时间</div>
            </div>
            <div class="list-item"  v-for="(item, index) in customerList" :key="index">
              <div class="item-userid">{{item.PhoneNo}}</div>
              <div class="item-time">{{item.LastsignTime}}</div>
            </div>
          </div>
        </div>
        <!-- e 助力详情列表 -->
      </div>
    </main>
    <!-- s 物流详情页 -->
    <section class="detail-logistics" v-if="logisticsShow">
      <transition name="btmfade">
        <div class="logistics-content" v-if="logisticsUrlShow">
          <div class="content-title">
            <span>物流信息</span>
            <i class="iconfont iconclose" @click="closeModal"></i>
          </div>
          <div class="content-html" v-html="logisticsUrl"></div>
        </div>
      </transition>
    </section>
    <!-- e 物流详情页 -->

    <!-- s 分享 -->
    <transition name="fade">
      <Share v-if="shareShow" :shareItem="inviteCommodityDetail" @CLOSE_SHARE_EVENT="closeShare"></Share>
    </transition>
    <!-- e 分享 -->

  </section>
  <!-- e 助力详情 -->
</template>

<script>
// 组件
import Summary from '@/components/common/summary/summary.vue'
import Share from '@/components/share/share.vue'
// js
import Http from '@/class/Http.class.js'
import axios from 'axios'
import Replace from '@/class/Replace.class.js'
import inobounce from 'inobounce'
// vuex
import { mapState } from 'vuex'

export default {
  name: 'DetailComponent',
  data () {
    return {
      // 标题
      headerProps: {
        title: '助力详情',
        icon: '',
        path: ''
      },
      // summary
      summary: {
        title: '好友如何助力？',
        imgSrcList: [{
            className: 'img-icon',
            imgSrc: require('../../assets/image/icon-share.png')
          },{
            className: 'img-add',
            imgSrc: require('../../assets/image/icon-add.png')
          },{
            className: 'img-icon',
            imgSrc: require('../../assets/image/icon-register.png')
          },{
            className: 'img-add',
            imgSrc: require('../../assets/image/icon-add.png')
          },{
            className: 'img-icon',
            imgSrc: require('../../assets/image/icon-down.png')
          },{
            className: 'img-add',
            imgSrc: require('../../assets/image/icon-add.png')
          },{
            className: 'img-icon',
            imgSrc: require('../../assets/image/icon-pwd.png')
          }],
        textList: ['①打开分享链接', '②好友注册', '③下载APP登录', '④设置激活密码']
      },
      inviteCommodityDetail: {},
      customerList: [],
      ticker: null,
      isShare: true,
      inviteBtnName: '邀请好友助力',
      status: 3,
      canScroll: true,
      logisticsUrl: '',
      logisticsShow: false,
      logisticsUrlShow: false,
      // 分享
      shareShow: false,
      // 倒计时
      countDownHour: '00',
      countDownMiunte: '00',
      countDownSecound: '00',
    }
  },
  components: {
    Summary,
    Share
  },
  created () {
    this.forbidScroll()
    this.init()
    this.getData()
  },
  methods: {
    // 传入原生标题文字
    init () {
      Http.sendTitleText('助力详情')
    },
    // 获取助力详情数据
    getData () {
      Http.send({
        url: 'GetInviteCustomerDetail',
        data: {
          taskNo: this.$route.params.taskNo
        }
      }).success(data => {
        this.disposeData(data)
      }).fail((data) => {
        this.$toast({
          content: data
        })
      })
    },
    // 处理助力详情数据
    disposeData (data) {
      // 处理手机号
      data.CustomerList.forEach(element => {
        element.PhoneNo = Replace.mask(element.PhoneNo, 3, 4, '*')
      })
      this.customerList = data.CustomerList
      this.inviteCommodityDetail = data.Info
      if (this.inviteCommodityDetail.Status >= 3) {
        this.inviteBtnName = '助力成功  查看物流'
        window.clearInterval(this.ticker)
      } else {
        this.timeCycle()
      }
    },
    // 点击助力详情按钮
    detailSubmit () {
      // 查看物流
      if (this.inviteCommodityDetail.Status >= 3) {
        this.logisticsShow = true
        this.getLogistics()
      }
      // 继续分享
      if (this.inviteCommodityDetail.Status < 3) this.continumShare()
      // 申请兑换
      // if (!this.inviteCommodityDetail.LeftInviteNum) this.rightExchange()
    },
    // 分享
    continumShare () {
      if (!this.isShare) {
        this.$toast({
          content: '你的任务已过期，请重新创建'
        })
        return
      }
      this.shareShow = true
    },
    // 获取物流信息
    getLogistics () {
      axios({
        url: '/Kdniao/GetKdniaoTimelyInfo',
        method: 'post',
        baseURL: window.api,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        params: {
          access_token: window.token,
          logisticCode: this.inviteCommodityDetail.DeliverNo
        }
      }).then(response => {
        this.logisticsUrl = response.data
        this.logisticsUrlShow = true
      }).catch((err) => {
        this.$toast({
          content: err
        })
      })
    },
    closeModal () {
      this.logisticsShow = false
      this.logisticsUrlShow = false
    },
    // 关闭分享
    closeShare () {
      this.shareShow = false
    },
    rightExchange () {
      Http.send({
        url: 'InviteTaskConvert',
        data: {
          TaskNo: this.inviteCommodityDetail.TaskNo,
          Status: this.status
        }
      }).success(() => {
        this.getData()
        this.$toast({
          content: '兑换成功'
        })
      }).fail((data) => {
        this.$toast({
          content: data
        })
      })
    },
    // 倒计时
    timeCycle () {
      window.clearInterval(this.ticker)
      this.ticker = setInterval(this.countDown, 1000)
      this.$once('hook:beforeDestroy', () => {
        window.clearInterval(this.ticker)                                 
      })
    },
    // 倒计时处理时间格式并判断是否过期
    countDown () {
      var endTime = this.inviteCommodityDetail.EndTime.replace(/-/g, '/')
      var currentTimeStap = (new Date()).getTime()
      var endTimeStap = (new Date(endTime)).getTime()
      if (currentTimeStap > endTimeStap) {
        window.clearInterval(this.ticker)
        this.isShare = false
        this.countDownHour = '00'
        this.countDownMiunte = '00'
        this.countDownSecound = '00'
        return
      }
      this.isShare = true
      var surplusTime = endTimeStap - currentTimeStap
      this.countDownHour = this.fillZero(parseInt(surplusTime / 1000 / 60 / 60 % 60))
      this.countDownMiunte = this.fillZero(parseInt(surplusTime / 1000 / 60 % 60))
      this.countDownSecound = this.fillZero(parseInt(surplusTime / 1000 % 60))
    },
    // 补零
    fillZero (time) {
      return time < 10 ? '0' + time : '' + time
    },
    // 禁止页面回弹效果
    forbidScroll () {
      let u = navigator.userAgent
      if (u.indexOf('iPhone') > -1) {
        inobounce.enable()
        this.$once('hook:beforeDestroy', () => {
          inobounce.disable()
        })
      }
    },
    // touchStart、touchMove、touchEnd在滑动页面时停掉定时器防止页面闪烁
    touchStart () {
      clearInterval(this.ticker)
    },
    touchMove () {
      clearInterval(this.ticker)
    },
    touchEnd () {
      if (this.inviteCommodityDetail.Status < 3) {
        this.countDown()
        this.timeCycle()
      }
    },
  },
  computed: {
    ...mapState(['inviteCommodityId'])
  }
}
</script>

<style lang="scss" scoped>
@import "./detail.scss";
</style>
