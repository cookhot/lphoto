import storage from '@/base/localStorage'

export const collectImg = (context, img) => {
  // 需要同步到本地 localstorage 中
  context.commit('collect', img)
}

export const changeUserName = (ctx, userName) => {
  // 同步到localStorage
  try {
    storage.setItem('username', userName)
    ctx.commit('changeUserName', userName)
  } catch (e) {
    console.warn(e)
  }
}

export const changeAddress = (ctx, {province = '', city = '', area = '', address = ''}) => {
  try {
    storage.setItem('province', province)
    storage.setItem('city', city)
    storage.setItem('area', area)
    storage.setItem('address', address)
    ctx.commit('changeAddress', {province, city, area, address})
  } catch (e) {
    console.warn(e)
  }
}

export const changeActualAddress = (ctx, actualAddress) => {
  ctx.commit('changeActualAddress', actualAddress)
}

export const changeAvatar = (ctx, avatar) => {
  try {
    storage.setItem('avatar', avatar)
    ctx.commit('changeAvatar', avatar)
  } catch (e) {
    console.warn(e)
  }
}
