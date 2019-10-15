<template>
    <!-- s 我的助力免费拿 -->
    <section class="mine" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
      <main class="mine-main">
        <div class="main-content">
          <!-- s 背景 -->
          <div class="content-bg">
            <img src="../../assets/image/index-bg.png" alt="背景">
          </div>
          <!-- e 背景 -->
          <!-- s summary组件 -->
          <Summary :summary="summary"></Summary>
          <!-- e summary组件 -->
          <!-- s 我的助力列表 -->
          <div class="content-panel">
            <div class="panel-item" v-for="(item, index) in cusInviteCommodityList" :key="index">
              <div class="item-img">
                <img v-lazy="item.Icon" alt="商品图片">
                <div class="img-down" v-if="item.Status < 3">
                  <div class="down-item"><span>{{item.countDownHour}}</span></div>
                  <span>:</span>
                  <div class="down-item"><span>{{item.countDownMiunte}}</span></div>
                  <span>:</span>
                  <div class="down-item"><span>{{item.countDownSecound}}</span></div>
                </div>
              </div>
              <div class="item-detail">
                <div class="detail-title">
                  <p class="title-text">{{item.Title}}</p>
                </div>
                <div class="detail-assistance">
                  <p class="assistance-wait">需<span>{{item.InviteNum}}</span>人助力</p>
                  <p class="assistance-yet">还差<span>{{item.LeftInviteNum}}</span>助力</p>
                </div>
                <div class="detail-btm">
                  <div class="btm-price">
                    <div class="price-current">
                      <span>￥</span>
                      <span>0</span>
                    </div>
                  </div>
                  <div class="btm-button">
                    <div class="button button-detail">
                      <button class="btn" @click="gotoDetail(item)">助力详情</button>
                    </div>
                    <div class="button button-share" v-if="item.Status < 3 && item.isShare">
                      <button class="btn" @click="continumShare(item)">{{item.LeftInviteNum == item.InviteNum ? '去分享' : '继续分享'}}</button>
                    </div>
                    <div class="button button-exchange" :class="{active: item.Status >= 3}" v-if="item.Status >= 3">
                      <button class="btn" @click="rightExchange(item)">兑换成功</button>
                    </div>
                    <div class="button button-again" v-if="!item.isShare && item.Status < 3">
                      <button class="btn" @click="againFreeTake(item.Id)">重新抢</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- s 我的助力列表 -->
        </div>
        <!-- 上拉加载更多 -->
        <InfiniteScroll  :infiniteStyle="infiniteStyle" :isShowLoad="isShowLoad" :loadTip="loadTip" :busy="busy" @LOADMORE_EVENT="loadMore"></InfiniteScroll>
      </main>

      <!-- s 暂无助力 -->
      <transition name="fade">
        <Without v-if="withoutShow" @CLOSE_WITHOUT_EVENT="closeWithout"></Without>
      </transition>
      <!-- e 暂无助力 -->
      <!-- s 分享 -->
      <transition name="fade">
        <Share v-if="shareShow" :shareItem="shareItem" @CLOSE_SHARE_EVENT="closeShare"></Share>
      </transition>
      <!-- e 分享 -->
      <!-- s 选择地址 -->
      <SelectAddress v-if="selectAddressShow" :inviteCommodityId="inviteCommodityId" @CLOSE_SELECT_EVENT="closeSelect" @SURE_SELECT_EVENT="sureSelect"></SelectAddress>
      <!-- e 选择地址 -->
      <!-- s 底部tab -->
      <TabComponent :path="$route.path"></TabComponent>
      <!-- e 底部tab -->
    </section>
    <!-- e 我的助力免费拿 -->
</template>

