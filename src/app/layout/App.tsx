import { Col, Container, Row } from 'react-bootstrap'
import { Outlet } from 'react-router'
import { Link } from 'react-router-dom'

function App() {
  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col md={6}>
          <Outlet />
          Welcome to the Less waste
          <Link to='/login'>Login</Link>
        </Col>
      </Row>
    </Container>
  )
}

export default App
