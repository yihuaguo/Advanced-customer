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
    <div :style="{ width: '100%' }">
        <Splide :options="option" aria-label="My Favorite Images" aria-labelledby="autoplay-example-heading">
            <SplideSlide>
                <span class="items"></span>
            </SplideSlide>
            <SplideSlide>
                <span class="items"></span>
            </SplideSlide>
            <SplideSlide>
                <span class="items"></span>
            </SplideSlide>
        </Splide>
    </div>
</template>

<script>
import { KinesisContainer, KinesisElement } from "vue-kinesis"
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import '@splidejs/vue-splide/css';

export default {
    components: {
        KinesisContainer,
        KinesisElement,
        Splide,
        SplideSlide,
        AutoScroll
    },
    setup() {
        const option = {
            type: 'loop',
            perMove: 1,
            drag: 'free',
            height: '300px',
            padding: '20px',
            focus: 'center',
            gap: '20px',
            perPage: 6,
            autoplay: true,
            rewindByDrag: false,
            heightRatio: true,
            pagination: false,
            arrows: false,
            drag: false,
            interval: 900,
            pauseOnHover: false,
            speed: 3000,
            rewindSpeed: 3000,
            breakpoints: {
                992: {
                    perPage: 6,
                    gap: '20px',
                },
                768: {
                    perPage: 3,
                    gap: '10px',
                },
                576: {
                    perPage: 1,
                    gap: '0',
                },
            },
            autoScroll: {
                autoStart: true,
                speed: 2,
            },
        }

        return {
            option
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

span.items {
    display: block;
    height: 100%;
    width: 100%;
    background-color: aquamarine;
}
</style>