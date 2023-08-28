import { makeAutoObservable, runInAction } from 'mobx'
import { WasteGoal } from '../models/wasteGoal'
import agent from '../api/agent'
import { WasteReport } from '../models/wasteReport'
import { v4 as uuid } from 'uuid'

export class WasteGoalStore {
  wasteGoals: WasteGoal[] = []
  loading: boolean = false
  submittingGoal: boolean = false
  activeGoal: number = 0 // wasteGoals element which is visible to the user in dashboard
  currentGoal: number = 0 // wasteGoals element number which has current date

  constructor() {
    makeAutoObservable(this)
  }

  listGoals = async (userName: string) => {
    this.loading = true
    try {
      var wasteGoals = await agent.WasteGoals.list(userName)
      runInAction(() => {
        wasteGoals.forEach((wg) => {
          wg.startDate = wg.startDate?.split('T')[0]
          wg.endDate = wg.endDate?.split('T')[0]
          this.wasteGoals.push(wg)
          this.wasteGoals = this.wasteGoals.sort(
            (a, b) => Date.parse(a.startDate!) - Date.parse(b.startDate!)
          )

          this.currentGoal = this.getCurrent()
          this.activeGoal = this.currentGoal
        })
        this.loading = false
      })
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.loading = false
      })
    }
  }

  getCurrent = () => {
    const currentDate = new Date()
    currentDate.setHours(0, 0, 0, 0) // to remove time part from the date

    return this.wasteGoals.findIndex((goal) => {
      const startDate = new Date(goal.startDate!)
      startDate.setHours(0, 0, 0, 0) // again, to remove time part

      const endDate = new Date(goal.endDate!)
      endDate.setHours(0, 0, 0, 0) // again, to remove time part

      return currentDate >= startDate && currentDate <= endDate
    })
  }

  setActive = (i: number) => {
    this.activeGoal += i
  }

  createNewGoal = async (goal: WasteGoal) => {
    this.submittingGoal = true
    goal.id = uuid()
    try {
      await agent.WasteGoals.create(goal)

      runInAction(() => {
        this.wasteGoals.push(goal)
        this.activeGoal = this.wasteGoals.length - 1
        this.submittingGoal = false
      })
    } catch (error) {
      console.log(error)
      runInAction(() => (this.submittingGoal = false))
    }
  }

  updateGoal = async (report: WasteReport) => {
    this.submittingGoal = true
    var update = {
      progressPlastic: report.plastic,
      progressPaper: report.paper,
      progressWater: report.water,
      progressFood: report.food,
      progressFuel: report.fuel,
    } as WasteGoal

    try {
      agent.WasteGoals.update(update)
      runInAction(() => {
        this.wasteGoals.at(this.getCurrent())!.progressPlastic! += update.progressPlastic!
        this.wasteGoals.at(this.getCurrent())!.progressPaper! += update.progressPaper!
        this.wasteGoals.at(this.getCurrent())!.progressWater! += update.progressWater!
        this.wasteGoals.at(this.getCurrent())!.progressFood! += update.progressFood!
        this.wasteGoals.at(this.getCurrent())!.progressFuel! += update.progressFuel!
        this.submittingGoal = false
      })
    } catch (error) {
      console.log(error)
      runInAction(() => (this.submittingGoal = false))
    }
  }

  deleteGoal = async () => {
    this.submittingGoal = true
    try {
      agent.WasteGoals.delete(this.wasteGoals[this.activeGoal].id!)
      runInAction(() => {
        this.wasteGoals = this.wasteGoals.filter((wg) => wg.id !== this.wasteGoals[this.activeGoal].id)
        this.activeGoal = this.getCurrent()
        this.submittingGoal = false
      })
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.submittingGoal = false
      })
    }
  }
}
