export const getImgList = (state) => {
  const imgList = state.cacheImgList

  const result = []
  Object.keys(imgList).forEach((key) => {
    result.push({
      key,
      list: imgList[key]
    })
  })
  return result
}

export const getImgTag = (state) => {
  return Object.keys(state.cacheImgList)
}

export const getAvatar = (state) => state.avatar

export const getSearch = (state) => state.searchList.slice(0, 10)

export const getUserName = (state) => state.username

export const getProvince = (state) => state.province

export const getCity = (state) => state.city

export const getArea = (state) => state.area

export const getAddress = (state) => state.address

export const getActualAddress = (state) => state.actualAddress
