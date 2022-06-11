<template>
    <Input v-model:value="value" @change="changeValue" :maxLength="maxLength" :allowClear="allowClear"
        :placeholder="placeholder" :disabled="disabled" :style="{ width, ...style }" />
</template>

<script>
import { Input, message } from 'ant-design-vue';

export default {
    props: [
        'value',
        'onChange',
        'type',
        'loading',
        'disabled',
        'style',
        'width',
        'placeholder',
        'maxLength',
        'allowClear',
    ],
    components: {
        Input
    },
    setup(props) {
        const reg = /^-?\d*(\.\d*)?$/;

        const {
            type = "string",
            value = "",
            onChange = () => { },
            disabled = false,
            width = "100%",
            placeholder = "",
            style = {},
            maxLength = undefined,
            allowClear = true,
        } = props;

        const changeValue = (e) => {
            const value = e.target.value
            if (type === "number") {
                if ((!isNaN(value) && reg.test(value)) || value === "" || value === "-") {
                    onChange(value);
                } else {
                    message.error("请输入数字!");
                }
            } else {
                onChange(value);
            }
        };

        return {
            type,
            value,
            disabled,
            width,
            placeholder,
            style,
            maxLength,
            allowClear,
            changeValue
        }
    }
}
</script>

<style lang="less" scoped>
</style>