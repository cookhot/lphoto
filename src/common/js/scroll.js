/* 简化的滚动库, 参考于 better-scroll */
import { $ } from './utils'
import EventEmitter from 'event-emitter-es6'

export const inBrowser = typeof window !== 'undefined'
export const ua = inBrowser && navigator.userAgent.toLowerCase()
export const isWeChatDevTools = ua && /wechatdevtools/.test(ua)
export const isAndroid = ua && ua.indexOf('android') > 0
export const hasTouch = inBrowser && ('ontouchstart' in window || isWeChatDevTools)

const _start = Symbol('start')
const _move = Symbol('move')
const _end = Symbol('_end')
const _resize = Symbol('_resize')
const _transitionEnd = Symbol('_transitionEnd')

class Scroll extends EventEmitter {
  constructor (el, options) {
    super({emitDelay: 0})
    this.el = $(el)
    this.container = $(el.children[0])
    this.options = Object.assign({ vertical: true, horizontal: false }, options)
    this.init()
  }

  init (x = 0, y = 0) {
    this.enable = true
    this.x = this.options.startX ? this.options.startX : x
    this.y = this.options.startY ? this.options.startY : y
    // 可以设置初始化位置
    this.vertical = this.options.vertical
    this.horizontal = this.options.horizontal // 水平

    this.refresh()

    this.translate(this.x, this.y)
    this.initEvents()
  }

  initEvents () {
    // 事件处理
    const options = this.options

    window.addEventListener('orientationchange', this)
    window.addEventListener('resize', this)

    if (options.click) {
      this.container.addEventListener('click', this)
    }

    // 只处理 touch 事件
    if (hasTouch && !this.options.disableTouch) {
      this.container.addEventListener('touchstart', this)
      this.container.addEventListener('touchmove', this)
      this.container.addEventListener('touchcancel', this)
      this.container.addEventListener('touchend', this)
    }
  }

  handleEvent (e) {
    switch (e.type) {
      case 'touchstart':
      case 'mousedown':
        this[_start](e)
        break
      case 'touchmove':
      case 'mousemove':
        this[_move](e)
        break
      case 'touchend':
      case 'mouseup':
      case 'touchcancel':
      case 'mousecancel':
        this[_end](e)
        break
      case 'orientationchange':
      case 'resize':
        this[_resize]()
        break
      case 'transitionend':
      case 'webkitTransitionEnd':
      case 'oTransitionEnd':
      case 'MSTransitionEnd':
        this[_transitionEnd](e)
        break
    }
  }

  [_start] (e) {
    if (this.initiated) {
      return
    }

    if (!this.enable) {
      return
    }

    this.initiated = true

    // dist 是记录本次移动水平与垂直距离
    this.distX = 0
    this.distY = 0

    this.startTime = Date.now()

    let point = e.touches ? e.touches[0] : e

    this.startX = this.x // 开始位置, this.x 会随着滑动而变化
    this.startY = this.y // 开始位置

    this.emit('startScroll', e)

    this.pointX = point.pageX
    this.pointY = point.pageY
  }

  [_move] (e) {
    // 初始化
    if (!this.initiated) {
      return
    }

    if (!this.enable) {
      return
    }

    let point = e.touches ? e.touches[0] : e
    let deltaX = point.pageX - this.pointX
    let deltaY = point.pageY - this.pointY

    this.pointX = point.pageX
    this.pointY = point.pageY

    // distX distY 移动垂直距离
    this.distX += deltaX
    this.distY += deltaY

    // 处理水平与垂直滚动方向问题
    if (!this.vertical) {
      this.distY = 0
    }

    if (!this.horizontal) {
      this.distX = 0
    }

    this.x = this.startX + Math.floor(this.distX)
    this.y = this.startY + Math.floor(this.distY)

    // 派发事件, 以及事件处理
    this.emit('scroll', e)

    if (this.minHeight > this.y) {
      this.y = this.minHeight
    }

    if (this.maxHeight < this.y) {
      this.y = this.maxHeight
    }

    this.translate(this.x, this.y)
  }

  [_end] (e) {
    if (!this.initiated) {
      return
    }

    if (!this.enable) {
      return
    }

    this.initiated = false

    this.startX = this.x
    this.startY = this.y

    this.emit('endScroll', e)
  }

  [_resize] () {
    // TODO resize
  }

  [_transitionEnd] () {
    // TODO __transitionEnd
  }

  refresh () {
    // 更好的优化
    if (typeof this.options.minHeight === 'function') {
      this.minHeight = this.options.minHeight.call(this)
    } else if (typeof this.options.minHeight === 'number') {
      this.minHeight = this.options.minHeight
    } else {
      this.minHeight = 0 - this.container.offsetHeight
    }

    if (typeof this.options.maxHeight === 'function') {
      this.maxHeight = this.options.maxHeight.call(this)
    } else if (typeof this.options.maxHeight === 'number') {
      this.maxHeight = this.options.maxHeight
    } else {
      this.maxHeight = 0
    }
  }

  // 关闭滚动
  disable () {
    this.enable = false
  }

  // 开启滚动
  enable () {
    this.enable = true
  }

  translate (x, y) {
    this.x = x
    this.y = y
    // x, y 的位置还是需要 好好设计与考虑
    // 暂时无动画， 可以更好的处理
    this.el.style.transform = `translate(${x}px, ${y}px)translateZ(0)`
  }
}

export default Scroll
