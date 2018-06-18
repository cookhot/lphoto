<template>
  <div class="scroll" ref="scrollEl" :class="scrollClass"
       @touchmove="move" @touchstart="start"  @scroll="scroll" @touchend="end">
    <slot></slot>
  </div>
</template>
<script>
/* 自己手写滚动组件 */
const scrollClass = 'l-scroll'

export default {
  name: 'l-scroll',
  props: {
    selfClass: String,
    enable: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      up: true, // 锁
      down: true
    }
  },
  computed: {
    scrollClass () {
      return [scrollClass, this.selfClass]
    }
  },
  methods: {
    // TODO 待优化, 滚动处理
    start (event) {
      if (!this.enable) {
        event.preventDefault()
        return false
      }
      const events = event.touches[0] || event
      const elTarget = event.target
      if (!elTarget) {
        return false
      }

      this.posY = events.pageY
    },

    move (event) {
      const events = event.touches[0] || event
      const scrollTop = this.$el.scrollTop
      const scrollHeight = this.$el.scrollHeight
      const clientHeight = this.$el.clientHeight
      const distanceY = events.pageY - this.posY

      if (distanceY > 30 && scrollTop === 0 && this.up) {
        this.up = false
        this.$emit('pullUp')
      }

      if (distanceY < -30 && (scrollHeight - scrollTop - clientHeight) < 30 && this.down) {
        this.down = false
        this.$emit('pullDown')
      }
    },

    end (event) {
      this.up = true
      this.down = true
    },

    scroll (event) {
      this.$emit('scroll', event)
    }
  }
}
</script>

<style>
  .scroll {
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }
</style>
