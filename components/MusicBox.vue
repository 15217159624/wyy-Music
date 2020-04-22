<template>
	<view v-if="musicData" :class="['m-box',{'m-box-show':isVisible}]">
		<view class="m-box-close" @click="handleClose">×</view>
		<view class="m-box-bg" :style="'background-image:url('+musicData.detail.coverImgUrl+')'">
		</view>
		<view class="m-box-info">
			<view>{{musicData.detail.name}}</view>
			<view>{{musicData.detail.name}}</view>
		</view>
		<image :class="['m-box-cover',{'m-box-paused':isPlay}]" :src="musicData.detail.coverImgUrl"></image>
		<view class="m-box-lyric">
			<view v-for="(item,index) in currentLyric" :key="index">
				<text :style="item.isActived ? 'color:#fff;':''">{{item.lyric}}</text>
			</view>
		</view>
		<slider :block-size="12" :value="currentTime" :max="musicTime" @changing="handleChanging" @change="handleChange" />
		<view class="m-box-btn">
			<view class="m-box-schema">
				<image @click="handleSchema(2)" v-show="schemaType==1" :src="require('../static/play_icn_loop.png')"></image>
				<image @click="handleSchema(3)" v-show="schemaType==2" :src="require('../static/play_icn_one.png')" mode=""></image>
				<image @click="handleSchema(1)" v-show="schemaType==3" :src="require('../static/play_icn_shuffle.png')" mode=""></image>
			</view>
			<image :src="require('../static/play_btn_prev.png')" @click="handlePrev"></image>
			<view @click="handleToggle">
				<image :src="isPlay ? require('../static/play_btn_play.png') : require('../static/play_btn_pause.png')"></image>
			</view>
			<image :src="require('../static/play_btn_next.png')" @click="handleNext"></image>
			<image class="m-box-detail" :src="require('../static/play_icn_src.png')" @click="handleDetailModal"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				musicTime: 100,
				currentTime: 0,
				schemaType: 1,
				isChange: false,
				isActivedIndex: 1,
				currentLyric: [],
				innerAudioContext: null
			}
		},
		computed: {
			isVisible() {
				return this.$store.state.musicBoxVisible;
			},
			isPlay() {
				return this.$store.state.musicStatus;
			},
			musicData() {
				return this.$store.state.musicData;
			},
			lyricList() {
				try {
					let data = this.musicData.lyric.lyric.split('\n');
					let lyric = data.map((item, index) => {
						return {
							lyric: item.replace(/\[(\S*)\]/, ''),
							isActived: index == 0 ? true : false,
							time: item.split(/\[(\S*)\:/)[1] * 60 + Number(item.split(/\:(\S*)\]/)[1])
						}
					})

					lyric.pop()

					return lyric

				} catch {}
			},
		},
		watch: {
			isPlay(value) {
				value ? this.innerAudioContext.pause() : this.innerAudioContext.play();
			},
			musicData(value) {
				this.innerAudioContext.src = value.songUrl;
			},
			lyricList(value) {
				this.currentLyric = value.slice(0, 3);
			}
		},
		mounted() {
			this.handlePlay();
		},
		methods: {
			handleSchema(value) {
				this.schemaType = value;
			},
			handlePrev() {
				this.handleMusicChange(308519);
			},
			handleNext() {
				this.handleMusicChange(308519);
			},
			async handleMusicChange(id) {
				await this.$store.dispatch('GEI_MUSIC', id);
				this.currentTime = 0;
				this.isActivedIndex = 1;
				this.innerAudioContext.seek(0);
				this.innerAudioContext.play();
			},
			handleDetailModal() {
				this.$store.state.musicDetailModal = true;
			},
			handleMusiceActived(currentTime) {
				if (this.lyricList[this.isActivedIndex].time < currentTime) {
					this.lyricList[this.isActivedIndex - 1].isActived = false;
					this.lyricList[this.isActivedIndex].isActived = true;
					try {
						this.lyricList[this.isActivedIndex + 1].isActived = false;
					} catch {}
					this.currentLyric = [
						this.lyricList[this.isActivedIndex - 1],
						this.lyricList[this.isActivedIndex],
						this.lyricList[this.isActivedIndex + 1] || "",
					]
					if (this.isActivedIndex == this.lyricList.length - 1) return;
					this.isActivedIndex++;
				}
			},
			handlePlay() {
				this.innerAudioContext = uni.createInnerAudioContext();
				this.innerAudioContext.onPlay(() => {
					this.$store.state.musicStatus = false;
					this.musicTime = this.innerAudioContext.duration;
				})
				this.innerAudioContext.onCanplay((res) => {
					if(!this.isPlay){
						this.innerAudioContext.play();
					}
					if(this.innerAudioContext.currentTime == 0){
						this.isActivedIndex = 1;
					}
					this.musicTime = this.innerAudioContext.duration;
				})
				this.handleOnTimeUpdate();
				this.innerAudioContext.onEnded(() => {
					this.isActivedIndex = 1;
					this.$store.state.musicStatus = true;
				})
			},
			handleOnTimeUpdate() {
				this.innerAudioContext.onTimeUpdate(res => {
					this.currentTime = this.innerAudioContext.currentTime;
					try {
						this.handleMusiceActived(this.currentTime);
					} catch {}
				})
			},
			handleChange(event) {
				this.lyricList.forEach((item, index) => {
					if (event.detail.value > item.time) {
						this.isActivedIndex = index;
					}
				})
				this.innerAudioContext.seek(event.detail.value);
				this.handleOnTimeUpdate();
				this.isChange = false;
			},
			handleChanging() {
				if (this.isChange) return;
				this.innerAudioContext.offTimeUpdate();
				this.isChange = true;
			},
			handleToggle() {
				this.$store.dispatch('CHANGE_STATUS');
			},
			handleClose() {
				this.$store.state.musicBoxVisible = false;
			}
		}
	}
