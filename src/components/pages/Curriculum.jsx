import React, { useEffect, useState } from 'react'
import { GetLessonsOfStudentAPI } from '../../api/LessonAPI'
import { GetSubjectAPI } from '../../api/SubjectAPI'
import { useUserContext } from '../../context/UserContext'

function Curriculum() {

  const { user } = useUserContext()

  // const [subjectsSet, setSubjectsSet] = useState([])
  const [lessons, setLessons] = useState([])
  const [subjects, setSubjects] = useState([])

  const getLessons = () => {
    GetLessonsOfStudentAPI(user.id, user.token).then((response) => {
      if (response !== null) {
        setLessons(response.lessons)
      }
    })
  }

  const getSubjects = () => {
    let newset = new Set()
    lessons.forEach((lesson) => {
      GetSubjectAPI(lesson.subject.id, user.token).then((response) => {
        newset.add(response.subject)
        setSubjects([...newset])
      })
    })
  }

  useEffect(() => {
    getSubjects()
  }, [lessons])

  useEffect(() => {
    getLessons()
  }, [user.token])

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