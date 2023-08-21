import { Button } from 'react-bootstrap'
import { WasteReport } from '../../app/models/wasteReport'

interface Props {
  report: WasteReport
  reporter: string
}
export default function DashboardRecentInfo({ report, reporter }: Props) {
  return (
    <div className='m-2'>
      <h1 className='header'>Welcome {reporter}</h1>
      Your most recent report on {report.date.split('T')[0]}:
      <br />
      Plastic: {report.plastic} gramms
      <br />
      Water: {report.water} liters
      <br />
      Paper: {report.paper} gramms
      <br />
      Food: {report.food} gramms
      <br />
      Fuel: {report.fuel} liters
      <br />
    </div>
  )
}
