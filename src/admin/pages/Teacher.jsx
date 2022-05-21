import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useUserContext } from '../../context/UserContext'
import { AddTeacherAPI, DeleteTeacherAPI, GetTeachersAPI } from '../../api/TeacherAPI'
import Navbar from './Navbar';


function Teacher() {

  const { user } = useUserContext()

  const [teachers, setTeachers] = useState([])
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [password, setPassword] = useState("")
  const [confPswd, setConfPswd] = useState("")

  const getTeachers = () => {
    GetTeachersAPI(user.token).then((response) => {
      if (response !== null) {
        setTeachers(response.teachers)
      }
    })
  }

  const addTeacher = (e) => {
    e.preventDefault()

    if (password !== confPswd) {
      setPassword("")
      setConfPswd("")
    } else {
      AddTeacherAPI({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
      }, user.token).then((response) => {
        getTeachers()
        setEmail("")
        setFirstName("")
        setLastName("")
        setPassword("")
        setConfPswd("")
      })
    }
  }

  const deleteTeacher = (id) => {
    let confirmed = window.confirm("Are you sure you want to delete this teacher?")
    if (!confirmed) return

    DeleteTeacherAPI(id, user.token).then(getTeachers)
  }

  const updateTeacher = (id) => {
    let confirmed = window.confirm("Are you sure you want to make changes for this teacher?")
    if (!confirmed) return

    // DeleteTeacherAPI(id, user.token).then(getTeachers)
  }

  useEffect(getTeachers, [user.token])

  return (
    user.logged ?
      <div className='admin-teacher'>
        <Navbar />
        <div className="container">
          <div className="container-form">
            <h3>Fill Inputs for Registering a Teacher</h3>
            <form onSubmit={addTeacher}>
              <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" />
              
              <input type="text" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Enter First Name" />
              
              <input type="text" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Enter Last Name" />
              
              <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
              
              <input type="password" name="confPswd" value={confPswd} onChange={(e) => setConfPswd(e.target.value)} placeholder="Confirm Password" />
              
              <input type="submit" value="register" className='register-btn' />
            </form>
          </div>
          <div className="container-table">
            <table>
              <thead>
                <tr>
                  <th>email</th>
                  <th>first name</th>
                  <th>last name</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((teacher) =>
                  <tr key={teacher.id} className='tr-tbody'>
                    <td>{teacher.email}</td>
                    <td>{teacher.firstName}</td>
                    <td>{teacher.lastName}</td>
                    <td className='td-btn'>
                      <button onClick={() => deleteTeacher(teacher.id)} title="Delete"><i className="fa-solid fa-trash-can"></i></button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div> : <Navigate replace to='/login' />
  )
}

export default Teacher;