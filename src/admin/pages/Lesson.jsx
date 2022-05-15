import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useUserContext } from '../../context/UserContext'
import { GetTeachersAPI } from '../../api/TeacherAPI'
import { GetGroupsAPI } from '../../api/GroupAPI'
import { GetSubjectsAPI } from '../../api/SubjectAPI'
import { AddLessonAPI } from '../../api/LessonAPI'

function Lesson() {

  const { user } = useUserContext()

  const [room, setRoom] = useState(0)
  const [week, setWeek] = useState(0)
  const [day, setDay] = useState(0)
  const [period, setPeriod] = useState(0)

  const [subjectID, setSubjectID] = useState(0)
  const [teacherID, setTeacherID] = useState(0)
  const [groupID, setGroupID] = useState(0)

  const [teachers, setTeachers] = useState([])
  const [groups, setGroups] = useState([])
  const [subjects, setSubjects] = useState([])


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
    }, user.token)
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
        <input type="number" name="day" value={day} onChange={(e) => setDay(e.target.value)} />
        <input type="number" name="period" value={period} onChange={(e) => setPeriod(e.target.value)} />
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
    </div> : <Navigate replace to='/login' /> 
  )
}

export default Lesson