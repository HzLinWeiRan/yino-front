import dayjs, { Dayjs } from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

export enum DateFormat {
  YYYYMMdd = 'YYYY-MM-DD',
  YYYYMMddHHmmss = 'YYYY-MM-DD HH:mm:ss',
}

type IDate = Date | null | undefined | number | string | Dayjs

export const conversionDate = (date: IDate): string => {
  return dayjs(date).format(DateFormat.YYYYMMdd)
}

export const conversionUtcDate = (date: IDate): string => {
  return dayjs(date).utc().format(DateFormat.YYYYMMdd)
}

export const conversionDateTime = (date: IDate): string => {
  return dayjs(date).format(DateFormat.YYYYMMddHHmmss)
}

export const conversionUtcDateTime = (date: IDate): string => {
  return dayjs(date).utc().format(DateFormat.YYYYMMddHHmmss)
}
