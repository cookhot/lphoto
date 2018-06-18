// 先看浏览器支持不支持 localStorage
class Storage {
  constructor () {
    this.data = new Map()
  }

  getItem (key) {
    return this.data.get(key)
  }

  setItem (key, val) {
    const value = typeof val === 'string' ? val : JSON.stringify(val)
    return this.data.set(key, value)
  }

  removeItem (key) {
    this.data.delete(key)
  }
}

export default Storage
