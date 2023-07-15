import React, { ReactNode, createContext, useContext } from 'react'
import i18next, { Resource, TFunction } from 'i18next'
import { initReactI18next } from 'react-i18next'

type I18nContextType = {
  t: TFunction
}

const I18nContext = createContext<I18nContextType | null>(null)

export const useI18n = (): I18nContextType => {
  const i18nContext = useContext(I18nContext)
  if (!i18nContext) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return i18nContext
}

export const i18n = (
  resource: Resource,
  language: string
): I18nContextType & { I18nProvider: React.FC<{ children: ReactNode }> } => {
  // 初始化语言resouce设置
  if (i18next.isInitialized) {
    i18next.changeLanguage(language)
    for (const lng in resource) {
      for (const ns in resource[lng]) {
        i18next.addResources(lng, ns, resource[lng][ns])
      }
    }
  } else {
    i18next.use(initReactI18next).init({
      resources: resource,
      fallbackLng: 'en',
      lng: language,
      debug: true,
      ns: ['common'],
      defaultNS: 'common',
    })
  }
  const t = i18next.t.bind(i18next)
  const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => (
    <I18nContext.Provider value={{ t }}>{children}</I18nContext.Provider>
  )
  return {
    t,
    I18nProvider,
  }
}
