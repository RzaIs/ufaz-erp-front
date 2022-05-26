import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { GetStudentOfLesson } from '../../api/StudentAPI'
import { GetAbsenceOfStudentAPI, GetAbsenceOfLessonAPI, DeleteAbsenceAPI, AddAbsenceAPI } from '../../api/AbsenceAPI'
import { GetLessonsOfTeacherAPI } from '../../api/LessonAPI'
import { Role, useUserContext } from '../../context/UserContext'
import NavbarClient from '../NavbarClient';

function Attendance() {

  const { user } = useUserContext()

  return (user.logged ? (
    user.role === Role.student ?
      <StudentAttendance /> :
      user.role === Role.teacher ?
        <TeacherAttendance /> : <Navigate replace to='/admin/absences' />
  ) : <Navigate replace to='/login' />
  )
}

function TeacherAttendance() {

  const { user } = useUserContext()

  const [lessons, setLessons] = useState([])

  const getLessons = () => {
    GetLessonsOfTeacherAPI(user.id, user.token).then((response) => {
      setLessons(response.lessons)
    })
  }

  useEffect(() => {
    getLessons()
  }, [user])

  return (
    <div className='absence'>
      <NavbarClient />
      <div className="lessons">
        {lessons.map((lesson) =>
          <div key={lesson.lessonId} className='lesson'>
            <div><span>Subject : </span>{lesson.subject.name}</div>
            <div><span>Week Day : </span>{weekDay(lesson.day)}</div>
            <div><span>Week : </span>{lesson.week}</div>
            <div><span>Group : </span>{lesson.group.name}</div>
            <div>
              <StudentList lessonId={lesson.lessonId} />
            </div>
          </div>
        )}
      </div>
    </div>
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

  return (user.logged ? user.role !== Role.admin ?
    <>
      <button className='btn display-btn' onClick={() => setVisible(!visible)} >{visible ? "Hide" : "Show"}</button>
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
            <input type="submit" value="Submit Absences" className='btn submit-btn' />
          </form>
        </div> : <></>}
    </> : <Navigate replace to='/admin/absences' /> : <Navigate replace to='/login' />
  )
}

function StudentAttendance() {

  const { user } = useUserContext()

  const [absences, setAbsences] = useState([])

  const getAbsences = () => {
    GetAbsenceOfStudentAPI(user.id, user.token).then((response) => {
      if (response !== null) {
        setAbsences(response.absences)
      }
    })
  }

  useEffect(getAbsences, [user])

  return (
    <div className='attendance'>
      <NavbarClient />
      <div className="absences">
        {absences.map(abs =>
          <div key={abs.id} className='absence' >
            <div><span>Week :</span> {abs.lesson.week}</div>
            <div><span>Day :</span> {weekDay(abs.lesson.day)}</div>
            {/* <div>{`lesson: ${abs.lesson.period + 1}`}</div> */}
            <div><span>Lesson :</span> {abs.lesson.period + 1}</div>
            <div><span>Subject :</span> {abs.lesson.subject.name}</div>
            <div><span>Professor :</span> {abs.lesson.teacher.firstName} {abs.lesson.teacher.lastName}</div>
            <br />
          </div>
        )}
      </div>
    </div>
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

export default Attendance