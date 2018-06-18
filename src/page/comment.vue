<template>
  <transition name="page-fade">
    <div class="l-fullpage l-comment">
      <div class="l-comment-header">
        <x-header>作品评论<a slot="right" style="color: #FF5722;" @click="post">评论</a></x-header>
      </div>
      <div class="l-comment-container">
        <l-list>
          <l-cell :borderBottom="true">
            <div class="l-cell-wrapper">
              <span class="l-cell-title">{{title}}</span>
              <div style="flex: 1; text-align: center">
                <rater v-model="score" :margin="10" :min="1"></rater>
              </div>
              <span class="l-cell-description">{{getScoreDesc}}</span>
            </div>
          </l-cell>
          <l-cell :borderBottom="true">
            <div class="l-cell-wrapper">
              <div class="l-cell-textarea">
                <x-textarea v-model="detail" :max="80" :rows="4" :autosize="true"
                            name="详细内容" placeholder="详细评论" :show-counter="true">
                </x-textarea>
              </div>
              <div class="l-cell-img-list">
                <div class="l-cell-img-wrapper" v-for="(imgUrl, i) of imgUrlList" :key="i">
                  <l-del :lkey="i" @del="del"></l-del>
                  <img :height="imgHeight" :width="imgWidth" :src="imgUrl">
                </div>
                <div class="l-cell-img-wrapper">
                  <l-uploader-img :disabled="!isImgUpload" :size="imgHeight" @upload="upload">
                  </l-uploader-img>
                </div>
              </div>
            </div>
          </l-cell>
          <l-cell :borderBottom="true">
            <div class="l-cell-wrapper">
              <span class="l-cell-username" :class="getAnonymityClass">{{getName}}</span>
              <l-switch v-model="isAnonymity" :disabled="!getUserName" @click.native="isUser"></l-switch>
            </div>
          </l-cell>
          <l-cell :borderBottom="true">
            <div class="l-cell-wrapper">
              <span class="l-cell-address">{{address}}</span>
              <icon class="l-user-fa" @click="showLocation" name="map-marker" :fontSize="30" color="#03A9F4"></icon>
            </div>
          </l-cell>
        </l-list>
      </div>
      <router-view></router-view>
    </div>
  </transition>
</template>

<script>

import { submitComment } from '@/base/api'
import { mapGetters } from 'vuex'
import { XHeader, Rater, XTextarea } from 'vux'
import LList from '@/components/list'
import LCell from '@/components/cell'
import LDel from '@/components/del'
import Icon from '@/components/icon'
import LSwitch from '@/components/switch'
import LUploaderImg from '@/components/uploader-img'

import { file2DataURL } from '@/common/js/fileUtils'

// 最大文件数
const MAX_FILE_SIZE = 9

export default {
  name: 'l-comment',
  data () {
    return {
      title: '等级',
      imgFileList: [],
      imgUrlList: [],
      imgHeight: 90,
      imgWidth: 90,
      isImgUpload: true,
      detail: '',
      isAnonymity: false,
      username: '匿名用户',
      score: 5,
      scoreDesc: [
        '非常差',
        '很差',
        '差',
        '一般',
        '好',
        '非常好'
      ]
    }
  },
  computed: {
    ...mapGetters([
      'getUserName',
      'getAddress',
      'getAvatar',
      'getActualAddress'
    ]),
    getScoreDesc () {
      return this.scoreDesc[this.score]
    },
    getName () {
      return this.isAnonymity ? this.getUserName : this.username
    },
    getAnonymityClass () {
      return {
        'l-anonymity': !this.isAnonymity
      }
    },
    address () {
      return this.getActualAddress || this.getAddress
    }
  },
  methods: {
    post () {
      const vm = this
      const promise = this.buildFormData()

      promise.then((data) => {
        submitComment(data).then((val) => {
          this.$vux.toast.show({
            text: '评论成功',
            isShowMask: true,
            onHide () {
              vm.$router.back()
            }
          })
        })
      }).catch((e) => {
        this.$vux.toast.show({
          text: e.message,
          type: 'warn',
          width: '11em',
          isShowMask: true
        })
      })
    },
    buildFormData () {
      return new Promise((resolve, reject) => {
        const form = new FormData()
        // 用户名称
        if (!this.username) {
          reject(new Error('用户不能为空'))
        }
        form.append('username', this.getName)
        // 得分
        form.append('score', this.score)

        form.append('avatar', this.getAvatar)

        if (this.detail.length < 10) {
          reject(new Error('评论需要10个字以上'))
        }
        form.append('detail', this.detail)

        form.append('address', this.address)
        // 上传文件
        this.imgFileList.forEach((file) => {
          form.append('file[]', file)
        })
        resolve(form)
      })
    },
    upload (files) {
      if (this.isImgUpload) {
        // 控制文件的上传数量
        let promise = Promise.resolve('')
        Array.from(files).forEach((file) => {
          promise = promise.then(() => {
            if (this.imgFileList.length < MAX_FILE_SIZE) {
              return file2DataURL(file).then((dataUrl) => {
                this.imgFileList.push(file)
                this.imgUrlList.push(dataUrl)
              })
            }
          }).then(() => {
            if (this.imgFileList.length >= MAX_FILE_SIZE) {
              this.isImgUpload = false
            }
          })
        })
      }
    },
    del (index) {
      this.imgFileList.splice(index, 1)
      this.imgUrlList.splice(index, 1)
      if (this.imgFileList.length < MAX_FILE_SIZE) {
        this.isImgUpload = true
      }
    },
    isUser () {
      // 用户名为空
      if (!this.getUserName) {
        this.$vux.alert.show({
          width: '6em',
          content: '请设置用户名'
        })
      }
    },
    showLocation () {
      const path = this.$route.path + '/location'
      this.$router.push(path)
    }
  },
  components: {
    Icon,
    XHeader,
    LList,
    LUploaderImg,
    LDel,
    LSwitch,
    XTextarea,
    LCell,
    Rater
  }
}
</script>

<style lang="scss">
  @import "@/common/scss/variable.scss";
  @import "@/common/scss/base.scss";
  @import "@/common/scss/1px.scss";
  @import "@/common/scss/mixins.scss";

  .l-anonymity {
    color: #DFDFDF !important;
  }

  .l-comment {
    z-index: $z-index-1;
    &-header {
      @include l-px(0, $color-border, 'bottom');
    }

    &-container {
      /*padding: 0 0 0 18px;*/
    }
  }

  .l-cell {
    &-wrapper {
      display: flex;
      flex-wrap: wrap;
      font-size: 14px;
      padding: 1em 15px 1em 16px;
      align-items: center;

      .vux-x-textarea {
        padding: 0;

        textarea {
          padding: 0;
        }
      }
    }

    &-textarea {
      width: 100%;
    }

    &-title {
      @include standard-text(20px, 16px)
    }

    &-username {
      line-height: 32px;
      height: 32px;
      overflow: hidden;
      color: #333;
      flex: 1;
    }

    &-address {
      line-height: 32px;
      height: 32px;
      overflow: hidden;
      color: #333;
      flex: 1;
    }

    &-description {
      @include standard-text(20px, 16px);
      text-align: center;
      width: 3em;
    }

    &-img-list {
      display: flex;
      flex-wrap: wrap;
    }

    &-img-wrapper {
      margin: 0 8px 8px 0;
      padding: 0;
      position: relative;
      z-index: 1;

      img {
        display: block;
      }
    }
  }

</style>
