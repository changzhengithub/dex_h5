<template>
<!-- s 助力-分享弹框 -->
  <section class="share">
    <div class="share-center">
      <div class="center-title">
        <p class="title-text">再邀<span>{{shareItem.LeftInviteNum}}</span>位好友即可免费领取</p>
      </div>
      <div class="center-count">
        <span>剩余</span>
        <div class="count-down">
          <div class="down-item"><span>{{countDownHour}}</span></div>
          <span>:</span>
          <div class="down-item"><span>{{countDownMiunte}}</span></div>
          <span>:</span>
          <div class="down-item"><span>{{countDownSecound}}</span></div>
        </div>
      </div>
    </div>
    <div class="share-content">
      <div class="content-title">
        <span>分享到</span>
        <div class="title-close" @click="closeShare">
          <i class="iconfont iconclose"></i>
        </div>
      </div>
      <div class="content-list">
        <div class="list-item" @click="weChatShare">
          <div class="item-icon">
            <i class="iconfont iconweixin-copy"></i>
          </div>
          <p class="item-text">微信</p>
        </div>
        <div class="list-item" @click="MomentShare">
          <div class="item-icon">
            <i class="iconfont iconpengyouquan"></i>
          </div>
          <p class="item-text">朋友圈</p>
        </div>
      </div>
    </div>
  </section>
<!-- e 助力-分享弹框 -->
</template>

<script>
export default {
  name: 'ShareComponent',
  props: ['shareItem'],
  data () {
    return {
      ticker: null,
      // 倒计时
      countDownHour: '00',
      countDownMiunte: '00',
      countDownSecound: '00',
      phraseArr: [
        '求求你帮我点一下好吗？马上就要结束了，很着急。。。。。',
        '求求你帮个忙吧~我只差一个人就可以成功了！',
        '帮我一下嘛，我真的很想要，爱你哟',
        '亲爱的，帮我点一下，免费商品有机会可以拿~爱你',
        '帮我一下嘛，我真的很想要，你最好啦！',
        '就差你了！你帮我一下我就能免费拿这个宝贝了~',
        '冲鸭，帮我点一下，千万商品免费拿！',
        '老王都帮我了，就差你了！',
        '赶紧来吧，千万产品免费拿！',
        '帮我点一下，你也可以随便拿哦，保证不要钱！',
        '嗨，快点一下，不要错过这个千载难逢的机会~'
      ]
    }
  },
  created () {
    // 启用倒计时
    this.countDown()
    this.timeCycle()
  },
  methods: {
    // 微信好友分享
    weChatShare () {
      let shareJson = {
        type: 1, // 微信好友分享
        TaskNo: this.shareItem.TaskNo,
        // SourceId: window.customerId,
        Icon: this.shareItem.Icon,
        Title: this.phraseArr[Math.floor(Math.random() * this.phraseArr.length)],
        Summary: this.shareItem.Title
      }
      // 继续分享
      try {
        if (typeof (JsInterface) !== 'undefined') {
          JsInterface.popShare(JSON.stringify(shareJson))
        } else {
          window.webkit.messageHandlers.popShare.postMessage(JSON.stringify(shareJson))
        }
        this.$emit('CLOSE_SHARE_EVENT')
      } catch (error) {
        this.$toast({
          content: '分享失败'
        })
      }
    },
    // 微信朋友圈分享
    MomentShare () {
      let shareJson = {
        type: 2, // 微信朋友圈分享
        TaskNo: this.shareItem.TaskNo,
        // SourceId: window.customerId,
        Icon: this.shareItem.Icon,
        Title: this.phraseArr[Math.floor(Math.random() * this.phraseArr.length)],
        Summary: this.shareItem.Title
      }
      // 分享
      try {
        if (typeof (JsInterface) !== 'undefined') {
          JsInterface.popShare(JSON.stringify(shareJson))
        } else {
          window.webkit.messageHandlers.popShare.postMessage(JSON.stringify(shareJson))
        }
        this.$emit('CLOSE_SHARE_EVENT')
      } catch (error) {
        this.$toast({
          content: '分享失败'
        })
      }
    },
    // 关闭分享
    closeShare () {
      this.$emit('CLOSE_SHARE_EVENT')
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
      var endTime = this.shareItem.EndTime.replace(/-/g, '/')
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
    }
  }
}

</script>

<style lang="scss" scoped>
  @import "./share.scss";
</style>
