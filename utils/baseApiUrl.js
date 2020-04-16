
const IS_PRODUCT = false  // true为正式环境，false为测试环境

// 测试环境下自动开启调试，避开ssl检查，正式环境下关闭调试
if(!IS_PRODUCT) {
  wx.setEnableDebug({
    enableDebug: true
  });
}

// let baseApiUrl = IS_PRODUCT ? "https://iovs.gdmcmc.cn/iovs" : "http://tst.gdmcmc.cn/iovs";
// let authApiUrl = IS_PRODUCT ? "https://iovs.gdmcmc.cn/iovs" : "http://tst.gdmcmc.cn/iovs";


export { baseApiUrl, authApiUrl  }