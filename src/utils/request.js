import axios from 'axios'

const service = axios.create({
    baseURL: '/api',
    timeout: 10000
})

service.interceptors.request.use(
    // 统一请求前处理
    config => {
        return config
    },
    error => {
        console.log('request error', error)
    }
)

service.interceptors.response.use(
    // 统一返回数据处理
    response => {
        return response.data
    },
    error => {
        console.log('response error', error)
    }
)

const axiosService = (method = 'get', url, params = {}, body = {}, ...other) => {
    return service({
        url,
        method,
        params,
        body,
        ...other
    })
}

export default axiosService