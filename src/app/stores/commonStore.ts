import { makeAutoObservable, reaction } from 'mobx'

export default class CommonStore {
  token: string | null = localStorage.getItem('bearer')
  
  constructor() {
    makeAutoObservable(this)

    reaction(
      () => this.token,
      (token) => {
        if (token) {
          localStorage.setItem('bearer', token)
        } else {
          localStorage.removeItem('bearer')
        }
      }
    )
  }

  setToken = (token: string | null) => {
    this.token = token
  }
}
