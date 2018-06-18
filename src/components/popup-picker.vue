<template>
  <transition name="page-bottom-fade">
    <div class="l-popup l-popup-picker l-fullpage">
      <div class="l-masker"></div>
      <div class="l-popup-wrapper">
        <div class="l-popup-header">
          <span class="l-popup-header-text l-popup-cancel" @click="cancel">取消</span>
          <span class="l-popup-header-text l-popup-title"></span>
          <span class="l-popup-header-text l-popup-done" @click="complete">完成</span>
        </div>
        <div class="l-popup-container">
          <l-popup-picker-list :data="data" :size="size" v-model="val">
          </l-popup-picker-list>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import LPopupPickerList from '@/components/popup-picker-list1'

/**
 *  弹出选择组件
 */
export default {
  props: {
    selectedValue: String,
    data: {
      type: Array,
      default () { return [] }
    }
  },
  data () {
    return {
      size: 5,
      val: this.selectedValue
    }
  },
  methods: {
    cancel () {
      this.$emit('cancel')
    },
    complete () {
      this.$emit('complete', this.val)
    }
  },
  components: {
    LPopupPickerList
  }
}

</script>
<style lang="scss">
  @import "@/common/scss/variable.scss";
  @import "@/common/scss/mixins.scss";

  .l-popup {
    background: transparent;

    &-header {
      display: flex;
      padding: 0 16px;
      text-align: center;
      background-color: #fbf9fe;

      &-text {
        font-size: 16px;
        padding: 0.75em 0.5em;
      }
    }

    &-wrapper {
      position: absolute;
      width: 100%;
      bottom: 0;
      left: 0;
      background: #fff;
    }

    &-picker-list {
      @include clear-default-style;
      text-align: center;

      & > li {
        font-size: 16px;
        padding: 1em 0;
      }
    }

    &-cancel {
      color: #828282;
    }

    &-title {
      flex: 1;
    }

    &-done {
      color: #FF9900;
    }
  }
</style>
