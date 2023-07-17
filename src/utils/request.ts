import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import Cookie from 'js-cookie'

export interface HttpResponse<T> extends AxiosResponse {
  data: T
}

const instance = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 30 * 1000,
  headers: {
    'Content-Type': 'application/json',
  },
})

instance.interceptors.request.use(
  function (config) {
    const jwtToken = Cookie.get('jwt-token')
    const locale = Cookie.get('locale')
    if (jwtToken) {
      config.headers['Authorization'] = `Bearer ${jwtToken}`
    }
    if (locale) {
      config.headers['Accept-Language'] = locale
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)

export async function get<T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> {
  try {
    const response: HttpResponse<T> = await instance.get(url, {
      ...config,
    })
    return response.data
  } catch (error: any) {
    throw error
  }
}

export async function post<T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> {
  try {
    const response: HttpResponse<T> = await instance.post(url, config)
    return response.data
  } catch (error: any) {
    throw error
  }
}

export default instance
