import Web3 from 'web3/dist/web3.min.js';
import { abi as testAbi, address as testAddress } from './abi/test'
const web3 = new Web3(window.ethereum)

export const test1 = async (name, price, autor) => {
    const contract = new web3.eth.Contract(testAbi, testAddress)
    return new Promise((resolve, reject) => {
        console.log('contract', contract)
        contract.methods.addNft(name, price, autor).then(res => {
            console.log('res1', res)
        })
        // contract.methods
        //     .balanceOf(address)
        //     .call((err, result) => {
        //         if (err) {
        //             reject(err)
        //         } else {
        //             resolve(result)
        //         }
        //     });
    })
}

export const test2 = async (name) => {
    const contract = new web3.eth.Contract(testAbi, testAddress)
    return new Promise((resolve, reject) => {
        console.log('contract', contract)
        contract.methods.getNftInId(name).call((err, result) => {
            console.log('res1', result)
        })
        // contract.methods
        //     .balanceOf(address)
        //     .call((err, result) => {
        //         if (err) {
        //             reject(err)
        //         } else {
        //             resolve(result)
        //         }
        //     });
    })
}

export default {
    test1,
    test2
}