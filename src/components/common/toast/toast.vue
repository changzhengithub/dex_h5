<template>
<!-- s 全局提示框 -->
  <section class="toast">
    <div class="toast-content">{{ content }}</div>
  </section>
<!-- e 全局提示框 -->
</template>

<script>
// 主要就改了 data
export default {
  name: 'ToastComponent',
  data() {
    return {
      content: '',
      duration: 1000
    }
  },
  mounted() {
    setTimeout(() => {
      this.$destroy(true)
      this.$el.parentNode.removeChild(this.$el)
    }, this.duration)
  }
}
</script>
<style lang="scss" scoped>
  @import "./toast.scss";
</style>
