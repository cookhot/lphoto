// 页面刷新时候，tabs准确定位
const plugin = {
  install (Vue) {
    Vue.mixin({
      beforeRouteEnter (to, from, next) {
        next((vm) => {
          const root = vm.$root
          const tabs = root.tabs
          for (let tab of tabs) {
            if (vm.$route.fullPath.indexOf(tab.path) === 0) {
              root.tabIndex = tab.id
              break
            }
          }
        })
      }
    })
  }
}

export default plugin
