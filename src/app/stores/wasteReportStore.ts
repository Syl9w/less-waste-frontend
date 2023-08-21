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

  listWasteReports = async () => {
    this.loading = true
    try {
      var wasteReports = await agent.WasteReports.list()
      runInAction(() => {
        wasteReports.forEach((wr) => {
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
      (f, s) => Date.parse(s.date) - Date.parse(f.date)
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
    return this.groupedReports.find(([user]) => user === username)?.[1];
}

  createNewReport = async (report: WasteReport) => {
    this.submittingReport = true
    report.date = new Date().toISOString()
    report.id = uuid()
    try {
      await agent.WasteReports.create(report)
      runInAction(() => {
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
