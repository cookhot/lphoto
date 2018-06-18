import localStorage from '@/base/localStorage'

const data = {
  cacheImgList: {},
  searchList: [],
  province: '',
  city: '',
  area: '',
  address: '', // 地址信息
  actualAddress: '', // 实时地址
  username: '',
  avatar: '' // 头像
}

// 与本地存储数据合并
const init = (data, storage) => {
  Object.keys(data).forEach((key) => {
    const oldVal = data[key]
    const val = storage.getItem(key)
    if (val) {
      const isString = typeof oldVal === 'string'
      data[key] = isString ? val : JSON.parse(val)
    }
  })
}

init(data, localStorage)

export default data
