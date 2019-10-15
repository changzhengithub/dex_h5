<template>
<!-- s 优惠券 -->
  <section class="coupon">
    <div class="coupon-item" v-for="(item, index) in couponList" :key="index">
      <div class="item-bg">
        <img src="../../../assets/image/discount-bg.png">
      </div>
      <div class="item-money">
        <span>￥</span>
        <span>{{parseInt(item.Money)}}</span>
      </div>
      <div class="item-detail">
        <div class="detail-title">
          <!-- <p class="title-text">{{item.Title}}</p> -->
          <p class="title-text">全场无门槛商品优惠券</p>
        </div>
        <div class="detail-gold">
          <div class="gold-img">
            <img src="../../../assets/image/sign-icon.png">
          </div>
          <span>{{item.CheckinCoin}}金币</span>
        </div>
        <div class="detail-tip"><span>累计可兑{{item.TotalIssueNum}}张，{{item.PeriodTime}}天内有效</span></div>
        <div class="detail-btn">
          <button class="btn" :class="{active: item.IssuedNum == item.TotalIssueNum}" @click="rightExchange(item)">立即兑</button>
        </div>
      </div>
    </div>
  </section>
<!-- e 优惠券 -->
</template>

<script>
export default {
  name: 'CouponComponent',
  props: ['couponList'],
  data () {
    return {}
  },
  methods: {
    rightExchange (item) {
      this.$emit('RIGHT_EXCHANGE_EVENT', item)
    }
  }
}

</script>

<style lang="scss" scoped>
  @import "./coupon.scss";
</style>
