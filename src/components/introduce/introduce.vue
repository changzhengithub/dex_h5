<template>
  <!-- s 商品详情轮播 -->
  <section class="introduce">
    <!-- tab -->
    <div class="introduce-tabs" >
      <div class="tabs-content" :class="{active: suspensionShow}">
        <div class="content-list">
          <div class="list-item" :class="{active: slectIndex == index}" v-for="(item, index) in tabList" :key="index" @click="switchTab(index)"><span>{{item}}</span></div>
        </div>
      </div>
    </div>
    <!-- tab -->
    <!-- slide -->
    <div class="introduce-banner">
      <swiper class="slide-swiper" :options="swiperOption" ref="myTabs">
        <swiper-slide class="swiper-slide">
          <ul class="slide-picture">
            <li class="picture-item" v-for="(item, index) in pictureDetailList" :key="index">
              <img :src="item.ArchiveUri" alt="图文详情">
            </li>
          </ul>
        </swiper-slide>
        <swiper-slide class="swiper-slide">
          <div class="slide-parameter" v-html="parameterUrl"></div>
        </swiper-slide>
        <swiper-slide class="swiper-slide">
          <div class="slide-faq" v-html="faqUrl"></div>
        </swiper-slide>
      </swiper>
    </div>
    <!-- slide -->
  </section>
  <!-- e 商品详情轮播 -->
</template>

<script>
// 引入swiper
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import axios from 'axios'
export default {
  name: 'IntroduceComponent',
  props: ['pictureDetailList', 'commodityInfo', 'suspensionShow'],
  data () {
    let that = this
    return {
      slectIndex: 0,
      tabList: ['图文详情', '商品参数', '常见问题'],
      parameterUrl: '',
      faqUrl: '',
      // swiper
      swiperOption: {
        loop: false,
        speed: 500,
        notNextTick: true,
        pagination: {
          el: '.swiper-pagination',
        },
        autoHeight: true,
        centeredSlides: true,
        observer: true,
        observeParents: true,
        on: {
          slideChangeTransitionStart () {
            that.slectIndex = this.realIndex
          }
        }
      },
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  created () {
    this.getFaq()
  },
  methods: {
    // 切换tab
    switchTab (index) {
      this.slectIndex = index
      this.$refs.myTabs.swiper.slideToLoop(index, 1000, false)
      this.$emit('SCROLL_SWIPER_EVENT')
    },
    // 获取常见问题HTML
    getFaq () {
      axios.get(`${window.api}/Mall/FAQ`).then(response => {
        this.faqUrl = response.data
      }).catch(err => {
        this.$toast({
          content: err
        })
      })
    },
    // 获取参数HTML
    getParameter (commodityInfo) {
      axios.get(`${window.api}/Mall/CommodityParams?id=${commodityInfo.Id}`).then(response => {
        this.parameterUrl = response.data
      }).catch(err => {
        this.$toast({
          content: err
        })
      })
    }
  },
  computed: {
    swiper() {
      return this.$refs.myTabs.swiper
    }
  },
  watch: {
    commodityInfo (newVal) {
      this.getParameter(newVal)
    }
  },
}
</script>

<style lang="scss" scoped>
  @import "./introduce.scss";
</style>
