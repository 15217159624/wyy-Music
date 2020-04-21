<template>
	<View class="PersonalizedList">
	    <!-- 推荐歌单 -->
	    <View class="cell-title">
	        {{ title }}
	        <van-icon name="arrow" size="20px" color="#999" />
	    </View>
	    <View class="cell-SongSheet">
	        <SongSheet
			    v-if='!isShowSongSheet'
	            v-for="(item, index) in list"
	            :key="index"
	            :Oid="item.id"
	            :name="item.name"
	            :picUrl="item.picUrl + '?imageView&thumbnail=250x0'"
	            :playCount="item.playCount"
	        />
			<SongSheet
			    v-if='isShowSongSheet'
			    v-for="(item, index) in list"
			    :key="index"
			    :Oid="item.id"
			    :name="item.name"
			    :picUrl="item.coverImgUrl + '?imageView&thumbnail=250x0'"
			    :playCount="item.playCount"
			/>
	    </View>
	</View>
</template>
<!-- coverImgUrl -->
<script>
	import SongSheet from "../../components/SongSheet";
	export default{
    components: { SongSheet },
		  data(){
			  return {
				  isShowSongSheet:false,
			      list: [],
			      title: ""
			  };
		  },
		  onLoad(params){
			 this.showList(params)
		  },
		methods:{
			showList(params){
				uni.showLoading({
				    title: "loading"
				});
				if (params.name === "推荐歌单") {
				    this.Songlist();
					this.isShowSongSheet = false
				} else if (params.name === "排行榜") {
				    this.songlistTop();
					this.isShowSongSheet = true
				}
			},
			// 歌单推荐:
			Songlist(){
			this.list = []
			this.fly.get(`${this.baseApiUrl}/personalized`).then(res => {
					this.list = res.result
			   })
			this.title = "推荐音乐";
					 uni.hideLoading();
			},
			// 歌单排行榜:
			songlistTop(){
			this.list = []
			this.fly.get(`${this.baseApiUrl}/toplist`).then(res => {
					this.list = res.list
			   })
			this.title = "排行榜";
			 uni.hideLoading();
			},
			
		}
	}
</script>

<style scoped lang='scss'>
	@import './index.scss';
</style>
