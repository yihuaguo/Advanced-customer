import Web3 from 'web3/dist/web3.min.js';
import { abi as testAbi, address as testAddress } from './abi/test'
const web3 = new Web3(window.ethereum)

export const test1 = async (address = '0xd26114cd6EE289AccF82350c8d8487fedB8A0C07') => {
    const contract = new web3.eth.Contract(testAbi, testAddress)
    return new Promise((resolve, reject) => {
        contract.methods
            .balanceOf(address)
            .call((err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            });
    })
}

export default {
    test1
}