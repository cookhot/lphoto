import storage from '@/base/localStorage'

const ADDRESS_LIST = `address_list`

export const getAddressMap = () => {
  return new Promise((resolve) => {
    if (!storage.getItem(ADDRESS_LIST)) {
      import('@/common/address.js').then((data) => {
        storage.setItem(ADDRESS_LIST, JSON.stringify(data.default))
        resolve(data.default)
      })
    } else {
      // 这里也是可以考虑优化的
      resolve(JSON.parse(storage.getItem(ADDRESS_LIST)))
    }
  })
}
