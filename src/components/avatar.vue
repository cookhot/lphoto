<script>
import Icon from './icon.vue'
export default {
  props: {
    icon: String,
    color: {
      type: String,
      default: '#ffffff'
    },
    bgColor: {
      type: String,
      default: '#e8e8e8'
    },
    shape: {
      type: String,
      default: 'circle',
      validator (value) {
        return ['circle', 'square'].indexOf(value) >= 0
      }
    },
    fontSize: {
      type: Number,
      default: 16
    },
    size: Number,
    src: String
  },
  methods: {
    onClick (e) {
      this.$emit('click', e)
    }
  },

  render (h) {
    // 需要判断src与icon
    let children = null
    let avatarClass = ['l-avatar', `l-avatar-${this.shape}`]

    if (this.icon) {
      children = h('icon', {props: {'font-size': this.fontSize, name: this.icon, color: this.color}})
    }

    if (this.src) {
      children = h('img', {attrs: {'src': this.src, width: `${this.size}px`, height: `${this.size}px`}})
      avatarClass.push('l-avatar-img')
    }

    return h('span',
      {
        on: {click: this.onClick},
        'class': avatarClass,
        'style': {background: `${this.bgColor}`}
      },
      [children])
  },
  components: {
    Icon
  }
}
</script>
<style lang="scss">
  .l-avatar {
    display: block;
    padding: 10px;
    line-height: 1;
    height: fit-content;
    overflow: hidden;

    img {
      display: block;
    }
  }

  .l-avatar-circle {
    border-radius: 50%;
  }

  .l-avatar-img {
    padding: 0;
  }

  .l-avatar-square {
    border-radius: 5px;
  }
</style>
