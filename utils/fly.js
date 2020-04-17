var Fly = require("flyio/dist/npm/wx");

const fly = new Fly();

//配置请求基地址
fly.config.baseURL = "";

// //添加请求拦截器
fly.interceptors.request.use((config, promise) => {
  console.info("request: " + config.url, config.body);
  //请求头添加token
  let token = wx.getStorageSync("carMiniToken");
  config.headers["token"] = token;
  //给所有请求添加自定义header
  config.headers["X-Tag"] = "flyio";
  //可以通过promise.reject／resolve直接中止请求
  //promise.resolve("fake data")

  return config;
});

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
  (response, promise) => {
    console.info("response: " + response.request.url, response.data);
    if (response.data.code == 401) {
      wx.clearStorage();
      uni.hideLoading();
      uni.navigateTo({
        url: "/pages/login/index"
      });
    } else {
      //只将请求结果的data字段返回
      return response.data;
    }
  },
  (err, promise) => {
    //发生网络错误后会走到这里
    //promise.resolve("ssss")
  }
);
export default fly;
