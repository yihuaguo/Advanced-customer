import Web3 from 'web3/dist/web3.min.js';
import { message } from 'ant-design-vue'

export const web3 = (window.ethereum && new Web3(window.ethereum)) || null

// 返回当前网络网络链id
export const chainId = async () => {
    try {
        const chai_id = web3.utils.hexToNumber(window.ethereum.chainId)
        return chai_id
    } catch (error) {
        message.error('获取钱包地址失败!')
        return false
    }
}

// 返回当前登录钱包的地址
export const getAddress = async () => window.ethereum.request({
    method: 'eth_requestAccounts'
}).then(res => {
    return res[0]
}).catch(() => {
    message.error('获取钱包地址失败!')
    return false
})

// 返回钱包账户余额
export const getEth = async (adress) => {
    try {
        const bal = await window.ethereum.request({
            method: 'eth_getBalance',
            params: [
                adress,
                'latest'
            ]
        });

        if (bal.length > 0) {
            return parseInt(bal, 16) / 1e18
        } else {
            return '0';
        }
    } catch (e) {
        message.error('获取账户余额失败!')
        return false
    }
}

// 登录
const sign = async (address = '') => {
    if (!address) {
        message.warning('请链接钱包');
        return
    }
    return web3.eth.personal.sign(web3.utils.utf8ToHex(`Welcome to Element! Click "Sign" to sign in. No password needed!`), address)
        .then(res => {
            return res
        }).catch(e => {
            message.error('登录钱包失败!')
            return false
        })
}

// 获取签名
const getAutographValue = async () => {
    let autographValue = ''
    let pass = true
    const address = await getAddress()
    if (address) {
        const signValue = await sign(address)
        if (signValue) {
            autographValue = signValue
        } else {
            pass = false
        }
    } else {
        pass = false
    }
    if (!pass) {
        return pass
    } else {
        return autographValue
    }
}

// 登录以获取签名
export const Approve = async () => {
    // 监控错误
    let pass = true
    // 新增网络后提前返回签名
    let netWorkAutograpth = ''
    // 检测是否有安装mateMask
    if (!web3) {
        message.error('请安装mateMask!')
        return false
    }
    try {
        // 切换当前网络链id, 如果失败，说明用户钱包没有添加当前id的网络
        await (window.ethereum).request({
            method: 'wallet_switchEthereumChain',
            params: [{
                chainId: web3.utils.numberToHex(4)
            }]
        })
    } catch (e) {
        if (e.code === 4902) {
            // 新增rpc网络
            await (window.ethereum).request({
                method: 'wallet_addEthereumChain',
                params: [{
                    chainId: Web3.utils.numberToHex(4), // 目标链ID
                    chainName: 'Rinkeby Ether', // 网络名称
                    nativeCurrency: {
                        name: 'ETH',
                        symbol: 'ETH',
                        decimals: 18 // 小数点
                    },
                    rpcUrls: ['https://rinkeby.infura.io/v3/'], // 节点
                    blockExplorerUrls: ['https://rinkeby.etherscan.io'] // 区块链浏览器
                }]
            }).then(async () => {
                const result = await getAutographValue()
                if (result) {
                    netWorkAutograpth = result
                } else {
                    pass = false
                }
            }).catch(e => {
                message.error('新增网络失败!')
                pass = false
            })
        } else {
            message.error('未知错误，切换网络失败，请重试!')
            pass = false
        }
    }
    if (netWorkAutograpth) {
        return netWorkAutograpth
    }
    if (!pass) {
        return pass
    }
    // 登录
    const result = await getAutographValue()

    if (result) {
        return result
    } else {
        return false
    }
}

export default {
    Approve,
    chainId,
    getAddress,
    getEth
}