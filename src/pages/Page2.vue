<template>
    <a-card title="钱包操作">
        <p>page2</p>
        <button @click="handleGetAddress">获取地址</button>
        <button @click="handleChainId">获取当前网络</button>
        <button @click="hadnleChangeChain">切换网络</button>
        <button @click="handleGetEth">获取账户余额</button>
        <button @click="handleApprove">获取签名</button>
        <button @click="handleContract">调用合约方法</button>
    </a-card>
    <a-card class="其他">
        <p>图片懒加载</p>
        <div v-for="item, index in list" :key="index">
            <img style="width: 200px; height: 100px" v-lazyload="item">
        </div>
        <p v-textCopy>点击复制</p>
    </a-card>
</template>

<script>
import {
    approve,
    getChain,
    getAddress,
    getEth,
    changeChain,
} from '@/utils/web3'
import { test1 } from '@/utils/contract'

export default {
    setup() {
        const list = [
            'src/assets/icon/airplane1.png',
            'src/assets/icon/airplane.png',
        ]

        const handleApprove = async () => {
            const result = await approve()
            if (result) {
                console.log(result)
            } else {
                console.log('err')
            }
        }

        const handleChainId = async () => {
            const result = await getChain()
            if (result) {
                console.log(result)
            } else {
                console.log('err')
            }
        }

        const hadnleChangeChain = async () => {
            const result = await changeChain(4)
            if (result) {
                console.log(result)
            } else {
                console.log('err')
            }
        }

        const handleGetAddress = async () => {
            const result = await getAddress()
            if (result) {
                console.log(result)
            } else {
                console.log('err')
            }
        }

        const handleGetEth = async () => {
            const result = await getAddress()
            if (result) {
                console.log(await getEth(result))
            } else {
                console.log('err')
            }
        }

        const handleContract = async () => {
            test1().then(res => {
                console.log('res', res)
            }).catch(err => {
                console.log('err', err)
            })
        }

        return {
            list,
            handleApprove,
            handleChainId,
            handleGetAddress,
            handleGetEth,
            hadnleChangeChain,
            handleContract
        }
    }
}

</script>

<style lang="less" scoped>
</style>