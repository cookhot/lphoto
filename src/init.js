import VueLazyload from 'vue-lazyload'
import filters from '@/base/filters'
import mixins from '@/base/mixins'
import { ToastPlugin, AlertPlugin } from 'vux'
import errorImg from '@/common/img/error.png'
import loadingImg from '@/common/img/default.png'
import axios from 'axios'

import 'font-awesome/scss/font-awesome.scss'
import '@/common/scss/normalize.scss'
import '@/common/scss/base.scss'

// TODO 优化 加载图片和错误图片
export default (Vue) => {
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

  Vue.prototype.$ajax = axios
}
