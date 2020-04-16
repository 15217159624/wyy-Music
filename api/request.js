import BASR_URL from './config.js'

const request = (method, url, data) => {

	const headers = {
		"Content-Type": "application/x-www-form-urlencoded"
	}

	headers['Authorization'] = 'Basic a3N1ZGk6a3N1ZGk='

	return uni.request({
			url: BASR_URL + url,
			method,
			data: data,
			header: headers
		})
		.then(response => {
			return response[1].data
		})
		.catch(error => {
			switch (error.code) {
				case 400:
					uni.clearStorageSync()
					break
				default:
					uni.showToast({
						title: error.message,
						icon: 'error'
					})
					return Promise.reject(error)
					break
			}

		})
}

export default request
