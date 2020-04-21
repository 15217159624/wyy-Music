<template>
<View class="Search">
        <View class="searchBox">
            <View class="search_input">
				
                <Input type="text"
                    v-model="search"
                    confirm-type="search"
                    @confirm="onConfirm"
                    @focus="show_close = true"
                    @blur="show_close = false"
                />
                <view
                    class="search_close"
                    @click="reset"
                    :style="{ opacity: show_close ? 1 : 0 }"
                >
				  ×
                </view>
            </View>
            <view class="btn" @click="onConfirm">搜索</view>
        </View>
       <View class="tagBox" v-if="!SongList.length">
            <View class="hot">热门搜索</View>
            <View class='tabView'   v-for="(item, index) in hotList" :key="index"  @click.native="hotSearch(item)">
				{{item}}
            </View>
        </View>
<!-- 滑动歌曲列表 -->
        <scroll-view
            class="scrollview"
            scrollY
            scrollWithAnimation
            scrollTop="0"
            lowerThreshold="20"
            @scrolltolower="scroll"
        >
            <View
                class="item"
                v-for="(item, index) in SongList"
                :key="index"
                @click="go(item)"
            >
                <View class="left">{{ index + 1 }}</View>
                <View class="box">
                    <View class="middle">
                        <View class="ellipsis">{{ item.name }}</View>
                        <Text class="ellipsis">
                            {{
                                item.ar
                                    .map(i => {
                                        return i.name;
                                    })
                                    .join(" ") +
                                    " -" +
                                    item.al.name
                            }}
                        </Text>
                    </View>
                </View>
            </View>
        </scroll-view>
    </View>
</template>

<script>
	export default {
	data() {
	    return {
	        search: "",
	        rows: 100, //每页数量
	        page: 1, //当前页
	        total: 0, //总数
	        SongList: [],
	        hotList: [],
	        show_close: false //是否显示搜索框的叉叉
	    };
	 },	   
	created() {
     this.fly.post(`${this.baseApiUrl}/search/hot`).then(res => {
            for (let item of res.result.hots) {
                this.hotList.push(item.first);
            }
        });
    },
	 methods:{
		 // 重置
		 reset(){
			 this.search = "";
			 this.SongList = [];
		 },
		 // 搜索
		 onConfirm(){
			 if(!this.search){
				 uni.showToast({
				     title: "请输入有效文字进行搜索",
				     icon: "none",
				     duration: 1000
				 });
			 }else{
			 uni.showLoading({title: "loading"});
			 let params = {keywords: this.search,limit: this.rows,offset: 1}
		     this.fly.get(`${this.baseApiUrl}/search/`,params).then(res => {
				 	let arr = [];
				 	if (!res.result.songs) {
				 	    uni.hideLoading();
				 	    uni.showToast({
				 	        title: "没有找到歌曲",
				 	        icon: "none",
				 	        duration: 1000
				 	    });
				 	    return;
				 	}
				 	for (let item of res.result.songs) {
				 	    arr.push({
				 	        al: {
				 	            picUrl: item.album.artist.img1v1Url,
				 	            name: item.album.name
				 	        },
				 	        ar: item.artists,
				 	        name: item.name,
				 	        id: item.id
				 	    });
				 	}
				 	this.total = res.result.songCount;
				 	this.page++;
				 	this.SongList = arr;
				 	uni.hideLoading();	
			});
	      }
	    },
		scroll(e){
			if (Math.ceil(this.total / this.rows) < this.page) {
			    uni.showToast({
			        title: "没有更多了",
			        icon: "none",
			        duration: 1000
			    });
			    return;
			}else{
				this.onConfirm()
			}
		},
		 hotSearch(searchName){
			this.search = searchName
			this.onConfirm()
		 },
		 go(){
			 
		 }
	 }
	}
</script>

<style lang='scss' scoped>
	@import "./index.scss";
</style>
