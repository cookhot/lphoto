<template>
  <input type="checkbox" :class="getSwitchClass" :checked="currentValue"  @click="input">
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }

  },
  computed: {
    getSwitchClass () {
      const switchClass = [`l-cell-switch`]
      if (this.disabled) {
        switchClass.push(`l-disabled`)
      }
      return switchClass
    }
  },
  data () {
    return {
      currentValue: false
    }
  },
  created () {
    this.currentValue = this.value
  },
  watch: {
    value (val) {
      this.currentValue = val
    }
  },
  methods: {
    input (event) {
      if (!this.disabled) {
        this.currentValue = !this.currentValue
        this.$emit('input', this.currentValue)
      }
    }
  }
}
</script>

<style lang="scss">
  .l-cell-switch {
    position: relative;
    width: 52px;
    height: 32px;
    border: 1px solid #DFDFDF;
    outline: 0;
    border-radius: 16px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background-color: #DFDFDF;
    appearance: none;
    transition: background-color 0.2s, border 0.2s;

    &:checked {
      border-color: #04BE02;
      background-color: #04BE02;
      &:after {
        transform: translateX(0px)
      }
    }

    &:after {
      content: " ";
      position: absolute;
      top: 0;
      left: 0;
      width: 30px;
      height: 30px;
      border-radius: 15px;
      background-color: #FFFFFF;
      transform: translateX(20px);
      transition: transform 0.2s;
    }

    &.l-disabled {
      border-color: #DFDFDF;
      background-color: #DFDFDF;
      &:after {
        transform: translateX(20px)
      }
    }
  }
</style>
