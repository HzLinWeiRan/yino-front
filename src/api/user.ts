import { get } from "@/utils/request"

export const getUser = () => {
  return get<API.IUser>('/user')
}
getUser.key = '/user'