import React, { useEffect, useState } from 'react'
import { GetLessonsOfStudentAPI } from '../../api/LessonAPI'
import { GetSubjectAPI } from '../../api/SubjectAPI'
import { useUserContext } from '../../context/UserContext'

function Curriculum() {

  const { user } = useUserContext()

  const [subjects, setSubjects] = useState(new Set())

  const getSubjects = () => {
    GetLessonsOfStudentAPI(user.id, user.token).then((response) => {
      if (response !== null) {
        let _subjects = new Set()
        response.lessons.forEach((lesson) => {
          GetSubjectAPI(lesson.subject.id, user.token).then((r) => {
            if (r !== null) {
              _subjects.add(r.subject)
            }
          })
        })
        setSubjects(_subjects)
        console.log(subjects)
      }
    })
  }

  useEffect(() => {
    getSubjects()
  }, [user.token])

  return (
    <div>Curriculum</div>
  )
}

export default Curriculum