import { Reporter } from './reporter'

export interface WasteReport {
  id: string
  reporter?: Reporter
  date: string
  plastic: number
  paper: number
  water: number
  fuel: number
  food: number
}
