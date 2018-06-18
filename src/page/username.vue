<template>
  <transition name="page-bottom-fade">
    <div class="l-fullpage l-username">
      <div class="l-username-header">
        <x-header :left-options="{backText: '取消'}">
          <icon class="l-user-fa" name="user-circle" :fontSize="20" color="#FF5722"></icon><span>名称</span>
          <a slot="right" style="color: #4CAF50;" @click="complete" v-show="isChange">完成</a>
        </x-header>
      </div>

      <div class="l-username-container">
        <group>
          <x-input v-model="value" :max="12" :min="3" :show-clear="false"></x-input>
        </group>
      </div>
    </div>
  </transition>
</template>
<script>
import { XHeader, Group, XInput } from 'vux'
import Icon from '@/components/icon'

import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      isChange: false,
      value: ''
    }
  },
  computed: {
    ...mapGetters([
      'getUserName'
    ])
  },
  created () {
    // 赋值
    this.value = this.getUserName
    // TODO 自动聚焦
  },
  methods: {
    ...mapActions([
      'changeUserName'
    ]),
    complete (event) {
      this.changeUserName(this.value)
      this.$router.back()
    }
  },
  watch: {
    value (val) {
      if (val !== this.getUserName) {
        this.isChange = true
      } else {
        this.isChange = false
      }
    }
  },
  components: {
    XHeader,
    Group,
    XInput,
    Icon
  }
}
</script>
<style lang="scss" scoped>
  @import "@/common/scss/variable.scss";
  @import "@/common/scss/1px.scss";

  .l-username {
    background-color: $color-page-bg !important;
    z-index: $z-index-2;

    &-header {
      @include l-px(0, $color-border, 'bottom');
    }
  }
</style>
