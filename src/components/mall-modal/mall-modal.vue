<template>
  <!-- s 更多 -->
  <section class="mall-modal">
    <transition name="btmfade">
      <!-- s 商品说明 -->
      <section class="modal-explain" v-if="explainShow" @touchmove="touchMove($event)" @click="modalClick($event)">
        <div class="explain-title">
          <span>商品说明</span>
          <div class="title-close" @click="closeModal">
            <i class="iconfont iconclose"></i>
          </div>
        </div>
        <div class="explain-content" v-html="explainUrl"></div>
      </section>
      <!-- e 商品说明 -->
      <!-- s 商品参数 -->
      <section class="modal-parameter" v-if="parameterShow" @touchmove="touchMove($event)" @click="modalClick($event)">
        <div class="parameter-commodity">
          <div class="commodity-img"><img :src="commodityPic ? commodityPic : commodityInfo.Icon" alt="商品"></div>
          <div class="commodity-detail">
            <div class="detail-price">￥{{commodiPrice ? commodiPrice : commodityInfo.Price}}</div>
            <div class="detail-selected"><span>{{paramsSelectTitle}}</span></div>
          </div>
          <div class="commodity-close" @click="closeModal">
            <i class="iconfont iconclose"></i>
          </div>
        </div>
        <div class="parameter-content">
          <div class="content-classify">
            <div class="classify-params" v-for="(item, itemIndex) in commodityTags" :key="itemIndex">
              <div class="params-title"><span>{{item.tagTitle}}</span></div>
              <div class="params-list">
                <div class="list-item" :class="{active: params.paramsSelect && params.isSwitch, 'forbid-active': !params.isSwitch}" v-for="(params, index) in item.tagsList" :key="index" @click="selectParam(index, itemIndex)"><span>{{params.paramsTitle}}</span></div>
              </div>
            </div>
          </div>
          <div class="content-num">
            <div class="num-title"><span>购买数量</span></div>
            <div class="num-switch">
              <div class="switch-cut" @click="cutBuyNum"><span>-</span></div>
              <div class="switch-text"><span>{{buyNum}}</span></div>
              <div class="switch-add" @click="addBuyNum"><span>+</span></div>
            </div>
          </div>
        </div>
        <div class="parameter-buy">
          <div class="buy-btn">
            <button class="btn" @click="rightBuy">立即购买</button>
          </div>
        </div>
      </section>
      <!-- e 商品参数 -->
    </transition>
  </section>
  <!-- e 更多 -->
</template>

