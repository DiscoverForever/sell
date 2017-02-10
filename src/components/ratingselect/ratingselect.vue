<template>
  <div class="ratingselect">
    <div class="rating-type border-1px">
      <span class="block all" :class="{'active':selectType === 2}"
            @click="select(2,$event)">
        {{desc.all}}<span class="count">{{ratings.length}}</span>
      </span>
      <span class="block positive" :class="{'active':selectType === 0}"
            @click="select(0,$event)">
        {{desc.positive}}<span class="count">{{positives.length}}</span>
      </span>
      <span class="block negative" :class="{'active':selectType === 1}"
            @click="select(1,$event)">
        {{desc.negative}}<span class="count">{{negatives.length}}</span>
      </span>
    </div>
    <div class="switch border-1px" :class="{'on':onlyContent}" @click="switch">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>

  </div>
</template>
<script>
  const ALL = 2;
  const POSITIVE = 0;
  const NEGATIVE = 1;
  export default {
    props: {
      ratings: {
        type: Array,
        default() {
          return [];
        }
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default() {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          };
        }
      },
      selectType: {
        type: Number,
        default: ALL
      }
    },
    methods: {
      /**
       * 只看有内容评价
       */
      switch() {
        this.onlyContent = !this.onlyContent;
        this.$dispatch('content.toggle', this.onlyContent);
      },
      /**
       * 评价选择过滤
       * @param type 0||1||2
       * @param event
       */
      select(type, event) {
        // 防止PC触发两次点击事件
        if (!event._constructed) {
          return;
        }
        this.selectType = type;
        this.$dispatch('rating.selectType', this.selectType);
      }
    },
    computed: {
      /**
       * 满意
       * @returns {Array.<T>}
       */
      positives() {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE;
        });
      },
      /**
       * 不满意
       * @returns {Array.<T>}
       */
      negatives() {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE;
        });
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .ratingselect
    .rating-type
      border-1px(rgba(7, 17, 27, 0.1))
      padding: 18px 0px
      margin: 0 18px
      font-size: 0
      .block
        display: inline-block
        width: 64px
        height: 32px
        font-size: 12px
        text-align: center
        line-height: 32px
        border-radius: 1px
        margin-right: 8px
        color: #000
        &:last-child
          margin-right: 0
        &.active
          color: #fff
          background: #00a0dc
        .count
          font-size: 8px
          margin-left: 2px
      .all
        background: rgba(0, 160, 220, 0.2)
      .positive
        background: rgba(0, 160, 220, 0.2)
      .negative
        background: rgba(77, 85, 93, 0.2)
    .switch
      font-size: 0
      line-height: 24px
      padding: 12px 18px
      color: #93999f
      border-1px(rgba(7, 17, 27, 0.1))
      &.on
        color: #00c850
      .icon-check_circle
        display: inline-block
        vertical-align: top
        font-size: 24px
        margin-right: 4px
      .text
        vertical-align: top
        display: inline-block
        font-size: 12px
        color: #93999f
</style>
