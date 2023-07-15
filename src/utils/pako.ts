import pako from 'pako'

export const gzip = function (str: string): string {
  const binaryString = pako.gzip(str)
  return btoa(binaryString.toString())
}

export const ungzip = function (str: string) {
  const charData = atob(str)
    .split(',')
    .map((item) => {
      return Number(item)
    })
  const a2b = new Uint8Array(charData)

  return pako.ungzip(a2b, { to: 'string' })
}
