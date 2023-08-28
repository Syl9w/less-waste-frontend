import { createContext, useContext } from 'react'
import UserStore from './userStore'
import CommonStore from './commonStore'
import WasteReportStore from './wasteReportStore'
import ModalStore from './modalStore'
import { WasteGoalStore } from './wasteGoalStore'

interface Store {
  userStore: UserStore
  commonStore: CommonStore
  wasteReportStore: WasteReportStore
  modalStore: ModalStore
  wasteGoalStore: WasteGoalStore
}

export const store: Store = {
  userStore: new UserStore(),
  commonStore: new CommonStore(),
  wasteReportStore: new WasteReportStore(),
  modalStore: new ModalStore(),
  wasteGoalStore: new WasteGoalStore(),
}

export const StoreContext = createContext(store)

export function useStore() {
  return useContext(StoreContext)
}
