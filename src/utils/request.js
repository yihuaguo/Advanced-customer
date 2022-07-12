import axios from 'axios'
import nprogress from "nprogress";

const service = axios.create({
    baseURL: '/api',
    timeout: 10000
})

service.interceptors.request.use(
    // 统一请求前处理
    config => {
        nprogress.start()
        return config
    },
    error => {
        console.log('request error', error)
    }
)

service.interceptors.response.use(
    // 统一返回数据处理
    response => {
        nprogress.done()
        return response.data
    },
    error => {
        nprogress.done()
        console.log('response error', error)
        return Promise.reject(new Error(error))
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