import { WasteReport } from '../../app/models/wasteReport'

interface Props {
  report: WasteReport
}
export default function DashboardRecentInfo({ report }: Props) {
  return (
    <>
      <>
        <div className='container'>
          <div className='row'>
            <div className='col-12'>Last report on {report.date.split('T')[0]}:</div>
          </div>
          <div className='row'>
            <div className='col-4 d-flex align-items-center justify-content-center'>
              <span
                className='rounded-circle me-2'
                style={{
                  display: 'inline-block',
                  width: '15px',
                  height: '10px',
                  backgroundColor: '#116530',
                }}
              />
              Plastic: {report.plastic} g
            </div>
            <div className='col-4 d-flex align-items-center justify-content-center'>
              <span
                className='rounded-circle me-2'
                style={{
                  display: 'inline-block',
                  width: '15px',
                  height: '10px',
                  backgroundColor: '#21B6A8',
                }}
              />
              Water: {report.water} l
            </div>
            <div className='col-4 d-flex align-items-center justify-content-center'>
              <span
                className='rounded-circle me-2'
                style={{
                  display: 'inline-block',
                  width: '15px',
                  height: '10px',
                  backgroundColor: '#A3EBB1',
                }}
              />
              Paper: {report.paper} g
            </div>
          </div>
          <div className='row'>
            <div className='col-6 d-flex align-items-center justify-content-center'>
              <span
                className='rounded-circle me-2'
                style={{
                  display: 'inline-block',
                  width: '10px',
                  height: '10px',
                  backgroundColor: '#18A558',
                }}
              />
              Food: {report.food} g
            </div>
            <div className='col-6 d-flex align-items-center justify-content-center'>
              <span
                className='rounded-circle me-2'
                style={{
                  display: 'inline-block',
                  width: '10px',
                  height: '10px',
                  backgroundColor: '#ADC9C5',
                }}
              />
              Fuel: {report.fuel} l
            </div>
          </div>
        </div>
      </>
    </>
  )
}
