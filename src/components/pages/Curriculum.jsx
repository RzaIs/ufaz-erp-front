import React, { useEffect, useState } from 'react'
import { GetLessonsOfStudentAPI } from '../../api/LessonAPI'
import { GetSubjectAPI, GetSubjectsOfStudentAPI } from '../../api/SubjectAPI'
import { useUserContext } from '../../context/UserContext'

function Curriculum() {

  const { user } = useUserContext()

  const [subjects, setSubjects] = useState([])

  const getSubjects = () => {
    GetSubjectsOfStudentAPI(user.id, user.token).then((response) => {
      if (response !== null) {
        setSubjects(response.subjects)
      }
    })
  }

  useEffect(() => {
    getSubjects()
  }, [user])

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>credits</th>
            <th>number of lessons</th>
          </tr>
        </thead>
        <tbody>
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
  )
}

export default Curriculum