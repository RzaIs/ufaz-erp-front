import React, { useState, useEffect } from 'react'
import Popup from 'reactjs-popup'
import { GetGroupsAPI } from '../../api/GroupAPI'
import { AddStudentAPI, DeleteStudentAPI, GetStudentsAPI } from '../../api/StudentAPI'
import { useUserContext } from '../../context/UserContext'

function Student() {

  const { user } = useUserContext()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confPswd, setConfPswd] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [admYear, setAdmYear] = useState(0)
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
    

    AddStudentAPI({
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      groupId: groupId,
      admissionYear: admYear
    }, user.token).then((response) => {
      getStudents()
      // clear fields
    })
  }

  const deleteStudent = (id) => {
    let confirmed = window.confirm("Are you sure you want to delete this student?")
    if (!confirmed) return

    DeleteStudentAPI(id, user.token).then(getStudents)
  }

  useEffect(() => {
    getStudents()
    getGroups()
  }, [user.token])

  return (
    <div>
      <form onSubmit={addStudent}>
        <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="text" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <input type="text" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <select name='groupID' value={groupId} onChange={(e) => setGroupId(e.target.value)}>
          {groups.map(grp => grp)}
        </select>
        <input type="number" name="admYear" value={admYear} onChange={(e) => setAdmYear(e.target.value)} />
        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="password" name="confPswd" value={confPswd} onChange={(e) => setConfPswd(e.target.value)} />
        <input type="submit" value="add student" />
      </form>
      <div>
        <table>
          <thead>
            <tr>
              <th>firt name</th>
              <th>last name</th>
              <th>email</th>
              <th>admission year</th>
              <th>group</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) =>
              <tr key={student.id}>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.email}</td>
                <td>{student.admissionYear}</td>
                <td>{student.group.name}</td>
                <td>
                  <button onClick={() => deleteStudent(student.id)}>
                    <i className="fa-solid fa-trash-can" />
                    </button>
                </td>
                <td>
                  <Popup trigger={<button className='edit-btn' title='Rename'><i className="fa-solid fa-pen-to-square"></i></button>} position='right center'>
                    
                  </Popup>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Student