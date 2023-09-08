import { observer } from 'mobx-react-lite'
import { useStore } from '../../app/stores/store'
import { WasteGoal } from '../../app/models/wasteGoal'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { Form as BootstrapForm, Button, Modal } from 'react-bootstrap'
import { subDays } from 'date-fns'

export default observer(function WasteGoalFrom() {
  const { wasteGoalStore, modalStore } = useStore()

  const handleSubmit = (goal: WasteGoal) => {
    wasteGoalStore.createNewGoal(goal)
    modalStore.closeModal()
  }
  const validationSchema = Yup.object().shape({
    startDate: Yup.date()
      .required('Start date is required.')
      .min(subDays( new Date(), 1) , 'Start date should be greater than the current date.'),
    endDate: Yup.date()
      .required('End date is required.')
      .min(Yup.ref('startDate'), 'End date should be greater than start date.'),
    targetPlastic: Yup.number().moreThan(0, 'Please enter number more than 0'),
    targetPaper: Yup.number().moreThan(0, 'Please enter number more than 0'),
    targetWater: Yup.number().moreThan(0, 'Please enter number more than 0'),
    targetFood: Yup.number().moreThan(0, 'Please enter number more than 0'),
    targetFuel: Yup.number().moreThan(0, 'Please enter number more than 0'),
  })

  return (
    <>
      <Formik
        initialValues={{
          targetPlastic: 0,
          targetPaper: 0,
          targetWater: 0,
          targetFood: 0,
          targetFuel: 0,
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ errors, touched }) => (
          <Form>
            <BootstrapForm.Group controlId='startDate'>
              <BootstrapForm.Label>Start Date</BootstrapForm.Label>
              <Field
                as={BootstrapForm.Control}
                type='date'
                name='startDate'
                isInvalid={Boolean(errors.startDate)}
              />
              <BootstrapForm.Text muted>Please enter the start date</BootstrapForm.Text>
              <BootstrapForm.Control.Feedback type='invalid'>
                {errors.startDate}
              </BootstrapForm.Control.Feedback>
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId='endDate'>
              <BootstrapForm.Label>End Date</BootstrapForm.Label>
              <Field
                as={BootstrapForm.Control}
                type='date'
                name='endDate'
                isInvalid={Boolean(errors.endDate)}
              />
              <BootstrapForm.Text muted>Please enter the end date</BootstrapForm.Text>
              <BootstrapForm.Control.Feedback type='invalid'>
                {errors.endDate}
              </BootstrapForm.Control.Feedback>
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId='targetPlastic'>
              <BootstrapForm.Label>Target Plastic</BootstrapForm.Label>
              <Field
                as={BootstrapForm.Control}
                type='number'
                name='targetPlastic'
                isInvalid={Boolean(errors.targetPlastic)}
              />
              <BootstrapForm.Text muted>
                Please enter amount of used plastic today in gramms
              </BootstrapForm.Text>
              <BootstrapForm.Control.Feedback type='invalid'>
                {errors.targetPlastic}
              </BootstrapForm.Control.Feedback>
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId='targetPaper'>
              <BootstrapForm.Label>Target Paper</BootstrapForm.Label>
              <Field
                as={BootstrapForm.Control}
                type='number'
                name='targetPaper'
                isInvalid={Boolean(errors.targetPaper)}
              />
              <BootstrapForm.Text muted>
                Please enter amount of used target paper today in gramms
              </BootstrapForm.Text>
              <BootstrapForm.Control.Feedback type='invalid'>
                {errors.targetPaper}
              </BootstrapForm.Control.Feedback>
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId='targetWater'>
              <BootstrapForm.Label>Target Water</BootstrapForm.Label>
              <Field
                as={BootstrapForm.Control}
                type='number'
                name='targetWater'
                isInvalid={Boolean(errors.targetWater)}
              />
              <BootstrapForm.Text muted>
                Please enter amount of used target water today in grams
              </BootstrapForm.Text>
              <BootstrapForm.Control.Feedback type='invalid'>
                {errors.targetWater}
              </BootstrapForm.Control.Feedback>
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId='targetFood'>
              <BootstrapForm.Label>Target Food</BootstrapForm.Label>
              <Field
                as={BootstrapForm.Control}
                type='number'
                name='targetFood'
                isInvalid={Boolean(errors.targetFood)}
              />
              <BootstrapForm.Text muted>
                Please enter amount of used targetFood today in gramms
              </BootstrapForm.Text>
              <BootstrapForm.Control.Feedback type='invalid'>
                {errors.targetFood}
              </BootstrapForm.Control.Feedback>
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId='targetFuel'>
              <BootstrapForm.Label>Target Fuel</BootstrapForm.Label>
              <Field
                as={BootstrapForm.Control}
                type='number'
                name='targetFuel'
                isInvalid={Boolean(errors.targetFuel)}
              />
              <BootstrapForm.Text muted>
                Please enter amount of used targetFuel today in grams
              </BootstrapForm.Text>
              <BootstrapForm.Control.Feedback type='invalid'>
                {errors.targetFuel}
              </BootstrapForm.Control.Feedback>
            </BootstrapForm.Group>

            <Modal.Footer>
              <Button onClick={modalStore.closeModal} variant='outline-secondary'>
                Close
              </Button>
              <Button
                variant='outline-success'
                type='submit'
                className='mt-1'
                disabled={wasteGoalStore.submittingGoal}
              >
                {wasteGoalStore.submittingGoal ? 'Submitting' : 'Submit'}
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </>
  )
})
