<template>
  <div class="page index-page">
    <el-card class="rule-card">
      <div slot="header">
        <span>规则设置</span>
        <span :class="['submit-state', 'state-' + updateState]">{{updateStateMsg}}</span>
      </div>
      <el-form ref="form" :model="form" label-width="90px" class="form">
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="副标题">
          <el-input v-model="form.subTitle"></el-input>
        </el-form-item>
        <el-form-item label="规则文本：">
          <vue-html5-editor :content="form.content" :height="360" :z-index="1000"
                            :auto-height="true" :show-module-name="true" @change="_editorChange"></vue-html5-editor>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
function _createWatchObj (name) {
  return {
    handler (newV, oldV) {
      if (oldV === undefined) {
        return
      }
      this.updateState = 1
      if (this.timeFlag) {
        clearTimeout(this.timeFlag)
      }
      this.timeFlag = setTimeout(async () => {
        let params = {
          [name]: newV
        }
        try {
          this.updateState = 2
          await this.api.harrison.updateIndex(params)
          this.updateState = 3
        } catch (e) {
          this.updateState = 4
        }
      }, 700)
    },
    deep: true
  }
}
export default {
  data () {
    return {
      form: {
        title: undefined,
        subTitle: undefined,
        content: undefined
      },
      updateState: 0,
      timeFlag: null
    }
  },
  computed: {
    updateStateMsg () {
      switch (this.updateState) {
        case 0:
          return '' // 初始状态
        case 1:
          return '正在修改...'
        case 2:
          return '正在保存...'
        case 3:
          return '已保存'
        case 4:
          return '保存失败，请重试'
      }
    }
  },
  watch: {
    'form.title': _createWatchObj('title'),
    'form.subTitle': _createWatchObj('subTitle'),
    'form.content': _createWatchObj('content')
  },
  methods: {
    _editorChange (e) {
      // console.log(e)
      this.form.content = e
    }
  },
  async mounted () {
    try {
      const result = await this.api.harrison.getIndex()
      this.form = result
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
  .index-page{
  }
</style>
