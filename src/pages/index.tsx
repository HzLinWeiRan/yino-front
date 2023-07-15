// import { useTranslation } from 'next-i18next'
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Button, Stack } from 'react-bootstrap'
import styles from './styles.module.scss'
import { gzip } from '@/utils/pako'
// import bg from '@/public/assets/image/bg/bg.png'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

// {
//   "urlList": [
//       "https://detail.tmall.com/item.htm?id=697813230372",
//       "https://detail.tmall.com/item.htm?id=711079299008"
//   ]
// }
import { getItemSkuListByUrl } from '@/api/qc'

function Page() {
  const router = useRouter()
  const [data, setData] = useState<API.IDataParams>({
    userList: [
      'https://detail.tmall.com/item.htm?id=697813230372',
      'https://detail.tmall.com/item.htm?id=711079299008',
    ],
    pageNum: 1,
    pageSize: 10,
  })
  useEffect(() => {
    const initData = async () => {
      const res = await getItemSkuListByUrl(data)
      console.log(res)
    }
    initData()
  }, [])
  return (
    <div className={styles.bg}>
      <div className={styles.bgPane}>
        <Image
          className="hidden-md-down"
          alt="Mountains"
          src="/image/bg/bg.png"
          fill
          sizes="100vw"
          style={{
            objectFit: 'cover', // cover, contain, none
          }}
        />
        <Image
          className="hidden-md-up"
          alt="Mountains"
          src="/image/bg/H5_bg.png"
          sizes="100vw"
          width={768}
          height={440}
          style={{
            transform: 'translateX(-20%)',
            objectFit: 'contain', // cover, contain, none
          }}
        />
        <div className={styles.bgMask}>
          <Image
            src="/image/logo/pandaLogo.png"
            width={127}
            height={15}
            alt="logo"
          />
        </div>
      </div>
    </div>
  )
}

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      // ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}

export default Page
