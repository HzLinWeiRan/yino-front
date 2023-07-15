import './styles.scss'
import { useRouter } from 'next/router'
import App, { AppContext, AppInitialProps, AppProps } from 'next/app'
import { useEffect } from 'react'
import Cookies from 'js-cookie'
import Head from 'next/head'
import { IntlProvider } from 'react-intl'
import { flattenObject } from '@/utils/flattenObject'

type Messages = Record<string, string>

let cacheMessages: Messages
let cacheMessagesExpiration: number = Date.now()

function MyApp({
  Component,
  pageProps,
  messages,
}: AppProps & { messages: Messages }) {
  const router = useRouter()
  useEffect(() => {
    if (router.locale) {
      Cookies.set('locale', router.locale)
    }
  }, [router.locale])
  return (
    <IntlProvider messages={messages} locale={router.locale ?? 'en'}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0,maximum-scale=1.0, user-scalable=0"
        />
      </Head>
      <Component {...pageProps} />
    </IntlProvider>
  )
}

MyApp.getInitialProps = async (
  context: AppContext
): Promise<
  AppInitialProps & {
    messages: Messages
  }
> => {
  const ctx = await App.getInitialProps(context)
  if (context.router.locale) {
    Cookies.set('locale', context.router.locale)
  }
  if (!cacheMessages || cacheMessagesExpiration < Date.now()) {
    cacheMessages = flattenObject({
      app: {
        welcome: '今天',
        welcome2: '今天',
      },
      welcome: '欢迎',
    })
    console.log(cacheMessages)
    cacheMessagesExpiration = Date.now() + 1000 * 60
  }
  return {
    ...ctx,
    messages: cacheMessages,
  }
}

// console.log(nextI18nConfig)
// export default MyApp
export default MyApp
// export default MyApp
