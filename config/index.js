var BASR_URL
const RES_URL = 'http://10.172.29.219:3001'
// const RES_URL = 'http://172.16.11.62:9211'
if(process.env.NODE_ENV === 'development'){
    BASR_URL = RES_URL
}else{
    // 生产环境
    BASR_URL = RES_URL
}

export default BASR_URL