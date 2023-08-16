import axios, { AxiosResponse } from 'axios'
import { User, UserFormValues } from '../models/user'
import { store } from '../stores/store'

axios.defaults.baseURL = 'http://localhost:5000/api'

const responseBody = <T,>(response: AxiosResponse<T>) => response.data

axios.interceptors.request.use((config) => {
  const token = store.commonStore.token
  if (token && config.headers) config.headers.Authorization = 'Bearer token'
  return config
})

const request = {
  get: <T,>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T,>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
  put: <T,>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T,>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Account = {
  current: () => request.get<User>('/account'),
  login: (user: UserFormValues) => request.post<User>('/account/login', user),
  register: (user: UserFormValues) => request.post<User>('/account/register', user),
}

const agent = {
  Account,
}

export default agent
