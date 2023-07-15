// i18n.js

import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

// 配置 i18n
i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: 'en', // 默认语言
    fallbackLng: 'en', // 回退语言
    backend: {
      loadPath: '/api/translations?lng={{lng}}',
    },
    ssr: true, // 启用服务器端渲染
  })

export default i18n
