<template>
  <div class="page index-page">
    首页
  </div>
</template>
<script>
export default {
  async mounted () {
    try {
      const result = await this.api.harrison.getIndex()
      console.log('result', result)
    } catch (e) {
      console.log(e)
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import "~@/assets/style/variable.styl"
  @import "~@/assets/style/mixin.styl"
</style>
