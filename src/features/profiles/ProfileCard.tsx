import { Profile } from '../../app/models/profile'
import { Link } from 'react-router-dom'

interface Props {
  profile: Profile
}

export default function ProfileCard({ profile }: Props) {
  return (
    <>
      <div className='shadow p-3 m-2 bg-body-tertiary rounded '>
        <div className='ps-5 m-2' style={{textDecoration:'none'}}>
          <img src='user.png' style={{ width: '70%', margin: 'auto' }} alt={profile.userName} />
        </div>

        <Link to={`/dashboard/${profile.userName}`}>
          <h5>
            {profile.displayName}, {profile.age} y.o.
          </h5>
        </Link>

        <p>
          Average daily goal: <b>{profile.averageGoal.toFixed(2)}</b> units
        </p>
        <p>
          Average daily consumption: <b>{profile.averageProgress}</b> units
        </p>
      </div>
    </>
  )
}
