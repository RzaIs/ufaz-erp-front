import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useUserContext } from '../../context/UserContext'
import { GetTeachersAPI } from '../../api/TeacherAPI'
import { GetGroupsAPI } from '../../api/GroupAPI'
import { GetSubjectsAPI } from '../../api/SubjectAPI'
import { AddLessonAPI, GetLessonsAPI } from '../../api/LessonAPI'

function Lesson() {

  const { user } = useUserContext()

  const [room, setRoom] = useState(0)
  const [week, setWeek] = useState(0)
  const [day, setDay] = useState(0)
  const [period, setPeriod] = useState(0)

  const [subjectID, setSubjectID] = useState(0)
  const [teacherID, setTeacherID] = useState(0)
  const [groupID, setGroupID] = useState(0)

  const [lessons, setLessons] = useState([])
  const [teachers, setTeachers] = useState([])
  const [groups, setGroups] = useState([])
  const [subjects, setSubjects] = useState([])

  const getLessons = () => {
    GetLessonsAPI(user.token).then((response) => {
      if (response !== null) {
        setLessons(response.lessons)
      }
    })
  }

  const addLesson = (e) => {
    e.preventDefault()
    AddLessonAPI({
      subjectId: subjectID,
      room: room,
      week: week,
      day: day,
      period: period,
      teacherId: teacherID,
      groupId: groupID
    }, user.token).then((response) => {
      if (response !== null) {
        getLessons()
      }
    })
  }

  const getTeachers = () => {
    GetTeachersAPI(user.token).then((response) => {
      if (response !== null) {
        setTeachers([
          response.teachers.map((teacher) =>
            <option key={teacher.id} value={teacher.id}>
              {teacher.firstName} {teacher.lastName}
            </option>
          )
        ])
      } else setTeachers([
        <option value={0}></option>
      ])
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
      } else setGroups([
        <option value={0}></option>
      ])
    })
  }

  const getSubjects = () => {
    GetSubjectsAPI(user.token).then((response) => {
      if (response !== null) {
        setSubjects([
          response.subjects.map((subject) =>
            <option key={subject.id} value={subject.id}>
              {subject.name}
            </option>
          )
        ])
      } else setSubjects([
        <option value={0}></option>
      ])
    })
  }

  useEffect(() => {
    getLessons()
    getTeachers()
    getGroups()
    getSubjects()
  }, [user.token])

  return (
    user.logged ?
    <div>
      <h3>
        add lesson
      </h3>
      <form onSubmit={addLesson}>
        <input type="number" name="room" value={room} onChange={(e) => setRoom(e.target.value)} />
        <input type="number" name="week" value={week} onChange={(e) => setWeek(e.target.value)} />
        <select name="day" value={day} onChange={(e) => setDay(e.target.value)} >
          <option value={1}>monday</option>
          <option value={2}>tuesday</option>
          <option value={3}>wednesday</option>
          <option value={4}>thursday</option>
          <option value={5}>friday</option>
        </select>
        <input type="number" name="period" value={period} onChange={(e) => setPeriod(e.target.value)} />
        <select name="period" value={period} onChange={(e) => setPeriod(e.target.value)} >
          <option value={0}>08:30 - 10:00</option>
          <option value={1}>10:15 - 11:45</option>
          <option value={2}>12:45 - 14:15</option>
          <option value={3}>14:30 - 16:00</option>
          <option value={4}>16:15 - 17:45</option>
        </select>
        <select name="subjectID" value={subjectID} onChange={(e) => setSubjectID(e.target.value)}>
          {subjects.map(sbj => sbj)}
        </select>
        <select name='teacherID' value={teacherID} onChange={(e) => setTeacherID(e.target.value)}>
          {teachers.map(opt => opt)}
        </select>
        <select name='groupID' value={groupID} onChange={(e) => setGroupID(e.target.value)}>
          {groups.map(grp => grp)}
        </select>
        <input type="submit" value="add lesson" />
      </form>
      <table>
        <thead>

        </thead>
        <tbody>
          {lessons.map((lesson) =>
            <tr key={lesson.lessonId} >
              <td>{lesson.subject.name}</td>
              <td>{lesson.group.name}</td>
              <td>{lesson.teacher.firstName} {lesson.teacher.lastName}</td>
              <td>{lesson.room}</td>
              <td>{lesson.week}</td>
              <td>{lesson.day}</td>
              <td>{lesson.period}</td>
              <td>
                {/* <button onClick={} className="delete-btn" title="Delete"><i className="fa-solid fa-trash-can" /></button> */}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div> : <Navigate replace to='/login' /> 
  )
}

export default Lesson