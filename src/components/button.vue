<script>
export default {
  props: {
    type: {
      type: String,
      default: 'default'
    },
    shape: {
      type: String,
      default: 'square',
      validator (value) {
        return ['circle', 'square'].indexOf(value) >= 0
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      checked: false
    }
  },
  methods: {
    onClick (e) {
      if (!this.disabled) {
        this.checked = true
        this.$emit('click', e)
      } else {
        this.checked = false
      }
    }
  },
  render (h) {
    const classList = ['l-button', `l-button-${this.type}`, `l-button-${this.shape}`]
    if (this.disabled) {
      classList.push(`l-disabled`)
    }

    if (this.checked) {
      classList.push(`checked`)
    }

    return h('div', {class: classList,
      attrs: {'disabled': this.disabled},
      on: {click: this.onClick}}, [this.$slots.default])
  }
}
</script>
<style lang="scss">
.l-button {
  display: inline-block;
  border: 1px solid transparent;
  white-space: nowrap;
  border-radius: 100%;
  padding: 0.5em 1.25em;
  transition: all .3s ease;

  &-default {
    border-color: #9E9E9E;
    color: rgba(0,0,0,.65);

    &.checked {
      border-color: #1890ff;
      color: #1890ff;
    }
  }

  // 评论主题
  &-comment {
    border-color: #FF9800;
    background: #FF9800;
    color: #fff;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.25em;
    padding: 0.5em 2em;

    &.checked {
      border-color: #FF9800;
      color: #fff;
    }
  }

  &-circle {
    border-radius: 1em;
  }

  &-square {
    border-radius: 5px;
  }

  // 被禁用
  &.l-disabled {
    color: rgba(0,0,0,.25);
    background-color: #f5f5f5;
    border-color: #d9d9d9;
    cursor: not-allowed;
  }
}
</style>
