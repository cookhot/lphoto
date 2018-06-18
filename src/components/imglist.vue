<template>
  <div class="img-list">
    <img v-for="(item, i) of getImgs" class="l-i-img" :key="item[lkey] ? item[lkey]: i"  v-lazy="item[url]"
         @click="select(item)"/>
  </div>
</template>

<script>
// TODO 删除
export default {
  name: 'l-imglist',
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    },
    url: String,
    lkey: String
  },
  computed: {
    getImgs () {
      return this.data
    }
  },
  methods: {
    select (item) {
      this.$emit('select', item)
    }
  }
}
</script>

<style>
  .l-i-img {
    width: 100%;
  }
</style>
