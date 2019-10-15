<template>
  <!-- s 商品详情-产品简介 -->
  <section class="product">
    <!-- s banner轮播 -->
    <div class="product-banner" >
      <swiper class="slide-swiper" :options="swiperOption" ref="mySwiper">
        <swiper-slide class="swiper-slide" v-for="(item, index) in productBannerList" :key="index">
          <img :src="item.ArchiveUri">
        </swiper-slide>
      </swiper>
      <div v-if="productBannerList.length != 1" class="swiper-pagination"  slot="pagination"></div>
    </div>
    <!-- e banner轮播 -->
    <!-- s 详情 -->
    <div class="product-content">
      <div class="content-bill">
        <div class="bill-amount">
          <p class="amount-current">
            <span>￥</span>
            <span>{{commodityInfo.Price}}</span>
          </p>
          <p class="amount-original">
            <span>￥</span>
            <span>{{commodityInfo.MarketPrice}}</span>
          </p>
          <div class="amount-return">
            <div class="return-title"><span>返</span></div>
            <div class="return-num">
              <span>￥</span>
              <span>{{commodityInfo.VipReturnCash}}</span>
            </div>
          </div>
        </div>
        <div class="bill-sale"><span>月销{{commodityInfo.SoldNum}}件</span></div>
      </div>
      <div class="content-guarantee">
        <div class="guarantee-item">
          <i class="iconfont iconxuanze"></i>
          <p class="item-text">正品保证</p>
        </div>
        <div class="guarantee-item">
          <i class="iconfont iconxuanze"></i>
          <p class="item-text">全场包邮</p>
        </div>
        <div class="guarantee-item">
          <i class="iconfont iconxuanze"></i>
          <p class="item-text">闪电发货</p>
        </div>
        <div class="guarantee-item">
          <i class="iconfont iconxuanze"></i>
          <p class="item-text">7天退换</p>
        </div>
      </div>
      <div class="content-detail">
        <div class="detail-badge">
          <div class="badge-left"><span>正品</span></div>
          <div class="badge-right"><span>自营</span></div>
        </div>
        <p class="detail-name">{{commodityInfo.Title}}</p>
        <p class="detail-sign">{{commodityInfo.Summary ? commodityInfo.Summary : '暂无简介'}}</p>
      </div>
      <div class="content-parameter">
        <div class="parameter-item">
          <div class="item-title">已选</div>
          <div class="item-value">
            <p class="value-text">请选择商品规格</p>
          </div>
          <div class="item-more" @click="openMore('parameter')">
            <i class="iconfont iconmore"></i>
          </div>
        </div>
        <!-- <div class="parameter-item">
          <div class="item-title">领券</div>
          <div class="item-value">
            <p class="value-text">满200减10元</p>
          </div>
          <div class="item-more">
            <i class="iconfont iconmore"></i>
          </div>
        </div> -->
        <div class="parameter-item">
          <div class="item-title">促销</div>
          <div class="item-value">
            <p class="value-text">暂无促销活动</p>
          </div>
          <!-- <div class="item-more">
            <i class="iconfont iconmore"></i>
          </div> -->
        </div>
        <div class="parameter-item">
          <div class="item-title">配送</div>
          <div class="item-value">
            <p class="value-text">先填写收货地址哦~</p>
            <!-- <p class="value-text">24:00前完成支付，预计8月28日送达</p> -->
          </div>
        </div>
        <div class="parameter-item">
          <div class="item-title">说明</div>
          <div class="item-value">
            <p class="value-text">包税丨假一赔十丨7无忧退货</p>
          </div>
          <div class="item-more" @click="openMore('explain')">
            <i class="iconfont iconmore"></i>
          </div>
        </div>
      </div>
    </div>
    <!-- s 详情 -->
  </section>
  <!-- e 商品详情-产品简介 -->
</template>

<script>
// 引入swiper
import './custom-swiper.scss'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'Product',
  props: ['productBannerList', 'commodityInfo'],
  data () {
    let that = this
    return {
      // swiper
      swiperOption: {
        loop: that.productBannerList.length != 1,
        notNextTick: true,
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          bulletClass: 'pagination-bullets',
          bulletActiveClass: 'pagination-bullet-active'
        },
        speed: 500,
        centeredSlides: true,
        slidesPerView: 'auto',
        observer: true,
        observeParents: true,
        on: {
          transitionEnd() {
            // that.slectIndex = this.activeIndex
          },
        }
      },
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  created () {
  //  this.$refs.mySwiper.pagination.$el.addClass('pagination-bullets')
  },
  methods: {
    openMore (classes) {
      this.$emit('OPEN_MORE_EVENT', classes)
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "./product.scss";
</style>
