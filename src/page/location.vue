<template>
  <transition name="page-bottom-fade">
    <div class="l-fullpage l-location">
      <div class="l-location-header">
        <x-header>{{address}}<a slot="right" style="color: #4CAF50;" @click="confirm">确定</a></x-header>
      </div>

      <div class="l-location-container">
        <div class="l-map" ref="map"></div>
      </div>

    </div>
  </transition>
</template>

<script>
/* global BMap */
import { XHeader } from 'vux'
import { mapActions } from 'vuex'

export default {
  name: 'l-location',
  data () {
    return {
      address: ''
    }
  },
  methods: {
    ...mapActions([
      'changeActualAddress'
    ]),
    getAddressWindow (msg) {
      // TODO 提取
      const opts = {
        width: 160, // 信息窗口宽度
        height: 50, // 信息窗口高度
        title: '地址信息' // 信息窗口标题
      }
      return new BMap.InfoWindow(msg, opts) // 创建信息窗口对象
    },
    confirm () {
      this.changeActualAddress(this.address)
      this.$router.back()
    }
  },
  mounted () {
    const city = new BMap.LocalCity()
    const map = new BMap.Map(this.$refs.map)

    // 创建地理编码实例
    const geo = new BMap.Geocoder()
    let marker

    city.get((r) => {
      const point = new BMap.Point(r.center.lng, r.center.lat)
      geo.getLocation(point, (result) => {
        if (result) {
          map.openInfoWindow(this.getAddressWindow(result.address), point)
          this.address = result.address
        }
      })
      marker = new BMap.Marker(point)
      map.centerAndZoom(point, 12)
    })

    map.addEventListener('click', (r) => {
      map.closeInfoWindow()
      if (marker) {
        map.removeOverlay(marker)
      }

      geo.getLocation(r.point, (result) => {
        if (result) {
          map.openInfoWindow(this.getAddressWindow(result.address), r.point)
          this.address = result.address
        }
      })
      marker = new BMap.Marker(r.point)
      map.addOverlay(marker)
    })
  },
  components: {
    XHeader
  }
}

</script>

<style lang="scss">
  @import "@/common/scss/variable.scss";
  @import "@/common/scss/base.scss";
  @import "@/common/scss/1px.scss";

  .l-location {
    z-index: $z-index-1;
    display: flex;
    flex-direction: column;

    &-header {
      @include l-px(0, $color-border, 'bottom');
    }

    &-container {
      flex: 1;
    }
  }

  .l-map {
    height: 100%;
  }
</style>
