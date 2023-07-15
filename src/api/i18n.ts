import { get } from '@/utils/request'
import { Resource } from 'i18next'

export const getResouces = async (): Promise<Resource> => {
  const res = await get<Resource>(`/translations?lng=en&ns=common`)
  return res
}
