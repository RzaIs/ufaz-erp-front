import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom'
import { GetLessonsOfStudentAPI, GetLessonsOfTeacherAPI } from '../../api/LessonAPI';
import { Role, useUserContext } from '../../context/UserContext';
import NavbarClient from '../NavbarClient';

const periods = [0, 1, 2, 3, 4]

function Timetable() {

  const { user } = useUserContext()

  const [lessons, setLessons] = useState([])
  const [weekLessons, setWeekLessons] = useState([])
  const [week, setweek] = useState(1)

  const setWeek = (value) => {
    if (value > 0 && value <= 20)
      setweek(value)
  }

  const getLessons = () => {
    if (user.role === Role.student) {
      GetLessonsOfStudentAPI(user.id, user.token).then((response) => {
        if (response !== null) {
          setLessons(response.lessons)
        }
      })
    } else if (user.role === Role.teacher) {
      GetLessonsOfTeacherAPI(user.id, user.token).then((response) => {
        if (response !== null) {
          setLessons(response.lessons)
        }
      })
    }
  }


  useEffect(() => {
    getLessons()
  }, [user])

  useEffect(() => {
    setWeekLessons(lessons.filter(lesson => lesson.week === week))
  }, [week, lessons])

  return (user.logged ? user.role !== Role.admin ?
    <div className='timetable'>
      <NavbarClient />
      <div className="week-btns">
        <button onClick={() => setWeek(week - 1)}><i className="fa-solid fa-arrow-left"></i></button>
        <button onClick={() => setWeek(week + 1)}><i className="fa-solid fa-arrow-right"></i></button>
      </div>
      <h2>{user.group + ' ' + user.firstName + ' ' + user.lastName + ' - Week ' + week}</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Day \ Hour</th>
              <th>08:30 - 10:00</th>
              <th>10:15 - 11:45</th>
              <th>12:45 - 14:15</th>
              <th>14:30 - 16:00</th>
              <th>16:15 - 17:45</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th title="Monday">Mon</th>
              {periods.map(p =>
                <LessonBox key={p} lesson={
                  weekLessons.filter(lesson => lesson.day === 1).find(lesson => lesson.period === p)
                } />
              )}
            </tr>
            <tr>
              <th title="Tuesday">Tue</th>
              {periods.map(p =>
                <LessonBox key={p} lesson={
                  weekLessons.filter(lesson => lesson.day === 2).find(lesson => lesson.period === p)
                } />
              )}
            </tr>
            <tr>
              <th title='Wednesday'>Wed</th>
              {periods.map(p =>
                <LessonBox key={p} lesson={
                  weekLessons.filter(lesson => lesson.day === 3).find(lesson => lesson.period === p)
                } />
              )}
            </tr>
            <tr>
              <th title='Thursday'>Thu</th>
              {periods.map(p =>
                <LessonBox key={p} lesson={
                  weekLessons.filter(lesson => lesson.day === 4).find(lesson => lesson.period === p)
                } />
              )}
            </tr>
            <tr>
              <th title='Friday'>Fri</th>
              {periods.map(p =>
                <LessonBox key={p} lesson={
                  weekLessons.filter(lesson => lesson.day === 5).find(lesson => lesson.period === p)
                } />
              )}
            </tr>
          </tbody>
        </table>
      </div>
    </div> : <Navigate replace to='/admin/lessons' /> : <Navigate replace to='/login' />
  )
}

function LessonBox({ lesson }) {

  const { user } = useUserContext()

  const [bg, setBg] = useState({});
  const [title, setTitle] = useState('')


  const generateBgColor = () => {

    let r = lesson.subject.name.charCodeAt(0);
    let g = lesson.subject.name.charCodeAt(1);
    let b = lesson.subject.name.charCodeAt(2);

    if (r < 100 || g < 100 || b < 100) {
      r += 60;
      g += 60;
      b += 60;
      if (r > 255) {
        r = 255;
      }
      if (g > 255) {
        g = 255;
      }
      if (b > 255) {
        b = 255;
      }
    }

    let bgColor = `rgb(${r},${g},${b})`;
    setBg({ backgroundColor: bgColor });
  }

  const getTitle = () => {
    if (user.role === Role.student) {
      setTitle(`${lesson.group.name}\n${lesson.subject.name}\n${lesson.room}\n${lesson.teacher.firstName} ${lesson.teacher.lastName}`)
    } else {
      setTitle(`${lesson.group.name}\n${lesson.subject.name}\n${lesson.room}`)
    }
  }

  useEffect(() => {
    if (lesson !== undefined) {
      generateBgColor();
      getTitle()
    }
  }, [lesson]);

  return (lesson === undefined ? <td></td> :
    <td className='lesson-info' title={title} style={bg}>
      <span className='lesson-room'>{lesson.room}</span>
      {lesson.subject.name.slice(0, 3).toUpperCase()}
      {user.role === Role.student ?
        <span className='lesson-teacher'>{lesson.teacher.firstName.slice(0, 1) + lesson.teacher.lastName.slice(0, 1)}</span>
        :
        <span className='lesson-teacher'>{lesson.group.name}</span>
      }
    </td>
  )
}

export default Timetable