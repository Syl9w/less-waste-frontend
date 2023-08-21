import { useEffect } from 'react'
import { useStore } from '../../app/stores/store'
import DashboardChart from './DashboardChart'
import LoadingComponent from '../../app/layout/LoadingComponent'
import { observer } from 'mobx-react-lite'
import { Button, Col, Container, Row } from 'react-bootstrap'
import DashboardRecentInfo from './DashboardRecentInfo'
import WasteReportForm from '../WasteReport/WasteReportForm'

export default observer(function Dashboard() {
  const { wasteReportStore, userStore,modalStore } = useStore()

  useEffect(() => {
    wasteReportStore.listWasteReports()
  }, [wasteReportStore])

  if (wasteReportStore.loading || wasteReportStore.sortedReports.length === 0)
    return <LoadingComponent />

    const userReports = wasteReportStore.getReportsForUser(userStore.user!.userName);

    if (wasteReportStore.loading || !userReports || userReports.length === 0)
      return <LoadingComponent />

  return (
    <Container>
      <div className='shadow p-3 m-3 bg-body-tertiary rounded'>
        <Row>
          <Col xs={7}>
            <DashboardRecentInfo report={userReports[0]} reporter={userStore.user!.displayName}/>
            <Button variant='outline-success' className='mt-3' onClick={()=>modalStore.openModal(<WasteReportForm/>)}> Submit new report</Button>
          </Col>
          <Col>
            <DashboardChart reports={userReports[0]} />
          </Col>
        </Row>
      </div>
    </Container>
  )
})
