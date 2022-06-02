import Web3 from "web3/dist/web3.min"

const netWorkConfig = [
    {

    }, {

    }, {

    }, {

    }, {
        chainId: Web3.utils.numberToHex(4), // 目标链ID
        chainName: 'Rinkeby Ether', // 网络名称
        nativeCurrency: {
            name: 'ETH',
            symbol: 'ETH',
            decimals: 18 // 小数点
        },
        rpcUrls: ['https://rinkeby.infura.io/v3/'], // 节点
        blockExplorerUrls: ['https://rinkeby.etherscan.io'] // 区块链浏览器
    }
]

export default netWorkConfig