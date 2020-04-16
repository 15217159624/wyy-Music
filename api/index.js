import request from './request.js'

export default {
	bannerApi: function(data) {
		return request("POST", "/banner", data);
	}
}
