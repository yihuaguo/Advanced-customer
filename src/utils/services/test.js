import request from '@/utils/request'

export const getData = async (params = {}) => {
    return await request('get', '/getDocument')
}