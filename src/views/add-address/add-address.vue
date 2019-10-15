<template>
  <!-- s 添加收货地址 -->
  <section class="add-address">
    <Header :headerProps="headerProps" @SHARE_EVENT="share"></Header>
    <!-- s 地址输入列表 -->
    <ul class="address-input">
      <li class="input-item">
        <p>收货人</p>
        <div class="item-input">
          <input type="text" v-model="name" placeholder="收货人姓名">
        </div>
      </li>
      <li class="input-item">
        <p>手机号</p>
        <div class="item-input">
          <input type="number" maxlength="11" v-model="phone" placeholder="收货人电话号码">
        </div>
      </li>
      <li class="input-item" @click="selectArea">
        <p>所在地区</p>
        <div class="item-input">
          <span :class="{active: area}">{{area ? area : '请选择'}}</span>
          <i class="iconfont iconarrow-right"></i>
        </div>
      </li>
      <li class="input-item">
        <p>详细地址</p>
        <div class="item-input">
          <input type="text" maxlength="100" v-model="county" placeholder="街道、小区、门牌号等">
        </div>
      </li>
    </ul>
    <!-- e 地址输入列表 -->
    <!-- s 按钮 -->
    <section class="button-default">
      <button @click="submit">
        <div><span>保存</span></div>
      </button>
    </section>
    <CitySelect v-if="selectAddressShow" :provinceList = "provinceList" :cities="cities" @SELECT_CANCEL_EVENT="closeArea" @SELECT_AREA_EVENT="getArea"></CitySelect>
  </section>
  <!-- e 添加收货地址 -->
</template>

<script>
import Check from '../../class/Check.class.js'
import Header from '../../components/common/header/header.vue'
import CitySelect from '../../components/city-select/city-select.vue'
import { provinces as provinceList, cities } from '../../class/cities.class.js'
export default {
  name: 'AddAddressComponent',
  data () {
    return {
      headerProps: {
        title: '新增收货地址',
        icon: '',
        path: ''
      },
      name: '',
      phone: '',
      area: '',
      county: '',
      selectAddressShow: false,
      provinceList: provinceList,
      cities: cities
    }
  },
  components: {
    Header,
    CitySelect
  },
  created () {

  },
  methods: {
    share () {

    },
    submit () {
      if (!Check.name(this.name)) return
      if (!Check.phone(this.phone)) return
      if (!this.area) {
        this.$toast({
          content: '请选择地址'
        })
        return
      }
      if (!this.county) {
        this.$toast({
          content: '请填写详细地址'
        })
        return
      }
      // Http.send({
      //   url: 'ModifyPostAddress',
      //   data: {
      //     Id: this.id,
      //     name: this.name,
      //     phone: this.phone,
      //     address: [this.area, this.county].join(' '),
      //     isDefault: this.isDefault
      //   }
      // }).success(data => {
      //   this.Title.text = '修改成功'
      //   this.HintShow = true
      //   setTimeout(() => {
      //     this.HintShow = false
      //     this.$router.go(-1)
      //   }, 500)
      // }).fail((data) => {
      //   this.Title.text = data.message
      //   this.dialogShow = true
      // })
    },
    selectArea () {
      this.selectAddressShow = true
    },
    closeArea () {
      this.selectAddressShow = false
    },
    getArea (area) {
      this.area = area
      this.selectAddressShow = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./add-address.scss";
</style>
