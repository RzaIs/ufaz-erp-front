import React, { useState } from 'react'
import LoginForm from './LoginForm'


function Login() {
  const [user, setUser] = useState({
    logged: false,
    email: "",
    token: "",
  })

  const login = async (details) => {
    const response = {
      jwt: "12345"
    }

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

    setUser({
      logged: false,
      email: "",
      token: "",
    })
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