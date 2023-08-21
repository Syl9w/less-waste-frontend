import { VictoryAxis, VictoryBar, VictoryChart, VictoryStack, VictoryTooltip, VictoryZoomContainer } from 'victory'
import { WasteReport } from '../../app/models/wasteReport'

interface Props {
  reports: WasteReport[]
}

export default function DashboardTimelineBar({ reports }: Props) {
  const wasteTypes = ['plastic', 'water', 'paper', 'fuel', 'food']
  const data = wasteTypes.map((wasteType) => {
    return reports.map((report) => {
      return {
        x: report.date,
        y: report[wasteType as keyof typeof report],
      }
    })
  })
  console.log(data)
  return (
    <>
      <VictoryChart
        domainPadding={{ x: 30, y: 5 }}
        height={200}
        containerComponent={<VictoryZoomContainer />}
      >
        <VictoryStack colorScale={['#116530', '#21B6A8', '#A3EBB1', '#18A558', '#ADC9C5']}>
          {data.map((entry, i) => (
            <VictoryBar data={entry} key={i} labels={({ datum }) => `y: ${datum.y}`}
            labelComponent={<VictoryTooltip  />}/>
          ))}
        </VictoryStack>
        <VictoryAxis
          dependentAxis
          tickFormat={(tick) => `${tick}`}
          style={{ tickLabels: { fontSize: 10 } }}
        />
        <VictoryAxis
          tickFormat={reports.map((r) => r.date)}
          style={{ tickLabels: { fontSize: 10 } }}
        />
      </VictoryChart>
    </>
  )
}
