<template>
<!-- s 标题 -->
  <section class="header">
    <div class="header-content">
      <div class="content-back">
        <i class="iconfont iconarrow-left" @click="back"></i>
      </div>
      <span>{{headerProps.title}}</span>
      <div class="content-share" v-if="headerProps.icon">
        <i class="iconfont" :class="headerProps.icon" @click="share"></i>
      </div>
    </div>
  </section>
<!-- e 标题 -->
</template>

<script>
export default {
  props:['headerProps'],
  data() {
    return{}
  },
  methods: {
    back () {
      if (this.headerProps.path === 'index.html' || this.headerProps.path === 'sign.html' || this.headerProps.path === 'invite.html' || this.headerProps.path === 'mine') {
        try {
          if (typeof (JsInterface) !== 'undefined') {
            JsInterface.Goback()
          } else {
            window.webkit.messageHandlers.Goback.postMessage('back')
          }
        } catch (error) {
          this.$toast({
            content: error
          })
        }
      } else {
        this.$router.back(-1)
      }
    },
    share () {
      this.$emit('SHARE_EVENT')
    }
  }
}
</script>
<style scoped lang="scss">
@import './header.scss';
</style>