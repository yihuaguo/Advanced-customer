<template>
    <div style="width: 1000px; margin: auto;">
        <kinesis-container class="container">
            <kinesis-element class="item" type="depth" :strength="20">
                盒子
            </kinesis-element>
            <kinesis-element class="item" :strength="30">
                盒子
            </kinesis-element>
            <kinesis-element class="item" :strength="40">
                盒子
            </kinesis-element>
        </kinesis-container>
    </div>
</template>

<script>
import { KinesisContainer, KinesisElement } from "vue-kinesis"

export default {
    components: {
        KinesisContainer,
        KinesisElement
    },
    setup() {
        return {

        }
    }
}
</script>

<style lang="less" scoped>
.container {
    height: 500px;
    width: 100%;
    background-color: aquamarine;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.item {
    text-align: center;
    width: 100px;
    height: 50px;
    background-color: bisque;
    margin: 10px;
}
</style>