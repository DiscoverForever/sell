<template>
  <div class="ratings" v-el:ratings>
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score-all">{{seller.score}}</h1>
          <div class="text">综合评分</div>
          <div class="rankRate">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="text">服务态度</span>
            <v-star class="star-wrapper" :score="seller.serviceScore" :size="36"></v-star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="text">商品评分</span>
            <v-star class="star-wrapper" :score="seller.foodScore" :size="36"></v-star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="text">送达时间</span>
            <span class="deliveryTime">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <v-split></v-split>
      <v-ratingselect :ratings="ratings" :select-type="selectType" :only-content="onlyContent"></v-ratingselect>
      <div class="rating-wrapper">
        <ul>
          <li class="rating-item border-1px" v-for="rating in ratings" v-show="needShow(rating.rateType,rating.text)">
            <div class="avatar">
              <img :src="rating.avatar" width="28px" height="28px">
            </div>
            <div class="content">
              <h1 class="username">{{rating.username}}</h1>
              <div class="star-wrapper">
                <v-star class="star" :score="rating.score" :size="24"></v-star>
                <span class="deliveryTime" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
              </div>
              <p class="rating">
                {{rating.text}}
              </p>
              <div class="recommend" v-show="rating.rateType===0||rating.recommend.length > 0">
                <span class="icon-thumb_up"></span>
                <span class="item" v-for="item in rating.recommend">{{item}}</span>
              </div>
              <div class="time">
                {{rating.rateTime | formatDate}}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import {formatDate} from 'common/js/date';
  import BScroll from 'better-scroll';
  import star from 'components/star/star';
  import split from 'components/split/split';
  import ratingselect from 'components/ratingselect/ratingselect';
  // 错误码 0 成功
  const ERR_OK = 0;
  const ALL = 2;
  export default {
    data() {
      return {
        ratings: [],
        onlyContent: true,
        selectType: ALL
      };
    },
    components: {
      'v-star': star,
      'v-split': split,
      'v-ratingselect': ratingselect
    },
    created() {
      this.$http.get('/api/ratings').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.ratings = response.data;
          this.$nextTick(() => {
            this._initScroll();
          });
        }
      });
    },
    props: {
      seller: Object
    },
    methods: {
      /**
       * 初始化滚动
       * @private
       */
      _initScroll() {
        this.ratingsScroll = new BScroll(this.$els.ratings, {
          click: true
        });
      },
      needShow(type, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return this.selectType === type;
        }
      }
    },
    events: {
      'content.toggle'(onlyContent) {
        this.onlyContent = onlyContent;
        this.$nextTick(() => {
          this.ratingsScroll.refresh();
        });
      },
      'rating.selectType'(selectType) {
        this.selectType = selectType;
        this.$nextTick(() => {
          this.ratingsScroll.refresh();
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
  @import "../../common/stylus/mixin.styl"
  .ratings
    position: absolute
    top: 174px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    .ratings-content
      .overview
        display: flex
        width: 100%
        height: 82px
        padding: 18px 0
        .overview-left
          width: 137px
          flex: 0 0 137px
          padding-top: 6px
          text-align: center
          border-right: 1px solid rgba(7, 17, 27, 0.2)
          .score-all
            line-height: 28px
            font-size: 24px
            color: rgb(255, 153, 0)
          .text
            line-height: 12px
            font-size: 12px
            color: rgb(7, 17, 27)
            margin: 6px 0 8px 0
          .rankRate
            vert-align: top
            line-height: 10px
            font-size: 10px
            color: #93999f
        .overview-right
          flex: 1
          padding: 6px 0 0 24px
          .score-wrapper
            font-size: 0
            margin-bottom: 8px
            .text
              vertical-align: top
              line-height: 18px
              font-size: 12px
              color: rgb(7, 17, 27)
            .star-wrapper
              vertical-align: top
              display: inline-block
              padding: 0px 12px
            .score
              display: inline-block
              vertical-align: top
              line-height: 18px
              font-size: 12px
              color: rgb(255, 153, 0)
          .delivery-wrapper
            font-size: 0
            .text
              line-height: 18px
              font-size: 12px
              color: rgb(7, 17, 27)
            .deliveryTime
              margin-left: 12px
              line-height: 18px
              font-size: 12px
              color: rgb(147, 153, 159)
      .rating-wrapper
        margin: 0 18px
        .rating-item
          display: flex
          padding: 18px 0
          border-1px(rgba(7,17,27,0.1))
          .avatar
            flex: 0 0 28px;
            width: 28px
            margin-right: 12px
            img
              border-radius: 50%
          .content
            position: relative
            flex: 1
            .username
              font-size: 10px
              color: rgb(7, 17, 27)
              line-height: 12px
              margin-bottom: 4px
            .star-wrapper
              font-size: 0
              vertical-align: baseline
              .star
                display: inline-block
                margin-right: 6px
              .deliveryTime
                display: inline-block
                font-size: 10px
                font-weight: 200
                color: rgb(147, 157, 159)
            .rating
              font-size: 12px
              color: rgb(7, 17, 27)
              line-height: 18px
              margin-bottom: 8px
            .recommend
              line-height: 16px
              .icon-thumb_up
                vertical-align: top
                font-size: 12px
                color: rgb(0, 160, 220)
              .item
                display: inline-block
                height: 18px
                font-size: 9px
                border: 1px solid rgba(7, 17, 27, 0.1);
                border-radius: 1px
                background: #fff
                color: rgb(143, 157, 159)
                padding: 0 6px
                margin: 0 8px 4px 0
            .time
              position: absolute
              right: 0
              top: 0
              font-size: 10px
              color: rgb(147, 153, 159)
              line-height: 12px
</style>
