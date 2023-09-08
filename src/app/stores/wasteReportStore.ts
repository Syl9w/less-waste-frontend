import { makeAutoObservable, runInAction } from 'mobx'
import { v4 as uuid } from 'uuid'
import { WasteReport } from '../models/wasteReport'
import agent from '../api/agent'
import { store } from './store'
import { Reporter } from '../models/reporter'

export default class WasteReportStore {
  wasteReports = new Map<string, WasteReport>()
  loading: boolean = false
  submittingReport: boolean = false

  constructor() {
    makeAutoObservable(this)
  }

  listWasteReports = async (username:string ) => {
    this.loading = true
    try {
      var wasteReports = await agent.WasteReports.listUserReports(username)
      runInAction(() => {
        wasteReports.forEach((wr) => {
          wr.date = wr.date.split('T')[0]
          this.wasteReports.set(wr.id, wr)
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

  get sortedReports() {
    return Array.from(this.wasteReports.values()).sort(
      (f, s) => Date.parse(f.date) - Date.parse(s.date)
    )
  }

  get groupedReports() {
    return Object.entries(
      this.sortedReports.reduce((reports, report) => {
        const reporter = report.reporter!.userName
        reports[reporter] = reports[reporter] ? [...reports[reporter], report] : [report]
        return reports
      }, {} as { [key: string]: WasteReport[] })
    )
  }

  getReportsForUser(username: string): WasteReport[] | undefined {
    return this.groupedReports.find(([user]) => user === username)?.[1]
  }

  createNewReport = async (report: WasteReport) => {
    this.submittingReport = true
    report.date = new Date().toISOString()
    report.id = uuid()
    try {
      await agent.WasteReports.create(report)
      runInAction(() => {
        const existingReport = Array.from(this.wasteReports.values()).find(
          (existingReport) => existingReport.date.split('T')[0] === report.date.split('T')[0]
        )
        if (existingReport) {
          report.id = existingReport.id
          report.plastic += existingReport.plastic
          report.paper += existingReport.paper
          report.water += existingReport.water
          report.fuel += existingReport.fuel
          report.food += existingReport.food
        }
        report.reporter = new Reporter(store.userStore.user!)
        this.wasteReports.set(report.id, report)
        this.submittingReport = false
      })
    } catch (error) {
      console.log(error)
      runInAction(() => (this.submittingReport = false))
    }
  }
}
