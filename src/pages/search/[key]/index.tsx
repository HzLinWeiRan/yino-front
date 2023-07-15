import { getItemSkuListByUrl } from '@/api/qc'
import { useI18n } from '@/hooks/i18n'
import { GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { FormattedMessage, useIntl } from 'react-intl'

function Page({ res }: { res: API.IData }) {
  const { t } = useTranslation()
  const intl = useIntl()
  const router = useRouter()
  return (
    <div>
      <FormattedMessage id="app.welcome" />
      {intl.formatMessage({ id: 'welcome' })}
      {intl.formatMessage({ id: 'app.welcome' })}
      {router.locale}
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
        url: '111',
      },
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          key: '111',
        },
      }, // See the "paths" section below
      {
        params: {
          key: '222',
        },
      },
    ],
    fallback: true, // false or "blocking"
  }
}

export default Page
