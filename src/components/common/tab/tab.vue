<template>
  <!-- s 底部导航 -->
  <section class="tab">
    <nav class="tab">
      <div class="tab-item" :class="{active: $route.path == '/index.html'}" @click="gotoPage('index')">
        <span>今日免费拿</span>
      </div>
      <div class="tab-item" :class="{active: $route.path == '/mine'}" @click="gotoMine('mine')">
        <span>我的免费拿</span>
      </div>
    </nav>
  </section>
  <!-- e 底部导航 -->
</template>

<script>
export default {
  name: 'TabComponent',
  props: ['path'],
  data () {
    return {}
  },
  methods: {
    gotoPage (page) {
      this.$router.push({
        name: page
      })
    },
    // 跳转到mine,判断是否登录
    gotoMine (page) {
      clearTimeout(initTimer)
      window.Init()
      let initTimer = setTimeout(() => {
        if (window.customerId && window.token) {
          this.$router.push({
            name: page
          })
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
    }
  }
}

</script>

<style lang="scss" scoped>
  @import "./tab.scss";
</style>
