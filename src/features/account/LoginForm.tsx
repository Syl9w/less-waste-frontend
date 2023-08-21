import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Button, Form as BootstrapForm, Row, Col } from 'react-bootstrap'
import { useStore } from '../../app/stores/store'

interface LoginFormValues {
  email: string
  password: string
}

export default function LoginForm() {
  const {userStore} = useStore()

  const handleSubmit = (creds: LoginFormValues) => {
    userStore.login(creds)
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
  })

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <BootstrapForm.Group controlId='email'>
            <BootstrapForm.Label>Email</BootstrapForm.Label>
            <Field
              as={BootstrapForm.Control}
              type='email'
              name='email'
              isInvalid={touched.email && Boolean(errors.email)}
            />
            <BootstrapForm.Control.Feedback type='invalid'>
              {errors.email}
            </BootstrapForm.Control.Feedback>
          </BootstrapForm.Group>

          <BootstrapForm.Group controlId='password'>
            <BootstrapForm.Label>Password</BootstrapForm.Label>
            <Field
              as={BootstrapForm.Control}
              type='password'
              name='password'
              isInvalid={touched.password && Boolean(errors.password)}
            />
            <BootstrapForm.Control.Feedback type='invalid'>
              {errors.password}
            </BootstrapForm.Control.Feedback>
          </BootstrapForm.Group>
          <BootstrapForm.Group as={Row} className='mb-3'>
            <Col >
              <Button variant='primary' type='submit' className='mt-1'>
                Login
              </Button>
            </Col>
          </BootstrapForm.Group>
        </Form>
      )}
    </Formik>
  )
}
