<template>
  <l-uploader :disabled="disabled" accept="image/*" :multiple="true" @upload="upload">
    <div class="l-uploader-default-logo" :style="getStyle"></div>
  </l-uploader>
</template>
<script>
import LUploader from '@/components/uploader'
export default {
  name: 'l-uploader-img',
  props: {
    size: {
      type: Number,
      default: 20
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    getStyle () {
      return {
        width: `${this.size}px`,
        height: `${this.size}px`
      }
    }
  },
  methods: {
    upload (files, event) {
      this.$emit('upload', files, event)
    }
  },
  components: {
    LUploader
  }
}
</script>
<style lang="scss">
 .l-uploader-default-logo {
   width: 100%;
   height: 100%;
   background-color: #f7f7fa;
   position: relative;

   &:before {
     content: '';
     position: absolute;
     background: #ddd;
     top: 50%;
     width: 2px;
     height: 30px;
     margin-top: -15px;
     left: 50%;
     margin-left: -1px;
   }

   &:after {
     content: '';
     position: absolute;
     background: #ddd;
     top: 50%;
     width: 30px;
     height: 2px;
     margin-top: -1px;
     left: 50%;
     margin-left: -15px;

   }
 }
</style>
