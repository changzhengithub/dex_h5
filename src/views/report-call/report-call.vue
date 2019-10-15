<template>
<!-- s 通话报告示例 -->
  <section class="report-call">
    <!-- 风险等级 -->
    <div class="call-circle">
      <div class="circle-exmple" v-if="!this.reportParams.queryNo">
        <img src="../../assets/image/example.png">
      </div>
      <div class="circle-progress" ref="progress">
        <canvas id="canvas" ref="canvas"></canvas>
      </div>
      <div class="circle-text">
        <p class="text-grade" :class="{'text-active': callReportData.exception_cnt != 0}">{{riskGrade}}</p>
        <p class="text-evaluate">风险等级</p>
        <p class="text-date">{{(new Date()).getFullYear() + '-' + ((new Date()).getMonth() + 1) + '-' + (new Date()).getDate()}}</p>
      </div>
      <div class="circle-tip">您当前共有<span>{{callReportData.exception_cnt}}</span>项高风险</div>
    </div>
    <!-- 基本运营商信息 -->
    <div class="call-classify active">
      <div class="classify-title">
        <div class="title-icon">
          <img src="../../assets/image/window.png">
        </div>
        <div class="title-text"><span>基本运营商信息</span></div>
      </div>
      <div class="classify-list">
        <div class="list-item">
          <span class="item-key">手机号</span>
          <span class="item-value">{{callReportData.phone_no}}</span>
        </div>
        <div class="list-item">
          <span class="item-key">运营商</span>
          <span class="item-value">{{callReportData.source_name}}</span>
        </div>
        <div class="list-item">
          <span class="item-key">归属地</span>
          <span class="item-value">{{callReportData.city}}</span>
        </div>
      </div>
    </div>
    <!-- 手机号风险检测 -->
    <div class="call-classify">
      <div class="classify-title">
        <div class="title-icon">
          <img src="../../assets/image/window.png">
        </div>
        <div class="title-text"><span>手机号风险检测</span></div>
      </div>
      <div class="classify-list">
        <div class="list-item">
          <span class="item-key">入网时长</span>
          <span class="item-value">{{callReportData.in_time}}个月</span>
        </div>
        <div class="list-item">
          <span class="item-key">手机号是否实名认证</span>
          <span class="item-value" :class="{active: callReportData.reliability != 1}">{{callReportData.reliability == 1 ? '是' : '否'}}</span>
        </div>
        <div class="list-item">
          <span class="item-key">姓名和运营商实名是否一致</span>
          <span class="item-value" :class="{active: callReportData.name_match != 1}">{{callReportData.name_match == 1 ? '是' : '否'}}</span>
        </div>
        <div class="list-item">
          <span class="item-key">身份证和手机号身份信息是否一致</span>
          <span class="item-value" :class="{active: callReportData.idcard_match != 1}">{{callReportData.idcard_match == 1 ? '是' : '否'}}</span>
        </div>
      </div>
    </div>
    <!-- 基本通话检测 -->
    <div class="call-columnar">
      <div class="columnar-title"><span>基本通话检测</span></div>
      <div class="columnar-chart">
        <ve-histogram :data="chartData" :settings="chartSetting" width="98%" height="100%" :grid="chartGrid" :extend="chartExtend"></ve-histogram>
      </div>
    </div>
    <!-- 近1月通话情况 -->
    <div class="call-classify" >
      <div class="classify-title">
        <div class="title-icon">
          <img src="../../assets/image/window.png">
        </div>
        <div class="title-text"><span>近1个月份通话情况</span></div>
      </div>
      <div class="classify-status">
        <div class="status-item">
          <P>￥{{totalFee.item_1m}}</P>
          <p>消费金额</p>
        </div>
        <div class="status-item">
          <p>{{localCnt.item_1m}}</p>
          <p>通话次数</p>
        </div>
        <div class="status-item">
          <p>{{localTime.item_1m}}</p>
          <p>通话时长</p>
        </div>
      </div>
      <div class="classify-show">
        <div class="show-item">
          <p class="item-text">近6个月平均月消费<span>{{totalFee.avg_item_6m}}</span>元，正常</p>
          <p class="item-tip">月均消费越高，代表经济状况越好，将有利于通过贷款审核</p>
        </div>
        <div class="show-item">
          <p class="item-text">近6个月平均通话时长<span>{{localTime.avg_item_6m}}</span>分钟，平均通话次数{{localCnt.avg_item_6m}}次</p>
          <p class="item-tip">每个月都有通话且通话较多的用户，通常情况下代表社会交情稳定，将有利于通过贷款审核</p>
        </div>
      </div>
    </div>
    <!-- 通话活跃地区分布 -->
    <div class="call-classify" v-if="reportParams.level != 1">
      <div class="classify-title">
        <div class="title-icon">
          <img src="../../assets/image/window.png">
        </div>
        <div class="title-text"><span>通话活跃地区分布</span></div>
      </div>
      <div class="classify-distribution">
        <ve-ring :data="chartRingData" width="100%" height="100%" :settings="chartRingSettings" :extend="chartRingExtend"></ve-ring>
      </div>
      <div class="classify-show">
        <div class="show-item">
          <p class="item-text">近6个月您在<span>{{regionLocalList[0]}}</span>、<span>{{regionLocalList[1]}}</span>、<span>{{regionLocalList[2]}}</span>这3个城市的通话次数最多其中<span>{{regionLocalList[0]}}</span>占比例最高为<span>{{regionCallNunRate}}%</span>，通常情况下说明工作、居住比较稳定，将有利于通过贷款审核</p>
        </div>
      </div>
    </div>
    <!-- 行为检测 -->
    <div class="call-classify" v-if="reportParams.level != 1">
      <div class="classify-title">
        <div class="title-icon">
          <img src="../../assets/image/window.png">
        </div>
        <div class="title-text"><span>行为检测</span></div>
      </div>
      <div class="classify-detection">
        <div class="detection-result">
          <div class="result-item">
            <span>互通电话情况</span>
            <span>{{callReportData.contact_each_other}}</span>
          </div>
          <div class="result-item">
            <span>夜间活动情况（0点-7点）</span>
            <span :class="{'result-active': callReportData.behavior_check == 1}">{{callReportData.contact_night}}</span>
          </div>
        </div>
        <div class="detection-evaluate">
          <p class="evaluate-title">您的行为检测 <span :class="{'result-active': callReportData.behavior_check == 1}">{{callReportData.behavior_check == 1 ? '存在风险' : '风险较低'}}</span></p>
          <p class="evaluate-tip">一般情况下互通电话众多，夜间活动较少的用户将有利于通过贷款审核</p>
        </div>
      </div>
    </div>
    <!-- 风险通话情况 -->
    <div class="call-classify" v-if="reportParams.level != 1">
      <div class="classify-title">
        <div class="title-icon">
          <img src="../../assets/image/window.png">
        </div>
        <div class="title-text"><span>风险通话情况</span></div>
      </div>
      <div class="classify-risk">
        <div class="risk-list">
          <div class="list-item">
            <span class="item-key">澳门地区</span>
            <span class="item-value">{{callReportData.contact_macao}}</span>
          </div>
          <div class="list-item">
            <span class="item-key">110</span>
            <span class="item-value">{{callReportData.contact_110}}</span>
          </div>
          <div class="list-item">
            <span class="item-key">律师</span>
            <span class="item-value">{{callReportData.contact_lawyer}}</span>
          </div>
          <div class="list-item">
            <span class="item-key">法院</span>
            <span class="item-value">{{callReportData.contact_court}}</span>
          </div>
          <div class="list-item">
            <span class="item-key">贷款类</span>
            <span class="item-value">{{callReportData.contact_loan}}</span>
          </div>
          <div class="list-item">
            <span class="item-key">银行类</span>
            <span class="item-value">{{callReportData.contact_bank}}</span>
          </div>
          <div class="list-item">
            <span class="item-key">催收类</span>
            <span class="item-value">{{callReportData.contact_collection}}</span>
          </div>
        </div>
        <div class="risk-evaluate">
          <p class="evaluate-title">您的风险类通话比较少，<span>风险较低</span></p>
          <p class="evaluate-tip">一般情况下，以上几类电话联系的越少将更有利通过贷款审核</p>
        </div>
      </div>
    </div>
  </section>
