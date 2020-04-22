import request from './request.js'

export default {
	bannerApi: function(data) {
		return request("POST", "/banner", data);
	},
	songUrlApi: function(data) {
		return request("POST", "/song/url", data);
	},
	lyricApi: function(data) {
		return request("POST", "/lyric", data);
	},
	playlistDetailApi: function(data) {
		return request("POST", "/playlist/detail", data);
	},
	
}
