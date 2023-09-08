import { observer } from 'mobx-react-lite'
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { useStore } from '../stores/store'

export default observer(function NavBar() {
  const { userStore } = useStore()

  return (
    <Navbar expand='lg' className='bg-body-tertiary'>
      <Container>
        <Navbar.Brand as={NavLink} to='/'>
          Less-waste
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'>
            {userStore.isLoggedIn && (
              <>
                <Nav.Link as={NavLink} to={`/dashboard/${userStore.user?.userName}`}>
                  Dashboard
                </Nav.Link>
                <Nav.Link as={NavLink} to='/profiles'>
                  Profiles
                </Nav.Link>
              </>
            )}
          </Nav>
          <Nav>
            {!userStore.isLoggedIn && (
              <>
                <Nav.Link as={NavLink} to='/login' className='d-flex'>
                  Login
                </Nav.Link>
                <Nav.Link as={NavLink} to='/register' className='d-flex'>
                  Register
                </Nav.Link>
              </>
            )}
            {userStore.isLoggedIn && (
              <NavDropdown title={userStore.user?.displayName} id='basic-nav-dropdown'>
                <NavDropdown.Item as={NavLink} to='/profile'>
                  My Profile
                </NavDropdown.Item>
                <NavDropdown.Item onClick={userStore.logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
})
