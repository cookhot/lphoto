<template>
  <div :class="classes">
      <slot></slot>
  </div>
</template>

<script>

export default {
  name: 'l-cell',
  props: {
    borderTop: {
      type: Boolean,
      default: false
    },
    borderBottom: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes () {
      return {
        'l-top': this.borderTop,
        'l-bottom': this.borderBottom
      }
    }
  }
}
</script>

<style lang="scss">
  @import "@/common/scss/variable.scss";
  @import "@/common/scss/1px.scss";

  .l-top {
    @include l-px(0, $color-border, 'top');
  }

  .l-bottom {
    @include l-px(0, $color-border, 'bottom');
  }
</style>
