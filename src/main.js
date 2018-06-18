import Vue from 'vue'
import store from './store'
import App from './App.vue'
import router from './router'
import FastClick from 'fastclick'
import init from './init'
import { _tabs } from './config'

init(Vue)

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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  mixins: [_tabs],
  components: { App },
  render: function (h) {
    let props = {}
    const tabs = this.tabs || []
    const tabIndex = this.tabIndex || 0
    if (tabs.length) {
      props = {tabs, tabIndex}
    }
    return h(App, {props})
  }
})
