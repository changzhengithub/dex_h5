<template>
  <!-- s 上拉加载 -->
  <section class="load" :style="{background: infiniteStyle.bgColor}" ref="scroll" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="100">
    <div class="loading"  v-show="isShowLoad">
      <p class="loading-tip" :style="{color: infiniteStyle.textColor}">{{loadTip}}</p>
    </div>
  </section>
  <!-- e 上拉加载 -->
</template>
<script>
export default {
  name: 'InfiniteScroll',
  props: ['busy', 'loadTip', 'isShowLoad', 'infiniteStyle'],
  data () {
    return {}
  },
  created () {
  },
  methods: {
    loadMore () {
      this.$emit('LOADMORE_EVENT')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "./infinite-scroll.scss";
</style>
