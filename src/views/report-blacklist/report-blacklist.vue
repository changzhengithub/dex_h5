<template>
<!-- s 黑名单检测结果 -->
  <section class="report-blacklist">
    <header class="blacklist-header">
      <!-- <div class="header-back">
        <i class="iconfont iconarrow-left"></i>
      </div>
      <div class="header-text"><span>黑名单检测结果</span></div> -->
    </header>
    <main class="blacklist-main">
      <div class="main-panel">
        <div class="panel-img">
          <img v-if="creditStatus" src="../../assets/image/reputation-good.png" alt="信用记录">
          <img v-if="!creditStatus" src="../../assets/image/reputation-bad.png" alt="信用记录">
        </div>
        <div class="panel-text"><span>您的信用记录</span><span>{{creditStatus ? '良好' : '较差'}}</span></div>
      </div>
      <div class="main-datum">
        <div class="datum-item">
          <span>被查询人姓名</span>
          <span>{{blackReport.trueName}}</span>
        </div>
        <div class="datum-item">
          <span>被查询人身份证号 </span>
          <span>{{blackReport.idCard}}</span>
        </div>
        <div class="datum-item">
          <span>被查询人手机号</span>
          <span>{{blackReport.phoneNo}}</span>
        </div>
      </div>
      <div class="main-blackinfo">
        <div class="blackinfo-title">
          <div class="titel-text">
            <img src="../../assets/image/blacklist.png">
            <span>黑名单信息</span>
          </div>
          <div class="title-record"><span>无记录</span></div>
        </div>
        <div class="blackinfo-list">
          <div class="list-item">
            <span>数据更新时间</span>
            <span>{{blackReport.currentTime}}</span>
          </div>
          <div class="list-item">
            <span class="item-key">失信名单</span>
            <span class="item-value" :class="{active: blackReport.noPromise == 1}">{{ blackReport.noPromise == 1 ? '是' : '否'}}</span>
          </div>
          <div class="list-item">
            <span class="item-key">法院执行</span>
            <span class="item-value" :class="{active: blackReport.courtEnforcement == 1}">{{ blackReport.courtEnforcement == 1 ? '是' : '否'}}</span>
          </div>
          <div class="list-item">
            <span class="item-key">信贷逾期</span>
            <span class="item-value" :class="{active: blackReport.overdueLoan == 1}">{{ blackReport.overdueLoan == 1 ? '是' : '否'}}</span>
          </div>
          <div class="list-item">
            <span class="item-key">身份风险</span>
            <span class="item-value" :class="{active: blackReport.CardRisk == 1}">{{ blackReport.CardRisk == 1 ? '是' : '否'}}</span>
          </div>
          <div class="list-item">
            <span class="item-key">虚假交易</span>
            <span class="item-value" :class="{active: blackReport.falseTrading == 1}">{{ blackReport.falseTrading == 1 ? '是' : '否'}}</span>
          </div>
          <div class="list-item">
            <span class="item-key">多头借贷</span>
            <span class="item-value" :class="{active: blackReport.multipleLoan == 1}">{{ blackReport.multipleLoan == 1 ? '是' : '否'}}</span>
          </div>
          <div class="list-item" v-if="reportParams.level == 2">
            <span class="item-key">手机号是否上黑名单</span>
            <span class="item-value" :class="{active: blackReport.isPhoneBlack == 1}">{{ blackReport.isPhoneBlack == 1 ? '是' : '否'}}</span>
          </div>
          <div class="list-item" v-if="reportParams.level == 2">
            <span class="item-key">身份证是否上黑名单</span>
            <span class="item-value" :class="{active: blackReport.isCardBlack == 1}">{{ blackReport.isCardBlack == 1 ? '是' : '否'}}</span>
          </div>
          <div class="list-item" v-if="reportParams.level == 2">
            <span class="item-key">查询机构数</span>
            <span class="item-value" :class="{active: blackReport.loans_org_count == 1}">{{ blackReport.loans_org_count == 1 ? '是' : '否'}}</span>
          </div>
          <div class="list-item" v-if="reportParams.level == 2">
            <span class="item-key">消费分期查询机构数</span>
            <span class="item-value" :class="{active: blackReport.consfin_org_count == 1}">{{ blackReport.consfin_org_count == 1 ? '是' : '否'}}</span>
          </div>
          <div class="list-item" v-if="reportParams.level == 2">
            <span class="item-key">现金贷查询机构数</span>
            <span class="item-value" :class="{active: blackReport.loans_cash_count == 1}">{{ blackReport.loans_cash_count == 1 ? '是' : '否'}}</span>
          </div>
          <div class="list-item" v-if="reportParams.level == 2">
            <span class="item-key">两次申请贷款间隔较短</span>
            <span class="item-value" :class="{active: blackReport.isLoanFast == 1}">{{ blackReport.isLoanFast == 1 ? '是' : '否'}}</span>
          </div>
          <div class="list-item" v-if="reportParams.level == 2">
            <span class="item-key">使用非常用设备进行贷款</span>
            <span class="item-value" :class="{active: blackReport.UnUsualDevice == 1}">{{ blackReport.UnUsualDevice == 1 ? '是' : '否'}}</span>
          </div>
          <div class="list-item" v-if="reportParams.level == 2">
            <span class="item-key">一个月内设备关联借贷次数过多</span>
            <span class="item-value" :class="{active: blackReport.MonthDeviceLoanMore == 1}">{{ blackReport.MonthDeviceLoanMore == 1 ? '是' : '否'}}</span>
          </div>
          <div class="list-item" v-if="reportParams.level == 2">
            <span class="item-key">一个月内手机号码关联过多设备申请贷款</span>
            <span class="item-value" :class="{active: blackReport.MonthPhoneWithDeviceMore == 1}">{{ blackReport.MonthPhoneWithDeviceMore == 1 ? '是' : '否'}}</span>
          </div>
          <div class="list-item" v-if="reportParams.level == 2">
            <span class="item-key">一个月内身份证号关联借贷次数过多</span>
            <span class="item-value" :class="{active: blackReport.MonthCardLoanMore == 1}">{{ blackReport.MonthCardLoanMore == 1 ? '是' : '否'}}</span>
          </div>
        </div>
        <div class="blackinfo-tips">
          <p class="tips-item">. 第三方提供的数据，仅供参考</p>
          <p class="tips-item">· 黑名单信息会根据您的信贷情况不断更新，报告有效期7天，有效期内多次查阅免费</p>
        </div>
      </div>
    </main>
  </section>