<script>
import Register from '../../class/Register.class.js'
import axios from 'axios'
export default {
  name: 'MallModalComponent',
  props: ['modalClassify', 'Id'],
  data () {
    return {
      explainUrl: '',
      commodityList: [],
      commodityInfo: {},
      commodityTags: [],
      presentationList: [],
      saleInfo: [],
      paramsSelectTitle: '请选择完整商品规格',
      paramsIndex: null,
      classifyIndex: null,
      buyNum: 1,
      commodityPic: '',
      commodiPrice: '',
      explainShow: false,
      parameterShow: false
    }
  },
  components: {
  },
  created () {
    this.decideOpenCom()
  },
  methods: {
    // 判断打开不同组件
    decideOpenCom () {
      if (this.modalClassify === 'explain') this.getExplain()
      if (this.modalClassify === 'parameter') this.getData()
    },
    // 获取商品详情
    getData () {
      Register.send({
        url: 'GetCommodityDetail',
        data: {
          id: this.Id,
          customerId: 0
        }
      }).success(data => {
        this.disposeData(data)
        this.parameterShow = true
      }).fail((data) => {
        this.$toast({
          content: data
        })
      })
    },
    disposeData (data) {
      this.commodityInfo = data.commodity
      this.presentationList = data.presentation
      this.saleInfo = data.saleInfo
      // 解析数组添加判断选择属性
      data.tags.forEach((tagItem, tagIndex) => {
        for(let key in tagItem) {
          let tagJson = {
            tagTitle: key,
            tagSelect: false,
            tagsList: [],
            selectTitle: ''
          }
          this.commodityTags[tagIndex] = tagJson
          tagItem[key].forEach((paramsItem, paramsIndex) => {
            let paramsJson = {
              paramsTitle: paramsItem,
              paramsSelect: false,
              isSwitch: true
            }
            this.commodityTags[tagIndex].tagsList[paramsIndex] = paramsJson
          })
        }
      })
    },
    // 获取商品说明Html
    getExplain () {
      axios.get(`${window.api}/Mall/CommodityExplain`).then(response => {
        this.explainUrl = response.data
        this.explainShow = true
      }).catch(err => {
        this.$toast({
          content: err
        })
      })
    },
    // 选择参数
    selectParam (paramsIndex, itemIndex) {
      if (!this.commodityTags[itemIndex].tagsList[paramsIndex].isSwitch) return
      this.paramsIndex = paramsIndex
      this.classifyIndex = itemIndex
      // 判断参数是否被选择paramsSelect
      this.commodityTags[itemIndex].tagsList.forEach((item, index) => {
        if (paramsIndex == index) {
          item.paramsSelect = !item.paramsSelect
        } else {
          item.paramsSelect = false
        }
      })
      // 添加项选择标题
      if (this.commodityTags[itemIndex].tagsList[paramsIndex].paramsSelect) {
        this.commodityTags[itemIndex].tagSelect = true
        this.commodityTags[itemIndex].selectTitle = this.commodityTags[itemIndex].tagsList[paramsIndex].paramsTitle
      }else {
        this.commodityTags[itemIndex].tagSelect = false
        this.commodityTags[itemIndex].selectTitle = ''
      }
      // 判断是否可点击
      let selectSpecificationsList = ''
      this.saleInfo.forEach((item) => {
        if (item.Specifications.indexOf(this.commodityTags[itemIndex].tagsList[paramsIndex].paramsTitle) != -1 ) {
          selectSpecificationsList += item.Specifications
        }
      })

      this.commodityTags.forEach((item, index) => {
        if (index != itemIndex) {
          item.tagsList.forEach((paramsItem) => {
            // 判断是否包含改参数和是否点击
            if (selectSpecificationsList.indexOf(paramsItem.paramsTitle) == -1 && this.commodityTags[itemIndex].tagsList[paramsIndex].paramsSelect) {
                paramsItem.isSwitch = false
              } else {
                paramsItem.isSwitch = true 
            }
          })
        }
      })
      this.commodityTags = [...this.commodityTags]
      this.disposeSelectData(this.commodityTags, itemIndex, paramsIndex)
    },
    disposeSelectData (tags, itemIndex, paramsIndex) {
      // 判断选择的颜色参数
      if (tags[itemIndex].tagTitle == this.presentationList[paramsIndex].StyleName) {
        if (tags[itemIndex].tagsList[paramsIndex].paramsTitle == this.presentationList[paramsIndex].StyleValue && tags[itemIndex].tagsList[paramsIndex].paramsSelect) {
          this.commodityPic = this.presentationList[paramsIndex].Thumb
        } else {
          this.commodityPic = ''
        }
      }
      // 判断选择全部参数计算价格
      if (tags.every(item => { return item.tagSelect != false })) {
        this.saleInfo.forEach(saleItem => {
          if (tags.every(item => { return saleItem.Specifications.indexOf(item.selectTitle) != -1 })) {
            this.commodiPrice = saleItem.Price
            this.paramsSelectTitle = saleItem.Specifications
          }
        })
      } else {
        this.commodiPrice = ''
        this.paramsSelectTitle = '请选择完整商品规格'
      }
    },
    // 选择商品个数
    cutBuyNum () {
      if (this.buyNum === 1) return
      this.buyNum--
    },
    // 选择商品个数
    addBuyNum () {
      this.buyNum++
    },
    // 立即购买
    rightBuy () {
      if (!this.commodityTags.every(item => { return item.tagSelect != false })) {
        this.$toast({
          content: '请选择完整商品规格'
        })
        return
      }
      this.$emit('RIGHT_BUY_EVENT')
    },
    touchMove (e) {
      e.stopPropagation()
    },
    modalClick (e) {
      e.preventDefault()
      e.stopPropagation()
    },
    closeModal () {
      this.$emit('CLOSE_MODAL_EVENT')
    }
  }

}

</script>

<style lang="scss" scoped>
  @import "./mall-modal.scss";
</style>
