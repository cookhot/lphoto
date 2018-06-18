<template>
  <div class="l-search search-box">
    <form action="" @submit.prevent="submit">
      <div class="l-search-wrapper">
        <input
          autocomplete="off"
          type="search"
          ref="input"
          name="search"
          v-model="currentValue"
          class="l-i-search"
          @compositionstart="onComposition($event, 'start')"
          @compositionend="onComposition($event, 'end')"
          @input="onComposition($event, 'input')"
          @focus="onFocus"
          @blur="onBlur"
        />
        <div class="l-search-cancel" @click="cancel" v-show="cancelText">
          <span>取消</span>
        </div>
        <div class="l-search-text" v-show="!isFocus && !currentValue">
          <icon type="search"></icon>
          <span>{{searchText}}</span>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { Icon } from 'vux'

export default {
  name: 'l-search',
  props: {
    searchText: {
      type: String,
      default: '搜索'
    },
    cancelText: Boolean,
    value: String
  },
  data () {
    return {
      currentValue: '',
      onInput: false,
      isFocus: false
    }
  },
  created () {
    if (this.value) {
      this.isFocus = true
    }
    this.currentValue = this.value
  },
  methods: {
    emitEvent () {
      this.$nextTick(() => {
        this.$emit('input', this.currentValue)
        this.$emit('on-change', this.currentValue)
      })
    },
    onComposition ($event, type) {
      if (type === 'start') {
        this.onInput = true
      }
      if (type === 'end') {
        this.onInput = false
        this.emitEvent()
      }
      if (type === 'input') {
        if (!this.onInput) {
          this.emitEvent()
        }
      }
    },
    submit (event) {
      this.$emit('on-submit', this.currentValue)
    },
    onFocus (event) {
      this.isFocus = true
      this.$emit('on-focus')
    },
    setBlur () {
      this.$refs.input.blur()
    },
    onBlur () {
      this.isFocus = false
      this.$emit('on-blur')
    },
    cancel (event) {
      this.isFocus = false
      this.$emit('on-cancel', this.currentValue)
    }
  },
  watch: {
    value (val) {
      this.currentValue = val
    }
  },
  components: {
    Icon
  }

}

</script>

<style lang="scss" scoped>
@import "@/common/scss/1px.scss";

.l-search {

}

.l-search-wrapper {
  position: relative;
  padding: 8px 10px;
  display: flex;
  font-size: 16px;
  align-items: center;
  background-color: #EFEFF4;
}

.l-search-cancel {
  text-align: center;
  padding: 4px 14px;
  font-size: 16px;
  color: #04BE02;
}

.l-search-text {
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 16px;
  color: rgba(222, 222, 222, 0.7);
  transform: translate3d(-50%, -50%, 0)
}

.l-i-search {
  box-sizing: content-box;
  display: inline-block;
  width: 100%;
  flex: 1;
  border: 0;
  line-height: 18px;
  height: 22px;
  padding: 4px 1em;
  @include l-px(8px);
}

</style>
