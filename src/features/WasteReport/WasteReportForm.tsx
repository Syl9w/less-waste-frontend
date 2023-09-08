import { observer } from 'mobx-react-lite'
import { useStore } from '../../app/stores/store'
import { WasteReport } from '../../app/models/wasteReport'
import * as Yup from 'yup'
import { Field, Form, Formik } from 'formik'
import { Form as BootstrapForm, Button, Modal } from 'react-bootstrap'

export default observer(function WasteReportForm() {
  const { wasteReportStore, wasteGoalStore, modalStore } = useStore()

  const handleSubmit = (report: WasteReport) => {
    wasteReportStore.createNewReport(report)
    if (wasteGoalStore.wasteGoals.length !== 0 && wasteGoalStore.getCurrent() !== -1) {
      wasteGoalStore.updateGoal(report)
    }
    modalStore.closeModal()
  }

  const validationSchema = Yup.object().shape({
    plastic: Yup.number().min(0, 'Please enterpositive number'),
    paper: Yup.number().min(0, 'Please enterpositive number'),
    water: Yup.number().min(0, 'Please enterpositive number'),
    food: Yup.number().min(0, 'Please enterpositive number'),
    fuel: Yup.number().min(0, 'Please enterpositive number'),
  })

  return (
    <>
      <Formik
        initialValues={{ plastic: 0, paper: 0, water: 0, food: 0, fuel: 0 } as WasteReport}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <BootstrapForm.Group controlId='plastic'>
              <BootstrapForm.Label>Plastic</BootstrapForm.Label>
              <Field
                as={BootstrapForm.Control}
                type='number'
                name='plastic'
                isInvalid={Boolean(errors.plastic)}
              />
              <BootstrapForm.Text muted>
                Please enter amount of used plastic today in gramms
              </BootstrapForm.Text>
              <BootstrapForm.Control.Feedback type='invalid'>
                {errors.plastic}
              </BootstrapForm.Control.Feedback>
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId='paper'>
              <BootstrapForm.Label>Paper</BootstrapForm.Label>
              <Field
                as={BootstrapForm.Control}
                type='number'
                name='paper'
                isInvalid={Boolean(errors.paper)}
              />
              <BootstrapForm.Text muted>
                Please enter amount of used paper today in gramms
              </BootstrapForm.Text>
              <BootstrapForm.Control.Feedback type='invalid'>
                {errors.paper}
              </BootstrapForm.Control.Feedback>
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId='water'>
              <BootstrapForm.Label>Water</BootstrapForm.Label>
              <Field
                as={BootstrapForm.Control}
                type='number'
                name='water'
                isInvalid={Boolean(errors.water)}
              />
              <BootstrapForm.Text muted>
                Please enter amount of used water today in grams
              </BootstrapForm.Text>
              <BootstrapForm.Control.Feedback type='invalid'>
                {errors.water}
              </BootstrapForm.Control.Feedback>
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId='food'>
              <BootstrapForm.Label>Food</BootstrapForm.Label>
              <Field
                as={BootstrapForm.Control}
                type='number'
                name='food'
                isInvalid={Boolean(errors.food)}
              />
              <BootstrapForm.Text muted>
                Please enter amount of used food today in gramms
              </BootstrapForm.Text>
              <BootstrapForm.Control.Feedback type='invalid'>
                {errors.food}
              </BootstrapForm.Control.Feedback>
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId='fuel'>
              <BootstrapForm.Label>Fuel</BootstrapForm.Label>
              <Field
                as={BootstrapForm.Control}
                type='number'
                name='fuel'
                isInvalid={Boolean(errors.fuel)}
              />
              <BootstrapForm.Text muted>
                Please enter amount of used fuel today in grams
              </BootstrapForm.Text>
              <BootstrapForm.Control.Feedback type='invalid'>
                {errors.fuel}
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
                disabled={wasteReportStore.submittingReport && wasteGoalStore.submittingGoal}
              >
                {wasteReportStore.submittingReport && wasteGoalStore.submittingGoal
                  ? 'Submitting'
                  : 'Submit'}
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </>
  )
})
