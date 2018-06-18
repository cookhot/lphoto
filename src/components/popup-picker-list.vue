<template>
  <div class="l-popup-picker-wrapper" ref="wrapper" :style="pickerStyle" >
    <div class="l-popup-picker-checked" ref="checked" :style="checkedStyle"></div>
    <div class="l-popup-picker-container" ref="container">
      <ul class="l-popup-picker-list" ref="picker-list">
        <li v-for="(item, i) of data" :key="i" :class="{'selected': currentIndex === i}" >{{item[textField]}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import Scroll from '@/common/js/scroll'

const height = 48

// TODO 考虑边界情况
export default {
  props: {
    size: { // 默认展示个数
      type: Number,
      default: 5
    },
    topOffsetSize: {
      type: Number,
      default: 2
    },
    value: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      default () {
        return []
      }
    },
    valueField: String, // 实际值
    textField: String // 展示值
  },
  data () {
    return {
      currentValue: '',
      currentIndex: 0
    }
  },
  computed: {
    pickerStyle () {
      return {
        height: `${this.size * height}px`
      }
    },
    checkedStyle () {
      return {
        top: `${this.topOffsetSize * (100 / this.size)}%`
      }
    }
  },
  created () {
    this.initValueAndIndex(this.value)
  },
  // 根据数据实时刷新, 重新初始化
  mounted () {
    const vm = this
    const container = this.$refs['container']
    const $scroll = this._scroll = new Scroll(container, {
      startX: 0,
      startY: height * (this.topOffsetSize - this.currentIndex),
      maxHeight () {
        return height * vm.topOffsetSize
      },
      minHeight () {
        return height * (vm.size - vm.topOffsetSize) - this.container.offsetHeight
      }
    })

    $scroll.on('startScroll', (e) => {
      if ($scroll.minHeight > $scroll.y || $scroll.maxHeight < $scroll.y) {
        e.preventDefault()
      }
    })

    $scroll.on('endScroll', (e) => {
      const index = Math.round(($scroll.maxHeight - $scroll.y) / height)
      this.currentValue = this.data[index][this.valueField]
      this.currentIndex = index
      $scroll.y = $scroll.maxHeight - index * height
      $scroll.translate(0, $scroll.y)
      this.$emit('input', this.currentValue)
    })
  },
  watch: {
    // 数据发生变化
    data () {
      this.initValueAndIndex(this.currentValue)

      this.$nextTick(() => {
        this._scroll.refresh()
        this._scroll.translate(0, height * (this.topOffsetSize - this.currentIndex))
      })
    }
  },
  methods: {
    getValueIndex (val) {
      return this.data.findIndex((item) => {
        return item[this.valueField] === val
      })
    },
    initValueAndIndex (currentValue) {
      // 首先看currentValue 是否存在 this.data 中
      let index = this.getValueIndex(currentValue)
      let value = currentValue

      // 发生了数据改变，通知上一级
      if (index < 0 && this.data.length) {
        index = 0
        value = this.data[index][this.valueField]
        this.$emit('input', value)
      }

      if (index >= 0) {
        this.currentValue = value
        this.currentIndex = index
      }
    }
  }
}
</script>

<style lang="scss">
  @import "@/common/scss/variable.scss";
  @import "@/common/scss/mixins.scss";

  $font-sise: 16px;

  .l-popup-picker {

    &-wrapper {
      position: relative;
      overflow: hidden;
      flex: 1;

      background: linear-gradient(rgba(234,234,234,0.3), rgba(90, 87, 87, 0.8), rgba(234,234,234,0.3));

      & li {
        font-size: $font-sise;
        position: relative;
        z-index: 1;
        height: 48px;
        align-items: center;
        justify-content: center;
      }
    }

    &-container {
      height: 100%
    }

    &-list {
      @include clear-default-style;
      text-align: center;
      color: #ccc;
    }

    &-checked {
      opacity: 0.6;
      position: absolute !important;
      background: #ddd;
      width: 100%;
      z-index: 0;
      left: 0;
      height: $font-sise * 3;
      width: 100%;
    }
  }
</style>
