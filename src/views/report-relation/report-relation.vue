<template>
<!-- s 多头借贷报告示例 -->
  <section class="report-relation">
    <div class="relation-classify">
      <div class="classify-title">
        <div class="title-date"><span>2018-07-01</span></div>
        <div class="title-qualified"><span>2人合格</span></div>
      </div>
      <div class="classify-list">
        <div class="list-item">
          <div class="item-top">
            <div class="top-name"><span>李小菊</span></div>
            <div class="top-qualified">
              <div class="qualified-icon">
                <img v-if="true" src="../../assets/image/disqualification.png">
                <img v-if="false" src="../../assets/image/qualified.png">
              </div>
              <div class="qualified-text"><span>李小菊</span></div>
            </div>
          </div>
          <div class="item-bottom">
            <div class="bottom-phone"><span>17735656124</span></div>
            <div class="bottom-tip"><span>未命中黑名单 偶尔联系</span></div>
          </div>
        </div>
        <div class="list-item">
          <div class="item-top">
            <div class="top-name"><span>李小菊</span></div>
            <div class="top-qualified">
              <div class="qualified-icon">
                <img v-if="false" src="../../assets/image/disqualification.png">
                <img v-if="true" src="../../assets/image/qualified.png">
              </div>
              <div class="qualified-text active"><span>李小菊</span></div>
            </div>
          </div>
          <div class="item-bottom">
            <div class="bottom-phone"><span>17735656124</span></div>
            <div class="bottom-tip"><span>未命中黑名单 偶尔联系</span></div>
          </div>
        </div>
      </div>
    </div>
  </section>
<!-- e 多头借贷报告示例 -->
</template>

<script>
// 引入js
import Http from '@/class/Http.class.js'
import Register from '@/class/Register.class.js'

export default {
  name: 'ReportRelationComponent',
  data () {
    return {
    }
  },
  components: {
  },
  created () {
    this.getParams()
  },
  methods: {
    // 传入原生标题文字
    init () {
      Http.sendTitleText('多头借贷报告示例')
    },
    getParams () {
      // 根据获取不同参数获取报告
    },
    // 上拉加载
    getData () {
      Register.send({
        url: 'GetInviteCommodityList',
        data: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      }).success(data => {
        console.log(data)
      }).fail(data => {
        this.$toast({
          content: data
        })
      })
    },
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./report-relation.scss";
</style>