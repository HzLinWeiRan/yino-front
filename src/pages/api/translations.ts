export default async (req: any, res: any) => {
  const { lng = 'en', ns } = req.query

  try {
    const response = await fetch(
      `http://localhost:3000/locales_cache/en/common.json`
    )
    if (!response.ok) {
      throw new Error('Failed to fetch translation file')
    }

    const data = await response.json()
    // res.status(200).json({
    //   en: {
    //     translation: data
    //   }
    // });
    res.status(200).json({
      en: {
        common: data,
      },
      zh: {
        common: {
          WelcometoReact: '欢迎使用react',
        },
      },
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
