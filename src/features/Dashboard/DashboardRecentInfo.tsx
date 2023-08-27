import { WasteReport } from '../../app/models/wasteReport'

interface Props {
  report: WasteReport
}
export default function DashboardRecentInfo({ report }: Props) {
  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col-12'>Last report on {report.date.split('T')[0]}:</div>
        </div>
        <div className='row'>
          <div className='col-4 text-center'>
            <span
              className='rounded-circle me-2 '
              style={{
                display: 'inline-block',
                width: '10px',
                height: '10px',
                backgroundColor: '#116530',
              }}
            ></span>
            Plastic: {report.plastic} g
          </div>
          <div className='col-4 text-center'>
            <span
              className='rounded-circle me-2'
              style={{
                display: 'inline-block',
                width: '10px',
                height: '10px',
                backgroundColor: '#21B6A8',
              }}
            ></span>
            Water: {report.water} l
          </div>
          <div className='col-4 text-center'>
            <span
              className='rounded-circle me-2'
              style={{
                display: 'inline-block',
                width: '10px',
                height: '10px',
                backgroundColor: '#A3EBB1',
              }}
            ></span>
            Paper: {report.paper} g
          </div>
        </div>
        <div className='row'>
          <div className='col-6 text-center'>
            <span
              className='rounded-circle me-2'
              style={{
                display: 'inline-block',
                width: '10px',
                height: '10px',
                backgroundColor: '#18A558',
              }}
            ></span>
            Food: {report.food} g
          </div>
          <div className='col-6 text-center'>
            <span
              className='rounded-circle me-2'
              style={{
                display: 'inline-block',
                width: '10px',
                height: '10px',
                backgroundColor: '#ADC9C5',
              }}
            ></span>
            Fuel: {report.fuel} l
          </div>
        </div>
      </div>
    </>
  )
}
