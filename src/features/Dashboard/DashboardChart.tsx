import { VictoryLabel, VictoryPie, VictoryTooltip, VictoryVoronoiContainer } from 'victory'
import { WasteReport } from '../../app/models/wasteReport'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'

interface Props {
  reports: WasteReport
}

export default observer(function DashboardChart({ reports }: Props) {
  return (
    <>
      <div className='w-75'>
        <VictoryPie
          labels={({ datum }) => `${datum.x}`}
          padAngle={0.5}
          colorScale={['#116530', '#21B6A8', '#A3EBB1', '#18A558', '#ADC9C5']}
          cornerRadius={10}
          innerRadius={100}
          data={[
            { x: 'plastic', y: reports.plastic },
            { x: 'water', y: reports.water },
            { x: 'paper', y: reports.paper },
            { x: 'food', y: reports.food },
            { x: 'fuel', y: reports.fuel },
          ]}
        />
      </div>
    </>
  )
})
