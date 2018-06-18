<template>
  <transition name="page-bottom-fade">
    <div class="l-fullpage l-user-address">
      <div class="l-user-address-header">
        <x-header :left-options="{backText: '取消'}">
          <icon class="l-user-fa" name="map-marker" :fontSize="20" color="#FF5722"></icon><span>{{getAddress}}</span>
          <a slot="right" style="color: #4CAF50;" @click="complete" v-show="isChange">完成</a>
        </x-header>
      </div>
    </div>
  </transition>
</template>

<script>
import { XHeader } from 'vux'
import Icon from '@/components/icon'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'getAddress'
    ])
  },
  methods: {

  },
  components: {
    XHeader,
    Icon
  }
}
</script>

<style lang="scss">
  @import "@/common/scss/variable.scss";
  @import "@/common/scss/1px.scss";

  .l-user-address {
    background-color: $color-page-bg !important;
    z-index: $z-index-2;

    &-header {
      @include l-px(0, $color-border, 'bottom');
    }
  }
</style>
