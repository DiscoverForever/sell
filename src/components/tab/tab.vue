<template>
	<div class="tab">
	    <div class="tab-item">
	        <a v-link="{path:'/goods'}">商品</a>
	    </div>
	    <div class="tab-item">
	        <a v-link="{path:'/ratings'}">评论</a>
	    </div>
	    <div class="tab-item">
	        <a v-link="{path:'/seller'}">商家</a>
	    </div>
	    <router-view></router-view>
	</div>
</template>
<script type="text/ecmascript-6">
	export default {

	};
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/base.styl"
@import "../../common/stylus/mixin.styl"
.tab
	display: flex
	width: 100%
	height:40px
	line-height:40px
	border-1px(rgba(7, 17, 27, 0.2))
	.tab-item
		flex:1
		text-align:center
		.active
			color: rgb(240, 20, 20)
		>a
			text-decoration:none
			display:block
			font-size: 14px

</style>
