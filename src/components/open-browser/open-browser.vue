<template>
<!-- s 助力分享-打开浏览器 -->
  <section class="open-browser" @touchmove="touchMove($event)" @click="closeOpenBrowser">
    <div class="browser-img" v-if="!isMineBrowserShow">
      <img src="../../assets/image/open-browser.png" alt="在浏览器中打开">
    </div>
    <!-- s 新用户下载提示 -->
    <div class="browser-new" v-if="isShowTip && !isMineBrowserShow">
      <div class="new-logo">
        <img src="../../assets/image/logo.png" alt="logo">
      </div>
      <div class="new-tip"><span>下载呆小二APP</span></div>
      <div class="new-tip"><span>登录帮好友助力</span></div>
    </div>
    <!-- e 新用户下载提示 -->
    <!-- s 自己打开提示 -->
    <div class="browser-mine" v-if="isMineBrowserShow">
      <div class="mine-img">
        <img src="../../assets/image/browser-arrow.png" alt="右上角打开">
      </div>
      <div class="mine-tip">
        <div class="tip-line">再邀请<span>{{inviteCommodityDetail.LeftInviteNum}}个</span>App新用户</div>
        <div class="tip-line">即可免费领取 点击<span>右上角</span>继续分享</div>
      </div>
    </div>
    <!-- e 自己打开提示 -->
  </section>
<!-- e 助力分享-打开浏览器 -->
</template>

<script>
export default {
  name: 'OpenBrowserComponent',
  props: ['isShowTip', 'isMineBrowserShow', 'inviteCommodityDetail'],
  data () {
    return {}
  },
  methods: {
    closeOpenBrowser () {
      this.$emit('CLOSE_OPEN_BROWSER_EVENT')
    },
    touchMove (e) {
      e.preventDefault()
    },
  }
}

</script>

<style lang="scss" scoped>
  @import "./open-browser.scss";
</style>
