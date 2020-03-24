<template>
  <div class="customRights">
    <MyHeader :disDefault="true" @back="back" v-if="version>='2.1.0'"></MyHeader>
    <div class="container">
      <div class="title">客户权益</div>
      <div class="desc">权益以新车完成开具零售发票的时间为依据，早拥车早享受。</div>
    </div>
    <div class="nav-container">
      <div class="nav-wrapper flex flex-js-betw" :style="'transform:translateX('+navtr+'px);width: '+navContainerWidth+'px;'">
        <div class="nav-slide flex flex-center" v-for="(item,index) in list" :key="index" @click="checkIndex(item,index)" @touchstart="jilu($event)" @touchend="pianyi($event,item)"
        :style="'width:'+navSlideWidth+'px'" :class="[index==idx?'active':'']">{{item.rightsSummary}}
        </div>
      </div>
    </div>

    <div class="swiper-container" ref="swiper">
      <div class="swiper-wrapper flex flex-js-betw" :style="'transform:translateX('+tr+'px);width: '+swiperContainerWidth+'px;'">
        <div class="swiper-slide" v-for="(item,index) in list" :key="index" @click="checkIndex(item,index)"
        :style="'width:'+swiperSlideWidth+'px'" :class="[index==idx?'active':'']"  @touchstart="jilu($event)" @touchend="pianyi($event,item)">
          <div class="flex flex-1 swiper-img">
            <img :src="formatImg(item.rightsIcon)"/>
          </div>
          <div class="swiper-slide-open flex flex-center">
            <img src="./assets/sq.png"/>
          </div>
          <div class="rightsInfo flex flex-column">
            <div class="rightName">{{item.title}}</div>
            <div class="desc">{{item.subtitle}}</div>
          </div>
        </div>
      </div>
      <div class="swiper-pagination flex flex-center">
        <span class="pagination-item" v-for="(item,index) in list" :key="index" :class="[index==idx?'active':'']"></span>
      </div>
    </div>
    <transition name="bounceIn">
      <div class="swiper-open" v-show="open" :class="[open?'active':'']">
      <MyHeader :disDefault="true" @back="close" v-if="version>='2.1.0'"></MyHeader>
        <div class="swiper-open-img" :class="[open?'active':'']">
          <div class="flex flex-1 swiper-img">
            <img :src="formatImg(right.rightsIcon)"/>
          </div>
          <div class="swiper-slide-open flex flex-center">
            <img src="./assets/sq.png"  @click.stop="open=false"/>
          </div>
          <div class="rightsInfo flex flex-column">
            <div class="rightName">{{right.title}}</div>
            <div class="desc">{{right.subtitle}}</div>
          </div>
        </div>
        <div class="container">
          <div class="subTitle">激活方式</div>
          <div class="text">{{right.activationMethod}}</div>
          <div class="subTitle">具体说明</div>
          <div class="text">{{right.description}}</div>
        </div>
      </div>
    </transition>
    <div class="safebottom"></div>
  </div>
</template>
<script>
import MyHeader from '@/components/Header/myHeader.vue'
import { queryRights } from '@/api/customRights/index'
import './style/index.scss'

export default {
  data () {
    return {
      version: '',
      headerType: 'toolbar',
      total: 5,
      tr: screen.width * 0.14,
      swiperSlideWidth: screen.width * 0.72,
      navtr: 0,
      navSlideWidth: screen.width * 0.2,
      idx: 0,
      touchStartX: 0,
      touchEndX: 0,
      touchStartY: 0,
      touchEndY: 0,
      open: false,
      list: [],
      right: {},
      swiperOpenTop: 164
    }
  },
  methods: {
    back () {
      this.$wk.exit()
    },
    close () {
      this.open = false
    },
    checkIndex (item, index) {
      if (this.idx === index) {
        this.right = item
        this.open = true
      } else {
        this.idx = index
      }
    },
    jilu ($event) {
      this.touchStartX = $event.changedTouches[0].clientX
      this.touchStartY = $event.changedTouches[0].clientY
    },
    pianyi ($event, item) {
      this.touchEndX = $event.changedTouches[0].clientX
      this.touchEndY = $event.changedTouches[0].clientY
      if (!this.open && this.touchStartX - this.touchEndX > 50) { // 左滑
        if (this.idx === this.list.length - 1) return
        this.idx++
      } else if (!this.open && this.touchEndX - this.touchStartX > 50) { // 右滑
        if (this.idx === 0) return
        this.idx--
      }
      // if(this.touchStartY-this.touchEndY>50){//上滑
      //   this.right = item
      //   this.open = true
      // }else if(this.touchEndY-this.touchStartY>50){//下滑
      //   this.open = false
      // }
    },
    fQueryRights () {
      this.$store.commit('showLoading')
      const orderNo = this.$route.query.orderNo
      queryRights({ selectedOrderNo: orderNo }).then(resp => {
        this.list = resp.rightsResult || []
      }).catch(err => {
        this.$toast(err)
      })
        .finally(() => {
          this.$store.commit('hideLoading')
        })
    }
  },
  components: { MyHeader },
  mounted () {
    this.fQueryRights()
    this.version = this.$wk.getVersion()
  },
  computed: {
    swiperContainerWidth () {
      return screen.width * 0.72 * this.list.length + screen.width * 0.03 * (this.list.length - 1)
    },
    navContainerWidth () {
      return screen.width * 0.2 * this.list.length + screen.width * 0.02 * (this.list.length - 1)
    }
  },
  watch: {
    idx (newValue, oldValue) {
      const w = screen.width
      // swiper偏移
      const x = w * 0.75 * (oldValue - newValue)
      this.tr += x
      // nav偏移
      const n = w * 0.2 * (oldValue - newValue)
      if ((newValue > oldValue && newValue >= 3)) {
        this.navtr += n
      } else if (oldValue > newValue && newValue <= this.list.length - 3 && this.navtr < 0) {
        this.navtr += n
      }
    },
    open (newValue, oldValue) {
      if (newValue) {
        document.body.setAttribute('style', 'position: fixed;height: 100%;overflow: hidden;width: 100%;')
      } else {
        document.body.setAttribute('style', '')
      }
    }
  }
}
</script>
