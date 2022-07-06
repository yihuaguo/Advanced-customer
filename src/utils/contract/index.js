import Web3 from 'web3/dist/web3.min.js';
import { abi as nftAbi, address as nftAddress } from './abi/nft'
import localeStorage from '@/utils/stroage'
const web3 = new Web3(window.ethereum)

// 铸币
export const mint = async (url, price = 0) => {
    const contract = new web3.eth.Contract(nftAbi, nftAddress)
    const sendObj = {
        from: localeStorage.localGet('currentAddress'),
        gas: '230000',
        gasPrice: await web3.eth.getGasPrice()
    }
    // 为了传递小数,需要转wei单位
    const newPrice = web3.utils.toWei(price, 'ether')
    return new Promise(async (resolve, reject) => {
        await contract.methods.mint(url, newPrice).send(sendObj).on('confirmation', (a) => {
            resolve(a)
        }).on('error', (err) => {
            reject(err)
        })
    })
}

// 购买nft
export const buyNft = async (id, price) => {
    const contract = new web3.eth.Contract(nftAbi, nftAddress)
    const sendObj = {
        from: localeStorage.localGet('currentAddress'),
        gas: '230000',
        gasPrice: await web3.eth.getGasPrice(),
        value: web3.utils.toWei(price, 'ether')
    }
    console.log('obj', sendObj)
    return new Promise(async (resolve, reject) => {
        await contract.methods.handleTransfer(id).send(sendObj).on('confirmation', (a) => {
            resolve(a)
        }).on('error', (err) => {
            reject(err)
        })
    })
}

// 发起售卖
export const onSale = async (id, price) => {
    const contract = new web3.eth.Contract(nftAbi, nftAddress)
    const sendObj = {
        from: localeStorage.localGet('currentAddress'),
        gas: '230000',
        gasPrice: await web3.eth.getGasPrice()
    }
    const newPrice = web3.utils.toWei(price, 'ether')
    return new Promise(async (resolve, reject) => {
        await contract.methods.startNftSale(id, newPrice).send(sendObj).on('confirmation', (a) => {
            resolve(a)
        }).on('error', (err) => {
            reject(err)
        })
    })
}

// 撤销售卖
export const rectiveSale = async (id) => {
    const contract = new web3.eth.Contract(nftAbi, nftAddress)
    const sendObj = {
        from: localeStorage.localGet('currentAddress'),
        gas: '230000',
        gasPrice: await web3.eth.getGasPrice()
    }
    return new Promise(async (resolve, reject) => {
        await contract.methods.endNftSale(id).send(sendObj).on('confirmation', (a) => {
            resolve(a)
        }).on('error', (err) => {
            reject(err)
        })
    })
}

// 获取所有nft的数量
export const getAllNftNum = async () => {
    const contract = new web3.eth.Contract(nftAbi, nftAddress)
    return new Promise(async (resolve, reject) => {
        const allNftNum = await contract.methods.getNftLength().call()
        const eth = await contract.methods.getEth().call()
        const newEth = web3.utils.fromWei(eth, "ether")
        if (allNftNum) {
            resolve({ allNftNum, eth: newEth })
        } else {
            reject('err!')
        }
    })
}

// 获取nft的拥有者
export const getNftOwner = async (id) => {
    const contract = new web3.eth.Contract(nftAbi, nftAddress)
    return new Promise(async (resolve, reject) => {
        const ownerAddress = await contract.methods.ownerOf(id).call()
        if (ownerAddress) {
            resolve(ownerAddress)
        } else {
            reject('err!')
        }
    })
}

// 获取nft数据
export const getNftInfo = async (id) => {
    const contract = new web3.eth.Contract(nftAbi, nftAddress)
    return new Promise(async (resolve, reject) => {
        const result = await contract.methods.nftList(id).call()
        if (result) {
            resolve(result)
        } else {
            reject('err!')
        }
    })
}

// nft授权 -- (需要nft拥有者授权)
export const arrpove = async (to, id) => {
    const contract = new web3.eth.Contract(nftAbi, nftAddress)
    const sendObj = {
        from: localeStorage.localGet('currentAddress'),
        gas: '230000',
        gasPrice: await web3.eth.getGasPrice()
    }
    return new Promise(async (resolve, reject) => {
        await contract.methods.approve(to, id).send(sendObj).on('confirmation', (a) => {
            resolve(a)
        }).on('error', (err) => {
            reject(err)
        })
    })
}

// nft转移 -- (直接转移, 不需要授权)
export const transFrom = async (from, to, id) => {
    const contract = new web3.eth.Contract(nftAbi, nftAddress)
    const sendObj = {
        from: localeStorage.localGet('currentAddress'),
        gas: '230000',
        gasPrice: await web3.eth.getGasPrice()
    }
    return new Promise(async (resolve, reject) => {
        await contract.methods.transferFrom(from, to, id).send(sendObj).on('confirmation', (a) => {
            resolve(a)
        }).on('error', (err) => {
            reject(err)
        })
    })
}

// 测试1-直接转账
export const test1 = async (price = 0) => {
    const contract = new web3.eth.Contract(nftAbi, nftAddress)
    const sendObj = {
        from: localeStorage.localGet('currentAddress'),
        gas: '230000',
        gasPrice: await web3.eth.getGasPrice(),
        value: web3.utils.toWei(price + '', 'ether')
    }
    return new Promise(async (resolve, reject) => {
        await contract.methods.test1().send(sendObj).on('confirmation', (a) => {
            resolve(a)
        }).on('error', (err) => {
            reject(err)
        })
    })
}

// 测试2-返回数据
export const test2 = async () => {
    const contract = new web3.eth.Contract(nftAbi, nftAddress)
    return new Promise(async (resolve, reject) => {
        const resutl = await contract.methods.test3().call()
        console.log('resutl', resutl)
    })
}

export default {
    mint,
    getAllNftNum,
    getNftInfo,
    getNftOwner,
    onSale,
    rectiveSale,
    transFrom,
    arrpove,
    buyNft,
    test1,
    test2
}