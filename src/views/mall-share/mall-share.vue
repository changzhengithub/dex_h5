<template>
<!-- s 商品详情 -->
  <section class="index" ref="index" @scroll="scrollEvent">
    <!-- s 商品信息 -->
    <Product ref="product" v-if="bannerList.length != 0" :productBannerList="productBannerList" :commodityInfo="commodityInfo" @OPEN_MORE_EVENT="openMore"></Product>
    <Introduce :pictureDetailList="pictureDetailList" :suspensionShow="suspensionShow" :commodityInfo="commodityInfo" @SCROLL_SWIPER_EVENT="scrollSwiper"></Introduce>
    <!-- e 商品信息 -->
    <!-- s 人气好货 -->
    <div class="index-shop">
      <div class="shop-title">
        <div class="title-summary"><span>人气好货</span></div>
        <div class="title-tip"><span>畅销榜单&nbsp;&nbsp;达人最爱</span></div>
      </div>
      <div class="shop-list">
        <div class="list-item" v-for="(item, index) in commodityList" :key="index">
          <MallShop :commodity="item" @RIGHT_BUY_EVENT="rightBuy"></MallShop>
        </div>
        <!-- 上拉加载更多 -->
        <InfiniteScroll  :infiniteStyle="infiniteStyle" :isShowLoad="isShowLoad" :loadTip="loadTip" :busy="busy" @LOADMORE_EVENT="getHomeSubject"></InfiniteScroll>
      </div>
    </div>
    <!-- e 人气好货 -->
    <!-- s 立即购买 -->
    <div class="index-buy">
      <div class="buy-btn">
        <button class="btn" @click="rightBuy">立即购买</button>
      </div>
    </div>
    <!-- e 立即购买 -->
    <!-- s 打开浏览器弹框 -->
    <transition name="fade">
      <OpenBrowser v-if="openBrowserShow" @CLOSE_OPEN_BROWSER_EVENT="closeOpenBrowser"></OpenBrowser>
    </transition>
    <!-- e 打开浏览器弹框 -->
    <!-- s 更多 -->
    <Modal v-if="modalShow" @CLOSE_MODAL_EVENT="closeModal">
      <MallModal v-if="modalShow" :modalClassify="modalClassify" :Id="Id" @RIGHT_BUY_EVENT="rightBuy" @CLOSE_MODAL_EVENT="closeModal"></MallModal>
    </Modal>
    <!-- e 更多 -->
    <!-- s 打开App scheme -->
    <iframe class="index-frame" :src="schemeUrl" ref="openFrame" frameborder="0"></iframe>
    <!-- e 打开App scheme -->
  </section>
<!-- e 商品详情 -->
</template>

