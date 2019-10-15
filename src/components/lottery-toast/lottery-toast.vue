<template>
<!-- s 抽奖弹框 -->
  <section class="lottery-toast" @touchmove="touchMove($event)">
    <div class="toast-content">
      <div class="content-detail">
        <div class="detail-bg">
          <img src="../../assets/image/lottery-toast.png">
        </div>
        <div class="detail-text"><span>恭喜你&nbsp;成功抽到{{goldAmount}}金币</span></div>
        <div class="detail-submit">
          <span>去查看</span>
          <img src="../../assets/image/lotter-submit.png">
        </div>
        <div class="detail-close" @click="closeComponent">
          <img src="../../assets/image/lottery-close.png" alt="返回">
        </div>
      </div>
    </div>
  </section>
<!-- e 抽奖弹框 -->
</template>

<script>
export default {
  name: 'LotteryToastComponent',
  props: ['goldAmount'],
  data () {
    return {
      loanProduct: {}
    }
  },
  components: {
  },
  created () {},
  methods: {
    touchMove (e) {
      e.preventDefault()
    },
    closeComponent () {
      this.$emit('CLOSE_TOAST_EVENT')
    }
  }
}

</script>

<style lang="scss" scoped>
  @import "./lottery-toast.scss";
</style>
