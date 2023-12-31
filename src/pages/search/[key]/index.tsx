import { GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import { FormattedMessage, useIntl } from 'react-intl'

function Page({ res }: { res: API.IData }) {
  const intl = useIntl()
  const router = useRouter()
  console.log(res)
  return (
    <div>
      <FormattedMessage id="app.welcome" />
      {intl.formatMessage({ id: 'welcome' })}
      {intl.formatMessage({ id: 'app.welcome' })}
      {router.locale}
      {res?.url}
    </div>
  )
}

export const getStaticProps = async ({
  locale,
  ...others
}: {
  locale: string
}) => {
  // const res = await getItemSkuListByUrl()
  return {
    props: {
      res: {
        url: Date.now(),
      },
    },
    revalidate: 10,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          key: '111',
        },
        locale: 'zh',
      }, // See the "paths" section below
    ],
    // paths: [],
    fallback: true,
  }
}

export default Page
