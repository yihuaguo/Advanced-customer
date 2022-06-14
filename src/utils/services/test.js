import request from '@/utils/request'

export const getData = async (params = {}) => {
    return await request('get', '/getDocument')
}

export const getData2 = async (params = {}) => {
    return await request('get', '/getDocument2')
}

export default {
    getData,
    getData2
}