</script>

<style lang="scss">
	.m-box {
		height: 100%;
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 0;
		transform: translateX(100%);
		transform-origin: center bottom;
		opacity: 0;
		transition: 0.5s ease;
		z-index: 10;
		overflow: hidden;
		background-color:#fff;
	}

	.m-box-close {
		font-size: 60rpx;
		color: #fff;
		font-weight: 100;
		position: absolute;
		right: 20rpx;
	}

	.m-box-bg {
		height: 100%;
		position: absolute;
		width: 100%;
		filter: blur(40px);
		z-index: -1;
	}

	.m-box-info {
		text-align: center;
		color: #fff;
		padding: 10rpx 0rpx;

		uni-view:nth-child(1) {
			font-size: 40rpx;
		}

		uni-view:nth-child(2) {
			opacity: 0.6
		}

		view:nth-child(1) {
			font-size: 40rpx;
		}

		view:nth-child(2) {
			opacity: 0.6
		}
	}

	.m-box-cover {
		width: 450rpx;
		height: 450rpx;
		display: block;
		margin: 50rpx auto;
		border-radius: 50%;
		animation: rotate 3s linear infinite;
	}

	@keyframes rotate {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(360deg);
		}
	}

	.m-box-paused {
		animation-play-state: paused;
	}

	.m-box-lyric {
		color: #dddddd8c;
		text-align: center;
		height: 110rpx;
		min-height: 110rpx;
	}

	.m-box-btn {
		display: flex;
		justify-content: center;
		align-items: center;

		uni-image {
			width: 180rpx;
			height: 180rpx;
		}

		image {
			width: 180rpx;
			height: 180rpx;
		}

		.m-box-schema {
			uni-image {
				width: 100rpx;
				height: 100rpx;
			}

			image {
				width: 100rpx;
				height: 100rpx;
			}
		}

		.m-box-detail {
			width: 60rpx;
			height: 60rpx;
		}
	}

	.m-box-show {
		opacity: 1;
		transform: translateX(0);
	}
</style>
