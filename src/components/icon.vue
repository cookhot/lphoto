<template>
  <i :class="getNameClass" :style="getStyle" @click='onClick'></i>
</template>

<script>
const lClass = 'fa'

export default {
  name: 'l-icon',
  props: {
    name: {
      type: String,
      default: ''
    },
    color: String,
    'font-size': Number
  },
  computed: {
    getNameClass () {
      return {
        [`${lClass}`]: true,
        [`${lClass}-${this.name}`]: this.name
      }
    },
    getStyle () {
      return {
        color: `${this.color}`,
        'font-size': `${this.fontSize}px`
      }
    }
  },
  methods: {
    onClick (e) {
      this.$emit('click', e)
    }
  }
}

</script>
