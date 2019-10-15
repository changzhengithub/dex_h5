<template>
  <!-- s 模态框 -->
  <section class="modal" @touchmove="stopScroll($event)" @click="closeModal">
    <div class="modal-content">
      <div class="content-bg"></div>
      <div class="content-main">
        <slot></slot>
      </div>
    </div>
  </section>
  <!-- e 模态框 -->
</template>

<script>
export default {
  name: 'Modal',
  data () {
    return {}
  },
  methods: {
    stopScroll (e) {
      e.preventDefault()
    },
    closeModal () {
      this.$emit('CLOSE_MODAL_EVENT')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "./modal.scss";
</style>
