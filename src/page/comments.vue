<template>
  <div class="l-comments">
    <l-scroll>
      <div class="l-comments-bg">
        <div class="img" :style="getBgStyle"></div>
        <div class="l-comments-bg-user-logo">
          <l-avatar shape="square" :size="60" :font-size="40" :src="getAvatar|filterAvatar" icon="picture-o"></l-avatar>
        </div>
      </div>
      <div class="l-comments-container">
        <div class="l-comments-post">
          <l-button @click="comment" shape="circle" type="comment">
            <span>评论作品</span>
          </l-button>
        </div>
        <div class="l-comments-list">
          <div v-show="!commentList.length" class="l-comments-no-comments">
            暂无评论,&nbsp;<icon name="hand-o-up" color="#F44336"></icon>&nbsp;你的一血
          </div>
          <div class="l-comments-list-wrapper">
            <div class="l-comments-item" v-for="(item, i) of commentList" :key="i">
              <l-avatar :size="48" :font-size="28" icon="picture-o" :src="item.avatar|filterAvatar"></l-avatar>
              <div class="l-comments-item-container">
                <!--可以作为一个指令, 处理匿名用户的数据-->
                <span class="l-comments-username">{{item.user}}</span>
                <rater :value="item.score" :disabled="true" :font-size="14" active-color="#F44336"></rater>
                <div class="l-comments-item-content" >
                  {{item.content}}
                </div>
                <div class="l-comments-item-imgs" v-lazy-container="{ selector: 'img' }">
                  <div class="l-i-img" :class="{'l-adaptation-img': item.img.split(',').length < 3}" v-for="(img, i) of item.img.split(',')" v-if="img" :key="i">
                    <img :data-src="img|filterImg" />
                  </div>
                </div>
                <div class="l-comments-remark">
                  <span class="l-remark-txt l-format-time">{{item.time | formattingTime}}</span>
                  <span class="l-remark-txt l-remark-address">{{item.address}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </l-scroll>
    <router-view></router-view>
  </div>
</template>
<script>
import LAvatar from '@/components/avatar'
import LScroll from '@/components/scroll'
import Icon from '@/components/icon'
import LButton from '@/components/button'
import themeJson from '@/common/theme.json'
import { getAllComment } from '@/base/api'
import { Rater } from 'vux'

import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      theme: 'default',
      bgImg: '',
      commentList: []
    }
  },
  created () {
    // 切换主题
    const theme = this.$route.params.theme
    if (theme && themeJson[theme]) {
      this.theme = theme
    }
    this.bgImg = themeJson[this.theme]
    // TODO 评论数据可以使用使用本地缓存, 可以通过vuex进行状态管理
    getAllComment().then((response) => {
      this.commentList = response.data
    })
  },
  computed: {
    ...mapGetters([
      'getAvatar'
    ]),
    getBgStyle () {
      return {
        'background-image': `url(${this.bgImg})`
      }
    }
  },
  methods: {
    comment () {
      const path = this.$route.path + '/comment'
      this.$router.push(path)
    }
  },
  components: {
    Icon,
    LAvatar,
    LScroll,
    LButton,
    Rater
  }
}
</script>
<style lang="scss">
@import "@/common/scss/variable.scss";
@import "@/common/scss/mixins.scss";
@import "@/common/scss/1px.scss";

.l-comments {
  @include default-page;

  &-bg {
    height: 50%;
    @include l-px(0, $color-border, 'bottom');
    // TODO 样式优化
    //box-shadow: 1px 2px 2px $color-border;
    position: relative;
    z-index: 0;

    &-user-logo {
      position: absolute;
      right: 1em;
      bottom: 0;
      transform: translateY(50%);
      z-index: 1;
    }
    .img {
      background-size: 100% 100%;
      height: 100%;
      cursor: pointer;
      background-repeat: no-repeat;
      transition: .3s ease-in-out;
    }
  }
  &-container {
    min-height: 50%;
    background: #ffffff;
  }

  &-post {
    padding-top: 30px;
    text-align: center;
  }

  &-list {
  }

  &-no-comments {
    text-align: center;
    color: #ccc;
    padding-top: 1em;
    font-size: 14px;
  }

  &-item {
    @include l-px(0, $color-border, 'bottom');
    padding: 1em 0.5em;
    display: flex;

    &-imgs {
      display: flex;
      flex-wrap: wrap;

      .l-i-img {
        width: 24vw;
        height: 24vw;
        padding-right: 0.5em;
        padding-bottom: 0.5em;

        img {
          display: block;
          width: 100%;
          height: 100%;
        }

        &.l-adaptation-img {
          flex: 1;
          height: auto;

          img {
            height: auto;
          }
        }
      }
    }
  }

  &-item-container {
    flex: 1;
    padding: 0 1em;
    overflow: hidden;
  }

  &-username {
    font-size: 14px;
    font-weight: 500;
    color: #03A9F4;
  }

  &-item-content {
    padding: 0.5em 0;
    font-size: 14px;
  }
}
</style>
