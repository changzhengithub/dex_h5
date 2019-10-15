<template>
<!-- s 好友邀请 -->
  <section class="invite">
    <main class="invite-main">
      <div class="mian-content">
        <!-- s 背景 -->
        <div class="content-bg">
          <img src="../../assets/image/invite-title.png" alt="背景">
        </div>
        <!-- e 背景 -->
        <!-- s 主要内容 -->
        <div class="content-composing">
          <div class="composing-transmit" @click="gotoPage('invite-poster')">
            <img src="../../assets/image/transmit.png">
          </div>
          <!-- s 活动规则 -->
          <div class="composing-activity">
            <div class="activity-title">
              <img src="../../assets/image/activity-title.png">
              <span>活动规则</span>
            </div>
            <div class="activity-rule">
              <div class="rule-graphical">
                <div class="graphical-start">
                  <img src="../../assets/image/invite-start.png">
                </div>
                <div class="graphical-send">
                  <img src="../../assets/image/invite-send.png">
                </div>
                <div class="graphical-end">
                  <img src="../../assets/image/invite-end.png">
                </div>
              </div>
              <div class="rule-text">
                <p class="text"><span>A邀请B 注册，B成功开通会员或购物满100元</span></p>
                <p class="text red-color"><span>则A获得20元返现</span></p>
                <p class="text"><span>B邀请C注册，C成功开通会员或购物满100元</span></p>
                <p class="text red-color"><span>则A获得2元返现，B获得20元返现</span></p>
                <p class="text"><span class="gray-color">活动开始时间：</span><span>2019年06月5日起</span></p>
                <p class="text"><span class="gray-color">活动结束时间：</span><span>2019年12月5日起</span></p>
              </div>
            </div>
          </div>
          <!-- e 活动规则 -->
          <!-- s 排行榜 -->
          <div class="composing-rank">
            <div class="rank-title">
              <img src="../../assets/image/activity-title.png">
              <span>邀请排行榜</span>
            </div>
            <div class="rank-content">
              <ul class="content-list">
                <li class="list-title">
                  <div class="title-item"><span>名次</span></div>
                  <div class="title-item"><span>用户</span></div>
                  <div class="title-item"><span>累计奖励(元)</span></div>
                </li>
                <li class="list-item" v-for="(item, index) in vipCashList" :key="index">
                  <div class="item item-ranking">
                    <span v-if="index > 2">{{index}}</span>
                    <img v-if="index == 0" src="../../assets/image/invite-first.png" alt="第一名">
                    <img v-if="index == 1" src="../../assets/image/invite-second.png" alt="第二名">
                    <img v-if="index == 2" src="../../assets/image/invite-third.png" alt="第三名">
                  </div>
                  <div class="item item-phone"><span>{{item.PhoneNo}}</span></div>
                  <div class="item item-money"><span>{{item.CashAmount}}</span></div>
                </li>
              </ul>
            </div>
          </div>
          <!-- e 排行榜 -->
        </div>
        <!-- e 主要内容 -->
      </div>
    </main>
    <!-- s 底部按钮 -->
    <div class="invite-share" @click="gotoPage('invite-poster')">
      <img src="../../assets/image/invite-share.png" alt="邀请好友赚赏金">
    </div>
    <!-- e 底部按钮 -->
  </section>
<!-- e 好友邀请 -->
</template>

<script>
// class
import Http from '@/class/Http.class.js'
import Register from '@/class/Register.class.js'
export default {
  name: 'InviteComponent',
  data() {
    return {
      vipCashList: [], // 返现排行榜
      pageSize: 40,
    }
  },
  components: {
  },
  created () {
    this.init()
    this.getData()
  },
  methods: {
    // 标题
    init () {
      Http.sendTitleText('邀请好友')
    },
    // 获取返现排行榜
    getData () {
      Register.send({
        url: 'GetTopCusVipCash',
        data: {
          PageSize: this.pageSize
        }
      }).success(data => {
        this.vipCashList = data.vipCashList
      }).fail(data => {
        this.$toast({
          content: data
        })
      })
    },
    // 跳转页面
    gotoPage (page) {
      this.$router.push({
        name: page
      })
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
@import './invite.scss';
</style>