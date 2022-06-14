import { message } from 'ant-design-vue'
import lazyLoading from '@/assets/images/imgLoading.gif'
import lazyErr from '@/assets/images/imgErr.png'

// 全局指令
const defineDirective = (app) => {
    // 图片懒加载
    app.directive('lazyload', {
        mounted(el, binding) {
            el.src = lazyLoading
            const observer = new IntersectionObserver(([{ isIntersecting }]) => {
                if (isIntersecting) { // isIntersecting判断是否进入视图
                    observer.unobserve(el) // 进入视图后，停止监听
                    el.onerror = () => { // 加载失败显示默认图片
                        el.src = lazyErr
                    }
                    el.src = binding.value // 进入视图后，把指令绑定的值赋值给src属性，显示图片
                }
            }, {
                threshold: 0.01 // 当图片img元素占比视图0.01时 el.src = binding.value
            })
            observer.observe(el) //观察指令绑定的dom
        },
    })
    // 文本点击复制
    app.directive('textCopy', {
        mounted(el, binding) {
            el.style.cursor = 'pointer'
            el.addEventListener('click', () => {
                let copyText = ''
                if (binding.value) {
                    copyText = binding.value
                } else {
                    copyText = el.innerHTML
                }
                navigator.clipboard.writeText(copyText).then(() => {
                    message.success('复制成功!')
                });
            })
        }
    })
}
export default {
    install(app) {
        defineDirective(app) // 调用方法，全局注册指令
    }
}