<!-- e 通话报告示例 -->
</template>

<script>
// 引入js
import Http from '@/class/Http.class.js'
import Register from '@/class/Register.class.js'

export default {
  name: 'ReportCallComponent',
  props: ['reportParams'],
  data () {
    return {
      defaultData: {
        phone_no: '13701702961',
        city: '上海市',
        source_name: '上海移动',
        in_time: 2,
        reliability: 1,
        idcard_match: 0,
        name_match: 0,
        exception_cnt: 2,
        total_fee: {
          item_1m: 182.99,
          item_3m: 216.78,
          item_6m: 216.78,
          avg_item_3m: 72.26,
          avg_item_6m: 36.13
        },
        local_cnt:{
          item_1m: 14,
          avg_item_6m: 2.33
        },
        local_time: {
          item_1m: 555,
          avg_item_6m: 93
        },
        region_list:[
          {
            region_loc: '北京',     //地区
            region_call_cnt: 35 //通话次数
          },
          {
            region_loc: '上海',
            region_call_cnt: 22
          },
          {
            region_loc: '深圳',
            region_call_cnt: 42
          },
          {
            region_loc: '广州',
            region_call_cnt: 14
          },
          {
            region_loc: '南京',
            region_call_cnt: 34
          },
          {
            region_loc: '杭州',
            region_call_cnt: 32
          }
        ],
        contact_night: '很少夜间活动（低于20%)',     //夜间活动情况
        contact_each_other: '数量正常（10 - 100）', //互通电话情况
        behavior_check:0,      //是否存在风险，1：是 0：否
        contact_macao: '无通话记录',     //澳门地区
        contact_110: '无通话记录',       //110
        contact_lawyer: '无通话记录',   //律师
        contact_court: '无通话记录',    //法院
        contact_loan: '无该类号码记录',                             //贷款类
        contact_bank: '很少被联系（有该号码记录，且不符合上述情况）',  //银行类
        contact_collection: '无该类号码记录'
      },
      riskGrade: '',
      callReportData: {},
      totalFee: {},
      localTime: {},
      localCnt: {},
      regionList: [],
      regionLocalList: [],
      regionCallNunRate: 0,
      riskRate: 0,
      // 圆环进度条数据
      ctx: null,
      canvasW: null,
      canvasH: null,
      centerX: null,
      centerY: null,
      circleX: null,
      circleY: null,
      pointerAngle: Math.PI * 0.75,
      endAngle: Math.PI * 1.5 ,
      // 柱状图数据
      chartData: {
        columns: ['date', 'totalFee'],
        rows: [],
      },
      chartGrid: {
        bottom: 10
      },
      chartExtend: {
        barWidth: '50%',
        legend: {
          show: false
        },
        series: {
          label: {
            show: true,
            position: "top",
            // formatter: '￥{@score}',
            formatter (params) {
              if (params.dataIndex < 4) {
                return '{color1|' + '￥' + params.data + '}'
              } else {
                return '{color2|' + '￥' + params.data + '}'
              }
            },
            rich: {
              color1: {
                color: '#999'
              },
              color2: {
                color: '#1d99ff'
              }
            },
            fontFamily: 'PingFangSC-Bold',
            fontSize: 12,
          },
        },
        xAxis: {
          axisLabel: {
            show: true,
            textStyle: {
              color: '#121212'
            },
            interval: 0,
            rotate: '10',
            align: 'center',
            margin: 15,
          }
        },
        yAxis: {
          axisLabel: {
            show: true,
            textStyle: {
              color: '#BFBFBF'
            },
            // inside: true
          },
        },
        tooltip: {
          show: false
        },
      },
      chartSetting: {
        itemStyle: {
          color (params) {
            var colorList = ['#9ad1ff','#9ad1ff','#9ad1ff','#9ad1ff','#1d99ff'];
            return colorList[params.dataIndex];
          },
          barBorderRadius: [2, 2, 0, 0],
        },
      },
      // 环形图数据
      chartRingData: {
        columns: ['region_loc', 'region_call_cnt'],
        rows: []
      },
      chartRingSettings: {
        radius: ['40%', '63%'],
        offsetY: '60%',
        hoverAnimation: false,
        selectedOffset: 0,
        // hoverOffset: 0
      },
      chartRingExtend: {
        tooltip: {
          show: false
        },
        legend: {
          show: false
        },
        series: {
          label: {
            show: true,
            formatter (params) {
              return ['{a|' + params.percent + '% }' , '{a|' + params.name + '}'].join('\n')
            },
            rich: {
              a: {
                color: '#333',
                // lineHeight: 15,
              },
              b: {
                color: '#333'
              },
            },
          },
          labelLine: {
            show: true,
            length: 10,
            length2: 30,
          }
        },
      }
    }
  },
  components: {
  },
  created () {
    if (!this.reportParams.queryNo) {
      Http.sendTitleText('通话报告示例')
      this.callReportData = this.defaultData
      this.disposeData(this.callReportData)
    } else {
      Http.sendTitleText('通话报告')
      this.getData()
    }
  },
  methods: {
    // 获取通话报告
    getData () {
      Register.send({
        url: 'GetCreditReport',
        data: {
          queryNo: this.reportParams.queryNo
        }
      }).success(data => {
        this.callReportData = JSON.parse(data.result)
        this.disposeData(this.callReportData)
      }).fail(data => {
        this.$toast({
          content: data
        })
      })
    },
    disposeData (reportData) {
      this.riskAssessment()
      this.$nextTick(() => {
        this.progerssInit();
      })
      // 图表数据处理
      this.totalFee = reportData.total_fee
      this.totalNum = reportData.region_list
      this.localTime = reportData.local_time
      this.localCnt = reportData.local_cnt
      let rows = [{}, {}, {}, {}, {}]
      rows[0].date = '近6月平均'
      rows[1].date = '近3月平均'
      rows[2].date = '近6月'
      rows[3].date = '近3月'
      rows[4].date = '近1月'
      rows[0].totalFee = reportData.total_fee.avg_item_6m
      rows[1].totalFee = reportData.total_fee.avg_item_3m
      rows[2].totalFee = reportData.total_fee.item_6m
      rows[3].totalFee = reportData.total_fee.item_3m
      rows[4].totalFee = reportData.total_fee.item_1m
      this.chartData.rows = rows
      if (this.reportParams.level != 1) {
        reportData.contact_bank = reportData.contact_bank.split('（')[0]
        reportData.contact_macao = reportData.contact_macao.split('（')[0]
        reportData.contact_110 = reportData.contact_110.split('（')[0]
        reportData.contact_lawyer = reportData.contact_lawyer.split('（')[0]
        reportData.contact_court = reportData.contact_court.split('（')[0]
        reportData.contact_loan = reportData.contact_loan.split('（')[0]
        reportData.contact_collection = reportData.contact_collection.split('（')[0]
        this.chartRingData.rows = reportData.region_list
        this.analyzeRegionData(reportData.region_list)
      }
    },
    analyzeRegionData (data) {
      let sue = 0
      let len = data.length
      for (let i = 0; i < len - 1; i++) {
        for (let j = 0; j < len - 1 - i; j++) {  
          if (parseInt(data[j].region_call_cnt) < parseInt(data[j+1].region_call_cnt)) {
            let temp = data[j]
            data[j] = data[j + 1]
            data[j + 1] = temp
          }   
        }   
      }
      data.forEach(item => {
        this.regionLocalList.push(item.region_loc)
        sue += parseInt(item.region_call_cnt)
      })
      this.regionList = data
      this.regionCallNunRate = (parseInt(data[0].region_call_cnt) / sue * 100).toFixed(1)
    },
    riskAssessment () {
      let riskNum = parseInt(this.callReportData.exception_cnt)
      switch (riskNum) {
        case 0:
          this.riskGrade = '无'
          this.riskRate = 0
          break;
        case 1:
          this.riskGrade = '低'
          this.riskRate = riskNum / 3
          break
        case 2:
          this.riskGrade = '中'
          this.riskRate = riskNum / 3
          break
        default:
          this.riskGrade = '高'
          this.riskRate = 1
      }
    },
    progerssInit () {
      this.$refs.canvas.style.width = '100%'
      this.$refs.canvas.style.height = '100%'
      this.$refs.canvas.width = this.$refs.progress.offsetWidth * 2
      this.$refs.canvas.height = this.$refs.progress.offsetHeight * 2
      this.ctx = this.$refs.canvas.getContext('2d')
      this.canvasW = this.$refs.canvas.width
      this.canvasH = this.$refs.canvas.height
      this.centerX = this.$refs.canvas.width / 2
      this.centerY = this.$refs.canvas.height / 2
      this.animate()
    },
    // 逐帧动画
    animate () {
      this.pointerAngle += 0.05
      if (this.pointerAngle >= Math.PI * 0.75 + this.endAngle * this.riskRate) {
        this.pointerAngle = Math.PI * 0.75 + this.endAngle * this.riskRate
        this.drawProgress()
        return
      }
      this.drawProgress()
      setTimeout(() => {
        this.animate(this.riskRate)
      }, 10)
    },
    drawProgress () {
      // 为了避免每次绘制的时候出现一些奇奇怪怪的问题，比如拖影之类的，每次绘制之前清空一次绘布
      this.ctx.clearRect(0, 0, this.canvasW, this.canvasH)
      // 外环
      let outRunCircle = {
        ctx: this.ctx,
        x: this.centerX, // 圆心 x, y
        y: this.centerY, 
        radius: this.canvasH / 2 - (this.canvasW / 20), //半径比canvas高的一半要小
        lineWidth: this.canvasW / 30,  // 圆环宽度
        startAngle: Math.PI * 0.75,
      }
      // 外环背景
      let outCircle = {
        ctx: this.ctx,
        x: this.centerX,
        y: this.centerY, 
        radius: this.canvasH / 2 - (this.canvasW / 20),
        lineWidth: this.canvasW / 30,
        color: this.callReportData.exception_cnt ? '#f3f3f3' : '#69e172',
        startAngle: Math.PI * 0.75,
        endAngle: Math.PI * 2 + Math.PI * 0.25
      }
      // 内环背景
      let smallCircle = {
        ctx: this.ctx,
        x: this.centerX,
        y: this.centerY,
        startAngle: 0,
        endAngle: Math.PI * 2,
        color: '#f3f3f3',
        radius: this.canvasH / 2 - (this.canvasW / 10),
        lineWidth: (this.canvasW / 100)
      }
      // 内环
      let smallRunCircle = {
        ctx: this.ctx,
        x: this.centerX,
        y: this.centerY,
        radius: this.canvasH / 2 - (this.canvasW / 10),
        lineWidth: (this.canvasW / 200),
        startAngle: Math.PI * 0.75,
      }
      // 内环背景
      this.drawCircle(smallCircle)
      // 内环
      // 内环渐变色
      let smallGrd = this.ctx.createLinearGradient(this.canvasW / 2, 0, 0, this.canvasH)
      smallGrd.addColorStop(0, '#fb4434')
      smallGrd.addColorStop(1, '#fff')
      smallRunCircle.color = smallGrd
      smallRunCircle.endAngle = this.pointerAngle
      this.drawCircle(smallRunCircle)
      // 外环背景
      this.drawCircle(outCircle)

      // 外环
      outRunCircle.endAngle = this.pointerAngle
      // 圆环的渐变色
      let grd = this.ctx.createLinearGradient(this.canvasW / 2, 0, 0, this.canvasH)
      grd.addColorStop(0, '#fa4b3e')
      grd.addColorStop(1, '#fff')
      outRunCircle.color = grd
      this.drawCircle(outRunCircle)
      this.circlingPointer()
    },
    /**
     * 运动指针
     * 内环和外环指针、
     * rotate旋转时一切都以圆心为圆点，x为到圆心的距离，y为左右
     */
    circlingPointer () {
      let dotDistance = this.canvasH / 2 - (this.canvasW / 10) // 距圆心距离
      this.ctx.save()
      this.ctx.translate(this.centerX, this.centerY)//原点移动到画布中央
      // 以原点为中心进行旋转pointerAngle的角度
      this.ctx.rotate(this.pointerAngle)
      // 绘制一个指针
      this.ctx.beginPath()
      this.ctx.moveTo(dotDistance, -(this.canvasW / 100))
      this.ctx.lineTo(dotDistance + this.canvasW / 50, 0)
      // 指针底部的半圆开始为Math.PI * 0.5结束角度为Math.PI * 1.5
      this.ctx.arc(dotDistance, 0, this.canvasW / 100, Math.PI * 0.5, Math.PI * 1.5, false)
      this.ctx.lineTo(dotDistance, this.canvasW / 100)
      this.ctx.fillStyle = this.callReportData.exception_cnt ? '#fc1d2d' : '#fff'
      this.ctx.fill()
      this.ctx.closePath()
      // 绘制内环白色圆点
      this.ctx.beginPath()
      this.ctx.arc(dotDistance, 0, this.canvasW / 200, 0, Math.PI * 2, false)
      this.ctx.fillStyle='#fff'
      this.ctx.fill()
      this.ctx.closePath()
      // 绘制外环白色圆点
      this.ctx.beginPath()
      this.ctx.arc(this.canvasH / 2 - (this.canvasW / 20), 0, this.canvasW / 80, 0, 2 * Math.PI, true)
      this.ctx.fillStyle='#fff'
      this.ctx.fill()//填充
      this.ctx.restore()//回到未改变坐标的状态
    },
    // 画圆
    drawCircle (circleObj) {
      let ctx = circleObj.ctx
      ctx.beginPath()
      ctx.arc(circleObj.x, circleObj.y, circleObj.radius, circleObj.startAngle, circleObj.endAngle)
      //设定曲线粗细度
      ctx.lineWidth = circleObj.lineWidth
      //给曲线着色
      ctx.strokeStyle = circleObj.color
      //连接处样式
      ctx.lineCap = 'round'
      //给环着色
      ctx.stroke()
      ctx.closePath()
    }
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./report-call.scss";
</style>