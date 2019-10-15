<template>
<!-- s 多头借贷报告示例 -->
  <section class="report-multi">
    <!-- 多平台借款 -->
    <div class="multi-classify">
      <div class="classify-bg" v-if="!this.reportParams.queryNo">
        <img src="../../assets/image/example.png">
      </div>
      <div class="classify-title">
        <div class="title-icon">
          <img src="../../assets/image/window.png">
        </div>
        <div class="title-text"><span>多平台借贷</span></div>
      </div>
      <div class="classify-loan">
        <div class="loan-item">
          <span>3个月内借款次数</span>
          <span>{{multiLoanReportData.latest_three_month}}</span>
        </div>
        <div class="loan-item">
          <span>1个月内借款次数</span>
          <span>{{multiLoanReportData.latest_one_month}}</span>
        </div>
      </div>
      <div class="classify-list">
        <div class="list-item">
          <div class="item-module">申请借款次数</div>
          <div class="item-module">7天内</div>
          <div class="item-module">30天内</div>
        </div>
        <div class="list-item">
          <div class="item-module">身份证</div>
          <div class="item-module">{{multiLoanReportData.card_His30_Multi}}</div>
          <div class="item-module">{{multiLoanReportData.card_His30_Multi}}</div>
        </div>
        <div class="list-item">
          <div class="item-module">手机号</div>
          <div class="item-module">{{multiLoanReportData.phoneNo_His7_Multi}}</div>
          <div class="item-module">{{multiLoanReportData.phoneNo_His30_Multi}}</div>
        </div>
      </div>
      <div class="classify-summarize">
        <p class="summarize-text">您最近一个月借款次数为<span class="active">{{multiLoanReportData.latest_one_month}}</span> ，3个月内借款次数为<span class="active">{{multiLoanReportData.latest_three_month}}</span>，<span :class="{'risk-active': multiRiskAssessment}">{{multiRiskName}}</span></p>
        <p class="summarize-tip"><span>一般认为多平台借贷的用户风险较高，将不利于通过贷款</span></p>
      </div>
      <div class="classify-bottom"></div>
    </div>
    <!-- 共债情况 -->
    <div class="multi-classify">
      <div class="classify-title">
        <div class="title-icon">
          <img src="../../assets/image/window.png">
        </div>
        <div class="title-text"><span>共债情况</span></div>
      </div>
      <div class="classify-condition">
        <ul class="condition-list">
          <li class="list-item">
            <div class="item-module">消费金融类机构数</div>
            <div class="item-module">{{multiLoanReportData.consfin_org_count}}</div>
          </li>
          <li class="list-item">
            <div class="item-module">网络贷款类机构数</div>
            <div class="item-module">{{multiLoanReportData.loans_cash_count}}</div>
          </li>
          <li class="list-item">
            <div class="item-module">贷款订单数</div>
            <div class="item-module">{{multiLoanReportData.loans_count}}</div>
          </li>
          <li class="list-item">
            <div class="item-module">已结清订单数</div>
            <div class="item-module">{{multiLoanReportData.loans_settle_count}}</div>
          </li>
          <li class="list-item">
            <div class="item-module">贷款逾期订单数</div>
            <div class="item-module">{{multiLoanReportData.loans_overdue_count}}</div>
          </li>
          <li class="list-item">
            <div class="item-module">贷款机构数</div>
            <div class="item-module">{{multiLoanReportData.loans_org_count}}</div>
          </li>
          <li class="list-item">
            <div class="item-module">最近一次贷款时间</div>
            <div class="item-module">{{multiLoanReportData.loans_latest_time}}</div>
          </li>
        </ul>
      </div>
      <div class="classify-summarize">
        <p class="summarize-text">您总共贷款机构数为<span class="active">{{multiLoanReportData.loans_org_count}}</span>，<span :class="{'risk-active': commonRiskAssessment}">{{commonRiskName}}</span></p>
        <p class="summarize-tip">一般认为共债较多的用户偿还能力有限，贷款风险较高，多数机构会拒绝贷款，请合理安排资金流转，减少过多共债信息</p>
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
  name: 'ReportMultiComponent',
  props: ['reportParams'],
  data () {
    return {
      defaultData: {
        card_His7_Multi: 14,
        card_His30_Multi: 17,
        phoneNo_His7_Multi: 14,
        phoneNo_His30_Multi: 17,
        latest_one_month: 8,
        latest_three_month: 8,
        loans_org_count: 6,
        consfin_org_count: 19,
        loans_cash_count: 0,
        loans_count: 54,
        loans_settle_count: 42,
        loans_overdue_count: 6,
        loans_latest_time: '2019-06-18'
      },
      multiLoanReportData: {},
      commonRiskName: '',
      commonRiskAssessment: false,
      multiRiskName: '',
      multiRiskAssessment: false
    }
  },
  components: {
  },
  created () {
    if (!this.reportParams.queryNo) {
      Http.sendTitleText('多头借贷报告示例')
      this.multiLoanReportData = this.defaultData
      this.disposeData(this.multiLoanReportData)
    } else {
      Http.sendTitleText('多头借贷报告')
      this.getData()
    }
  },
  methods: {
    // 获取多头借贷报告
    getData () {
      Register.send({
        url: 'GetCreditReport',
        data: {
          queryNo: this.reportParams.queryNo
        }
      }).success(data => {
        this.multiLoanReportData = JSON.parse(data.result) 
        this.disposeData(this.multiLoanReportData)
      }).fail(data => {
        this.$toast({
          content: data
        })
      })
    },
    // 评估风险
    disposeData (multiLoanReportData) {
      // 多平台借款分析
      let multiNum = parseInt(multiLoanReportData.latest_one_month) + parseInt(multiLoanReportData.latest_three_month)
      let commonNum = parseInt(multiLoanReportData.loans_org_count)
      switch (true) {
        case (multiNum < 5):
          this.multiRiskName = '风险较低'
          break
        case (multiNum < 10):
          this.multiRiskName = '风险一般'
          break
        default:
          this.multiRiskName = '风险较高'
          this.multiRiskAssessment = true
      }
      switch (true) {
        case (commonNum < 3):
          this.commonRiskName = '风险较低'
          break
        case (commonNum < 6):
          this.commonRiskName = '风险一般'
          break
        default:
          this.commonRiskName = '风险较高'
          this.commonRiskAssessment = true
      }
    }
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./report-multi.scss";
</style>