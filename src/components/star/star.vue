<template>
  <div class="star" :class="starType">
    <span v-for="itemClass in itemClasses" class="star-item" :class="itemClass" track-by="$index"></span>
  </div>
</template>
<script>
  const CLS_ON = 'on';
  const CLS_HALF = 'half';
  const CLS_OFF = 'off';
  export default {
    props: {
      score: {
        type: Number
      },
      size: {
        type: Number
      }
    },
    computed: {
      starType() {
        return 'star-' + this.size;
      },
      itemClasses() {
        let starList = [];
        let starLength = Math.floor(this.score);// 对评分取整
        let remainder = this.score % 1;// 取小数部分
        // 循环添加整星
        for (let i = 0; i < starLength; i++) {
          starList.push(CLS_ON);
        }
        // 添加半星
        if (remainder >= 0.5) {
          starList.push(CLS_HALF);
        }
        // 添加无星
        while (starList.length < 5) {
          starList.push(CLS_OFF);
        }
        return starList;
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .star
    font-size: 0
    .star-item
      display: inline-block
      background-repeat: no-repeat
    &.star-48
      .star-item
        width: 20px
        height: 20px
        background-size: 20px 20px
        margin-right: 22px
        &.on
          bg-image('star48_on')
        &.half
          bg-image('star48_half')
        &.off
          bg-image('star48_off')
        &:last-child
          margin-right: 0

    &.star-36
      .star-item
        width: 15px
        height: 15px
        margin-right: 6px
        background-size: 15px 15px
        &.on
          bg-image('star36_on')
        &.half
          bg-image('star36_half')
        &.off
          bg-image('star36_off')
        &:last-child
          margin-right: 0
    &.star-24
      .star-item
        width: 10px
        height: 10px
        margin-right: 3px
        background-size: 10px 10px
        &.on
          bg-image('star24_on')
        &.half
          bg-image('star24_half')
        &.off
          bg-image('star36_off')
        &:last-child
          margin-right: 0
</style>
