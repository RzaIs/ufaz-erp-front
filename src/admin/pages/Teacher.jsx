import { useState, useEffect } from 'react'
import Popup from 'reactjs-popup'
import { Navigate } from 'react-router-dom'
import { Role, useUserContext } from '../../context/UserContext'
import { AddTeacherAPI, DeleteTeacherAPI, GetTeachersAPI, UpdateTeacherAPI } from '../../api/TeacherAPI'
import Navbar from '../Navbar';


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
      window.alert("Passwords does not match!")
      setPassword("")
      setConfPswd("")
      return
    }

    AddTeacherAPI({
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName
    }, user.token).then((r) => {
      getTeachers()
      setEmail("")
      setFirstName("")
      setLastName("")
      setPassword("")
      setConfPswd("")
    })
  }

  const deleteTeacher = (id) => {
    let confirmed = window.confirm("Are you sure you want to delete this teacher?")
    if (!confirmed) return

    DeleteTeacherAPI(id, user.token).then(getTeachers)
  }

  const updateTeacher = (e) => {
    e.preventDefault()

    if (e.target.password.value !== e.target.confPswd.value) {
      window.alert("Passwords does not match!")
      return
    }

    let confirmed = window.confirm("Are you sure you want to make changes for this teacher?")
    if (!confirmed) return

    UpdateTeacherAPI({
      id: e.target.id.value,
      email: e.target.email.value,
      password: e.target.password.value,
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value
    }, user.token).then(getTeachers)
  }

  useEffect(getTeachers, [user])

  return (user.logged ? user.role === Role.admin ?
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
                  <td>
                    <Popup className='edit-popup' trigger={<button className='edit-btn' title='Edit'><i className="fa-solid fa-pen-to-square"></i></button>} position='right center'>
                      <form onSubmit={updateTeacher}>
                        <input type="hidden" name="id" defaultValue={teacher.id} />
                        <input type='email' name='email' defaultValue={teacher.email} />
                        <br />
                        <input type='text' name='firstName' defaultValue={teacher.firstName} />
                        <br />
                        <input type='text' name='lastName' defaultValue={teacher.lastName} />
                        <br />
                        <input type='password' name='password' placeholder='password' />
                        <br />
                        <input type='password' name='confPswd' placeholder='confirm password' />
                        <br />
                        <input type='submit' value='update subject' className='btn' />
                      </form>
                    </Popup>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div> : <Navigate replace to='/unauth' /> : <Navigate replace to='/login' />
  )
}

export default Teacher;