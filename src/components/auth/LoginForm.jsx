import React, { useState, useEffect } from 'react'

function LoginForm({ login }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const submitHandler = (e) => {
    e.preventDefault();

    login({ email, password }).then((response) => {
      setPassword("")
      if (!response) {
        setError("username and password do not match!")
      }
    })
  }

  useEffect(() => {
    setError("")
  }, [email, password])

  return (
    <form onSubmit={submitHandler} >
      <div>
        <h2>Login</h2>
        {error === "" ? <></> : <div className='error-message'>{error}</div>}
        <div className='inputs'>
          <label htmlFor="email">Email</label><br />
          <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} />
        </div>
        <div className='inputs'>
          <label htmlFor="password">Password</label><br />
          <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} />
        </div>
        <input className='submit-btn' type="submit" value="LOGIN" />
      </div>
    </form>
  )
}
export default LoginForm;