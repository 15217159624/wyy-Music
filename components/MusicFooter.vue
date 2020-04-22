<template>
	<view>
		<view v-if="musicData" :class="['m-footer',{'m-footer-down': isVisible}]">
			<image :class="['m-cover',{'m-cover-paused':isPlay}]" :src="musicData.detail.coverImgUrl"></image>
			<view class="m-title" @click="handleShow">
				<view>{{musicData.detail.name}}</view>
				<view>{{musicData.detail.name}}</view>
			</view>
			<view class="m-play" @click="handleToggle">
				<image :src="isPlay ? require('../static/play_icon.png') : require('../static/pause_icon.png')"></image>
			</view>
			<image class="m-detail" :src="require('../static/play_icn_src_footer.png')" @click="handleDetalModal"></image>
		</view>
		<MusicBox></MusicBox>
		<musicDetail></musicDetail>
	</view>
</template>

<script>
	import MusicBox from './MusicBox.vue'
	import musicDetail from './MusicDetail.vue'
	export default {
		components: {
			MusicBox,
			musicDetail
		},
		data() {
			return {
				
			}
		},
		computed: {
			isVisible(){
				return this.$store.state.musicBoxVisible;
			},
			isPlay() {
				return this.$store.state.musicStatus;
			},
			musicData() {
				return this.$store.state.musicData;
			}
		},
		methods: {
			handleDetalModal(){
				this.$store.state.musicDetailModal = true;
			},
			handleShow() {
				this.$store.state.musicBoxVisible = true;
			},
			handleToggle() {
				this.$store.dispatch('CHANGE_STATUS')
			}
		}
	}
</script>

<style lang="scss">
	.m-footer {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		display: flex;
		height: 50px;
		align-items: center;
		padding: 0px 10px;
		border-top: 1px solid #eee;
		box-sizing: border-box;
		z-index: 9;
		transition: all 0.3s;
		background-color: #fff;
		.m-cover {
			width: 38px;
			height: 38px;
			border-radius: 50%;
			margin-right: 10px;
			animation: rotate 3s linear infinite;
		}

		.m-cover-paused {
			animation-play-state: paused;
		}

		@keyframes rotate {
			from {
				transform: rotate(0deg);
			}

			to {
				transform: rotate(360deg);
			}
		}

		.m-title {
			flex: 1;

			uni-view:nth-child(2) {
				font-size: 13px;
				color: #999;
			}
			view:nth-child(2) {
				font-size: 13px;
				color: #999;
			}
		}

		.m-play {
			width: 30px;
			height: 30px;
			box-sizing: border-box;
			border: 2px solid;
			border-color: #31c27c;
			border-radius: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
			margin: 0px 10px;

			uni-image {
				width: 18px;
				height: 18px;
				margin-left: 1px;
			}

			uni-image:nth-child(1) {
				width: 15px;
				height: 16px;
				margin-left: 3px;
			}
			
			image {
				width: 18px !important;
				height: 18px !important;
				margin-left: 1px;
			}
			
			image:nth-child(1) {
				width: 15px !important;
				height: 16px !important;
				margin-left: 1px;
			}
		}

		.m-detail {
			width: 30px;
			height: 30px;
		}
	}

	.m-footer-down {
		transform: translateY(100%);
	}
</style>
