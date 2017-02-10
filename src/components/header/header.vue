<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" width="64px" height="64px">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          <span>{{seller.description}}/{{seller.deliveryTime}}分钟送达</span>
        </div>
        <div class="supports" v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="supports-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bullentin-wrapper" @click="showDetail">
      <span class="bullentin-title"></span><span class="bullentin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <div class="detail" v-show="detailShow" transition="fade">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <div>
            <h1 class="detail-name">{{seller.name}}</h1>
          </div>
          <v-star class="star-wrapper" :score="seller.score" :size="48"></v-star>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul class="supports" v-if="seller.supports">
            <li class="support-item" v-for="item in seller.supports">
              <span class="icon" :class="classMap[item.type]"></span>
              <span class="text">{{item.description}}</span>
            </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="bulletin">
            <p class="content">{{seller.bulletin}}</p>
          </div>
        </div>
      </div>
      <div class="detail-close" @click="closeDetail">
        <i class="icon-close"></i>
      </div>
    </div>
  </div>
</template>
<script>
import star from 'components/star/star';
export default {
  data() {
    return {
      detailShow: false
    };
  },
  components: {
    'v-star': star
  },
  props: {
    seller: {
      type: Object
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  },
  methods: {
     // 显示遮罩层
     showDetail() {
        this.detailShow = true;
     },
     closeDetail() {
        this.detailShow = false;
     }
  }

};

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .header
    position: relative
    color: #fff
    background-color: rgba(7, 17, 27, 0.5)
    .content-wrapper
      position: relative
      padding: 24px 12px 18px 24px
      font-size: 0
      .avatar
        display: inline-block
        vertical-align: top
        img
          border-radius: 2px
      .content
        display: inline-block
        font-size: 14px
        margin-left: 16px
        .title
          display: block
          .brand
            display: inline-block
            vertical-align: top
            width: 30px
            height: 18px
            bg-image('brand')
            background-size: 30px 18px
          .name
            margin-left: 2px
            font-size: 16px
            font-weight: bold
            line-height: 18px
        .description
          display: block
          line-height: 12px
          font-size: 12px
          margin-top: 8px
        .supports
          display: block
          margin-top: 10px
          font-size: 0
          line-height: 12px
          .icon
            display: inline-block
            vertical-align: top
            width: 12px
            height 12px
            margin-right: 4px
            background-size: 12px 12px
            background-repeat: no-repeat
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.guarantee
              bg-image('guarantee_1')
            &.invoice
              bg-image('invoice_1')
            &.special
              bg-image('special_1')
          .text
            display: inline-block
            line-height: 12px
            font-size: 10px
      .supports-count
        position: absolute
        height: 24px
        right: 12px
        line-height: 24px
        bottom: 14px
        padding: 0 8px
        border-radius: 14px
        text-align: center
        font-size: 0px
        font-weight: 200
        background: rgba(0, 0, 0, 0.2)
        .count
          vertical-align: top
          font-size: 10px
        .icon-keyboard_arrow_right
          font-size: 10px
          line-height: 24px
          margin-left: 2px
    .bullentin-wrapper
      position: relative
      height: 28px
      line-height: 28px
      padding: 0 22px 0 12px
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      background: rgba(7, 17, 27, 0.2)
      .bullentin-title
        vertical-align: top
        margin-top: 8px
        display: inline-block
        width: 22px
        height: 12px
        font-size: 10px
        font-weight: 200
        background-size: 22px 12px
        background-repeat: no-repeat
        bg-image('bulletin')
      .bullentin-text
        vertical-align: top
        margin: 0 4px
        font-size: 10px
      .icon-keyboard_arrow_right
        position: absolute
        vertical-align: top
        right: 12px
        top: 7px
        font-size: 10px

    .background
      position: absolute
      top: 0
      left: 0
      overflow: hidden
      width: 100%
      height: 100%
      filter: blur(10px)
      z-index: -1
    .detail
      position: fixed
      width: 100%
      height: 100%
      top: 0
      left: 0
      overflow: auto
      z-index: 100
      transition: all 0.5s
      backdrop-filter: blur(20px)
      &.fade-transition
        opacity: 1
        background: rgba(7, 17, 27, 0.8)
      &.fade-enter, &.fade-leave
        opacity: 0
        background: rgba(7, 17, 27, 0)
      .detail-wrapper
        min-height: 100%
        width: 100%
        .detail-main
          margin-top: 64px
          padding-bottom: 64px
          .detail-name
            font-size: 16px
            font-weight: 700
            line-height: 16px
            text-align: center
          .star-wrapper
            margin-top: 16px
            text-align: center
          .title
            display: flex
            width: 80%
            margin: 28px auto 24px auto
            .line
              flex: 1
              position: relative
              top: -6px
              border-bottom: 1px solid rgba(255, 255, 255, 0.2)
            .text
              padding: 0 12px
              font-weight: 700
              font-size: 14px
          .supports
            width: 80%
            margin: 0 auto
            .support-item
              padding: 0 12px
              margin-bottom: 12px
              font-size: 0
              &:last-child
                margin-bottom: 0
              .icon
                display: inline-block
                width: 16px
                height: 16px
                vertical-align: top
                margin-right: 6px
                background-size: 16px 16px
                background-repeat: no-repeat
                &.decrease
                  bg-image('decrease_2')
                &.discount
                  bg-image('discount_2')
                &.guarantee
                  bg-image('guarantee_2')
                &.invoice
                  bg-image('invoice_2')
                &.special
                  bg-image('special_2')
              .text
                line-height: 16px
                font-size: 12px
          .bulletin
            width: 80%
            margin: 0 auto
            .content
              padding: 0 12px
              line-height: 24px
              font-size: 12px

  .detail-close
    position: relative
    width: 32px
    height: 32px
    margin: -64px auto 0 auto
    clear: both
    font-size: 32px
</style>
