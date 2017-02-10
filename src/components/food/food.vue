<template>
  <div class="food" v-show="showFlag" v-el:food>
    <div class="food-content">
      <div class="img-header">
        <div class="back" @click.stop="hide($event)">
          <i class="icon-arrow_lift"></i>
        </div>
        <img :src="food.image" width="100%" height="375px">
      </div>
      <div class="content">
        <h1 class="title">{{food.name}}</h1>
        <div class="detail">
          <span class="sell-count">月售{{food.sellCount}}份</span><span class="raing">好评率{{food.rating}}%</span>
        </div>
        <div class="price">
          <span class="price">￥{{food.price}}</span>
          <span class="oldPrice" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
        </div>
        <div class="cartcontrl-wrapper" v-show="food.count>0">
          <cartcontrol :food="food"></cartcontrol>
        </div>
        <div class="buy" @click.stop.prevent="showCartcontrol($event)" v-show="!food.count || food.count===0"
             transition="fade">
          加入购物车
        </div>
      </div>
      <split></split>
      <div class="info" v-show="food.info">
        <h1 class="title">商品介绍</h1>
        <p class="text">{{food.info}}</p>
      </div>
      <split v-show="food.info"></split>
      <div class="rating">
        <h1 class="food-rating">商品评价</h1>
        <v-ratingselect :ratings="food.ratings" :select-type="selectType" :only-content="onlyContent"
                        :desc="desc"></v-ratingselect>
        <div class="rating-wrapper">
          <ul>
            <li class="rating-item border-1px" v-for="rating in food.ratings"
                v-show="needShow(rating.rateType,rating.text)">
              <div class="time">
                {{rating.rateTime | formatDate}}
              </div>
              <div class="recommend">
                <span class="icon-thumb_up" v-show="rating.rateType===0"></span>
                <span class="icon-thumb_down" v-show="rating.rateType===1"></span>
                <p class="rating-content">{{rating.text}}</p>
              </div>
              <div class="avatar">
                <span class="username">{{rating.username}}</span>
                <img :src="rating.avatar" width="28px" height="28px">
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue';
  import BScroll from 'better-scroll';
  import {formatDate} from 'common/js/date';
  import cartcontrol from 'components/cartcontrol/cartcontrol';
  import split from 'components/split/split';
  import ratingselect from 'components/ratingselect/ratingselect';
  import star from 'components/star/star';
  const ALL = 2;
  //  const POSITIVE = 0;
  //  const NEGATIVE = 1;
  export default {
    data() {
      return {
        showFlag: false,
        onlyContent: true,
        selectType: ALL,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      };
    },
    components: {
      cartcontrol,
      split,
      'v-ratingselect': ratingselect,
      'v-star': star
    },
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      _initScroll() {
        this.foodScroll = new BScroll(this.$els.food, {
          click: true
        });
      },
      hide(event) {
        if (!event._constructed) {
          return;
        }
        console.log('hide');
        this.showFlag = false;
      },
      show() {
        this.showFlag = true;
        this.selectType = ALL;
        this.onlyContent = true;
        this.$nextTick(() => {
          if (!this.foodScroll) {
            this.foodScroll = new BScroll(this.$els.food, {
              click: true
            });
          } else {
            this.foodScroll.refresh();
          }
        });
      },
      needShow(rateType, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return this.selectType === rateType;
        }
      },
      showCartcontrol(event) {
        if (!event._constructed) {
          return;
        }
        this.$dispatch('cart.add', event.target);
        Vue.set(this.food, 'count', 1);
      }
    },
    events: {
      'content.toggle'(onlyContent) {
        this.onlyContent = onlyContent;
        this.$nextTick(() => {
          this.foodScroll.refresh();
        });
      },
      'rating.selectType'(selectType) {
        this.selectType = selectType;
        this.$nextTick(() => {
          this.foodScroll.refresh();
        });
      }
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .food
    position: fixed
    top: 0
    left: 0
    bottom: 48px
    z-index: 30
    width: 100%
    background: #fff
    .food-content
      .img-header
        position: relative
        .back
          position: absolute
          left: 0
          top: 10px
          .icon-arrow_lift
            display: block
            font-size: 20px
            padding: 10px
            color: #fff
      .content
        position: relative
        padding: 18px
        .title
          vertical-align: top
          padding-bottom: 8px
          font-size: 14px
          font-weight: 700
          color: rgb(7, 17, 27)
        .detail
          vertical-align: top
          font-size: 10px
          color: rgb(147, 153, 159)
          line-height: 10px
        .price
          font-size: 0
          margin-top: 18px
          line-height: 24px
          .price
            vertical-align: top
            font-size: 10px
            font-weight: 700
            color: rgb(240, 20, 20)
          .oldPrice
            vertical-align: top
            font-size: 10px
            color: rgb(147, 153, 159)
        .buy
          position: absolute
          right: 18px
          bottom: 18px
          width: 74px
          height: 24px
          color: #fff
          border-radius: 12px
          font-size: 10px
          text-align: center
          line-height: 24px
          transition: all 0.3s
          &.fade-transition
            opacity: 1
            background: rgb(0, 160, 220)
          &.fade-enter, &.fade-leave
            opacity: 0
            background: rgb(255, 255, 255)
        .cartcontrl-wrapper
          position: absolute
          right: 18px
          bottom: 18px
      .info
        padding: 18px
        .title
          font-size: 14px
          color: #07111b
          line-height: 14px
        .text
          margin-top: 18px
          font-size: 12px
          color: rgb(77, 85, 93)
          line-height: 24px
      .rating
        .food-rating
          margin: 18px 18px 0px 18px
          font-size: 12px
          color: rgb(77, 85, 93)
          line-height: 24px
        .rating-wrapper
          padding: 16px 18px
          .rating-item
            position: relative
            .time
              font-size: 10px
              line-height: 24px
              color: rgb(147, 153, 159)
            .recommend
              margin-top: 6px
              .rating-content
                display: inline
                font-size: 12px
                line-height: 16px
                color: rgb(7, 17, 27)
            .avatar
              position: absolute
              right: 0
              top: 0
              font-size: 0
              .username
                display: inline-block
                vertical-align: top
                padding-top: 7px
                font-size: 10px
                line-height: 12px
                color: rgb(147, 153, 159)
              img
                border-radius: 50%
                margin-left: 6px
</style>
