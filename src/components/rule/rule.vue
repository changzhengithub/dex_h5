<template>
<!-- s 助力规则 -->
  <section class="rule" @touchmove="touchMove($event)">
    <div class="rule-content" @touchmove="contentMove($event)">
      <div class="content-title"><span>助力免费拿</span></div>
      <div class="content-list">
        <div class="list-item">
          <div class="item-icon"><span>1</span></div>
          <div class="item-text">
            <p class="text">免费助力攻略：选择商品，点击免费拿；分享给未下载过呆小二的好友，好友点击下载呆小二；并登录达到人数要求，免费助力成功！</p>
          </div>
        </div>
        <div class="list-item">
          <div class="item-icon"><span>2</span></div>
          <div class="item-text">
            <p class="text">助力享免单是呆小二官方为消费者提供免费领取商品的福利，消费者在24小时内邀请好友助力成功即可免费获得商品，活动内不涉及任何支付行为，无需承担任何商品成本及邮寄费用</p>
          </div>
        </div>
        <div class="list-item">
          <div class="item-icon"><span>3</span></div>
          <div class="item-text">
            <p class="text">每个新用户可助力一次，同一设备，微信号视为同一用户；</p>
          </div>
        </div>
        <div class="list-item">
          <div class="item-icon"><span>4</span></div>
          <div class="item-text">
            <p class="text">若发现用户存在刷单、虚假用户助力等违规行为，平台有权判断助力失败；助力成功后我们将对订单进行审核，若发现异常助理行为，平台有权取消订单；</p>
          </div>
        </div>
        <div class="list-item">
          <div class="item-icon"><span>5</span></div>
          <div class="item-text">
            <p class="text">对物流、商品有疑问或者需要修改收货地址请联系商家客服处理。</p>
          </div>
        </div>
      </div>
      <div class="content-know">
        <button class="know-btn" @click="closeRule">我知道了</button>
      </div>
    </div>
  </section>
<!-- e 助力规则 -->
</template>

<script>
export default {
  name: 'TabComponent',
  props: ['path'],
  data () {
    return {}
  },
  methods: {
    closeRule () {
      this.$emit('CLOSE_RULE_EVENT')
    },
    contentMove (e) {
      e.stopPropagation()
    },
    // 阻止遮罩层影响下面滚动
    touchMove (e) {
      e.preventDefault()
    },
    gotoPage (page) {
      this.$router.push({
        name: page
      })
    }
  }
}

</script>

<style lang="scss" scoped>
  @import "./rule.scss";
</style>
