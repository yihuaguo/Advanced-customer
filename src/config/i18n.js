import { createI18n } from 'vue-i18n'
import messages from '../locales/index'

const i18n = createI18n({
    locale: 'zh',
    globalInjection: true,
    messages
})

export default i18n