<script>
// 组件
import Product from '../../components/product/product.vue' // 产品简介
import Introduce from '../../components/introduce/introduce.vue' // 产品简介
import MallShop from '../../components/mall-shop/mall-shop.vue' // 人气好货列表
import InfiniteScroll from '@/components/common/infinite-scroll/infinite-scroll.vue' // 上拉无限加载
import Modal from '../../components/common/modal/modal.vue' 
import MallModal from '../../components/mall-modal/mall-modal.vue' // 更多
import OpenBrowser from '../../components/open-browser/open-browser.vue' // 打开浏览器
// class
import Register from '../../class/Register.class.js'
export default {
  name: 'MallShareComponent',
  data () {
    return {
      commodityInfo: {}, // 商品详情信息
      bannerList: [], // banner轮播图
      commodityList: [], // 人气好货列表
      productBannerList: [],
      pictureDetailList: [],
      modalClassify: '', // 打开更多分类
      Id: '', // 商品ID
      modalShow: false,
      suspensionShow: false,
      openBrowserShow: false,
      homeSubjectId: 17,
      schemeUrl: '', // 唤起App scheme链接
      // IOS or Android
      isAndroid: false,
      isiOS: false,
      // 上拉加载
      pageIndex: 1,
      pageSize: 10,
      busy: false,
      loadTip: '加载中...',
      isShowLoad: false,
      infiniteStyle: {
        bgColor: '#f0f0f0',
        textColor: '#999'
      }
    }
  },
  components: {
    Product,
    Introduce,
    MallShop,
    Modal,
    MallModal,
    OpenBrowser,
    InfiniteScroll
  },
  created () {
    this.Id = window.Id
    this.checkPhoneType()
    this.getData()
  },
  methods: {
    // 窗口滚动
    scrollEvent () {
      if (this.$refs.index.scrollTop >= this.$refs.product.$el.offsetHeight) {
        this.suspensionShow = true
      } else {
        this.suspensionShow = false
      }
    },
    // 获取商品详情
    getData () {
      Register.send({
        url: 'GetCommodityDetail',
        data: {
          id: this.Id,
          customerId: 0
        }
      }).success(data => {
        this.disposeData(data)
      }).fail((data) => {
        this.$toast({
          content: data
        })
      })
    },
    // 处理商品详情数据
    disposeData (data) {
      document.title = data.commodity.Title
      this.bannerList = data.imgs
      this.commodityInfo = data.commodity
      this.bannerList.forEach(element => {
        if (element.ArchiveType == 1) {
          this.productBannerList.push(element)
        } else {
          this.pictureDetailList.push(element)
        }
      })
    },
    // 获取人气好货数据
    getHomeSubject () {
      this.busy = true
      this.isShowLoad = true
      Register.send({
        url: 'GetHomeSubject',
        data: {
          Id: this.homeSubjectId,
          customerId: 0,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      }).success(data => {
        if (data.Commoditys.length === 0) {
          this.loadTip = '没有更多数据了'
          this.busy = true
          return
        }
        this.commodityList = this.commodityList.concat(data.Commoditys)
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
    // 立即购买
    rightBuy () {
      this.modalShow = false
      // 判断是否是微信QQ浏览器
      let flag = this.isWxQq()
      if (flag == 'WX' || flag == 'QQ') {
        // 微信QQ浏览器在手机浏览器中打开
        this.openBrowserShow = true
      } else {
        if (this.isiOS) {
          window.location.href = `dexmall://ahox:8080/commodity_detail?Id=${this.Id}`
          setTimeout(() => {
            location.href = 'https://h5.hefeidaixiaoer.com/Home/IosSuccess'
          }, 50)
          // setTimeout(() => {
          //   location.reload()
          // }, 1500)
        }
        if (this.isAndroid) {
          this.schemeUrl = `dexmall://ahox:8080/commodity_detail?Id=${this.Id}`
          this.checkOpen()
          // setTimeout(() => {
          //   location.reload()
          // }, 2100)
        }
      }
    },
    // android检查app是否打开
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
    // 跳转到下载页面
    check(elsTime) {
      // 2s后没有打开App或者没有安装App跳转到下载页面
      if ( elsTime > 2000 || document.hidden || document.webkitHidden) {
        window.location.href = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.ahox.dxemall'
      }
    },
    // 判断是安卓还是ios
    checkPhoneType () {
      let u = navigator.userAgent
      this.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
      this.isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    },
    // 轮播tab吸顶效果
    scrollSwiper () {
      if (this.$refs.index.scrollTop >= this.$refs.product.$el.offsetHeight) {
        this.$refs.index.scrollTop = this.$refs.product.$el.offsetHeight
      }
    },
    // 关闭打开浏览器
    closeOpenBrowser () {
      this.openBrowserShow =false
    },
    // 点击更多按钮
    openMore (classify) {
      this.modalClassify = classify
      this.modalShow = true
    },
    // 关闭更多
    closeModal () {
      this.modalShow = false
    },
    // 判断安卓是否是微信或者QQ
    isWxQq() {
      let ua = navigator.userAgent.toLowerCase()
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return 'WX'
      } else if (ua.match('qq/') == 'qq/' && ua.match(/MQQBrowser/i) == 'mqqbrowser') {
        return 'QQ'
      }
    }
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./mall-share.scss";
</style>