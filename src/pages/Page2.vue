<template>
    <a-card title="钱包操作">
        <p>page2</p>
        <button @click="handleGetAddress">获取地址</button>
        <button @click="handleChainId">获取当前网络</button>
        <button @click="hadnleChangeChain">切换网络</button>
        <button @click="handleGetEth">获取账户余额</button>
        <button @click="handleApprove">获取签名</button>
    </a-card>
    <a-card title="storage缓存">
        <button @click="add">新增缓存</button>
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
import { useStorage } from 'vue3-storage';
import {
    approve,
    getChain,
    getAddress,
    getEth,
    changeChain,
} from '../utils/web3'

export default {
    setup() {
        const storage = useStorage()
        const list = [
            'src/assets/icon/airplane1.png',
            'src/assets/icon/airplane.png',
        ]

        const add = () => {
            storage.setStorage({
                key: "name1",
                data: "1",
                success: () => { }
            });
            storage.setStorageSync('name2', '2', 60)
        }

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
            const result = await changeChain()
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

        return {
            list,
            add,
            handleApprove,
            handleChainId,
            handleGetAddress,
            handleGetEth,
            hadnleChangeChain,
        }
    }
}

</script>

<style lang="less" scoped>
</style>