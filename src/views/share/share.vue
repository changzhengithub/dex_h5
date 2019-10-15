<template>
  <!-- s 助力分享 -->
  <section class="share">
    <main class="share-main">
      <!-- s 背景 -->
      <div class="main-bg">
        <img src="../../assets/image/share-bg.png">
      </div>
      <!-- e 背景 -->
      <!-- s 显示已拿轮播 -->
      <div class="main-swiper">
        <swiper class="swiper-slide swiper-no-swiping" :options="swiperOption" ref="mySlides">
          <swiper-slide class="slide-item" v-for="(item, index) in slideArr" :key="index">
            <div class="item-img">
              <img :src="item.slideImgSrc" alt="头像">
            </div>
            <div class="item-text"><span>{{item.slideName}}免费拿到心仪商品</span></div>
          </swiper-slide>
        </swiper>
      </div>
      <!-- e 显示已拿轮播 -->
      <div class="main-content">
        <!-- s 助力商品详情 -->
        <div class="content-panel">
          <div class="panel-img">
            <img :src="inviteCommodityDetail.Icon" alt="商品图片">
          </div>
          <div class="panel-detail">
            <div class="detail-title">
              <p class="title-text">{{inviteCommodityDetail.Title}} </p>
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
              <div class="btm-already">
                <span>{{inviteCommodityDetail.ExchangedNum}}人已免费领</span>
              </div>
            </div>
          </div>
        </div>
        <div class="content-tip" v-if="inviteCommodityDetail.Status < 3 && isShare">
          再邀<span>{{inviteCommodityDetail.LeftInviteNum}}位</span>好友助力即可免费领取
        </div>
        <div class="content-tip" v-if="inviteCommodityDetail.Status >=3 && isShare">好友助力已成功</div>
        <div class="content-tip" v-if="!isShare">活动已结束</div>
        <div class="content-invite" @click="rightHelp">
          <div class="invite-bg">
            <img src="../../assets/image/index-btn.png">
          </div>
          <div class="invite-text"><span>{{inviteBtnName}}</span></div>
        </div>
        <!-- e 助力商品详情 -->
        <!-- s 好友助力列表 -->
        <div class="content-detail" v-if="isMine">
          <div class="detail-title"><span>好友助力详情</span></div>
          <div class="detail-without" v-if="inviteAllCusList.length == 0">
            <span>暂无好友助力</span>
          </div>
          <div class="detail-list" v-if="inviteAllCusList.length != 0">
            <div class="list-panel" v-for="(detailItem, index) in inviteAllCusList" :key="index">
              <div class="panel-info">
                <div class="info-portrait">
                  <img v-lazy="detailItem.headIcon" alt="头像">
                </div>
                <div class="info-text">
                  <div class="text-name"><span>{{detailItem.Name}}</span></div>
                  <div class="text-time"><span>{{detailItem.InviteDateDesc}}</span></div>
                </div>
              </div>
              <div class="panel-tip">
                <div class="tip-help" :class="{active: detailItem.Tips == '快提醒他下载App助力'}"><span>{{detailItem.Tips}}</span></div>
                <div class="tip-install"><span>{{detailItem.Status}}</span></div>
              </div>
            </div>
          </div>
        </div>
        <!-- s 好友助力列表 -->
        <!-- s 助力免费拿商品 -->
        <div class="content-shop">
          <div class="shop-title"><span>助力享免单</span></div>
          <div class="shop-list">
            <div class="list-item" v-for="(item, index) in inviteCommodityList" :key="index" @click="rightHelp">
              <div class="item-pic">
                <img v-lazy="item.Icon" alt="商品图片">
              </div>
              <div class="item-title">
                <p class="title-text">{{item.Title}}</p>
              </div>
              <div class="item-slod"><span>暂无简介</span></div>
              <div class="item-price">
                <div class="price-current">￥<span>{{item.Price}}</span></div>
                <div class="price-original">￥<span>{{item.MarketPrice}}</span></div>
              </div>
              <div class="item-badge">
                <div class="badge-content">
                  <div class="content-text">月销<span>{{item.SoldNum}}</span>件</div>
                  <div class="content-arrow"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- s 助力免费拿商品 -->
      </div>
      <!-- 上拉加载更多 -->
      <InfiniteScroll :infiniteStyle="infiniteStyle" :isShowLoad="isShowLoad" :loadTip="loadTip" :busy="busy" @LOADMORE_EVENT="loadMore"></InfiniteScroll>
    </main>
    <!-- s 微信登录注释输入注册 -->
    <transition name="fade">
      <RegisterComponent v-if="registerShow" @CLOSE_REGISTER_EVENT="closeRegister"></RegisterComponent>
    </transition>
    <!-- s 微信登录注释输入注册 -->
    <!-- s 老用户 -->
    <transition name="fade">
      <OldUserComponent v-if="oldUserShow" @RIGHT_HELP_EVENT="rightHelp" @CLOSE_OLD_USER_EVENT="closeOldUser"></OldUserComponent>
    </transition>
    <!-- e 老用户 -->
    <!-- s 打开浏览器 -->
    <transition name="fade">
      <OpenBrowser v-if="openBrowserShow" :inviteCommodityDetail="inviteCommodityDetail" :isShowTip="isShowTip" :isMineBrowserShow="isMineBrowserShow" @CLOSE_OPEN_BROWSER_EVENT="closeOpenBrowser"></OpenBrowser>
    </transition>
    <!-- e 打开浏览器 -->
    <iframe style="width: 0; height: 0;" :src="schemeUrl" ref="openFrame" frameborder="0"></iframe>
  </section>
  <!-- e 助力分享 -->
