<template>
  <el-container id="app">
    <el-header class="top-nav">
      <span class="title">Harrison<span class="title-suffix">管理后台</span></span>
    </el-header>
    <el-container style="margin-top:5px;">
      <el-aside class="left-side">
        <el-menu
          :default-active="defaultActive"
          class="menu"
          :router="true"
          @open="_openMenu"
          @close="_closeMenu"
          text-color="#000"
          background-color="#fff"
          active-text-color="#20b2aa">
          <el-submenu index="1">
            <template slot="title">
              <span>小程序</span>
            </template>
            <el-submenu index="hari-msg">
              <template slot="title">harrison</template>
              <el-menu-item index="index">首页</el-menu-item>
              <el-menu-item index="article">文章</el-menu-item>
              <el-menu-item index="msg">评论</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <span>公众号</span>
            </template>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main"><router-view/></el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
      defaultActive: ''
    }
  },
  watch: {
    '$route': {
      handler (to, from) {
        console.log(`路由从`, from, '到', to.name)
        switch (to.name) {
          case 'hari-mg-index':
            this.defaultActive = 'index'
            break
          case 'hari-mg-article':
            this.defaultActive = 'article'
            break
          case 'hari-mg-msg':
            this.defaultActive = 'msg'
            break
        }
      },
      immediate: true
    }
  },
  methods: {
    _openMenu () {},
    _closeMenu () {}
  }
}
</script>
<style lang="stylus">
@import "~@/assets/style/variable.styl"
#app {
  background $main-color
  font-weight 400
  .top-nav{
    /*border-bottom 1px solid #eee*/
    /*background $main-color*/
    background #fff
/*    border-bottom 1px solid #ccc*/
    box-shadow: 0 2px 3px hsla(0,0%,7%,.1), 0 0 0 1px hsla(0,0%,7%,.1);
    // -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    // box-shadow: 0 2px 12px 0 rgba(0,0,0,.9);
    display flex
    justify-content center
    align-items center
    .title{
      color $active-color
      font-weight 300
      font-size 20px
      letter-spacing 1px
      transform scale(1,1)
      .title-suffix{
        color #000
      }
    }
  }
  .left-side{
    background #fff
    .menu{
      height 100%
      border-right none
    }
  }
  .main{
    // background #f5f5f5
  }
}
</style>
