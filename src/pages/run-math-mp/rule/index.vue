<template>
  <div class="page rule-page">
    <el-card class="rule-card">
      <div slot="header">
        <span>规则设置</span>
        <span :class="['submit-state', 'state-' + updateState]">{{updateStateMsg}}</span>
      </div>
      <el-form ref="form" :model="form" label-width="170px" class="form">
        <el-form-item label="数学币汇率：">
          <my-input-number size="medium" v-model="form.step" @change="_inputNumberChange" @input="_handleInput" :min="1" :max="10000" :step="100" label="多少步数"></my-input-number>
          <span class="input-number-suffix">步</span>
          <span class="exchange">可兑换</span>
          <my-input-number size="medium" v-model="form.coin" @change="_inputNumberChange" :min="1" label="多少数学币"></my-input-number>
          <span class="input-number-suffix">数学币</span>
        </el-form-item>
        <el-form-item label="兑换步数上限：">
          <my-input-number size="medium" v-model="form.stepLimit" @change="_inputNumberChange" :min="1" :max="100000" :step="100" label="兑换上限"></my-input-number>
          <span class="input-number-suffix">步</span>
          <span class="rule-hint">(所有步数当日24:00清空)</span>
        </el-form-item>
        <el-form-item label="分享次数上限：">
          <my-input-number size="medium" v-model="form.shareLimit" @change="_inputNumberChange" :min="1" :max="200" :step="1" label="分享次数"></my-input-number>
          <span class="input-number-suffix">次/日</span>
        </el-form-item>
        <el-form-item label="分享奖励：">
          <my-input-number size="medium" v-model="form.shareCoin" @change="_inputNumberChange" :min="1" :max="100000" :step="1" label="分享奖励"></my-input-number>
          <span class="input-number-suffix">数学币/次</span>
        </el-form-item>
        <el-form-item label="规则文本：">
          <!--<el-input-->
            <!--type="textarea"-->
            <!--:rows="4"-->
            <!--placeholder="请输入内容"-->
            <!--v-model="form.textarea">-->
          <!--</el-input>-->
          <vue-html5-editor :content="form.ruleText" :height="360" :z-index="1000"
                  :auto-height="true" :show-module-name="true" @change="_editorChange"></vue-html5-editor>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import MyInputNumber from '@/components/input-number'
import {rule as api} from '@/api'
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
          name
        }
        if (name === 'step_change_value') {
          params.step = this.form.step
          params.value = this.form.coin
        } else if (name === 'dayly_step_change_limit') {
          params.value = this.form.stepLimit
        } else if (name === 'dayly_share_limit') {
          params.value = this.form.shareLimit
        } else if (name === 'share_coin') {
          params.value = this.form.shareCoin
        } else if (name === 'custom_service_content') {
          // todo
        } else if (name === 'active_rule') {
          params.valueText = this.form.ruleText
        }
        // console.log('params', params)
        try {
          this.updateState = 2
          await api.updateRule(params)
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
  components: {
    MyInputNumber
  },
  data () {
    return {
      form: {
        step: undefined,
        coin: undefined,
        stepLimit: undefined,
        shareLimit: undefined,
        shareCoin: undefined,
        ruleText: undefined
      },
      init: false,
      timeFlag: null,
      lastTime: 0,
      updateState: 0
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
    'form.step': _createWatchObj('step_change_value'),
    'form.coin': _createWatchObj('step_change_value'),
    'form.stepLimit': _createWatchObj('dayly_step_change_limit'),
    'form.shareLimit': _createWatchObj('dayly_share_limit'),
    'form.shareCoin': _createWatchObj('shareCoin'),
    'form.ruleText': _createWatchObj('active_rule')
  },
  methods: {
    _inputNumberChange (v) {
      // console.log('inputNumber', v)
    },
    _handleInput (e) {
      // console.log('inputfsaf', e)
    },
    _editorChange (e) {
      // console.log(e)
      this.form.ruleText = e
    },
    async _fetchRules () {
      this.init = false
      const result = await api.getRules()
      for (let i = 0; i < result.data.length; i++) {
        let rule = result.data[i]
        console.log(rule.name)
        switch (rule.name) {
          case 'step_change_value':
            this.form.step = rule.step
            this.form.coin = rule.value
            break
          case 'dayly_step_change_limit':
            this.form.stepLimit = rule.value
            break
          case 'dayly_share_limit':
            this.form.shareLimit = rule.value
            break
          case 'share_coin':
            this.form.shareCoin = rule.value
            break
          case 'custom_service_content':
            // todo
            break
          case 'active_rule':
            this.form.ruleText = rule.valueText
            break
        }
      }
      this.init = true
      console.log(result.data)
    },
    onSubmit () {
      // console.log('submit!')
    }
  },
  mounted () {
    console.log('mounted')
    this._fetchRules()
  }
}
</script>
<style lang="stylus" scoped>
  @import "~@/assets/style/variable.styl"
  .rule-page{
    .submit-state{
      padding-left 30px
      font-size 13px
      &.state-1{ // 正在修改
        color $active-color
      }
      &.state-2{ // 正在保存
        color $active-color
      }
      &.state-3{ // 已保存
        color #999
      }
      &.state-4{ // 保存失败
        color darkred
      }
    }
    .form{
      .exchange{
        font-size 18px
        padding 0 30px
        color $active-color
      }
      .input-number-suffix{
        font-size 16px
      }
      .rule-hint{
        color #888
        padding-left 15px
        font-size 15px
      }
    }
  }
</style>