</template>

<script>
// 引入swiper
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
// 组件
import RegisterComponent from '@/components/register/register.vue'
import InfiniteScroll from '@/components/common/infinite-scroll/infinite-scroll.vue'
import OpenBrowser from '@/components/open-browser/open-browser.vue'
import OldUserComponent from '@/components/old-user/old-user.vue'
// class
import Register from '@/class/Register.class.js'
import SlideArr from '@/class/slide.class.js'
export default {
  name: 'ShareComponent',
  data () {
    return {
      taskNo: '', // 任务编号
      inviteCommodityDetail: {},
      inviteAllCusList: [], // 好友助力列表
      inviteCommodityList: [], // 助力免费拿商品列表
      inviteBtnName: '助好友一臂之力', // 助力按钮
      flagType: '', // 浏览器类型
      isShare: true, // 是否过期
      loseEfficacyUrlShow: false, // 链接失效
      isMine: false, // 是否是自己打开
      isMineBrowserShow: false, 
      openBrowserShow: false, // 打开浏览器
      isShowTip: false, // 新用户打开浏览器提示
      oldUserShow: false, // 打开老用户组件
      schemeUrl: '', // scheme链接
      slideArr: [], // 广告列表
      // IOS or Android
      isAndroid: false,
      isiOS: false,
      isOldUser: false, // 是否是老用户
      registerShow: false, // 显示注册
      session: '', // 缓存
      // 上拉加载
      pageIndex: 1,
      pageSize: 10,
      busy: false,
      loadTip: '加载中...',
      isShowLoad: false,
      infiniteStyle: {
        bgColor: '#FFF9EB',
        textColor: '#666'
      },
      // swiper
      swiperOption: {
        autoplay: {
          delay: 2000,
        },
        direction : 'vertical',
        loop: true,
        speed: 1000,
        notNextTick: true,
        centeredSlides: true,
        observer: true,
        observeParents: true,
      },
    }
  },
  components: {
    swiper,
    swiperSlide,
    RegisterComponent,
    InfiniteScroll,
    OpenBrowser,
    OldUserComponent
  },
  created () {
    this.checkPhoneType()
    this.isWxQq()
    // 判断链接是否有TaskNo
    if (window.TaskNo) {
      this.taskNo = window.TaskNo
    } else {
      alert('该链接已失效，请重新获取')
      this.loseEfficacyUrlShow = true
    }
    this.slideArr = this.shuffleArr(SlideArr)
    this.init()
    this.getData()
  },
  methods: {
    // 获取助力信息
    getData () {
      Register.send({
        url: 'GetInviteCustomerDetail',
        data: {
          taskNo: this.taskNo
          // taskNo: 'Inv20190601A000001_08'
        }
      }).success(data => {
        this.disposeData(data)
      }).fail((data) => {
        this.$toast({
          content: data
        })
      })
    },
    // 处理助力信息
    disposeData (data) {
      this.inviteCommodityDetail = data.Info
      this.inviteAllCusList = data.AllCusList
      /**
       * 微信登录版
        // 判断是否是自己打开链接 
        this.isMine = data.Info.CustomerId == window.CustomerId ? true : false
       */
      if (this.inviteCommodityDetail.Status >=3) this.inviteBtnName = '我也要免费拿'
      this.isPastDue()
    },
    init () {
      /*
       * 微信登录版
        // 本人打开
        if (this.isMine) {
          if (this.inviteCommodityDetail.Status >=3 || !this.isShare) {
            this.inviteBtnName = '继续免费拿'
          } else {
            this.inviteBtnName = '去邀请'
          }
          return
        }
        // 微信内打开
        if (this.flagType == 'WX' || this.flagType == 'QQ') {
          // 老用户打开显示弹框
          if (window.PhoneNo && window.CustomerId) {
            this.oldUserShow = true
            this.inviteBtnName = '我也要免费拿'
          }
        } else {
          // 浏览器打开
          // 老用户在浏览器中打开
          if (window.PhoneNo && window.CustomerId) {
            this.inviteBtnName = '我也要免费拿'
            // iOS用window.location.href唤起App
            if (this.isiOS) {
              window.location.href = 'dexmall://ahox:8080/invite_task'
              setTimeout(() => {
                location.href = 'https://h5.hefeidaixiaoer.com/Home/IosSuccess'
              }, 50)
              // setTimeout(() => { // 阻止跳转到下载页
              //   location.reload()
              // }, 500)
            }
            // Android用iframe唤起App
            if (this.isAndroid) {
              this.schemeUrl = 'dexmall://ahox:8080/invite_task'
              this.checkOpen()
              // setTimeout(() => {
              //   location.reload()
              // }, 2100)
            }
          }
        }
      */
      // 获取本地存储防止重复点击
      try {
        this.session = localStorage.getItem(window.TaskNo)
      } catch (e) {
        alert('您处于无痕浏览，无法为您保存')
      }
      if (this.session == this.taskNo || window.OldUser) {
        this.inviteBtnName = '我也要免费拿'
      }
      // 刷新地址时微信QQ内自动弹出遮罩层
      if (this.flagType == 'WX' || this.flagType == 'QQ') {
        if (window.OldUser) this.openBrowserShow = true
      }
    },
    // 助力商品列表上拉加载
    loadMore () {
      this.busy = true
      this.isShowLoad = true
      Register.send({
        url: 'GetOneRMBAndHotMallList',
        data: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      }).success(data => {
        if (data.HotMallList.Data.length === 0) {
          this.loadTip = '没有更多数据了'
          this.busy = true
          return
        }
        this.inviteCommodityList = this.inviteCommodityList.concat(data.HotMallList.Data)
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
    // 点击助力
    rightHelp () {
      if (this.loseEfficacyUrlShow) return
      // 微信内
      /*
       * 微信登录版
        if (this.flagType == 'WX' || this.flagType == 'QQ') {
          // 本人
          if (this.isMine) {
            if (this.inviteCommodityDetail.Status >=3 || !this.isShare) {
              this.isMineBrowserShow = false
            } else {
              this.isMineBrowserShow = true
            }
            this.openBrowserShow = true
            return
          }
          // 好友
          if (window.PhoneNo && window.CustomerId) {
            // 老用户让其在浏览器中打开
            this.openBrowserShow = true
          } else {
            // 新用户让其在浏览器中打开下载页或者跳转App
            this.isShowTip = true
            this.openBrowserShow = true
          }
        } else {
          // 外部浏览器
          if (this.isiOS) {
            window.location.href = 'dexmall://ahox:8080/invite_task'
            setTimeout(() => {
              location.href = 'https://h5.hefeidaixiaoer.com/Home/IosSuccess'
            }, 50)
            // setTimeout(() => {
            //   location.reload()
            // }, 500)
          }
          if (this.isAndroid) {
            this.schemeUrl = 'dexmall://ahox:8080/invite_task'
            this.checkOpen()
            // setTimeout(() => {
            //   location.reload()
            // }, 2100)
          }
        }
      */
      // 获取本地存储
      try {
        this.session = localStorage.getItem(window.TaskNo)
      } catch (e) {
        alert('您处于无痕浏览，无法为您保存')
      }
      // 老用户刷新地址加上参数
      if (this.session == this.taskNo) {
        window.location.href = window.location.href + '&old=isOldUser'
      }
      // 老用户跳转到下载
      if (window.OldUser || this.session == this.taskNo) {
        // 判断是否是微信QQ浏览器
        if (this.flagType == 'WX' || this.flagType == 'QQ') {
          // 微信QQ浏览器在手机浏览器中打开
          this.openBrowserShow = true
        } else {
          if (this.isiOS) {
            window.location.href = 'dexmall://ahox:8080/invite_task'
            setTimeout(() => {
              location.href = 'https://h5.hefeidaixiaoer.com/Home/IosSuccess'
            }, 50)
          }
          if (this.isAndroid) {
            this.schemeUrl = 'dexmall://ahox:8080/invite_task'
            this.checkOpen()
          }
        }
      } else {
        this.registerShow = true
      }
    },
    // 关闭注册组件 0.1
    closeRegister (isNew) {
      // 判断是老用户跳转到下载页面
      if (isNew && isNew == 'old') {
        this.inviteBtnName = '我也要免费拿'
      }
      this.registerShow = false
    },
    //检查app是否打开
    checkOpen () {
      let clickTime = +(new Date())
      //启动间隔20ms运行的定时器，并检测累计消耗时间是否超过3000ms，超过则结束
      let count = 0
      let intHandle = setInterval(() => {
        count++        
        let elsTime = +(new Date()) - clickTime
        if (count >= 100 || elsTime > 3000 ) {
          clearInterval(intHandle)
          this.check(elsTime)
        }
      }, 20)
    },
    check(elsTime) {
      // 2s后没有打开App或者没有安装App跳转到下载页面
      if ( elsTime > 2000 || document.hidden || document.webkitHidden) {
        window.location.href = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.ahox.dxemall'
      }
    },
    // 判断是否已过期
    isPastDue () {
      let endTime = this.inviteCommodityDetail.EndTime.replace(/-/g, '/')
      let currentTimeStap = (new Date()).getTime()
      let endTimeStap = (new Date(endTime)).getTime()
      if (currentTimeStap > endTimeStap) {
        this.isShare = false
        this.inviteBtnName = '我要免费拿'
      }
    },
    // 补零
    fillZero (time) {
      return time < 10 ? '0' + time : '' + time
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
        this.flagType = 'WX'
      } else if (ua.match('qq/') == 'qq/' && ua.match(/MQQBrowser/i) == 'mqqbrowser') {
        this.flagType = 'QQ'
      }
    },
    // 广告生成随机数组
    shuffleArr(arr) {
      for (let i = 1; i < arr.length; i++) {
        const random = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[random]] = [arr[random], arr[i]]
      }
      return arr
    },
    // 关闭老用户弹出组件
    closeOldUser () {
      this.oldUserShow = false
    },
    // 关闭打开浏览器
    closeOpenBrowser () {
      this.openBrowserShow =false
    },
  },
  computed: {
    swiper() {
      return this.$refs.mySlides.swiper
    }
  },
}

</script>

<style lang="scss" scoped>
  @import "./share.scss";
</style>
