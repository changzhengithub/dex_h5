<template>
<!-- s 助力分享-老用户弹框 -->
  <section class="old-user" @touchmove="touchMove($event)">
    <div class="user-content">
      <div class="content-title"><span>您已安装呆小二APP</span></div>
      <div class="content-tip"><span>无法免费助力</span></div>
      <div class="content-product">
        <div class="product-item" v-for="(item, index) in inviteCommodityList" :key="index">
          <div class="item-img">
            <img :src="item.Icon">
          </div>
          <div class="item-detail">
            <div class="detail-title"><p>{{item.Title}}</p></div>
            <div class="detail-info">
              <span class="info-price">￥0.00</span>
              <span class="info-market">￥{{item.Price}}</span>
              <span class="info-num">{{item.InviteNum}}人助力</span>
            </div>
          </div>
        </div>
      </div>
      <div class="content-take">
        <button class="take-btn" @click="rightHelp">我也要免费拿</button>
      </div>
      <div class="content-close"  @click="closeOldUser">
        <img src="../../assets/image/close.png" alt="关闭">
      </div>
    </div>
  </section>
<!-- e 助力分享-老用户弹框 -->
</template>

<script>
import Register from '../../class/Register.class.js'
export default {
  name: 'OldUsesrComponent',
  data () {
    return {
      inviteCommodityList: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    // 获取助力商品
    getData () {
      Register.send({
        url: 'GetInviteCommodityList',
        data: {
          pageIndex: 1,
          pageSize: 20
        }
      }).success(data => {
        this.inviteCommodityList = this.getRandomArrayElements(data.Data, 2)
      }).fail(data => {
        this.$toast({
          content: data
        })
      })
    },
    // 随机获取数组几个元素
    getRandomArrayElements (arr, count) {
      let shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index
      while (i-- > min) {
        index = Math.floor((i + 1) * Math.random())
        temp = shuffled[index]
        shuffled[index] = shuffled[i]
        shuffled[i] = temp
      }
      return shuffled.slice(min)
    },
    rightHelp () {
      this.$emit('RIGHT_HELP_EVENT')
    },
    closeOldUser () {
      this.$emit('CLOSE_OLD_USER_EVENT')
    },
    touchMove (e) {
      e.preventDefault()
    }
  }
}

</script>

<style lang="scss" scoped>
  @import "./old-user.scss";
</style>
