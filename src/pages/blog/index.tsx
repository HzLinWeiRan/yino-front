import { useUser } from '@/hooks/hooks'
import {
  conversionDateTime,
  conversionUtcDateTime,
} from '@/utils/dateTimeHelper'
import { useRouter } from 'next/router'
import { FormattedMessage, useIntl } from 'react-intl'

function Page({ res }: { res: API.IData }) {
  const intl = useIntl()
  const router = useRouter()
  const user = useUser()
  return (
    <div>
      <FormattedMessage id="app.welcome" />
      {intl.formatMessage({ id: 'welcome' })}
      {router.locale}
      {res?.url}
      <br />
      {conversionDateTime('2023-07-17 09:49:53')}
      <br />
      {conversionUtcDateTime('2023-07-17 09:49:53')}
      <br />
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

export default Page
// export default Page
