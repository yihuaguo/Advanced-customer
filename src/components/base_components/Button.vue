<template>
    <Button @click="handleClick" :loading="loading" :block="block" :type="type" :disabled="disabled" :shape="shape"
        :size="size">{{
                value
        }}</Button>
</template>

<script>
import { Button } from 'ant-design-vue'
import _ from 'lodash'

export default {
    components: {
        Button
    },
    props: ["value", "onClick", "type", "loading", "disabled", "shape", "size"],
    setup(props) {
        const { value = '', loading = false, block = false, shape = "default", size = "middle", disabled = false, type = "default", onClick = () => { } } = props

        const handleClick = _.debounce(() => {
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