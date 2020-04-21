<template>
  <View class="SongLists">
        <View class="header">
            <Image
                :src="require('../../static/play-cell.png')"
                @click="playAll"
            />
            <View class="left" @click="playAll">
                播放全部<Text>(共{{ SongList.length }}首)</Text>
            </View>
            <View class="right" @click="Collection">
                + 收藏({{ subscribedCount }})
            </View>
        </View>
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
                                .join(" / ") +
                                " -" +
                                item.al.name
                        }}
                    </Text>
                </View>
                <View class="right" @click.stop="play(item)">
                    <Image
                        :src="
                            !audio_paused && item.id === audio_id
                                ? require('../../static/pause-item.png')
                                : require('../../static/play-list.png')
                        "
                    />
                </View>
            </View>
        </View>
    </View>
</template>

<script>
export default {
		data(){
			return{
				subscribedCount: 0, //收藏数量
				SongList: [], //展示列表
				audio_id: null,
				audio_paused: null
			}
		},
		onLoad(params){
			this.getList(params)
		},
		methods:{
			go(){
				
			},
			getList(params){
				uni.showLoading({
				    title: "loading"
				});
				this.fly.get(`${this.baseApiUrl}/playlist/detail`,{id:params.id}).then(res => {
				    for (let item of res.playlist.tracks) {
				        this.SongList.push({
				            al: { picUrl: item.al.picUrl, name: item.al.name },
				            ar: item.ar,
				            name: item.name,
				            id: item.id
				        });
				    }
				    this.subscribedCount = res.playlist.subscribedCount;
				    uni.hideLoading();
				});
			
		}
	},
	}
</script>

<style lang='scss' scoped>
@import "./index.scss";
</style>
