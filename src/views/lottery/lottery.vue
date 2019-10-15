<template>
  <!-- s 抽奖 -->
  <section class="lottery">
    <header class="lottery-header">
      <div class="header-img">
        <img src="../../assets/image/lottery-title.png" alt="title">
      </div>
      <div class="header-swiper">
        <swiper class="swiper-slide swiper-no-swiping" :options="swiperOption" ref="mySlides">
          <swiper-slide class="slide-item" v-for="(item, index) in slideArr" :key="index">
            <div class="item-text"><span>{{item.slideName}}免费拿到心仪商品</span></div>
          </swiper-slide>
        </swiper>
      </div>
    </header>
    <main class="lottery-main">
      <div class="mian-disk">
        <div class="disk-bg">
          <img src="../../assets/image/lottery-bg.png" alt="bg">
        </div>
        <div class="disk-panel">
          <div class="panel-rotate" :style="{transition: rotate_transition, transform: rotateAngle}">
            <img src="../../assets/image/disk.png" alt="disk">
          </div>
        </div>
        <div class="disk-pointer" @click="startLottery">
          <img src="../../assets/image/lottery-pointer.png" alt="pointer">
        </div>
      </div>
      <div class="main-tip"><span>每次抽奖消耗10金币 剩余金币500</span></div>
      <div class="main-shade"></div>
      <div class="main-gold">
        <div class="gold-title"><span>金币任务</span></div>
        <ul class="gold-list">
          <li class="list-item">
            <div class="item-detail">
              <p class="detail-text">分享领取</p>
              <p class="detail-tip">每日首次分享活动即可领取500金币</p>
            </div>
            <div class="item-submit">
              <span>去分享</span>
            </div>
          </li>
          <li class="list-item">
            <div class="item-detail">
              <p class="detail-text">限时领取</p>
              <p class="detail-tip">每日8:00-11:00,12:00-14:00,18:00-21:00</p>
            </div>
            <div class="item-submit">
              <span>未到时间</span>
            </div>
          </li>
          <li class="list-item">
            <div class="item-detail">
              <p class="detail-text">申请借款领金币</p>
              <p class="detail-tip">申请借款即可领取10000金币</p>
            </div>
            <div class="item-submit">
              <span>申请借款</span>
            </div>
          </li>
        </ul>
      </div>
    </main>
    <transition name="fade">
      <LotteryToast v-if="taostShow" :goldAmount="goldAmount" @CLOSE_TOAST_EVENT="closeToast"></LotteryToast>
    </transition>
  </section>
  <!-- e 抽奖 -->
</template>

<script>
// 引入swiper
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
// class
import SlideArr from '@/class/slide.class.js'
import Http from '@/class/Http.class.js'
import Loan from '@/class/Loan.class.js'
import LotteryToast from '@/components/lottery-toast/lottery-toast.vue'
export default {
  name: 'LotteryComponent',
  data() {
    return {
      isAllowClick: true, //是否能够点击
      cat: 45, //总共8个扇形区域，每个区域约45度
      startAngle: 0, //初始旋转角度
      rotateAngle: 0, //将要旋转的角度
      surplusAngle: 0, // 旋转过后剩余的角度
      rotate: 0, //实际偏移角度
      rotate_transition: 'transform 3s cubic-bezier(.78, .73, 0, 1.04)',
      rotateOrigin: 'center center',
      slideArr: [], // 广告列表
      taostShow: false,
      goldAmount: 0,
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
    LotteryToast
  },
  created () {
    this.slideArr = this.shuffleArr(SlideArr)
    this.init()
    this.getData()
  },
  mounted () {},
  methods: {
    // 
    getData () {
      Loan.send({
        url: 'drawCount',
        data: {
          customerId: '10000',
          userPhoen: '15345510825'
        }
      }).success(data => {
        console.log(data)
      }).fail(data => {
        console.log(data)
      })
    },
    startLottery() {
      this.lotteryRequest()
    },
    lotteryRequest() {
      Loan.send({
        url: 'luckDraw',
        data: {
          customerId: '10000',
          userPhone: '15345510825'
        }
      }).success(data => {
        console.log(data)
        this.rotating(data)
      }).fail(data => {
        console.log(data)
      })
    },
    rotating(data) {
      if (!this.isAllowClick) return
      this.isAllowClick = false
      console.log(data.id)
      let defaultRound = 5 //默认多旋转5圈
      let randaomArr = [22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5];
      let randomDeg = randaomArr[data.id - 1] //获取旋转度数
      let deg = this.startAngle + defaultRound * 360 + randomDeg - this.startAngle % 360//将要旋转的度数
      this.startAngle = deg //下一次旋转的开始度数
      this.rotateAngle = `rotate(${deg}deg)`	
      this.rotate = deg % 360 //实际偏移的度数
      setTimeout(() => {
        this.isAllowClick = true
        if (this.rotate <= this.cat * 1) {
          this.goldAmount = 100
        } else if (this.rotate <= this.cat * 2) {
          this.goldAmount = 200
        } else if (this.rotate <= this.cat * 3) {
          this.goldAmount = 300
        } else if (this.rotate <= this.cat * 4) {
          this.goldAmount = 400
        } else if (this.rotate <= this.cat * 5) {
          this.goldAmount = 500
        } else if (this.rotate <= this.cat * 6) {
          this.goldAmount = 600
        } else if (this.rotate <= this.cat * 7) {
          this.goldAmount = 700
        } else if (this.rotate <= this.cat * 8) {
          this.goldAmount = 800
        }
        // this.taostShow = true
      }, 3500)
    },
    // 标题
    init () {
      Http.sendTitleText('幸运大抽奖')
    },
    // 判断是否登录
    judgeLogin () {
    },
    // 处理签到信息
    disposeData() {
     
    },
    closeToast () {
      this.taostShow = false
    },
    // 广告生成随机数组
    shuffleArr(arr) {
      for (let i = 1; i < arr.length; i++) {
        const random = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[random]] = [arr[random], arr[i]]
      }
      return arr
    },
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./lottery.scss";
</style>