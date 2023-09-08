import { observer } from 'mobx-react-lite'
import { Col, Container, Row } from 'react-bootstrap'
import { useStore } from '../../app/stores/store'
import { useEffect } from 'react'
import ProfileCard from './ProfileCard'

export default observer(function ProfilesPage() {
  const { profileStore } = useStore()

  useEffect(() => {
    profileStore.listProfiles()
  }, [profileStore])

  return (
    <Container>
      <Row>
        <h3>Profiles</h3>
      </Row>
      <Row>
        <p className='alert alert-primary'>
          Here you can find possible friends and make some copetition who will LESS-WASTE :)
        </p>
      </Row>

      <Row>
        {profileStore.profiles.map((profile) => (
          <Col md={3} key={profile.userName}>
            <ProfileCard profile={profile} />
          </Col>
        ))}
      </Row>
    </Container>
  )
})
