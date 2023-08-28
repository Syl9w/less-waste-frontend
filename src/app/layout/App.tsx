import { Col, Container, Row } from 'react-bootstrap'
import { Outlet } from 'react-router'
import NavBar from './NavBar'
import { useStore } from '../stores/store'
import { useEffect } from 'react'
import LoadingComponent from './LoadingComponent'
import { observer } from 'mobx-react-lite'
import ModalContainer from '../modals/ModalContainer'

function App() {
  const { userStore, commonStore } = useStore()
  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded())
    } else {
      commonStore.setAppLoaded()
    }
  }, [commonStore, userStore])

  if (commonStore.appLoaded) {
    return (
      <Container
        fluid
  
      >
        <ModalContainer />
        <Row className='justify-content-md-center'>
          <NavBar />
          <Col xl={12}>
            <Outlet />
          </Col>
        </Row>
      </Container>
    )
  }

  return <LoadingComponent />
}

export default observer(App)
