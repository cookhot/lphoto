<template>
  <div class="l-setting">
    <div style="padding-top: 20px">
      <group  label-align="right">
        <cell is-link value-align="left" :link="getUserPath">
          <div class="l-setting-user">
            <l-avatar shape="square" :size="50" :font-size="30"  icon="picture-o" :src="getAvatar|filterAvatar"></l-avatar>
            <span class="l-setting-text">
              {{getUserName}}
            </span>
          </div>
        </cell>
      </group>
    </div>

    <div style="padding-top: 20px">
      <group  label-align="right">
        <cell title="清除缓存" is-link value-align="left"></cell>
        <cell title="产品说明" is-link value-align="left"></cell>
      </group>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
import { Group, Cell } from 'vux'
import { mapGetters } from 'vuex'
import LAvatar from '@/components/avatar'
export default {
  methods: {
    comment () {
    },
    user () {

    }
  },
  computed: {
    ...mapGetters([
      'getUserName',
      'getAvatar'
    ]),
    getUserPath () {
      return this.$route.path + '/user'
    }
  },
  components: {
    Group,
    Cell,
    LAvatar
  }
}
</script>

<style lang="scss">
  @import "@/common/scss/mixins.scss";

  .l-setting {
    height: 100%;

    &-user {
      display: flex;
      align-items: center;
    }

    &-text {
      padding-left: 1em;
      color: #333;
      font-size: 14px;
    }

    // fix safari 中 margin Bug
    .weui-cells {
      margin: 0;
    }

    p {
      @include clear-default-style;
    }
  }
</style>
