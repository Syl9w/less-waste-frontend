import { createContext, useContext } from 'react'
import UserStore from './userStore'
import CommonStore from './commonStore'
import WasteReportStore from './wasteReportStore'
import ModalStore from './modalStore'

interface Store {
  userStore: UserStore
  commonStore: CommonStore
  wasteReportStore: WasteReportStore
  modalStore: ModalStore
}

export const store: Store = {
  userStore: new UserStore(),
  commonStore: new CommonStore(),
  wasteReportStore: new WasteReportStore(),
  modalStore: new ModalStore(),
}

export const StoreContext = createContext(store)

export function useStore() {
  return useContext(StoreContext)
}
