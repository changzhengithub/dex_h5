export default class Url {
  static GetInviteCommodityList = '/Customer/GetInviteCommodityList' // 助力任务列表
  static GetInviteCustomerDetail = '/Customer/GetInviteCustomerDetail' // 助力任务详情
  static GetPostAddress = '/Customer/GetPostAddress' // 获取用户地址
  static AddInviteTask = '/Customer/AddInviteTask' // 发起助力任务分享
  static GetCusInviteCommodityList = '/Customer/GetCusInviteCommodityList' // 我的助力任务列表
  static InviteTaskConvert = '/Customer/InviteTaskConvert' // 申请兑换助力礼品
  static GetCusCheckin = '/Customer/GetCusCheckin' // 签到首页
  static AddCusCheckin = '/Customer/AddCusCheckin' // 用户签到
  static GetCoupons = '/Customer/GetCoupons/' // 可领取优惠券
  static ConvertCoupons = '/Customer/ConvertCoupons' // 金币兑换
  static GetQrCode = '/Customer/GetQrCode' // 获取邀请分享二维码
  static GetTopCusVipCash = '/Customer/GetTopCusVipCash' // 邀请排行榜
  static GrapheCode = '/Common/GrapheCode' // 图形验证码
  static SendSMS = '/Common/SendSMS' // 短信验证码
  static IsNewCustomer = '/Customer/IsNewCustomer' // 验证新老用户
  static InviteRegister = 'Home/InviteRegister' // 注册
  static GetCommodityDetail = '/Home/GetCommodityDetail' //商品详情
  static GetHomeSubject = '/Home/GetHomeSubject/' // 主题栏目详情
  static FAQ = '/Mall/FAQ' // 常见问题
  static CommodityParams = '/Mall/CommodityParams' // 商品参数
  static CommodityExplain = '/Mall/CommodityExplain' // 商品说明
  static GetKdniaoTimelyInfo = '/Kdniao/GetKdniaoTimelyInfo' // 获取物流信息
  static WeiXinLogin = '/WxOAuth/Start' // 微信判断新老用户
  static GetOneRMBAndHotMallList = '/Customer/GetOneRMBAndHotMallList' // 一元购 9.9专区 
  static GetPhoneReport = '/Customer/GetPhoneReport' // 获取通话报告
  static GetBlackReport = '/Customer/GetBlackReport' // 获取黑名单报告
  static GetMultiLoanReport = '/Customer/GetMultiLoanReport' // 获取多头借贷报告
  static GetCreditReport = '/Customer/GetCreditReport' // 报告查询
  // 贷超接口
  static productList = '/ox/api/mt/productList.do' // 获取贷超分类产品
  static productInfo = '/ox/api/mt/productInfo.do' // 获取贷超产品注册地址
  static drawCount = '/OX/api/wheel/drawCount.do' // 抽奖次数，抽奖金币查询接口
  static luckDraw = '/OX/api/wheel/luckDraw.do' // 抽奖接口

}