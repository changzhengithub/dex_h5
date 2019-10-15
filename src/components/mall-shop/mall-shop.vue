<template>
<!-- s 商品详情人气好货 -->
  <section class="mall-shop" @click="rightBuy">
    <div class="item-pic">
      <img v-lazy="commodity.CommodityIcon" alt="商品图片">
    </div>
    <div class="item-title">
      <p class="title-text">{{commodity.Title}}</p>
    </div>
    <div class="item-sale">
      <div class="sale-return">
        <div class="return-title"><span>返</span></div>
        <div class="return-num">
          <span>￥</span>
          <span>{{commodity.VipReturnCash}}</span>
        </div>
      </div>
      <div class="sale-num"><span>月销{{commodity.CategoryNo}}件</span></div>
    </div>
    <div class="item-price">
      <div class="price-current"><span>￥</span><span>{{commodity.Price}}</span></div>
      <!-- <div class="detail-original"><span>￥</span><span>{{commodity.Price}}</span></div> -->
    </div>
  </section>
<!-- e 商品详情人气好货 -->
</template>

<script>
export default {
  name: 'MallShopComponent',
  props: ['commodity'],
  data () {
    return {}
  },
  components: {
  },
  created () {
  },
  methods: {
    rightBuy () {
      this.$emit('RIGHT_BUY_EVENT')
    }
  }
}

</script>

<style lang="scss" scoped>
  @import "./mall-shop.scss";
</style>
