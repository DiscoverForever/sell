<template>
  <div class="seller" v-el:seller>
    <div class="seller-content">
      <div class="seller-header">
        <div class="title border-1px">
          <h1 class="seller-name">{{seller.name}}</h1>
          <div class="star-wrapper">
            <v-star class="star" :size="36" :score="seller.score"></v-star>
            <span class="text">({{seller.ratingCount}})</span><span class="text">月售{{seller.sellCount}}单</span>
          </div>
          <div class="collection" @click="toggleCollection">
            <i class="icon-favorite" :class="{'on':like}"></i>
            <span v-show="like" class="collection-text">已收藏</span>
            <span v-show="!like" class="collection-text">收藏</span>
          </div>
        </div>
        <div class="content">
          <div class="content-item">
            <h1 class="title">起送价</h1>
            <div class="text-wrapper">
              <span class="text">{{seller.minPrice}}</span>元
            </div>
          </div>
          <div class="content-item">
            <h1 class="title">商家配送</h1>
            <div class="text-wrapper">
              <span class="text">{{seller.deliveryPrice}}</span>元
            </div>
          </div>
          <div class="content-item">
            <h1 class="title">平均配送时间</h1>
            <div class="text-wrapper">
              <span class="text">{{seller.deliveryTime}}</span>分钟
            </div>
          </div>
        </div>
      </div>
      <v-split></v-split>
      <div class="seller-desc">
        <div class="bulletin">
          <h1 class="bulletin-title">公告与活动</h1>
          <p class="bulletin-content border-1px">{{seller.bulletin}}</p>
          <ul class="supports">
            <li class="support-item" v-for="support in seller.supports">
              <span class="icon" :class="classMap[support.type]"></span>
              <span>{{support.description}}</span>
            </li>
          </ul>
        </div>
      </div>
      <v-split></v-split>
      <div class="seller-real">
        <h1 class="seller-real-title">商家实景</h1>
        <div class="pic-wrapper" v-el:pic-wrapper>
          <ul class="pic-list" v-el:pic-list>
            <li class="pic" v-for="pic in seller.pics">
              <img :src="pic" width="120px" height="90px">
            </li>
          </ul>
        </div>
      </div>
      <v-split></v-split>
      <div class="seller-info">
          <h1 class="seller-info-title border-1px">商家信息</h1>
          <ul class="info-list">
            <li class="info-item" v-for="info in seller.infos">
              <p class="text">{{info}}</p>
            </li>
          </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import BScroll from 'better-scroll';
  import split from 'components/split/split';
  import star from 'components/star/star';
  export default {
    data() {
      return {
        like: false
      };
    },
    watch: {
      'seller'() {
        this._initScroll();
        this._initPicScroll();
      }
    },
    ready() {
      this._initScroll();
      this._initPicScroll();
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    props: {
        seller: {
            type: Object,
            deafult() {
                return [];
            }
        }
    },
    components: {
      'v-split': split,
      'v-star': star
    },
    methods: {
      _initScroll() {
          if (!this.sellerScroll) {
            this.sellerScroll = new BScroll(this.$els.seller, {
              click: true
            });
          } else {
              this.sellerScroll.refresh();
          }
      },
      _initPicScroll() {
        if (this.seller.pics) {
          // 动态设置图片列表宽度
          let picWidth = 120; // 图片宽度
          let margin = 6;
          let picCount = this.seller.pics.length; // 图片个数
          let width = (picWidth + margin) * picCount - margin;
          this.$els.picList.style.width = width + 'px';
          this.$nextTick(() => {
            if (!this.picScroll) {
              this.picScroll = new BScroll(this.$els.picWrapper, {
                scrollX: true,
                eventPassthrough: 'vertical'
              });
            } else {
              this.picScroll.refresh();
            }
          });
        }
      },
      toggleCollection() {
          this.like = !this.like;
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .seller
    position: absolute
    top: 174px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    .seller-header
      padding: 18px
      .title
        position: relative
        border-1px(rgba(7, 17, 21, 0.1))
        padding-bottom: 18px
        .seller-name
          font-size: 14px
          color: rgb(7, 17, 27)
          line-height: 14px
        .star-wrapper
          padding-top: 8px
          font-size: 0
          .star
            display: inline-block
            margin-right: 8px
          .text
            vertical-align: top
            font-size: 10px
            color: rgb(77, 85, 93)
            line-height: 18px
            margin-right: 12px
            &:last-child
              margin-right: 0
        .collection
          position: absolute
          top: 0
          right: 0
          text-align: center
          width: 50px
          .icon-favorite
            display: block
            font-size: 24px
            line-height: 24px
            color: #d4d6d9
            &.on
              color: rgb(240, 20, 20)
          .collection-text
            display: block
            line-height: 10px;
            font-size: 10px;
            color: #4d555d;
      .content
        display: flex
        padding-top: 18px
        .content-item
          flex: 1
          text-align: center
          .title
            font-size: 10px
            color: rgb(147, 153, 159)
            line-height: 10px
            border-none()
            padding-bottom: 4px
          .text-wrapper
            vertical-align: top
            .text
              font-size: 24px
              color: rgb(7, 17, 27)
              line-height: 24px
              font-weight: 200
    .seller-desc
      padding:18px 18px 0 18px
      .bulletin
        .bulletin-title
          font-size: 14px
          color: rgb(7, 17, 27)
          line-height: 14px
          padding-bottom: 8px
        .bulletin-content
          font-size: 12px
          color: rgb(240, 20, 20)
          line-height: 24px
          padding-bottom: 16px
          border-1px(rgba(7, 17, 21, 0.1))
        .supports
          .support-item
            border-1px(rgba(7, 17, 21, 0.1))
            padding: 16px 12px
            &:last-child
              border-none()
            .icon
              display: inline-block
              vertical-align: top
              width: 16px
              height 16px
              margin-right: 6px
              background-size: 16px 16px
              background-repeat: no-repeat
              &.decrease
                bg-image('decrease_4')
              &.discount
                bg-image('discount_4')
              &.guarantee
                bg-image('guarantee_4')
              &.invoice
                bg-image('invoice_4')
              &.special
                bg-image('special_4')
    .seller-real
      padding: 18px 0px 18px 18px
      .seller-real-title
        font-size: 14px
        color: rgb(7, 17, 27)
        line-height: 14px
        padding-bottom: 8px
      .pic-wrapper
        .pic-list
          overflow-x: hidden
          overflow-y: hidden
          height: 90px
          white-space: nowrap
          width: 100%
          .pic
            display: inline-block
            margin-right: 6px
            &:last-child
              margin-right: 0

    .seller-info
      padding: 18px 18px 0 18px
      .seller-info-title
        font-size: 14px
        color: rgb(7, 17, 27)
        line-height: 14px
        padding-bottom: 8px
        border-1px(rgba(7, 17, 21, 0.1))
      .info-list
        .info-item
          padding: 16px 12px 16px 12px
          border-1px(rgba(7, 17, 21, 0.1))
          .text
            font-size: 12px
            color: rgb(7, 17, 27)
            line-height: 16px

</style>
