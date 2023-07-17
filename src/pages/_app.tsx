import './styles.scss'
import { useRouter } from 'next/router'
import App, { AppContext, AppInitialProps, AppProps } from 'next/app'
import { useEffect } from 'react'
import Cookies from 'js-cookie'
import Head from 'next/head'
import { IntlProvider } from 'react-intl'
import { flattenObject } from '@/utils/flattenObject'

type Messages = Record<string, Record<string, string>>
type AppOwnProps = {
  messages: Messages
}

let cacheMessages: Messages
let cacheMessagesExpiration: number = Date.now()

function MyApp({ Component, pageProps, messages }: AppProps & AppOwnProps) {
  const router = useRouter()
  useEffect(() => {
    if (router.locale) {
      Cookies.set('locale', router.locale)
    }
  }, [router.locale])
  return (
    <IntlProvider
      messages={messages[router.locale ?? 'en']}
      locale={router.locale ?? 'en'}
    >
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
): Promise<AppInitialProps & AppOwnProps> => {
  const appProps = await App.getInitialProps(context)
  if (context.router.locale) {
    Cookies.set('locale', context.router.locale)
  }
  if (!cacheMessages || cacheMessagesExpiration < Date.now()) {
    const msg: Record<string, Record<string, any>> = {
      en: {
        app: {
          welcome: '今天en',
          welcome2: '今天en',
        },
        welcome: '欢迎',
      },
      zh: {
        app: {
          welcome: '今天',
          welcome2: '今天',
        },
        welcome: '欢迎',
      },
      es: {
        app: {
          welcome: '今天es',
          welcome2: '今天es',
        },
        welcome: '欢迎',
      },
      ko: {
        app: {
          welcome: '今天ko',
          welcome2: '今天ko',
        },
        welcome: '欢迎',
      },
    }
    cacheMessages = {}
    for (const lng in msg) {
      cacheMessages[lng as string] = flattenObject(msg[lng])
    }
    console.log(cacheMessages)
    cacheMessagesExpiration = Date.now() + 1000 * 60
  }
  return {
    ...appProps,
    messages: cacheMessages,
  }
}

export default MyApp
