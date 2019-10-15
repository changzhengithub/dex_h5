<template>
  <div id="app" v-cloak>
    <keep-alive :include="['IndexComponent']">
      <router-view/>
    </keep-alive>
  </div>
</template>

<style lang="scss">

</style>
