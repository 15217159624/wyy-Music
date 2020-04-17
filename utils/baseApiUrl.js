
const IS_PRODUCT = false  // true为正式环境，false为测试环境

// 测试环境下自动开启调试，避开ssl检查，正式环境下关闭调试
if(!IS_PRODUCT) {
  wx.setEnableDebug({
    enableDebug: true
  });
}

const RES_URL = 'http://10.172.29.219:3001'
// const RES_URL = 'http://172.16.11.62:9211'
let baseApiUrl = IS_PRODUCT ? RES_URL : RES_URL;

export { baseApiUrl }