<template>
  <!-- s 地址管理 -->
  <transition name="fade">
    <section class="select-address"  v-show="addressAnimateShow" @touchmove="touchMove($event)">
      <transition name="btmfade">
        <div class="address-content" v-show="addressBtmFadeShow" @touchmove="touchMoveStop($event)">
          <div class="content-title">
            <span>配送至</span>
            <div class="title-close" @click="closeSelecet">
              <i class="iconfont iconclose"></i>
            </div>
          </div>
          <div class="content-list">
            <div class="list-item" v-for="(item, index) in postAddressList" :key="index" @click="selectAddress(index)">
              <div class="item-detail">
                <div class="detial-info">
                  <span>{{item.ReseverName}}</span>
                  <span>{{item.PhoneNo}}</span>
                </div>
                <p class="detial-address">{{item.Address}}</p>
              </div>
              <div class="item-select">
                <i class="iconfont icongouxuan" :class="{active: selectIndex == index || item.IsDefault}"></i>
              </div>
            </div>
          </div>
          <div class="content-tip" v-if="postAddressList.length == 0" @click="addReceiveAddress"><span>+请先添加收货地址</span></div>
          <div class="content-btn">
            <button class="btn" @click="sureSelect">确认</button>
          </div>
        </div>
      </transition>
    </section>
  </transition>
  <!-- e 地址管理 -->
</template>

<script>
import Http from '../../class/Http.class.js'
import { mapMutations } from 'vuex'
export default {
  name: 'SelectAddress',
  props: ['inviteCommodityId'],
  data () {
    return {
      addressAnimateShow: false,
      addressBtmFadeShow: false,
      selectIndex: null,
      postAddressList: []
    }
  },
  components: {
  },
  created () {
    this.getData()
  },
  methods: {
    // 获取地址列表
    getData () {
      Http.send({
        url: 'GetPostAddress',
        data: {
          customerId: window.customerId
        }
      }).success(data => {
        this.postAddressList = data
        this.addressAnimateShow = true
        this.addressBtmFadeShow = true
      }).fail((data) => {
        this.$toast({
          content: data
        })
      })
    },
    // 选择地址
    selectAddress (index) {
      this.postAddressList.forEach(item => {
        item.IsDefault = false
      })
      this.selectIndex = index
    },
    // 添加地址
    addReceiveAddress () {
      this.$emit('ADD_RECEIVE_ADDRESS_EVENT')
    },
    // 创建助力任务
    sureSelect () {
      if (this.postAddressList.length == 0) {
        this.$toast({
          content: '请先添加收货地址'
        })
        return
      }
      // 未手动选择时
      if (this.selectIndex == null) {
        // 判断是否有默认地址
        if (this.postAddressList.some(item => { return item.IsDefault == true })) {
          this.postAddressList.forEach((item, index) => {
            if (item.IsDefault) {
              this.selectIndex = index
            }
          })
        } else {
          this.$toast({
            content: '请选择地址'
          })
        }
      }
      // 创建助力任务
      Http.send({
        url: 'AddInviteTask',
        data: {
          CustomerId: window.customerId,
          InviteCommodityId: this.inviteCommodityId,
          PostTel: this.postAddressList[this.selectIndex].PhoneNo,
          PostName: this.postAddressList[this.selectIndex].ReseverName,
          PostAddress: this.postAddressList[this.selectIndex].Address
        }
      }).success(() => {
        this.saveProductId(this.inviteCommodityId)
        this.$toast({
          content: '创建成功'
        })
        this.$emit('SURE_SELECT_EVENT')
      }).fail((data) => {
        if (data.code === 301) {
          this.$toast({
            content: data.message
          })
          this.$emit('CLOSE_SELECT_EVENT')
          return
        }
        this.$toast({
          content: data
        })
      })
    },
    closeSelecet () {
      this.$emit('CLOSE_SELECT_EVENT')
    },
    touchMove (e) {
      e.preventDefault()
    },
    touchMoveStop (e) {
      e.stopPropagation()
    },
    gotoPage (page) {
      this.$router.push({
        name: page
      })
    },
    ...mapMutations(['saveProductId'])
  },
}
</script>

<style lang="scss" scoped>
@import "./select-address.scss";
</style>
