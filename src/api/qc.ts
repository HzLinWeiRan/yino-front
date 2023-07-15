//
import { get, post } from '@/utils/request'

export const getItemSkuListByUrl = (
  body?: API.IDataParams,
  options?: { [key: string]: any }
) => {
  return post<API.IData>('/gateway/order/getItemSkuListByUrl', {
    data: body,
    ...(options || {}),
  })
}
