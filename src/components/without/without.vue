<template>
<!-- s 助力-无助力 -->
  <section class="without" @touchmove="touchMove($event)">
    <div class="without-content">
      <div class="content-img">
        <i class="iconfont iconclose" @click="closeWithout"></i>
        <img src="../../assets/image/without.png" alt="暂无助力">
        <div class="img-text">
          <p class="text-title">还没有好友为你助力...</p>
          <p class="text-tip">好友助力不足，赶快去分享助力吧</p>
        </div>
      </div>
    </div>
  </section>
<!-- e 助力-无助力 -->

</template>

<script>
export default {
  name: 'WithoutComponent',
  props: ['path'],
  data () {
    return {}
  },
  methods: {
    closeWithout () {
      this.$emit('CLOSE_WITHOUT_EVENT')
    },
    touchMove (e) {
      e.preventDefault()
    },
    gotoPage (page) {
      this.$router.push({
        name: page
      })
    }
  }
}

</script>

<style lang="scss" scoped>
  @import "./without.scss";
</style>
