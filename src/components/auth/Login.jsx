import React, { useState } from 'react'
import { Role, useUserContext } from '../../context/UserContext'
import { Navigate } from 'react-router-dom'
import LoginForm from './LoginForm'
import LoginAPI from '../../api/LoginAPI'


function Login() {

  const { user, setUser, clearUser } = useUserContext()

  const [redirect, setRedirect] = useState(false)

  const login = async (details) => {

    let result = false

    await LoginAPI(details).then((response) => {
      if (response !== null) {
        let role
        switch (response.user.role) {
          case "ROLE_ADMIN":
            role = Role.admin
            break;
          case "ROLE_STUDENT":
            role = Role.student
            break;
          case "ROLE_TEACHER":
            role = Role.teacher
            break;
          default:
            role = -1
            break;
        }
        setUser({
          logged: true,
          id: response.user.id,
          email: response.user.email,
          firstName: response.user.firstName,
          lastName: response.user.lastName,
          token: response.jwt,
          role: role
        })
        setRedirect(true)
        result = true
      }
    })

    return result
  }

  const logout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?")
    if (!confirmed) return

    clearUser()
  }

  return (redirect ? (
      user.role === Role.admin ?
      <Navigate replace to='/admin' /> : <Navigate replace to='/' />
    ) :
    <div className="login-body">
      {user.logged ? (
        <div className='container'>
          <h2>Welcome <span>{user.firstName} {user.lastName}</span></h2>
          <button className='submit-btn' onClick={logout}>Logout</button>
        </div>
      ) : (
        <div className='container'>
          <LoginForm login={login} />
        </div>
      )}
    </div>
  )
}
export default Login;