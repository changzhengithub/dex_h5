<template>
<!-- s 签到-签到成功 -->
  <section class="success" @touchmove="touchMove($event)">
    <!-- s 金币签到提示 -->
    <div class="success-gold" v-if="isShowComponent">
      <div class="gold-detail">
        <div class="detail-bg">
          <img src="../../assets/image/sign-gold.png">
        </div>
        <div class="detail-text">
          <p class="text-title">恭喜签到成功</p>
          <p class="text-tip">获得<span>{{checkCash}}</span>元红包&ensp;连续签到奖励越多哦~</p>
        </div>
      </div>
    </div>
    <!-- e 金币签到提示 -->
    <!-- s 领取红包提示 -->
    <div class="success-packet" v-if="!isShowComponent">
      <div class="packet-detail">
        <div class="detail-bg">
          <img src="../../assets/image/sign-toast.png">
        </div>
        <div class="detail-text">
          <div class="text-money"><span>￥</span><span>{{checkCash}}</span></div>
          <div class="text-tip">恭喜您！获得<span>{{checkCash}}</span>元红包</div>
          <div class="text-product">
            <LoanMarket :loanProduct="successProduct" @APPLY_REGISTER_EVENT="applyRegister"></LoanMarket>
          </div>
          <div class="text-btn">
            <button class="btn" @click="gotoApplyRegister">确认</button>
          </div>
        </div>
      </div>
    </div>
    <!-- e 领取红包提示 -->
    <div class="success-close" @click="closeComponent">
      <img src="../../assets/image/close.png" alt="返回">
    </div>
  </section>
<!-- e 签到-签到成功 -->
</template>

<script>
// 组件
import LoanMarket from '@/components/loan-market/loan-market.vue' // 贷超产品
// js
import Loan from '../../class/Loan.class.js'
export default {
  name: 'SuccessComponent',
  props: ['checkCash', 'isShowComponent', 'successProduct'],
  data () {
    return {
      loanProduct: {}
    }
  },
  components: {
    LoanMarket
  },
  created () {},
  methods: {
    gotoApplyRegister () {
      this.applyRegister(this.successProduct.productId)
    },
    applyRegister (productId) {
      Loan.send({
        url: 'productInfo',
        data:{
          pid: productId,
          userPhone: window.phone
        }
      }).success(data => {
        window.location.href = data.ProductUrl
      }).fail((data) => {
        if (data.code != 0) return
        this.$toast({
          content: data.message
        })
      })
    },
    touchMove (e) {
      e.preventDefault()
    },
    closeComponent () {
      this.$emit('CLOSE_SUCCESS_EVENT')
    }
  }
}

</script>

<style lang="scss" scoped>
  @import "./success.scss";
</style>
