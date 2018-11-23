import { baseUrl } from '../base/api'

const formatting = [{val: 60, unit: '分钟'},
  {val: 24, unit: '小时'},
  {val: 30, unit: '天'},
  {val: 12, unit: '月'},
  {val: 1000, unit: '年'}]
// 格式化展示时间 分、小时、天、月、年
const formattingTime = (time) => {
  let _time = 0
  if (isNaN(time) === true) {
    _time = (Date.now() - new Date(time)) / 60000
  } else {
    _time = (Date.now() - time) / 60000
  }

  let timeStr = '刚刚'
  for (let format of formatting) {
    if (_time < 1) {
      break
    }
    if (_time < format.val) {
      timeStr = `${Math.floor(_time)}${format.unit}前`
      break
    } else {
      _time = _time / format.val
    }
  }
  return `${timeStr}`
}

const filterAvatar = (name) => {
  if (name) {
    return `${baseUrl}/${process.env.AVATAR_SERVER_PATH}/${name}`
  }
  return ''
}

const filterImg = (name) => {
  if (name) {
    return `${baseUrl}/${process.env.IMG_SERVER_PATH}/${name}`
  }
  return ''
}

const plugin = {
  install (Vue) {
    Vue.filter('formattingTime', formattingTime)
    Vue.filter('filterAvatar', filterAvatar)
    Vue.filter('filterImg', filterImg)
  }
}

export default plugin
