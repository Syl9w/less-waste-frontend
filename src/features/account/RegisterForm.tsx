import React from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Button, Form as BootstrapForm, Row, Col } from 'react-bootstrap'
import { useStore } from '../../app/stores/store'

interface LoginFormValues {
  email: string
  username: string
  displayname: string
  password: string
  age: number
}

export default function RegisterForm() {
  const {userStore} = useStore()

  const handleSubmit = (creds: LoginFormValues) => {
    userStore.register(creds)
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
    username: Yup.string().required('Please specify your Username'),
    displayname: Yup.string().required('Please specify your Display Name'),
    age: Yup.number().required('Please enter your Age')
  })

  return (
    <Formik
      initialValues={{ email: '', password: '', username:'', displayname:'', age:18 }}
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

          <BootstrapForm.Group controlId='displayname'>
            <BootstrapForm.Label>Display Name</BootstrapForm.Label>
            <Field
              as={BootstrapForm.Control}
              type='text'
              name='displayname'
              isInvalid={touched.displayname && Boolean(errors.displayname)}
            />
            <BootstrapForm.Control.Feedback type='invalid'>
              {errors.displayname}
            </BootstrapForm.Control.Feedback>
          </BootstrapForm.Group>
          <BootstrapForm.Group controlId='username'>
            <BootstrapForm.Label> Username</BootstrapForm.Label>
            <Field
              as={BootstrapForm.Control}
              type='text'
              name='username'
              isInvalid={touched.username && Boolean(errors.username)}
            />
            <BootstrapForm.Control.Feedback type='invalid'>
              {errors.username}
            </BootstrapForm.Control.Feedback>
          </BootstrapForm.Group>
          <BootstrapForm.Group controlId='age'>
            <BootstrapForm.Label>Age</BootstrapForm.Label>
            <Field
              as={BootstrapForm.Control}
              type='number'
              name='age'
              isInvalid={touched.age && Boolean(errors.age)}
            />
            <BootstrapForm.Control.Feedback type='invalid'>
              {errors.age}
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
