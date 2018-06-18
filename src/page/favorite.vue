<template>
  <div class="l-favorite">
    <div class="l-favorite-header">
      收藏页面
    </div>
    <div class="l-favorite-container">
      <div class="l-favorite-menu">
        <l-scroll>
          <ul class="l-menu-list">
            <!--role="button"用来增强语义-->
            <li class="l-menu-item" v-for="(tag, i) of getImgTag" :class="{'l-menu-item-active': i === currentActive }"
                :key="i" role="button" @click="selectItem(i)">
              <span>{{decodeURI(tag)}}</span>
            </li>
          </ul>
        </l-scroll>
      </div>
      <div class="l-favorite-wrapper">
        <l-scroll>
          <div>
            <ul class="l-img-list" v-for="(imgList, i) of getImgList" :key="imgList['key']" :class="{'l-img-list-show': i === currentActive}">
              <li class="l-img-item" v-for="(item, k) of imgList.list" :key="k">
                <img v-lazy="item['thumburl']" :height="item['tn_height']" :width="item['tn_width']">
              </li>
            </ul>
          </div>
        </l-scroll>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LScroll from '@/components/scroll'

export default {
  data () {
    return {
      currentActive: 0
    }
  },
  computed: {
    ...mapGetters([
      'getImgList',
      'getImgTag'
    ])
  },
  methods: {
    selectItem (i) {
      this.currentActive = i
    }
  },
  components: {
    LScroll
  }
}
</script>

<style lang="scss" scoped>
  @import "@/common/scss/variable.scss";
  @import "@/common/scss/1px.scss";
  @import "@/common/scss/mixins.scss";

  .l-favorite {
    height: 100%;
    display: flex;
    flex-direction: column;

    &-header{
      width: 100%;
      padding: 12px 4px;
      @include l-px(0, $color-border, 'bottom');
      z-index: 1;
    }

    &-container {
      flex: 1;
      width: 100%;
      background: #ffffff;
      display: flex;
    }

    &-menu {
      flex: 1;
      height: 100%;
    }

    &-wrapper {
      flex: 3;
      height: 100%;
      overflow-x: hidden;
    }
  }

  .l-menu {
    &-list {
      background-color: #f8f8f8;
      @include clear-default-style;
    }

    &-item {
      @include clear-default-style;
      font-size: 13px;
      text-align: center;
      padding: 1.5em 0.5em;
      color: $color-font;
      @include l-px(0, $color-border, 'bottom');
      @include line-wrap;

      &-active {
        background: #fff;
      }
    }
  }

  .l-img {
    &-list {
      display: none;
      @include clear-default-style;

      &-show {
        display: block;
      }
    }

    &-item {
      @include clear-default-style;
    }
  }
</style>
