<template>
    <button @click="getAllData">获取所有数据</button>
    <button @click="addFun">add</button>
    <button @click="addOfParamsFun">addOfParams</button>
    <button @click="setValFun">setVal</button>
    <button @click="getValFun">getVal</button>
    <button @click="setArrFun">setArr</button>
</template>

<script>
import { getData, add, addOfParams, setVal, getVal, setArr } from '@/utils/contract'

export default {
    setup() {

        const getAllData = () => {
            getData(1)
        }

        const addFun = () => {
            add().then(res => {
                console.log('res', res)
            }).catch(err => {
                console.log('err', err)
            })
        }

        const addOfParamsFun = () => {
            addOfParams(5).then(res => {
                console.log('res', res)
            }).catch(err => {
                console.log('err', err)
            })
        }

        const setValFun = () => {
            setVal('newStr').then(res => {
                console.log('res', res)
            }).catch(err => {
                console.log('err', err)
            })
        }

        const getValFun = () => {
            getVal().then(res => {
                console.log('res', res)
            }).catch(err => {
                console.log('err', err)
            })
        }

        const setArrFun = () => {
            setArr(['a', 'b', 'c', 'd', 'e']).then(res => {
                console.log('res', res)
            }).catch(err => {
                console.log('err', err)
            })
        }

        return {
            getAllData,
            addFun,
            addOfParamsFun,
            setValFun,
            getValFun,
            setArrFun
        }
    }
}
</script>

<style lang="less" scoped>
</style>