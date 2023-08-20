import { makeAutoObservable, runInAction } from 'mobx'
import { WasteReport } from '../models/wasteReport'
import agent from '../api/agent'

export default class WasteReportStore {
  wasteReports = new Map<string, WasteReport>()
  loading: boolean = false

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
}
