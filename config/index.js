var BASR_URL

if(process.env.NODE_ENV === 'development'){
    // 开发环境
    BASR_URL = '/api'
}else{
    // 生产环境
    BASR_URL = 'http://172.16.11.62:9211'
}

export default BASR_URL