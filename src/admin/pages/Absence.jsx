import React, { useEffect, useState } from 'react'
import { AddAbsenceAPI, GetAbsenceOfLessonAPI } from '../../api/AbsenceAPI'
import { GetLessonsAPI } from '../../api/LessonAPI'
import { GetStudentOfLesson } from '../../api/StudentAPI'
import { useUserContext } from '../../context/UserContext'

export default function Absence() {

  const { user } = useUserContext()

  const [lessons, setLessons] = useState([])


  const getLessons = () => {
    GetLessonsAPI(user.token).then((response) => {
      setLessons(response.lessons)
      console.log(response.lessons)
    })
  }

  useEffect(() => {
    getLessons()
  }, [user.token])

  return (
    <div>
      {lessons.map((lesson) =>
        <div key={lesson.lessonId}>
          <div>{lesson.subject.name}</div>
          <div>{weekDay(lesson.day)}</div>
          <div>{lesson.week}</div>
          <div>{lesson.group.name}</div>
          <div>{lesson.teacher.firstName} {lesson.teacher.lastName}</div>
          <div>
            <StudentList lessonId={lesson.lessonId} />
          </div>
        </div>
      )}
    </div>
  )
}

function StudentList({lessonId}) {

  const { user } = useUserContext()

  const [visible, setVisible] = useState(false)
  const [students, setStudents] = useState([])
  const [absences, setAbsences] = useState([])

  const getStudents = () => {
    GetStudentOfLesson(lessonId, user.token).then((response) => {
      if (response !== null) {
        setStudents(response.students)
      }
    })
  }

  const getAbsencesOfLesson = () => {
    GetAbsenceOfLessonAPI(lessonId, user.token).then((response) => {
      if (response !== null) {
        setAbsences([
          response.absences.map((absence) => absence.student.id)
        ])
      }
    })
  }

  const addAbsence = (e) => {
    e.preventDefault()



    // AddAbsenceAPI()
  }

  const updateAbsences = (value, studentId) => {
    console.log(value, studentId)
    console.log(absences)
  }

  useEffect(() => {
    getStudents()
    getAbsencesOfLesson()
  }, [user.token, lessonId])

  return ( 
    <>
    <button onClick={() => setVisible(!visible)} >{visible ? "hide" : "show"}</button>
    {visible ?
    <div>
      <form onSubmit={addAbsence} >
        {students.map(student =>
          <div key={student.id}>
            <input type="checkbox" name={'std' + student.id} onChange={e => updateAbsences(e.target.value, student.id)}/>
            <label htmlFor={'std' + student.id}>{student.firstName + ' ' + student.lastName}</label>
          </div>
        )}
        <input type="submit" value="submit absences" />
      </form>
    </div> : <></>}
    </>
  )

}


function weekDay(number) {
  switch (number) {
    case 1:
      return 'mon'
    case 2:
      return 'tue'
    case 3:
      return 'wed'
    case 4:
      return 'thu'
    case 5:
      return 'fri'
    default:
      return 'nan'
  }
}