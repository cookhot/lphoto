<template>
  <div class="l-list" :style="styles" @touchstart="enter" >
    <slot></slot>
  </div>
</template>

<script>
// TODO 删除
import { CellBox } from 'vux'

export default {
  name: 'l-list',
  props: {
    bgColor: {
      type: String,
      default: '#fff'
    },
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    styles () {
      return {
        background: `${this.bgColor}`
      }
    }
  },
  methods: {
    enter (event) {
      this.$emit('enter', event)
    }
  },
  components: {
    CellBox
  }
}
</script>

<style lang="scss" scoped>
  .l-list {
    .weui-cells {
      margin-top: 0;
    }
  }
</style>
