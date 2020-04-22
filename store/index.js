import Vue from 'vue'
import Vuex from 'vuex'
import http from '../api/index.js'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		musicData: '',
		musicStatus: true,
		musicBoxVisible:false,
		musicDetailModal: false
		
	},
	mutations: {
		MUSIC_STATUS(state, value) {
			state.musicStatus = !state.musicStatus;
		},
		MUSIC_DATA(state, value) {
			state.musicData = value;
		},
		DETAIL_MODAL(state, value) {
			state.musicDetailModal = value;
		}
	},
	actions: {
		CHANGE_STATUS({
			commit
		}) {
			commit('MUSIC_STATUS')
		},
		async GEI_MUSIC({
			commit
		}, id) {
			let lyric = await http.lyricApi({
				id: id
			})
			let detail = await http.playlistDetailApi({
				id: id
			})
			let song = await http.songUrlApi({
				id: id
			})
			let data = {
				lyric: lyric.lrc,
				detail: detail.playlist,
				songUrl: song.data[0].url
			}
			
			store.state.musicStatus = false;
			
			commit('MUSIC_DATA', data);
			
			return new Promise((response, reject) => {
				response(data)
			})
		},
	}
})

export default store
