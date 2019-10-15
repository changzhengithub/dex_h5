<template>
  <!-- 下载页面 -->
  <section class="download">
    <header class="download-title">
      <div class="title-img">
        <img src="../../assets/image/title.png" alt="呆小二尊享会员,海量特权尊享 精彩升级不断">
      </div>
      <div class="title-decorate">
        <img src="../../assets/image/title01.png">
      </div>
    </header>
    <main class="download-main">
      <div class="main-bg">
        <img src="../../assets/image/panel.png" alt="bg">
      </div>
      <div class="main-panel">
        <div class="panel-logo">
          <img src="../../assets/image/logo.png" alt="logo">
        </div>
        <div class="panel-title">
          <img src="../../assets/image/panel-title.png" alt="已有600万+人体验了以下特权">
        </div>
        <div class="panel-list">
          <div class="list-item">
            <img class="item-icon" src="../../assets/image/item01.png" alt="高额分期">
            <p class="item-title">呆小二借款</p>
            <p class="item-tip">高额分期</p>
          </div>
          <div class="list-item">
            <img class="item-icon" src="../../assets/image/item02.png" alt="高额分期">
            <p class="item-title">推广赚工资</p>
            <p class="item-tip">月入过万</p>
          </div>
          <div class="list-item">
            <img class="item-icon" src="../../assets/image/item03.png" alt="高额分期">
            <p class="item-title">商品免息</p>
            <p class="item-tip">最高12期</p>
          </div>
          <div class="list-item">
            <img class="item-icon" src="../../assets/image/item04.png" alt="高额分期">
            <p class="item-title">特价9折起</p>
            <p class="item-tip">专享优惠</p>
            <div class="item-badge">
              <img src="../../assets/image/hot.png" alt="">
            </div>
          </div>
          <div class="list-item">
            <img class="item-icon" src="../../assets/image/item05.png" alt="高额分期">
            <p class="item-title">新品优先购</p>
            <p class="item-tip">专享商品</p>
          </div>
          <div class="list-item">
            <img class="item-icon" src="../../assets/image/item06.png" alt="高额分期">
            <p class="item-title">话费打折</p>
            <p class="item-tip">每月8折</p>
          </div>
          <div class="list-item">
            <img class="item-icon" src="../../assets/image/item07.png" alt="高额分期">
            <p class="item-title">视频会员券</p>
            <p class="item-tip">爱奇艺会员</p>
          </div>
          <div class="list-item">
            <img class="item-icon" src="../../assets/image/item08.png" alt="高额分期">
            <p class="item-title">购物返现</p>
            <p class="item-tip">多买多得</p>
          </div>
        </div>
      </div>
    </main>
    <!-- s 下载 -->
    <footer class="download-footer">
      <div class="footer-bg">
        <img src="../../assets/image/foot.png" alt="下载">
      </div>
      <div class="footer-btn">
        <div class="btn-item" v-if="isiOS" @click="iosLink">
          <img src="../../assets/image/iphone.png" alt="IOS下载">
        </div>
        <div class="btn-item" v-if="isAndroid" @click="androidLink">
          <img src="../../assets/image/android.png" alt="Android下载">
        </div>
      </div>
    </footer>
    <!-- e 下载 -->
  </section>
</template>

<script>
export default {
  name: 'DownloadPageComponent',
  data () {
    return {
      isAndroid: false,
      isiOS: false
    }
  },
  components: {
  },
  created () {
    this.checkPhoneType()
  },
  methods: {
    // 判断是安卓还是ios
    checkPhoneType () {
      let u = navigator.userAgent
      this.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
      this.isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    },
    iosLink () {
      window.location.href = 'https://h5.hefeidaixiaoer.com/Home/IosSuccess'
    },
    androidLink () {
      // 判断是否是微信QQ浏览器
      let flag = this.isWxQq()
      if (flag == 'WX' || flag == 'QQ') {
        // 微信中点击下载无反应
        window.location.href = 'https://h5.hefeidaixiaoer.com/Home/DownLoad'
      } else {
        window.location.href = 'http://www.hefeidaixiaoer.com/doc/dxe0507.apk'
      }
    },
    isWxQq() {
      var ua = navigator.userAgent.toLowerCase()
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
          return 'WX'
      } else if (ua.match('qq/') == 'qq/' && ua.match(/MQQBrowser/i) == 'mqqbrowser') {
          return 'QQ'
      }
    },
  }
}

</script>

<style lang="scss" scoped>
  @import "./download-page.scss";
</style>
