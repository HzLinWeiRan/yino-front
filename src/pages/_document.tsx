import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    // const currentLocale = this.props.__NEXT_DATA__.locale || i18nextConfig.i18n.defaultLocale
    return (
      // <Html lang={currentLocale}>
      <Html>
        <Head>
          <link rel="icon" href="/favicon.ico" sizes="any" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
