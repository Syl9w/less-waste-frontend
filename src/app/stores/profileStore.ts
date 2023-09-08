import { makeAutoObservable, runInAction } from 'mobx'
import { Profile } from '../models/profile'
import agent from '../api/agent'

export default class ProfileStore {
  profiles: Profile[] = []
  loading: boolean = false
  constructor() {
    makeAutoObservable(this)
  }

  listProfiles = async () => {
    this.loading = true
    try {
      this.profiles = await agent.Profiles.list()
      runInAction(() => {
        this.loading = false
      })
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.loading = false
      })
    }
  }
}