<script>
// 引入组件
import TabComponent from '@/components/common/tab/tab.vue'
import InfiniteScroll from '@/components/common/infinite-scroll/infinite-scroll.vue'
import Summary from '@/components/common/summary/summary.vue'
import Without from '@/components/without/without.vue'
import SelectAddress from '@/components/select-address/select-address.vue'
import Share from '@/components/share/share.vue'
import { mapState, mapMutations } from 'vuex'
// 引入js
import Http from '@/class/Http.class.js'
import inobounce from 'inobounce'
export default {
  name: 'MineComponent',
  data () {
    return {
      // 头部标题
      headerProps: {
        title: '我的免费拿',
        icon: '',
        path: 'mine'
      },
      // summary组件数据
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
      rightExchangeShow: false,
      withoutShow: false,
      cusInviteCommodityList: [],
      status: 3,
      countDownHour: 0,
      countDownMiunte: 0,
      countDownSecound: 0,
      timer: null,
      handler: null,
      selectAddressShow: false,
      inviteCommodityId: null,
      shareShow: false,
      shareItem: {},
      // 上拉加载
      pageIndex: 1,
      pageSize: 10,
      busy: false,
      loadTip: '加载中...',
      isShowLoad: false,
      infiniteStyle: {
        bgColor: '#f64841',
        textColor: '#f2f2f2'
      }
    }
  },
  components: {
    Summary,
    Without,
    Share,
    TabComponent,
    InfiniteScroll,
    SelectAddress
  },
  created () {
    this.forbidScroll()
    this.init()
  },
  methods: {
    // 传入原生标题文字
    init () {
      Http.sendTitleText('我的免费拿')
    },
    // 上拉加载
    loadMore () {
      window.clearInterval(this.timer)
      this.busy = true
      this.isShowLoad = true
      Http.send({
        url: 'GetCusInviteCommodityList',
        data: {
          customerId: '',
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      }).success(data => {
        if (data.Data.length === 0) {
          this.loadTip = '没有更多数据了'
          this.busy = true
          this.timeCycle()
          return
        }
        this.cusInviteCommodityList = this.cusInviteCommodityList.concat(data.Data)
        // 创建任务时弹出分享
        this.cusInviteCommodityList.forEach((item) => {
          if (item.Id === this.productId) {
            this.shareItem = item
            this.shareShow = true
            let productId = null
            this.saveProductId(productId)
          }
        })
        this.countDown()
        this.timeCycle()
        this.pageIndex++
        setTimeout(() => {
          this.busy = false
          this.isShowLoad = false
        }, 1000)
      }).fail(data => {
        this.busy = false
        this.isShowLoad = false
        this.$toast({
          content: data
        })
      })
    },
    // 打开详情页
    gotoDetail (item) {
      if (item.LeftInviteNum === item.InviteNum) {
        this.withoutShow = true
      } else {
        this.$router.push({
          name: 'detail',
          params: {
            taskNo: item.TaskNo
          }
        })
      }
    },
    // 重新抢打开地址选择
    againFreeTake (Id) {
      this.inviteCommodityId = Id
      this.selectAddressShow = true
    },
    // 重新抢重新创建任务并刷新页面
    sureSelect () {
      this.selectAddressShow = false
      this.cusInviteCommodityList = []
      this.pageIndex = 1
      this.loadMore()
    },
    // 继续分享
    continumShare (item) {
      if (!item.isShare) {
        this.$toast({
          content: '你的任务已过期，请重新创建'
        })
        return
      }
      this.shareItem = item
      this.shareShow = true
    },
    // 倒计时
    timeCycle () {
      window.clearInterval(this.ticker)
      this.timer = setInterval(this.countDown, 1000)
      // 页面关闭时取消定时
      this.$once('hook:beforeDestroy', () => {
        window.clearInterval(this.timer)                               
      })
    },
    // 倒计时处理时间格式并判断是否过期
    countDown () {
      this.cusInviteCommodityList.forEach((item, index) => {
        var endTime = item.EndTime.replace(/-/g, '/')
        var currentTimeStap = (new Date()).getTime()
        var endTimeStap = (new Date(endTime)).getTime()
        if (currentTimeStap >= endTimeStap) {
          this.cusInviteCommodityList[index].isShare = false
          this.cusInviteCommodityList[index].countDownHour = '00'
          this.cusInviteCommodityList[index].countDownMiunte = '00'
          this.cusInviteCommodityList[index].countDownSecound = '00'
          return
        }
        var surplusTime = endTimeStap - currentTimeStap
        var countDownHour = this.fillZero(parseInt(surplusTime / 1000 / 60 / 60 % 60))
        var countDownMiunte = this.fillZero(parseInt(surplusTime / 1000 / 60 % 60))
        var countDownSecound = this.fillZero(parseInt(surplusTime / 1000 % 60))
        this.cusInviteCommodityList[index].isShare = true
        this.cusInviteCommodityList[index].countDownHour = countDownHour
        this.cusInviteCommodityList[index].countDownMiunte = countDownMiunte
        this.cusInviteCommodityList[index].countDownSecound = countDownSecound
      })
      this.cusInviteCommodityList = [...this.cusInviteCommodityList]
      let isClear = this.cusInviteCommodityList.every((item) => {
        return item.isShare !== true
      })
      if (isClear) window.clearInterval(this.timer)
    },
    // 立即兑换，改为兑换成功，无需兑换
    rightExchange (item) {
      if (item.Status >= 3) return
      /*
        Http.send({
          url: 'InviteTaskConvert',
          data: {
            TaskNo: item.TaskNo,
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
      */
    },
    // 关闭暂无详情
    closeWithout () {
      this.withoutShow = false
    },
    // 关闭选择地址
    closeSelect () {
      this.selectAddressShow = false
    },
    // 关闭分享
    closeShare () {
      this.shareShow = false
    },
    // 补零
    fillZero (time) {
      return time < 10 ? '0' + time : '' + time
    },
    // touchStart、touchMove、touchEnd在滑动页面时停掉定时器防止页面闪烁
    touchStart () {
      clearInterval(this.timer)
    },
    touchMove () {
      clearInterval(this.timer)
    },
    touchEnd () {
      this.countDown()
      this.timeCycle()
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
    ...mapMutations(['saveProductId'])
  },
  computed: {
    ...mapState(['productId'])
  }
}
</script>

<style lang="scss" scoped>
@import "./mine.scss";
</style>
