import Web3 from 'web3/dist/web3.min.js';
import { abi as nftAbi, address as nftAddress } from './abi/nft'
import localeStorage from '@/utils/stroage'
const web3 = new Web3(window.ethereum)

export const getData = async () => {
    const contract = new web3.eth.Contract(nftAbi, nftAddress)
    console.log('contract', contract)
    return new Promise(async (resolve, reject) => {
        // 合约中public的数据使用.call()来获取
        const onwer = await contract.methods.owner().call()
        const num = await contract.methods.num().call()
        const val = await contract.methods.val().call()

        console.log({
            onwer,
            num,
            val,
        })
    })
}

export const add = async () => {
    const contract = new web3.eth.Contract(nftAbi, nftAddress)
    const sendObj = {
        from: localeStorage.localGet('currentAddress'),
        gas: '230000',
        gasPrice: await web3.eth.getGasPrice()
    }
    return new Promise(async (resolve, reject) => {
        // .on('confirmation', () => {})获取收据
        contract.methods.add().send(sendObj).on('confirmation', (a) => {
            resolve()
        }).on('error', (err) => {
            reject()
        })
    })
}

export const addOfParams = async (num) => {
    const contract = new web3.eth.Contract(nftAbi, nftAddress)
    const sendObj = {
        from: localeStorage.localGet('currentAddress'),
        gas: '230000',
        gasPrice: await web3.eth.getGasPrice()
    }
    return new Promise(async (resolve, reject) => {
        // .on('confirmation', () => {})获取收据
        contract.methods.addOfParams(num).send(sendObj).on('confirmation', (a) => {
            resolve()
        }).on('error', (err) => {
            reject()
        })
    })
}

export const setVal = async (str) => {
    const contract = new web3.eth.Contract(nftAbi, nftAddress)
    const sendObj = {
        from: localeStorage.localGet('currentAddress'),
        gas: '230000',
        gasPrice: await web3.eth.getGasPrice()
    }
    return new Promise(async (resolve, reject) => {
        contract.methods.setVal(str).send(sendObj).on('confirmation', (a) => {
            resolve()
        }).on('error', (err) => {
            reject()
        })
    })
}

export const getVal = async () => {
    const contract = new web3.eth.Contract(nftAbi, nftAddress)
    return new Promise(async (resolve, reject) => {
        const val = await contract.methods.getVal().call()
        resolve(val)
    })
}

export const setArr = async (arr = []) => {
    const contract = new web3.eth.Contract(nftAbi, nftAddress)
    const sendObj = {
        from: localeStorage.localGet('currentAddress'),
        gas: '230000',
        gasPrice: await web3.eth.getGasPrice()
    }
    return new Promise(async (resolve, reject) => {
        contract.methods.setArr(arr).send(sendObj).on('confirmation', (a) => {
            resolve()
        }).on('error', (err) => {
            reject()
        })
    })
}

export default {
    getData,
    add,
    addOfParams,
    setVal,
    getVal,
    setArr
}