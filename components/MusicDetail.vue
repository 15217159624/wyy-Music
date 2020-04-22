<template>
	<view v-if="musicDetail" :class="['m-detail',{'m-detail-show':isVisible}]">
		<view class="m-detail-close" @click="handleClose">×</view>
		<view>{{musicDetail.name}}</view>
		<view v-if="musicDetail.tags.length > 0" class="m-detail-tags">
			<text v-for="(tagname,index) in musicDetail.tags" :key="index">{{tagname}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		computed: {
			musicDetail() {
				return this.$store.state.musicData.detail
			},
			isVisible() {
				return this.$store.state.musicDetailModal
			}
		},
		methods: {
			handleClose() {
				this.$store.state.musicDetailModal = false;
			}
		}
	}
</script>

<style lang="scss">
	.m-detail {
		width: 100%;
		height: 50vh;
		position: fixed;
		bottom: 0;
		overflow-y: auto;
		background-color: rgba(0,0,0,.7);
		z-index: 99;
		color: #fff;
		transform: translateY(100%);
		transition: 0.2s ease-in;
		padding-top: 20rpx;
		box-sizing: border-box;
		&>uni-view {
			padding: 20rpx;
			border-bottom: 1px solid;
			border-color: hsla(0,0%,100%,.6);
		}
		
		&>view {
			padding: 20rpx;
			border-bottom: 1px solid;
			border-color: hsla(0,0%,100%,.6);
		}
		
		.m-detail-close {
			font-size: 60rpx;
			color: #fff;
			font-weight: 100;
			position: absolute;
			right: 10rpx;
			top: -20rpx;
			border:none;
		}

		.m-detail-tags {
			uni-text {
				border: 1px solid;
				border-color: #fff;
				border-radius: 10rpx;
				padding: 5rpx 10rpx;
			}
			text {
				border: 1px solid;
				border-color: #fff;
				border-radius: 10rpx;
				padding: 5rpx 10rpx;
			}
		}
	}

	.m-detail-show {
		transform: translateY(0);
	}
</style>
