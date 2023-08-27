import { useEffect } from 'react'
import { useStore } from '../../app/stores/store'
import DashboardChart from './DashboardChart'
import LoadingComponent from '../../app/layout/LoadingComponent'
import { observer } from 'mobx-react-lite'
import { Button, Col, Container, Row } from 'react-bootstrap'
import DashboardRecentInfo from './DashboardRecentInfo'
import WasteReportForm from '../WasteReport/WasteReportForm'
import DashboardTimelineBar from './DashboardTimelineBar'
import DashboardGoal from './DashboardGoal'

export default observer(function Dashboard() {
  const { wasteReportStore, userStore, modalStore } = useStore()

  useEffect(() => {
    wasteReportStore.listWasteReports()
  }, [wasteReportStore])

  if (wasteReportStore.loading || wasteReportStore.sortedReports.length === 0)
    return <LoadingComponent />

  const userReports = wasteReportStore.getReportsForUser(userStore.user!.userName)

  if (wasteReportStore.loading || !userReports || userReports.length === 0)
    return <LoadingComponent />

  return (
    <Container className='mt-3'>
      <Row>
        <div className='shadow p-3 m-2 bg-body-tertiary rounded w-25'>
          <Row>
            <div className='p-3'>
              <h4>Recent Report</h4>
              <Col s={6}>
                <DashboardRecentInfo report={userReports[userReports.length - 1]} />
              </Col>
            </div>
          </Row>
          <Row>
            <Col s={6}>
              <DashboardChart reports={userReports[userReports.length - 1]} />
            </Col>
          </Row>
          <Row className='w-75 mx-auto'>
            <Button
              variant='outline-success'
              className='mt-3 '
              onClick={() => modalStore.openModal(<WasteReportForm />)}
            >
              Submit new report
            </Button>
          </Row>
        </div>
        <Col>
          <div className='shadow p-3 m-2 bg-body-tertiary rounded w-85'>
            <div className='p-3'>
              <h4>Timeline</h4>
              <p className='alert alert-primary' role='alert'>
                Here you can find timeline of your waste. You can always keep track the changes of
                you consumption behaiviour and adjust it :){' '}
              </p>
              <DashboardTimelineBar reports={userReports} />
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        <div className='shadow p-3 m-2 bg-body-tertiary rounded'>
          <DashboardGoal />
        </div>
      </Row>
    </Container>
  )
})
