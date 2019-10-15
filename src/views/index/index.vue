<template>
<!-- s 助力商品列表 -->
  <section class="index">
    <!-- s 规则 -->
    <div class="index-rule" @click="openRule"><span>活动规则</span></div>
    <!-- e 规则 -->
    <main class="index-main">
      <div class="mian-content">
        <!-- s 背景图片 -->
        <div class="content-bg">
          <img src="../../assets/image/invite-bg.png" alt="背景">
        </div>
        <!-- e 背景图片 -->
        <!-- s summary组件 -->
        <Summary :summary="summary"></Summary>
        <!-- e summary组件 -->
        <!-- s 助力列表 -->
        <div class="content-panel">
          <div class="panel-item" v-for="(item) in inviteCommodityList" :key="item.Id">
            <div class="item-img">
              <img v-lazy="item.Icon" alt="商品图片">
            </div>
            <div class="item-detail">
              <div class="detail-title">
                <p class="title-text">{{item.Title}}</p>
              </div>
              <div class="detail-assistance">
                <p class="assistance-wait">需<span>{{item.InviteNum}}</span>人助力</p>
                <p class="assistance-yet"><span>{{item.ExchangedNum}}</span>人已拿</p>
              </div>
              <div class="detail-btm">
                <div class="btm-price">
                  <div class="price-current">
                    <span>￥</span>
                    <span>{{item.Price}}</span>
                  </div>
                </div>
                <div class="btm-button">
                  <button class="btn" @click="freeTake(item.Id)">免费拿</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- e 助力列表 -->
      </div>
      <!-- s 上拉加载更多 -->
      <InfiniteScroll  :infiniteStyle="infiniteStyle" :isShowLoad="isShowLoad" :loadTip="loadTip" :busy="busy" @LOADMORE_EVENT="loadMore"></InfiniteScroll>
      <!-- e 上拉加载更多 -->
    </main>
    <!-- s 规则 -->
    <transition name="fade">
      <Rule v-if="ruleShow" @CLOSE_RULE_EVENT="closeRule"></Rule>
    </transition>
    <!-- e 规则 -->
    <!-- s 地址选择 -->
    <SelectAddress v-if="selectAddressShow" :inviteCommodityId="inviteCommodityId" @CLOSE_SELECT_EVENT="closeSelect" @ADD_RECEIVE_ADDRESS_EVENT="addReceiveAddress" @SURE_SELECT_EVENT="sureSelect"></SelectAddress>
    <!-- e 地址选择 -->
    <!-- s 底部tab -->
    <TabComponent :path="$route.path"></TabComponent>
    <!-- e 底部tab -->
  </section>
<!-- e 助力商品列表 -->
</template>

<script>
// 引入组件
import TabComponent from '@/components/common/tab/tab.vue'
import Summary from '@/components/common/summary/summary.vue'
import Rule from '@/components/rule/rule.vue'
import InfiniteScroll from '@/components/common/infinite-scroll/infinite-scroll.vue'
import SelectAddress from '@/components/select-address/select-address.vue'
// 引入js
import Http from '@/class/Http.class.js'
import Register from '@/class/Register.class.js'
// import { mapMutations } from 'vuex'

export default {
  name: 'IndexComponent',
  data () {
    return {
      headerProps: {
        title: '助力免费拿',
        icon: '',
        path: 'index.html'
      },
      // summary组件数据
      summary: {
        title: '',
        imgSrcList: [{
            className: 'img-icon',
            imgSrc: require('../../assets/image/icon-share.png')
          },{
            className: 'img-add',
            imgSrc: require('../../assets/image/icon-add.png')
          },{
            className: 'img-icon',
            imgSrc: require('../../assets/image/icon-friend.png')
          },{
            className: 'img-add',
            imgSrc: require('../../assets/image/icon-add.png')
          },{
            className: 'img-icon',
            imgSrc: require('../../assets/image/icon-send.png')
          }],
        textList: ['①选择商品', '②好友助力', '③人满发货']
      },
      ruleShow: false,
      shareShow: false,
      selectAddressShow: false,
      inviteCommodityList: [],
      inviteCommodityId: null,
      // 是否在我的助力页显示分享组件
      openMineShare: false,
      // 上拉加载
      pageIndex: 1,
      pageSize: 10,
      busy: false,
      loadTip: '加载中...',
      isShowLoad: false,
      infiniteStyle: {
        bgColor: '#f64841',
        textColor: '#f2f2f2'
      }
    }
  },
  components: {
    Rule,
    Summary,
    SelectAddress,
    TabComponent,
    InfiniteScroll
  },
  created () {
    this.init()
  },
  methods: {
    // 传入原生标题文字
    init () {
      Http.sendTitleText('助力免费拿')
    },
    // 上拉加载
    loadMore () {
      this.busy = true
      this.isShowLoad = true
      Register.send({
        url: 'GetInviteCommodityList',
        data: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      }).success(data => {
        if (data.Data.length === 0) {
          this.loadTip = '没有更多数据了'
          this.busy = true
          return
        }
        this.inviteCommodityList = this.inviteCommodityList.concat(data.Data)
        this.pageIndex++
        // 给个定时防止操作频繁
        setTimeout(() => {
          this.busy = false
          this.isShowLoad = false
        }, 1000)
      }).fail(data => {
        this.busy = false
        this.isShowLoad = false
        this.$toast({
          content: data
        })
      })
    },
    // 点击免费拿
    freeTake (Id) {
      clearTimeout(initTimer)
      // 获取用户信息
      window.Init()
      let initTimer = setTimeout(() => {
        if (window.customerId && window.token) {
          this.inviteCommodityId = Id
          this.selectAddressShow = true
        } else {
          try {
            if (typeof (JsInterface) !== 'undefined') {
              JsInterface.RightLogin()
            } else {
              window.webkit.messageHandlers.RightLogin.postMessage('login')
            }
          } catch (error) {
            this.$toast({
              content: '登录失败'
            })
          }
        }
      }, 50)
    },
    
    // 关闭地址选择
    closeSelect () {
      this.selectAddressShow = false
    },
    // 点击添加地址
    addReceiveAddress () {
      this.selectAddressShow = false
      // 调用交互方法唤起添加地址页
      try {
        if (typeof (JsInterface) !== 'undefined') {
          JsInterface.AddReceiveAddress()
        } else {
          window.webkit.messageHandlers.AddReceiveAddress.postMessage('addReceiveAddress')
        }
      } catch (error) {
        this.$toast({
          content: error
        })
      }
    },
    // 选择地址后创建任务跳到我的免费拿列表页
    sureSelect () {
      this.selectAddressShow = false
      this.openMineShare = true
      this.$router.push({
        name: 'mine'
      })
    },
    // 打开规则
    openRule () {
      this.ruleShow = true
    },
    // 关闭规则 
    closeRule () {
      this.ruleShow = false
    },
    // ...mapMutations(['saveInviteCommodityId'])
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./index.scss";
</style>