<template>
  <div class="l-index" >
    <div class="search">
      <div class="search-wrapper">
        <l-search v-model="value" @on-focus="focus" @on-cancel="cancel" @on-submit="submit"  @input="input"
                  :cancelText="isEdit" ref="search">
        </l-search>
      </div>
    </div>
    <l-scroll selfClass="l-c-scroll" ref="scroll" @pullDown="loadMore">
      <div class="associated-words" ref="associated" v-show="isEdit">
        <l-auto-complete :data="associateWords" @enter="enter" @select="selectItem"></l-auto-complete>
      </div>
      <div v-show="!isEdit">
        <l-img-list :data="imgList" url="obj_url" @select="popupMenu"></l-img-list>
      </div>
      <load-more tip="正在加载" v-show="loading"></load-more>
    </l-scroll>
    <actionsheet v-model="collectShow" :menus="menus" @on-click-menu="collect">
    </actionsheet>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { LoadMore, Actionsheet } from 'vux'
import LSearch from '@/components/search'
import LAutoComplete from '@/components/autoComplete'
import LImgList from '@/components/imglist'
import LScroll from '@/components/scroll'
import { guessWord, getImgs } from '@/base/api'

export default {
  data () {
    return {
      isEdit: false,
      searchKey: '',
      value: '',
      page: 1,
      loading: false,
      collectShow: false,
      imgList: [],
      menus: { menu01: '收藏图片', menu02: '不用了' },
      associateWords: []
    }
  },
  activated () {
    this.$nextTick(() => {
      this.$refs.scroll.$el.scrollTop = this.$route.meta.top
    })
  },
  beforeRouteLeave (to, from, next) {
    this.$route.meta.top = this.$refs.scroll.$el.scrollTop
    next()
  },
  methods: {
    ...mapActions([
      'collectImg'
    ]),

    focus (event) {
      // 记录滚动条位置, 更好的是记录展示页面中元素距离屏幕的距离，这样更好
      this.$route.meta.top = this.$refs.scroll.$el.scrollTop
      this.isEdit = true
    },

    /**
     * 联想方法
     * @param val
     */
    associate (val) {
      guessWord(val).then((res) => {
        this.associateWords = res.data.s
      }).catch(() => {
        this.$vux.toast.show({
          type: 'error',
          text: '网络异常'
        })
      })
    },

    /**
     * 根据输入的关键词进行联想
     * @param value
     */
    input (value) {
      if (this.isEdit) {
        this.associate(value)
      }
    },

    /**
     * 进入选词区域，通过blur关闭键盘
     */
    enter () {
      this.$refs.search.setBlur()
    },

    /**
     * 触发取消
     */
    cancel () {
      this.isEdit = false
      if (this.searchKey === this.value) {
        this.$nextTick(() => {
          this.$refs.scroll.$el.scrollTop = this.$route.meta.top
        })
      } else {
        this.searchKey = this.value
        this.load()
      }
    },

    /**
     * 提交
     */
    submit () {
      // 同步searchKey
      this.searchKey = this.value
      this.$refs.search.setBlur()
      this.load()
    },

    /**
     * 选中联想词
     * @param val
     */
    selectItem (val) {
      // 同步searchKey, value
      this.searchKey = this.value = val
      this.isEdit = false
      this.load()
    },

    /**
     * 弹出收藏选项
     * @param item
     */
    popupMenu (item) {
      this.collectShow = true
      // item 只是传值
      this._item = item
    },

    collect (menu) {
      if (menu === 'menu01' && this._item) {
        this.collectImg({key: this.searchKey, content: JSON.parse(JSON.stringify(this._item))})
        this.$vux.toast.show({
          text: '收藏成功'
        })
      }

      this._item && (this._item = null)
    },

    load () {
      this.isEdit = false
      this.$route.meta.top = 0
      this.page = 1
      this.loading = true
      getImgs({ key: this.searchKey }).then((res) => {
        this.imgList = res.data.data
        this.loading = false
      })
    },

    loadMore () {
      // 防止联想词拖动的时候，引起加载更多
      if (!this.isEdit && this.searchKey) {
        // 加载更多信息
        this.loading = true
        this.page++
        getImgs({ key: this.searchKey, page: this.page }).then(val => {
          this.imgList.push(...val.data.data)
          this.loading = false
        })
      }
    }
  },
  components: {
    LScroll,
    LSearch,
    LAutoComplete,
    LoadMore,
    Actionsheet,
    LImgList
  }
}

</script>
<style lang="scss">
  @import "@/common/scss/variable.scss";
  @import "@/common/scss/1px.scss";

  .l-index {
    padding-top: 46px;
    height: 100%;
    width: 100%;
  }

  .search {
    position: fixed;
    top: 0;
    left: 0;
    z-index: $z-index-0;
    width: 100%;
  }
  .search-wrapper {
    height: 100%;
    @include l-px(0, $color-border, 'bottom');
  }

  .l-c-scroll {
    position: relative;
  }

  .associated-words {
    height: 100%;
    z-index: $z-index-0;
    font-size: 16px;
    background: #fff;
  }

</style>
