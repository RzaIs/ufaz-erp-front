import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useUserContext } from '../../context/UserContext'
import { AddTeacherAPI, DeleteTeacherAPI, GetTeachersAPI } from '../../api/TeacherAPI'


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
    <div>
      <form onSubmit={addTeacher}>
        <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="text" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <input type="text" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="password" name="confPswd" value={confPswd} onChange={(e) => setConfPswd(e.target.value)} />
        <input type="submit" value="register" />
      </form>
      <table>
        <thead>
          <tr>
            <th>email</th>
            <th>first name</th>
            <th>last name</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) =>
            <tr key={teacher.id}>
              <td>{teacher.email}</td>
              <td>{teacher.firstName}</td>
              <td>{teacher.lastName}</td>
              <td>
                <button onClick={() => deleteTeacher(teacher.id)} >Delete</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div> : <Navigate replace to='/login' /> 
  )
}

export default Teacher;