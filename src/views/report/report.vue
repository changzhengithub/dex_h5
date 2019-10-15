<template>
<!-- s 报告示例 -->
  <section class="report">
    <ReportBlackList v-if="reportParams.type == 1" :reportParams="reportParams"></ReportBlackList>
    <ReportCall v-if="reportParams.type == 2" :reportParams="reportParams"></ReportCall>
    <ReportMulti v-if="reportParams.type == 3" :reportParams="reportParams"></ReportMulti>
    <ReportRelation v-if="reportParams.type == 4" :reportParams="reportParams"></ReportRelation>
  </section>
<!-- e 报告示例 -->
</template>

<script>
import ReportMulti from '../report-multi/report-multi.vue'
import ReportBlackList from '../report-blacklist/report-blacklist.vue'
import ReportCall from '../report-call/report-call.vue'
import ReportRelation from '../report-relation/report-relation.vue'
// 引入js
// import Register from '@/class/Register.class.js'

export default {
  name: 'ReportComponent',
  data () {
    return {
      reportShow: false,
      reportType: null,
      reportQueryNo: null,
      reportLevel: null,
      reportParams: {}
    }
  },
  components: {
    ReportMulti,
    ReportBlackList,
    ReportCall,
    ReportRelation
  },
  created () {
    this.getParams()
  },
  methods: {
    getParams () {
      // 根据获取不同参数获取报告
      this.reportParams.type = window.queryType
      this.reportParams.queryNo = window.queryNo ? window.queryNo : ''
      this.reportParams.level = window.queryLevel
      // this.reportParams.type = 3
      // this.reportParams.queryNo = 'QCredit20190729A000001_69'
      // this.reportParams.level = 1
    },
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./report.scss";
</style>