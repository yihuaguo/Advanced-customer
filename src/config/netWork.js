import Web3 from "web3/dist/web3.min"

const netWorkConfig = {
    "1": {
        chainId: Web3.utils.numberToHex(1), // 目标链ID
        chainName: 'Mainnet Ether', // 网络名称
        nativeCurrency: {
            name: 'ETH',
            symbol: 'ETH',
            decimals: 18 // 小数点
        },
        rpcUrls: ['https://mainnet.infura.io/v3/'], // 节点
        blockExplorerUrls: ['https://etherscan.io'] // 区块链浏览器
    },
    "3": {
        chainId: Web3.utils.numberToHex(3),
        chainName: 'Ropsten Ether',
        nativeCurrency: {
            name: 'ETH',
            symbol: 'ETH',
            decimals: 18
        },
        rpcUrls: ['https://ropsten.infura.io/v3/'],
        blockExplorerUrls: ['https://ropsten.etherscan.io']
    },
    "4": {
        chainId: Web3.utils.numberToHex(4),
        chainName: 'Rinkeby Ether',
        nativeCurrency: {
            name: 'ETH',
            symbol: 'ETH',
            decimals: 18
        },
        rpcUrls: ['https://rinkeby.infura.io/v3/'],
        blockExplorerUrls: ['https://rinkeby.etherscan.io']
    },
    "5": {
        chainId: Web3.utils.numberToHex(5),
        chainName: 'Goerli Ether',
        nativeCurrency: {
            name: 'ETH',
            symbol: 'ETH',
            decimals: 18
        },
        rpcUrls: ['https://goerli.infura.io/v3/'],
        blockExplorerUrls: ['https://goerli.etherscan.io']
    },
    "42": {
        chainId: Web3.utils.numberToHex(42),
        chainName: 'Kovan Ether',
        nativeCurrency: {
            name: 'ETH',
            symbol: 'ETH',
            decimals: 18
        },
        rpcUrls: ['https://kovan.infura.io/v3/'],
        blockExplorerUrls: ['https://kovan.etherscan.io']
    },
}

export default netWorkConfig