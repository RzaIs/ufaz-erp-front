import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { AddAbsenceAPI, DeleteAbsenceAPI, GetAbsenceOfLessonAPI } from '../../api/AbsenceAPI'
import { GetLessonsAPI } from '../../api/LessonAPI'
import { GetStudentOfLesson } from '../../api/StudentAPI'
import { Role, useUserContext } from '../../context/UserContext'
import Navbar from '../Navbar'

export default function Absence() {

  const { user } = useUserContext()

  const [lessons, setLessons] = useState([])


  const getLessons = () => {
    GetLessonsAPI(user.token).then((response) => {
      setLessons(response.lessons)
    })
  }

  useEffect(() => {
    getLessons()
  }, [user])

  return (user.logged ? user.role === Role.admin ?
    <div>
      <Navbar />
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
    </div> : <Navigate replace to='/unauth' /> : <Navigate replace to='/login' />
  )
}

function StudentList({ lessonId }) {

  const { user } = useUserContext()

  const [visible, setVisible] = useState(false)
  const [students, setStudents] = useState([])
  const [oldAbsences, setOldAbsences] = useState([])
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
        setAbsences(
          response.absences.map((absence) => absence.student.id)
        )
        setOldAbsences(
          response.absences.map((absence) => {
            return {
              id: absence.id,
              studentId: absence.student.id
            }
          })
        )
      }
    })
  }

  const updateAbsence = (e) => {
    e.preventDefault()

    let confirmed = window.confirm("Are you sure you want to update absences?")
    if (!confirmed) return

    let removeds = oldAbsences.filter(abs => !absences.includes(abs.studentId))
    let news = absences.filter(abs => !oldAbsences.some(oldAbs => oldAbs.studentId === abs))

    removeds.forEach((abs) => {
      DeleteAbsenceAPI(abs.id, user.token)
    })

    AddAbsenceAPI({
      lessonId: lessonId,
      students: news
    }, user.token)
  }

  const changeAbsences = (value, studentId) => {
    if (value === true) {
      setAbsences([...absences, studentId])
    } else {
      setAbsences(absences.filter((abs) => {
        return abs !== studentId
      }))
    }
  }

  useEffect(() => {
    getStudents()
    getAbsencesOfLesson()
  }, [user, lessonId])

  return (
    <>
      <button onClick={() => setVisible(!visible)} >{visible ? "hide" : "show"}</button>
      {visible ?
        <div>
          <form onSubmit={updateAbsence} >
            {students.map(student =>
              <div key={student.id}>
                <input
                  type="checkbox"
                  name={'std' + student.id}
                  checked={absences.includes(student.id)}
                  onChange={e => changeAbsences(e.target.checked, student.id)}
                />
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