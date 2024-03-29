import axios, { AxiosResponse } from 'axios'
import { User, UserFormValues } from '../models/user'
import { store } from '../stores/store'
import { WasteReport } from '../models/wasteReport'
import { WasteGoal } from '../models/wasteGoal'
import { Profile } from '../models/profile'

axios.defaults.baseURL = 'http://localhost:5000/api'

const responseBody = <T,>(response: AxiosResponse<T>) => response.data

axios.interceptors.request.use((config) => {
  const token = store.commonStore.token
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`
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

const WasteReports = {
  list: () => request.get<WasteReport[]>('/wastereport'),
  listUserReports: (username: string) =>
    request.get<WasteReport[]>(`/wastereport/reports/${username}`),
  details: (id: string) => request.get<WasteReport>(`/wastereport/${id}`),
  create: (report: WasteReport) => request.post<void>('/wastereport', report),
}

const WasteGoals = {
  list: (userName: string) => request.get<WasteGoal[]>(`wastegoal/${userName}`),
  create: (goal: WasteGoal) => request.post('/wastegoal', goal),
  update: (progress: WasteGoal) => request.put('/wastegoal/', progress),
  delete: (id: string) => request.del(`/wastegoal/${id}`),
}

const Profiles = {
  list: () => request.get<Profile[]>('profile/')
}

const agent = {
  Account,
  WasteReports,
  WasteGoals,
  Profiles,
}

export default agent
