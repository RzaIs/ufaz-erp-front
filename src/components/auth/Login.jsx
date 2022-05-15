import React, { useState } from 'react'
import { useUserContext } from '../../context/UserContext'
import LoginForm from './LoginForm'
import LoginAPI from '../../api/LoginAPI'


function Login() {
  
  const { user, setUser, clearUser } = useUserContext()

  const login = async (details) => {
    
    const response = await LoginAPI(details)

    if (response === null) {
      return false
    } else {
      setUser({ logged: true, email: details.email, token: response.jwt })
      return true
    }
  }

  const logout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?")
    if (!confirmed) return

    clearUser()
  }

  return (
    <div className="login-body">
      {user.logged ? (
        <div className='container'>
          <h2>Welcome <span>{user.email}</span></h2>
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