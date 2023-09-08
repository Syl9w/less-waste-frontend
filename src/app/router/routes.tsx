import { RouteObject } from 'react-router'
import { createBrowserRouter } from 'react-router-dom'
import App from '../layout/App'
import LoginForm from '../../features/account/LoginForm'
import Dashboard from '../../features/Dashboard/Dashboard'
import RegisterForm from '../../features/account/RegisterForm'
import HomePage from '../layout/HomePage'
import ProfilesPage from '../../features/profiles/ProfilesPage'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <HomePage /> },
      { path: 'login', element: <LoginForm /> },
      { path: 'register', element: <RegisterForm /> },
      { path: 'dashboard/:username', element: <Dashboard /> },
      { path: 'profiles', element: <ProfilesPage /> },
    ],
  },
]

export const router = createBrowserRouter(routes)
