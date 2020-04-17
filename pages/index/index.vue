<template>
	<view class="content">
		<view class="swiper-box">
		<Swiper
		    @change="swiperChange"
		    :current="current"
		    indicatorColor="#fff"
		    indicatorActiveColor="#31c27c"
		    circular
		    indicatorDots
		    autoplay
		>
		    <SwiperItem v-for="(item, index) in banner" :key="index">
		        <Image lazyLoad style="" :src=" item.imageUrl 
		            "
		        />
		    </SwiperItem>
		</Swiper>
		</view>
		<View @click="go('推荐歌单')" class="cell-title">
		    推荐歌单->
		</View>
		<View class="cell-SongSheet">
		    <SongSheet
		        v-for="(item, index) in PersonalizedList"
		        :key="index"
		        :Oid="item.id"
		        :name="item.name"
		        :picUrl="item.picUrl + '?imageView&thumbnail=250x0'"
		        :playCount="item.playCount"
		    />
		</View>
		<View @click="go('排行榜')" class="cell-title">
		    排行榜->
		</View>
		<View class="cell-SongSheet">
		    <SongSheet
		        v-for="(item, index) in toplist"
		        :key="index"
		        :Oid="item.id"
		        :name="item.name"
		        :picUrl="item.picUrl + '?imageView&thumbnail=250x0'"
		        :playCount="item.playCount"
		    />
		</View>
	</view>
</template>

<script>
import SongSheet from "../../components/SongSheet";
export default {
   components: { SongSheet },
		data() {
			return {
				banner: [], //轮播图
				PersonalizedList: [], //推荐歌单
				toplist: [], //排行榜
				current: 0,
				show: [0, 1] //表示已经显示过的banner
			}
		},
		onLoad() {
			this.getBanner()
			this.gettoplist()
			this.getPersonalized()
		},	
    methods: {
	getBanner() {
	this.banner = []
	this.fly.post(`${this.baseApiUrl}/banner`).then(res => {
	  if (res.code == 200 ) {
		  this.banner = res.banners
	     }
	  });
	},
	go(title) {
	    uni.navigateTo({
	        url: `/pages/PersonalizedList/index?name=${title}`
	    });
	},
	swiperChange (){
		console.log('滚')
	},
	getPersonalized() {
	this.fly.post(`${this.baseApiUrl}/personalized`).then(res => {
	        let random = Math.floor(
	            Math.random() * (res.result.length - 5)
	        );
	        // 随机取6个
	        for (let item of res.result.slice(random, random + 6)) {
	            this.PersonalizedList.push({
	                id: item.id,
	                name: item.name,
	                picUrl: item.picUrl,
	                playCount: item.playCount
	            });
	        }
	    });
	},
	gettoplist() {
	 this.fly.post(`${this.baseApiUrl}/toplist`).then(res => {
	 	  let random = Math.floor(Math.random() * (res.list.length - 5));
	 	  // 随机取6个
	 	  for (let item of res.list.slice(random, random + 6)) {
	 	      this.toplist.push({
	 	          id: item.id,
	 	          name: item.name,
	 	          picUrl: item.coverImgUrl,
	 	          playCount: item.playCount
					});
				  }
			   });
			}
		}
	}
</script>

<style lang='scss' scoped>
image {
    width: 100%;
    height: 200px;
}
swiper {
    height: 200px;
}
.cell-title {
    font-size: 32rpx;
    margin-top: 20rpx;
    margin-bottom: 10rpx;
    padding: 0 15px;
}
.cell-SongSheet {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 8px;
}
</style>
