import netWorkConfig from '@/config/netWork'

// 16进制转10进制
export const to10_16 = (val) => eval(val).toString(16)

// id取链名
export const getChainName = (id = 1) => netWorkConfig[id].chainName

export default {
    to10_16,
    getChainName
}