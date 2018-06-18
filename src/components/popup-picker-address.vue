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
          <l-popup-picker-list :valueField="valueField" :textField="textField" :data="provinceList" :size="size" v-model="provinceValue">
          </l-popup-picker-list>
          <l-popup-picker-list :valueField="valueField" :textField="textField" :data="cityList" :size="size" v-model="cityValue">
          </l-popup-picker-list>
          <l-popup-picker-list :valueField="valueField" :textField="textField" :data="areaList" :size="size" v-model="areaValue">
          </l-popup-picker-list>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import LPopupPickerList from '@/components/popup-picker-list'

/**
 *  弹出选择组件
 */
export default {
  props: {
    province: String, // 省
    city: String, // 市
    area: String, // 区
    valueField: String, // 展示值
    textField: String, // value值
    provinceList: {
      type: Array,
      default () {
        return []
      }
    },
    cityList: {
      type: Array,
      default () {
        return []
      }
    },
    areaList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      size: 5,
      provinceValue: this.province,
      cityValue: this.city,
      areaValue: this.area
    }
  },
  watch: {
    // 选择不同的省份
    provinceValue () {
      this.$emit('select-province', this.provinceValue)
    },
    cityValue () {
      this.$emit('select-city', this.cityValue)
    }
  },
  methods: {
    cancel () {
      this.$emit('cancel')
    },
    complete () {
      this.$emit('complete', this.provinceValue, this.cityValue, this.areaValue)
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

    &.l-popup-picker {
      background: transparent;
    }

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

    &-container {
      display: flex;
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
