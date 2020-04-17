<template>
	<View class="Hot SongList">
	    <View class="coverBox">
	        <View class="cover" />
	        <Text class="time">{{time}}</Text>
	    </View>
	    <View
	        class="item"
	        :key="index"
	        v-for="(item, index) in hotList"
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
	                            " - " +
	                            item.al.name
	                    }}
	                </Text>
	            </View>
	            <View class="right" @click.stop="play(item)">
	                <Image
	                    :src="
	                        !audio_paused && item.id == audio_id
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
	import { combeforeDay} from "@/utils/newDate";
	export default {
		data() {
		    return {
		        hotList: [], //歌
		        time: combeforeDay,
		    };
		},
		onLoad() {
		this.getHotlist()
		},
		methods:{
	    getHotlist(){
			console.log('进来了热榜单')
			this.fly.post(`${this.baseApiUrl}/top/list`,{ idx: 1 }).then(res => {
			  if (res.code == 200 ) {
				  for (let item of res.playlist.tracks) {
				      this.hotList.push({
				          al: { picUrl: item.al.picUrl, name: item.al.name },
				          ar: item.ar,
				          name: item.name,
				          id: item.id
				      });
				  }
				  // this.time = res.playlist.updateTime;
			     }
			  });
			},
		}
	}
</script>

<style lang='scss' scoped>
@import "./index.scss";
</style>

