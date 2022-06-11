<template>
    <Select>

    </Select>
</template>

<script>
import { message, Select } from 'ant-design-vue'

export default {
    props: [
        'value',
        'list',
        'onChange',
        'mode',
        'loading',
        'types',
        'placeholder',
        'width',
        'disabled',
        'style',
        'showArrow',
        'status'
    ],
    components: {
        Select
    },
    setup(props) {
        const {
            mode = undefined,
            loading = false,
            disabled = false,
            value = props.mode === "multiple" ? [] : "",
            list = [],
            // 设置唯一id和value字段
            types = false,
            onChange = () => { },
            width = "100%",
            style = {},
            showArrow = true,
            status = undefined,
            placeholder = "",
        } = props;

        const id = types ? types[0] : "id";
        const name = types ? types[1] : "name";
        const isMultiple = mode === "multiple";

        const changeValue = (value) => {
            if (loading) {
                message.warning("请等待数据加载完成!");
                return;
            }
            if (isMultiple) {
                onChange(value);
            } else {
                const current = list.find((item) => item[id] === value);
                onChange(current);
            }
        };

        return {
            changeValue
        }

    }
}
</script>

<style lang="less" scoped>
</style>