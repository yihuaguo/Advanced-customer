<template>
    <Button @click="handleClick" :loading="loading" :block="block" :type="type" :disabled="disabled" :shape="shape"
        :size="size">{{
                value
        }}</Button>
</template>

<script>
import { Button } from 'ant-design-vue'
import { default as debounce } from 'lodash/debounce'

export default {
    components: {
        Button
    },
    props: ["value", "onClick", "type", "loading", "disabled", "shape", "size"],
    setup(props) {
        const { value = '', loading = false, block = false, shape = "default", size = "middle", disabled = false, type = "default", onClick = () => { } } = props

        const handleClick = debounce(() => {
            onClick()
        }, 200)

        return {
            value,
            loading,
            type,
            disabled,
            shape,
            size,
            block,
            handleClick
        }
    }
}
</script>

<style lang="less" scoped>
</style>