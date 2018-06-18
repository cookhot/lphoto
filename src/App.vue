<template>
  <div id="app" class="page" ref="page">
    <main class="l-main">
      <keep-alive>
        <router-view name="index"></router-view>
      </keep-alive>
      <router-view></router-view>
    </main>
    <footer class="l-footer">
      <tab ref="tabs" :value="tabValue" bar-position="top" >
        <tab-item v-for="tab of tabs" :key="tab.id" @on-item-click="itemSelect(tab)">
          {{tab.title}}
        </tab-item>
      </tab>
    </footer>
  </div>
</template>

<script>
/* eslint-disable */
  import { Tab, TabItem } from 'vux'
import io from 'socket.io-client'

import { getParentByClass } from '@/common/js/utils'

const scrollClass = 'l-scroll'

export default {
  props: {
    tabs: {
      type: Array,
      default: () => { return [] }
    },
    tabIndex: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      tabValue: this.tabIndex
    }
  },
  watch: {
    tabIndex (val) {
      this.tabValue = val
    }
  },
  created () {

    // 使用token，防止随意连接
    // 建立 webSocket 连接，处理推送消息
//    const socket = io('http://localhost:3008', {
//      path: '/comment'
//    })
//
//    // 连接成功
//    socket.on('connect', (data) => {
//      console.log('socket 通信成功')
//    })
//
//    // 获取服务端发送过来的消息
//    socket.on('message', (data) => {
//      console.log(data)
//    })
//
//    // 连接异常
//    socket.on('connect_error', () => {
//      this.$vux.toast.show({
//        text: '通信异常',
//        type: 'warn',
//        isShowMask: true
//      })
//    })
//
//    // 重新连接
//    socket.on('disconnect', () => {
//      socket.open()
//    })
//
//    this.socket = socket
  },
  mounted () {
   this.$refs.page.addEventListener('touchmove', (event) => {
      const elTarget = event.target
      if (!elTarget) {
        event.preventDefault()
      }
      const parentEl = getParentByClass(elTarget, scrollClass)

      if (!parentEl) {
        event.preventDefault()
      }
    })
  },
  methods: {
    itemSelect (tab) {
      this.$emit('selectTab', tab)
      this.$router.push(tab.path)
    }
  },
  components: { Tab, TabItem },
  name: 'App'
}
</script>

<style lang="scss" >
  @import "@/common/scss/variable.scss";

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #333;
  }
  .page {
    height: 100%;
    width: 100%;
    position: relative;
  }

  .l-header {
    height: 44px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }

  .l-main {
    padding-bottom: $footer-tab-height;
    height: 100%;
    width: 100%;
  }

  .l-footer {
    height: $footer-tab-height;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: $z-index-0;

    .vux-tab-wrap {
      padding-top: $footer-tab-height;
    }

    .vux-tab-container {
      height: $footer-tab-height;
    }

    .vux-tab {
      height: $footer-tab-height;

      .vux-tab-item {
        line-height: $footer-tab-height;
        font-size: 16px
      }
    }
  }
</style>
