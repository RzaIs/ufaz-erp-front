import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import Popup from 'reactjs-popup'
import { GetGroupsAPI } from '../../api/GroupAPI'
import { AddStudentAPI, DeleteStudentAPI, GetStudentsAPI, UpdateStudentAPI } from '../../api/StudentAPI'
import { Role, useUserContext } from '../../context/UserContext'
import Navbar from '../Navbar';

function Student() {

  const { user } = useUserContext()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confPswd, setConfPswd] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [admYear, setAdmYear] = useState('')
  const [groupId, setGroupId] = useState(0)

  const [students, setStudents] = useState([])
  const [groups, setGroups] = useState([])

  const getStudents = () => {
    GetStudentsAPI(user.token).then((response) => {
      if (response !== null) {
        setStudents(response.students)
      }
    })
  }

  const getGroups = () => {
    GetGroupsAPI(user.token).then((response) => {
      if (response !== null) {
        setGroups([
          response.groups.map((group) =>
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          )
        ])
      }
    })
  }

  const addStudent = (e) => {
    e.preventDefault()

    if (password !== confPswd) {
      window.alert("Passwords does not match!")
      setPassword("")
      setConfPswd("")
      return
    }

    AddStudentAPI({
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      groupId: groupId,
      admissionYear: admYear
    }, user.token).then((response) => {
      getStudents()
      setEmail("")
      setPassword("")
      setConfPswd("")
      setFirstName("")
      setLastName("")
      setGroupId(0)
      setAdmYear("")
    })
  }

  const deleteStudent = (id) => {
    let confirmed = window.confirm("Are you sure you want to delete this student?")
    if (!confirmed) return

    DeleteStudentAPI(id, user.token).then(getStudents)
  }

  const updateStudent = (e) => {
    e.preventDefault()

    if (e.target.password.value !== e.target.confPswd.value) {
      window.alert("Passwords does not match!")
      return
    }

    let confirmed = window.confirm("Are you sure you want to make changes for this student?")
    if (!confirmed) return

    UpdateStudentAPI({
      id: e.target.id.value,
      email: e.target.email.value,
      password: e.target.password.value,
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      groupId: e.target.groupId.value
    }, user.token).then(getStudents)
  }

  useEffect(() => {
    getStudents()
    getGroups()
  }, [user])

  return (user.logged ? user.role === Role.admin ?
    <div className='admin-student'>
      <Navbar />
      <div className="content">
        <div className="form-container">
          <form onSubmit={addStudent}>
            <h3>Add Student</h3>
            <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
            <input type="text" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" />
            <input type="text" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder='Last Name' />
            <select name='groupID' value={groupId} onChange={(e) => setGroupId(e.target.value)}>
              <option disabled  value={0}>Select group</option>
              {groups.map(grp => grp)}
            </select>
            <input type="number" name="admYear" value={admYear} onChange={(e) => setAdmYear(e.target.value)} placeholder="Admission Year" />
            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <input type="password" name="confPswd" value={confPswd} onChange={(e) => setConfPswd(e.target.value)} placeholder="Confirm Password" />
            <input type="submit" value="Add" className='add-btn' />
          </form>
        </div>
        <div className='table-container'>
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Admission Year</th>
                <th>Group</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) =>
                <tr key={student.id} className="tr-tbody">
                  <td>{student.firstName}</td>
                  <td>{student.lastName}</td>
                  <td>{student.email}</td>
                  <td>{student.admissionYear}</td>
                  <td>{student.group.name}</td>
                  <td>
                    <button onClick={() => deleteStudent(student.id)} title="Delete" className='delete-btn'>
                      <i className="fa-solid fa-trash-can" />
                    </button>
                  </td>
                  <td>
                    <Popup trigger={<button className='edit-btn' title='Rename'><i className="fa-solid fa-pen-to-square"></i></button>} position='right center'>
                      <form onSubmit={updateStudent} >
                        <input type="hidden" name="id" defaultValue={student.id} />
                        <input type="email" name="email" defaultValue={student.email} />
                        <input type="text" name="firstName" defaultValue={student.firstName} />
                        <input type="text" name="lastName" defaultValue={student.lastName} />
                        <select name='groupId' defaultValue={student.group.id} className="select-inp" >
                          {groups.map(grp => grp)}
                        </select>
                        <input type="password" name="password" placeholder='Password' />
                        <input type="password" name="confPswd" placeholder='Confirm Password' />
                        <input type="submit" value="change" className='btn' />
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

export default Student