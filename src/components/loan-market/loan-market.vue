<template>
<!-- s 签到-精品推荐 -->
  <section class="loan-market" @click.stop="applyRegister(loanProduct.productId)">
    <div class="market-detail">
      <div class="detail-logo">
        <img :src="loanProduct.ProductLogo" alt="logo">
      </div>
      <div class="detail-title">
        <div class="title-text"><span>{{loanProduct.ProductName}}</span></div>
        <div class="title-amount"><span>最高：</span><span>{{loanProduct.MaxLimit}}</span></div>
      </div>
    </div>
    <div class="market-tip"><span>{{loanProduct.ProductMark}}</span></div>
  </section>
<!-- e 签到-精品推荐 -->
</template>

<script>
export default {
  name: 'LoanMarketComponent',
  props: ['loanProduct'],
  data () {
    return {}
  },
  methods: {
    applyRegister (productId) {
      this.$emit('APPLY_REGISTER_EVENT', productId)
    }
  }
}

</script>

<style lang="scss" scoped>
  @import "./loan-market.scss";
</style>
