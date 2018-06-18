import Vue from 'vue'

export const collect = (state, img) => {
  const key = encodeURI(img.key)
  if (!state.cacheImgList[key]) {
    // 添加依赖
    Vue.set(state.cacheImgList, key, [])
  }
  // 收集图片
  state.cacheImgList[key].unshift(img['content'])
}

export const addSearch = (state, name) => { state.searchList.unshift(name) }

export const changeUserName = (state, name) => { state.username = name }

export const changeAddress = (state, { province, city, area, address }) => {
  state.province = province
  state.city = city
  state.area = area
  state.address = address
}

export const changeActualAddress = (state, actualAddress) => {
  state.actualAddress = actualAddress
}

export const changeAvatar = (state, avatar) => { state.avatar = avatar }
