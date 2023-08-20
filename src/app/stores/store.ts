import { createContext, useContext } from 'react'
import UserStore from './userStore'
import CommonStore from './commonStore'
import WasteReportStore from './wasteReportStore'

interface Store {
  userStore: UserStore
  commonStore: CommonStore
  wasteReportStore: WasteReportStore
}

export const store: Store = {
  userStore: new UserStore(),
  commonStore: new CommonStore(),
  wasteReportStore: new WasteReportStore(),
}

export const StoreContext = createContext(store)

export function useStore() {
  return useContext(StoreContext)
}
