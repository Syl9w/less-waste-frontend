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
import { useParams } from 'react-router'

export default observer(function Dashboard() {
  const { wasteReportStore, userStore, modalStore, wasteGoalStore } = useStore()
  const { username } = useParams()

  useEffect(() => {
    wasteGoalStore.listGoals(userStore.user!.userName)
    wasteReportStore.listWasteReports(username!)
  }, [wasteReportStore, userStore, wasteGoalStore, username])

  if (wasteReportStore.loading) return <LoadingComponent />

  const userReports = wasteReportStore.getReportsForUser(username!)

  if (wasteReportStore.loading) return <LoadingComponent />

  return (
    <Container className='mt-3'>
      <Row>
        <div className='shadow p-3 m-2 bg-body-tertiary rounded w-25'>
          <Row>
            <div className='p-3'>
              <h4>Recent Report</h4>
              <Col s={6}>
                {userReports ? (
                  <DashboardRecentInfo report={userReports[userReports.length - 1]} />
                ) : (
                  <h1>Hello {userStore.user?.displayName}</h1>
                )}
              </Col>
            </div>
          </Row>
          <Row>
            <Col s={6}>
              {userReports && <DashboardChart reports={userReports[userReports.length - 1]} />}
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
        <Col s={12}>
          <div className='shadow p-3 m-2 bg-body-tertiary rounded '>
            <div className='p-3'>
              <h4>Timeline</h4>
              <p className='alert alert-primary' role='alert'>
                Here you can find timeline of your waste. You can always keep track the changes of
                you consumption behaiviour and adjust it :){' '}
              </p>
              <DashboardTimelineBar reports={userReports ? userReports : []} />
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        <div className='shadow p-3 m-2 bg-body-tertiary rounded'>
          <DashboardGoal goal={wasteGoalStore.wasteGoals[wasteGoalStore.activeGoal]} />
        </div>
      </Row>
    </Container>
  )
})
