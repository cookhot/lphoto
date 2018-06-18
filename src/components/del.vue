<template>
  <span class="l-cell-del" @click="del(lkey)">x</span>
</template>
<script>
export default {
  name: 'l-del',
  props: ['lkey'],
  methods: {
    del (key) {
      this.$emit('del', key)
    }
  }
}
</script>

<style lang="scss">
  .l-cell-del {
    position: absolute;
    right: 0;
    top: 0;
    margin-top: -10px;
    margin-left: -14px;
    background: #756e6e;
    border-radius: 50%;
    font-size: 20px;
    color: #fff;
    padding: 0 5px;
    font-weight: 700;
  }
</style>
