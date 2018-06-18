<template>
  <l-list @enter="enter" :bgColor="bgColor">
    <cell-box v-for="(key, i) of data" :key="i" @click.native="select(key, $event)">
      {{key}}
    </cell-box>
  </l-list>
</template>

<script>
import LList from './list'
import { CellBox } from 'vux'

export default {
  name: 'l-auto-complete',
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
  methods: {
    enter (event) {
      this.$emit('enter', event)
    },

    select (key) {
      this.$emit('select', key)
    }
  },
  components: {
    LList,
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
