<template>
    <Button :value="value" :onClick="buttonClick"></Button>
</template>

<script>
import Button from '@/components/business_components/Button.vue'
import { ref } from 'vue'

export default {
    components: {
        Button
    },
    setup() {
        const value = ref('123')

        const buttonClick = () => {
            console.log(222)
        }

        return {
            value,
            buttonClick
        }
    }
}
</script>

<style>
</style>