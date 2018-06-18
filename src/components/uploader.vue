<template>
  <div class="l-uploader-wrapper">
    <input type="file" :multiple="multiple" :disabled="disabled" :name="name" :accept="accept" @change="handleInputChange">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'l-uploader',
  props: {
    name: String,
    disabled: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    accept: String
  },
  methods: {
    // 事件传递参数只有一个
    handleInputChange (event) {
      const files = event.target.files
      this.$emit('upload', files, event)
    }
  }
}
</script>
<style lang="scss">
  .l-uploader {
    &-wrapper {
      overflow: hidden;
      position: relative;
      line-height: 1;

      input[type=file] {
        height: 100%;
        width: 300%;
        position: absolute;
        left: -200%;
        opacity: 0;
        z-index: 1;
        line-height: 1;
      }
    }
  }
</style>
