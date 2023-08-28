import { observer } from 'mobx-react-lite'
import { WasteGoal } from '../../app/models/wasteGoal'
import { VictoryPie } from 'victory'
import { Button, ButtonGroup, Col, Container, Dropdown, Row } from 'react-bootstrap'
import { useStore } from '../../app/stores/store'
import WasteGoalForm from '../WasteGoal/WasteGoalForm'
import GoalDeleteModal from '../WasteGoal/GoalDeleteModal'

interface Props {
  goal: WasteGoal
}

export default observer(function DashboardGoal({ goal }: Props) {
  const { wasteGoalStore, modalStore } = useStore()

  if (goal === undefined) {
    return (
      <Container>
        <Row>
          <Col>
            <h4>Goals</h4>
          </Col>
          <Col s lg={2}>
            <Button
              disabled={wasteGoalStore.activeGoal === 0}
              variant='outline-primary'
              className='me-2'
              onClick={() => wasteGoalStore.setActive(-1)}
            >
              Prev
            </Button>

            <Button
              disabled={wasteGoalStore.activeGoal === wasteGoalStore.wasteGoals.length}
              variant='outline-primary'
              onClick={() => wasteGoalStore.setActive(1)}
            >
              Next
            </Button>
          </Col>
        </Row>
        <div>
          <Row>
            <p className='alert alert-primary m-2 pe-3' role='alert'>
              You can set goals for certain period of time and keep track your progress
            </p>
            <Button
              className='mx-auto w-25 m-5'
              variant='outline-success'
              onClick={() => modalStore.openModal(<WasteGoalForm></WasteGoalForm>)}
            >
              Set New Goal
            </Button>
          </Row>
        </div>
      </Container>
    )
  }
  return (
    <>
      <Container>
        <Row>
          <Col>
            <h4>
              Goal from {goal.startDate} to {goal.endDate}
            </h4>
          </Col>
          <Col s lg={3}>
            {wasteGoalStore.activeGoal >= 0 &&
              wasteGoalStore.activeGoal < wasteGoalStore.wasteGoals.length && (
                <Button
                  className='me-2'
                  variant='outline-danger'
                  onClick={() => modalStore.openModal(<GoalDeleteModal/>)}
                >
                  Delete
                </Button>
              )}
            <Button
              disabled={wasteGoalStore.activeGoal === 0}
              variant='outline-primary'
              className='me-2'
              onClick={() => wasteGoalStore.setActive(-1)}
            >
              Prev
            </Button>

            <Button
              disabled={wasteGoalStore.activeGoal === wasteGoalStore.wasteGoals.length}
              variant='outline-primary'
              onClick={() => wasteGoalStore.setActive(1)}
            >
              Next
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className='ms-5 ps-5'>
              <h5>Plastic</h5>
            </div>

            <VictoryPie
              labels={({ datum }) => `${datum.x}`}
              padAngle={0.5}
              colorScale={['#116530', '#FFFFFF']}
              cornerRadius={10}
              innerRadius={100}
              data={[
                { x: goal.progressPlastic, y: goal.progressPlastic },
                { x: goal.targetPlastic, y: goal.targetPlastic! - goal.progressPlastic! },
              ]}
            />
          </Col>

          <Col>
            <div className='ms-5 ps-5'>
              <h5>Water</h5>
            </div>

            <VictoryPie
              labels={({ datum }) => `${datum.x}`}
              padAngle={0.5}
              colorScale={['#21B6A8', '#FFFFFF']}
              cornerRadius={10}
              innerRadius={100}
              data={[
                { x: goal.progressWater, y: goal.progressWater },
                { x: goal.targetWater, y: goal.targetWater! - goal.progressWater! },
              ]}
            />
          </Col>

          <Col>
            <div className='ms-5 ps-5'>
              <h5>Paper</h5>
            </div>

            <VictoryPie
              labels={({ datum }) => `${datum.x}`}
              padAngle={0.5}
              colorScale={['#A3EBB1', '#FFFFFF']}
              cornerRadius={10}
              innerRadius={100}
              data={[
                { x: goal.progressPaper, y: goal.progressPlastic },
                { x: goal.targetPaper, y: goal.targetPaper! - goal.progressPaper! },
              ]}
            />
          </Col>

          <Col>
            <div className='ms-5 ps-5'>
              <h5>Food</h5>
            </div>
            <VictoryPie
              labels={({ datum }) => `${datum.x}`}
              padAngle={0.5}
              colorScale={['#18A558', '#FFFFFF']}
              cornerRadius={10}
              innerRadius={100}
              data={[
                { x: goal.progressFood, y: goal.progressFood },
                { x: goal.targetFood, y: goal.targetFood! - goal.progressFood! },
              ]}
            />
          </Col>

          <Col>
            <div className='ms-5 ps-5'>
              <h5>Fuel</h5>
            </div>

            <VictoryPie
              labels={({ datum }) => `${datum.x}`}
              padAngle={0.5}
              colorScale={['#ADC9C5', '#FFFFFF']}
              cornerRadius={10}
              innerRadius={100}
              data={[
                { x: goal.progressFuel, y: goal.progressFuel },
                { x: goal.targetFuel, y: goal.targetFuel! - goal.progressFuel! },
              ]}
            />
          </Col>
        </Row>
      </Container>
    </>
  )
})
