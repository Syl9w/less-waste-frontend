import { RouteObject } from 'react-router'
import { createBrowserRouter } from 'react-router-dom'
import App from '../layout/App'
import LoginForm from '../../features/account/LoginForm'
import Dashboard from '../../features/Dashboard/Dashboard'
import RegisterForm from '../../features/account/RegisterForm'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: 'login', element: <LoginForm /> },
      { path: 'register', element: <RegisterForm /> },
      { path: 'dashboard', element: <Dashboard /> },
    ],
  },
]

export const router = createBrowserRouter(routes)
