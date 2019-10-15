<template>
<!-- s 海报轮播图 -->
  <section class="slide">
    <swiper class="slide-swiper" :options="swiperOption" ref="mySwiper">
      <swiper-slide class="swiper-slide" v-for="(item, index) in QrCodeUrlList" :key="index">
        <img :src="item">
      </swiper-slide>
    </swiper>
    <div class="swiper-button-prev">
      <img src="../../assets/image/arrow-img02.png">
    </div>
    <div class="swiper-button-next">
      <img src="../../assets/image/arrow-img.png">
    </div>
  </section>
<!-- e 海报轮播图 -->
</template>

<script>
// 引入swiper
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'SlideComponent',
  props: ['QrCodeUrlList'],
  data () {
    const that = this
    return {
      slectIndex: 0,
      swiperOption: {
        notNextTick: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        speed: 500,
        centeredSlides: true,
        slidesPerView: 'auto',
        observer: true,
        observeParents: true,
        on: {
          transitionEnd() {
            that.slectIndex = this.activeIndex
            that.$emit('SEND_INDEX_EVENT', that.slectIndex)
          },
        }
      },
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  methods: {},
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  }
}

</script>

<style lang="scss" scoped>
  @import "./slide.scss";
</style>
