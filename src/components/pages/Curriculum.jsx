import React, { useEffect, useState } from 'react'
import { GetLessonsOfStudentAPI } from '../../api/LessonAPI'
import { GetSubjectAPI, GetSubjectsOfStudentAPI } from '../../api/SubjectAPI'
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
      // GetSubjectsOfTe
    }
  }

  useEffect(() => {
    getSubjects()
  }, [user])

  return (
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
    </div>
  )
}

export default Curriculum