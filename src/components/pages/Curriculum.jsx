import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { GetSubjectsOfStudentAPI, GetSubjectsOfTeacherAPI } from '../../api/SubjectAPI'
import { Role, useUserContext } from '../../context/UserContext'
import NavbarClient from '../NavbarClient';

function Curriculum() {

  const { user } = useUserContext()

  const [subjects, setSubjects] = useState([])

  const getSubjects = () => {
    if (user.role === Role.student) {
      GetSubjectsOfStudentAPI(user.id, user.token).then((response) => {
        if (response !== null) {
          setSubjects(response.subjects)
        }
      })
    } else if (user.role === Role.teacher) {
      GetSubjectsOfTeacherAPI(user.id, user.token).then((response) => {
        setSubjects(response.subjects)
      })
    }
  }

  useEffect(() => {
    getSubjects()
  }, [user])

  return (user.logged ? user.role !== Role.admin ?
    <div className='info curriculum'>
      <NavbarClient />
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Credits</th>
              <th>Number of Lessons</th>
            </tr>
          </thead>
          <tbody className='tr-'>
            {subjects.map((subject) =>
              <tr key={subject.id} >
                <td>{subject.name}</td>
                <td>{subject.credits}</td>
                <td>{subject.totalNumberOfLessons}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div> : <Navigate replace to='/admin/subjects' /> : <Navigate replace to='/login' />
  )
}

export default Curriculum