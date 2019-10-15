<template>
<!-- s 摘要 -->
  <section class="summary" :class="{active: summary.title}">
    <div class="summary-title" v-if="summary.title"><span>{{summary.title}}</span></div>
      <div class="summary-img">
        <div :class="item.className" v-for="(item, index) in summary.imgSrcList" :key="index">
          <img class="item-icon" :src="item.imgSrc">
        </div>
      </div>
      <div class="summary-text">
        <div class="text" v-for="(item, index) in summary.textList" :key="index"><span>{{item}}</span></div>
      </div>
  </section>
<!-- e 摘要 -->
</template>

<script>
export default {
  name: 'SummaryComponent',
  props: ['summary'],
  data () {
    return {}
  },
  methods: {}
}

</script>

<style lang="scss" scoped>
  @import "./summary.scss";
</style>
