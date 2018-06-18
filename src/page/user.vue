<template>
  <transition name="page-fade">
    <div class="l-fullpage l-user">
      <div class="l-user-header">
        <x-header>个人信息</x-header>
      </div>

      <div class="l-user-container">
        <group  label-align="right">
          <cell-box is-link>
            <span>头像</span>
            <div class="l-user-avatar l-adaption">
              <l-uploader @upload="setAvatar" accept="image/*">
                <l-avatar shape="square" :size="40" :font-size="20" icon="picture-o" :src="getAvatar|filterAvatar"></l-avatar>
              </l-uploader>
            </div>
          </cell-box>
          <cell-box is-link @click.native="go('username')">
            <span>名称</span>
            <span class="l-user-txt l-adaption">{{getUserName}}</span>
          </cell-box>
          <cell-box is-link  @click.native="setAddress" >
            <span>地址</span>
            <span class="l-user-txt l-adaption">{{getAddress}}</span>
          </cell-box>
        </group>
      </div>

      <popup-picker-address :province="province" :provinceList="provinceList" @select-province="selectProvince"
                            :city="city" :cityList="cityList" @select-city="selectCity"
                            :area="area" :areaList="areaList"
                            :valueField="valueField" :textField="textField"
                            v-if="isShowAddress" @cancel="cancel" @complete="complete">
      </popup-picker-address>
      <loading v-show="!isShowAddress && isLoading" text="数据加载中"></loading>
      <router-view></router-view>
    </div>
  </transition>
</template>

<script>
import { XHeader, Group, CellBox, Loading } from 'vux'
import { getAddressMap } from '@/common/js/address'
import { submitAvatar } from '@/base/api'
import Icon from '@/components/icon'
import LAvatar from '@/components/avatar'
import LUploader from '@/components/uploader'
import PopupPickerAddress from '@/components/popup-picker-address'

/**
 * 技术注意，当使用<keep-alive>时候，父亲节点的数据无法显示的注入子节点中，尤其是子节点获取数据是通过中间变量进行接收</keep-alive>
 * 由于是使用代理，不支持Symbol方式的方法名，也就是内部函数名无法实现
 */
import { mapGetters, mapActions } from 'vuex'

const CITY_LEVEL = 1

const AREA_LEVEL = 2

export default {
  name: 'l-user',
  data () {
    return {
      provinceList: [],
      cityList: [],
      areaList: [],
      province: '',
      city: '',
      area: '',
      isLoading: false,
      textField: 'name',
      valueField: 'code',
      isShowAddress: false
    }
  },
  computed: {
    ...mapGetters([
      'getUserName',
      'getProvince',
      'getCity',
      'getArea',
      'getAddress',
      'getAvatar'
    ])
  },
  methods: {
    ...mapActions([
      'changeAddress',
      'changeAvatar'
    ]),
    setAvatar (files) {
      const file = files[0]
      const formData = new FormData()
      formData.append('avatar', file)

      submitAvatar(formData).then((res) => {
        if (res) {
          this.changeAvatar(res.data)
        }
      })
    },
    go (path) {
      this.$router.push(`${this.$route.path}/${path}`)
    },
    setAddress (e) {
      this.isLoading = true
      // 重置状态
      this.initAddress()
    },
    cancel () {
      this.isShowAddress = false
    },
    complete (province, city, area) {
      new Promise((resolve) => {
        if (this.address) {
          resolve(this.address)
        } else {
          this.getAddressMap().then((address) => {
            resolve(address)
          })
        }
      }).then((address) => {
        let detailAddress = '';
        [address, province, city, area].reduce((parentAddress, code) => {
          detailAddress += parentAddress[code].name
          return parentAddress[code].items
        })
        this.changeAddress({province, city, area, address: detailAddress})
        this.isShowAddress = false
      })
    },
    initAddress () {
      this.province = this.getProvince
      this.city = this.getCity
      this.area = this.getArea
      getAddressMap().then((address) => {
        this.address = address
        this.provinceList = this._getSubAddress()
        // 获取省份信息
        if (this.getProvince) {
          this.cityList = this._getSubAddress(this.getProvince, CITY_LEVEL)
        }

        if (this.getCity) {
          this.areaList = this._getSubAddress(this.getCity, AREA_LEVEL)
        }

        this.isShowAddress = true
        this.isLoading = false
      })
    },
    // 选择省份
    selectProvince (val) {
      this.cityList = this._getSubAddress(val, CITY_LEVEL)
    },
    selectCity (val) {
      this.areaList = this._getSubAddress(val, AREA_LEVEL)
    },
    _getSubAddress (parent, level) {
      const cityReg = /(0[1-9]|[1-9]0|[1-9]{2})0{2}$/
      let address = this.address

      if (typeof parent === 'string' && address) {
        // 城市
        if (level === CITY_LEVEL) {
          address = this.address[parent].items
        }

        // 地区
        if (level === AREA_LEVEL) {
          try {
            address = this.address[ parent.replace(cityReg, '0000') ].items[ parent ].items
          } catch (e) {
            address = null
          }
        }
      }

      if (address) {
        return Object.keys(address).map((code) => {
          return { [this.valueField]: code, [this.textField]: address[code].name }
        })
      }
      return []
    }
  },
  components: {
    XHeader,
    Group,
    CellBox,
    Loading,
    PopupPickerAddress,
    Icon,
    LAvatar,
    LUploader
  }
}

</script>
<style lang="scss">
  @import "@/common/scss/base.scss";
  @import "@/common/scss/1px.scss";
  @import "@/common/scss/mixins.scss";

  .l-user {
    background-color: $color-page-bg !important;
    z-index: $z-index-1;

    &-header {
      @include l-px(0, $color-border, 'bottom');
    }

    &-fa {
      line-height: 24px;
      height: 24px;
      width: 30px;
      text-align: center;
      padding-right: 0.5em;
    }

    &-txt {
      font-size: 13px;
      text-align: right;
      color: #666;
    }

    &-avatar {
      display: flex;
      flex-direction: row-reverse;
    }
  }

  .l-adaption {
    flex: 1;
    padding-right: 1em;
  }

</style>
