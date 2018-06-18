const dpr = window.devicePixelRatio || 1

export default function install (Vue) {
  // 使用管道处理图片的大小
  Vue.filter('adapterImg', (value) => {
    return value / dpr
  })
}
