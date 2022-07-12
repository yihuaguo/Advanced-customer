import { notification } from 'ant-design-vue';

export const notice = (type = 'info', message = '', description = '') => {
    notification[type]({
        message,
        description
    });
}

export const isNullObj = (val) => JSON.stringify(val) === '{}';


export default {
    notice,
    isNullObj
}