<!-- e 黑名单检测结果 -->
</template>

<script>
// 引入js
import Http from '@/class/Http.class.js'
import Register from '@/class/Register.class.js'

export default {
  name: 'ReportBlackListComponent',
  props: ['reportParams'],
  data () {
    return {
      defaultData: {
        trueName: '米小二',
        phoneNo: '15217551251',
        idCard: '340924198907233553',
        multipleLoan: 0,
        noPromise: 0,
        courtEnforcement: 0,
        overdueLoan: 0,
        CardRisk: 0,
        falseTrading: 0
      },
      phoneNo: '',
      trueName: '',
      idCard: '',
      blackReport: {},
      creditStatus: false
    }
  },
  components: {
  },
  created () {
    if (!this.reportParams.queryNo) {
      Http.sendTitleText('黑名单报告示例')
      this.blackReport = this.defaultData
      this.disposeData(this.blackReport)
    } else {
      Http.sendTitleText('黑名单报告')
      this.getData()
    }
  },
  methods: {
    // 获取黑名单报告
    getData () {
      Register.send({
        url: 'GetCreditReport',
        data: {
          queryNo: this.reportParams.queryNo
        }
      }).success(data => {
        this.blackReport = JSON.parse(data.result)
        this.disposeData(this.blackReport)
      }).fail(data => {
        this.$toast({
          content: data
        })
      })
    },
    disposeData (blackReport) {
      blackReport.idCard = blackReport.idCard.slice(0, 4) + '************' + blackReport.idCard.slice(-4, )
      blackReport.phoneNo = blackReport.phoneNo.slice(0, 3) + '****' + blackReport.phoneNo.slice(-4, )
      blackReport.currentTime = (new Date()).toLocaleDateString()
      this.judgeCredit(blackReport)
    },
    // 判断信用
    judgeCredit (blackReport) {
      let blackDataArr = []
      for (let key in blackReport) {
        if (key !== 'trueName' && key !== 'phoneNo' && key !== 'idCard' && key !== 'currentTime') {
          blackDataArr.push(blackReport[key])
        }
      }
      this.creditStatus = blackDataArr.every((item) => {
        return item != 1
      })
    }
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./report-blacklist.scss";
</style>