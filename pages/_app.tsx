import { appWithTranslation } from "next-i18next";

function MyApp({ Component, pageProps }: any) {
  return (
    <>
      <main className="containers">
        <Component {...pageProps} />
      </main>
    </>
  )
}

export default appWithTranslation(MyApp)