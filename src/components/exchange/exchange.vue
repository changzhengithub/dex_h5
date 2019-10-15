<template>
<!-- s 兑换优惠券弹框 -->
  <section class="exchange" @touchmove="touchMove($event)">
    <div class="exchange-content">
      <div class="content-title"><span>确定要兑换该优惠券？</span></div>
      <div class="content-btn">
        <div class="btn-cancel">
          <button class="cancel" @click="cancel">暂不兑换</button>
        </div>
        <div class="btn-sure">
          <button class="sure" @click="sure">确认</button>
        </div>
      </div>
    </div>
  </section>
<!-- e 兑换优惠券弹框 -->
</template>

<script>
export default {
  name: 'ExchangeComponent',
  data () {
    return {}
  },
  methods: {
    sure () {
      this.$emit('SURE_EVENT_EVENT')
    },
    cancel () {
      this.$emit('CANCEL_EVENT_EVENT')
    },
    touchMove (e) {
      e.preventDefault()
    },
  }
}

</script>

<style lang="scss" scoped>
  @import "./exchange.scss";
</style>
