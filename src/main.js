// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store'
import axios from 'axios'
import VueLazyload from 'vue-lazyload'
import App from './App.vue'
import router from './router'
import errorImg from '@/common/img/error.png'
import loadingImg from '@/common/img/default.png'
import { ToastPlugin, AlertPlugin } from 'vux'
import FastClick from 'fastclick'
import filters from '@/base/filters'
import mixins from '@/base/mixins'
import 'font-awesome/scss/font-awesome.scss'
import '@/common/scss/normalize.scss'
import '@/common/scss/base.scss'

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: errorImg,
  attempt: 1,
  loading: loadingImg,
  listenEvents: [ 'scroll' ]
})

Vue.use(ToastPlugin)

Vue.use(AlertPlugin)

Vue.use(filters)

Vue.use(mixins)

// 添加fastClick
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', () => {
    FastClick.attach(document.body)
  }, false)
}

// 修复safari 能够拖动的Bug, 见https://stackoverflow.com/questions/37808180/disable-viewport-zooming-ios-10-safari
document.documentElement.addEventListener('touchstart', function (event) {
  if (event.touches.length > 1) {
    event.preventDefault()
  }
}, false)

Vue.prototype.$ajax = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  data: {
    tabs: [
      {id: 0, title: '首页', path: '/index'},
      {id: 1, title: '珍藏', path: '/favorite'},
      {id: 2, title: '评论', path: '/comments'},
      {id: 3, title: '用户', path: '/setting'}
    ],
    tabIndex: 0
  },
  components: { App },

  // beforeMount 只是在初始化执行一次
  beforeMount () {
    // 考虑其他的方案，处理首屏选中问题
    // 考虑到有子组件加载的时候
    // let route = this.$route
    // let regex = route.matched[0].regex
    // this.tabs.forEach((tab) => {
    //   if (regex.test(tab.path)) {
    //     tab.selected = true
    //   }
    // })
  },
  render: function (h) {
    return h(App, {props: {tabs: this.tabs, tabIndex: this.tabIndex}})
  }
})
