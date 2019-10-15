<template>
<!-- s 海报 -->
  <section class="invite-poster">
    <!-- s 分享按钮 -->
    <div class="poster-share" @click="sharePoster">
      <img src="../../assets/image/poster-share.png" alt="分享">
    </div>
    <!-- e 分享按钮 -->

    <main class="poster-main">
      <div class="main-bg">
        <img src="../../assets/image/invitebg.png" alt="背景">
      </div>
      <div class="mian-content">
        <!-- s 海报轮播图 -->
        <div class="content-banner">
          <Slide v-if="JSON.stringify(QrCodeUrlList) != '{}'" :QrCodeUrlList="QrCodeUrlList" @SEND_INDEX_EVENT="acceptIndex"></Slide>
        </div>
        <!-- e 海报轮播图 -->
        <div class="content-save">
          <button class="save-btn" @click="longPressSaveImg">保存到相册</button>
        </div>
        <div class="content-tip">
          <span>保存海报引荐更多用户获得更多赏金</span>
        </div>
      </div>
    </main>
  </section>
<!-- s 海报 -->
</template>

<script>
// 组件
import Slide from '@/components/slide/slide.vue' // 海报轮播组件
// js
import Http from '@/class/Http.class.js'
import Register from '@/class/Register.class.js'
export default {
  name: 'InvitePosterComponent',
  data() {
    return {
      slectIndex: 0,
      customerId: 0,
      QrCodeUrlList: {},
    }
  },
  components: {
    Slide
  },
  created () {
    this.init()
    this.getData()
  },
  methods: {
    init () {
      Http.sendTitleText('海报')
    },
    // 获取海报图片列表
    getData () {
      window.customerId = null
      window.Init()
      setTimeout(() => {
        this.customerId = window.customerId ? window.customerId : 0
        // 获取图片地址
        Register.send({
          url: 'GetQrCode',
          data: {
            CustomerId: this.customerId
          }
        }).success(data => {
          this.QrCodeUrlList = data
        }).fail(data => {
          this.$toast({
            content: data
          })
        })
      }, 50)
    },
    acceptIndex (index) {
      this.slectIndex = index
    },
    // 分享海报图片
    sharePoster () {
      try {
        if (typeof (JsInterface) !== 'undefined') {
          JsInterface.SharePosterImg(this.QrCodeUrlList[`QrCodeUrl${this.slectIndex + 1}`])
        } else {
          window.webkit.messageHandlers.SharePosterImg.postMessage(this.QrCodeUrlList[`QrCodeUrl${this.slectIndex + 1}`])
        }
      } catch (error) {
        this.$toast({
          content: error
        })
      }
    },
    // 保存图片到本地，通过SavePosterImg方法向原生传递图片地址
    longPressSaveImg () {
      try {
        if (typeof (JsInterface) !== 'undefined') {
          JsInterface.SavePosterImg(this.QrCodeUrlList[`QrCodeUrl${this.slectIndex + 1}`])
        } else {
          window.webkit.messageHandlers.SavePosterImg.postMessage(this.QrCodeUrlList[`QrCodeUrl${this.slectIndex + 1}`])
        }
      } catch (error) {
        this.$toast({
          content: error
        })
      }
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./invite-poster.scss";
</style>