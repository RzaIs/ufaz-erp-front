import { useState, useEffect }  from 'react';
import { GetLessonsOfStudentAPI } from '../../api/LessonAPI';
import { useUserContext } from '../../context/UserContext';

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
    GetLessonsOfStudentAPI(user.id, user.token).then((response) => {
      if (response !== null) {
        setLessons(response.lessons)
      }
    })
  }

  useEffect(() => {
    getLessons()
    console.log("HI")
  }, [user.token, user.id])

  useEffect(() => {
    setWeekLessons(lessons.filter(lesson => lesson.week === week))
  }, [week, lessons])

  return (
    <div>
      <button onClick={() => setWeek(week - 1)}>{'<---'}</button>
      {week}
      <button onClick={() => setWeek(week + 1)}>{'--->'}</button>
      <table>
        <thead>
          <tr>
            <th>day \ hour</th>
            <th>08:30 - 10:00</th>
            <th>10:15 - 11:45</th>
            <th>12:45 - 14:15</th>
            <th>14:30 - 16:00</th>
            <th>16:15 - 17:45</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Mon</th>
            {periods.map(p =>
              <LessonBox key={p} lesson={
                weekLessons.filter(lesson => lesson.day === 1).find(lesson => lesson.period === p)
              }/>
            )}
          </tr>
          <tr>
            <th>Tue</th>
            {periods.map(p =>
              <LessonBox key={p} lesson={
                weekLessons.filter(lesson => lesson.day === 2).find(lesson => lesson.period === p)
              }/>
            )}
          </tr>
          <tr>
            <th>Wed</th>
            {periods.map(p =>
              <LessonBox key={p} lesson={
                weekLessons.filter(lesson => lesson.day === 3).find(lesson => lesson.period === p)
              }/>
            )}
          </tr>
          <tr>
            <th>Thu</th>
            {periods.map(p =>
              <LessonBox key={p} lesson={
                weekLessons.filter(lesson => lesson.day === 4).find(lesson => lesson.period === p)
              }/>
            )}
          </tr>
          <tr>
            <th>Fri</th>
            {periods.map(p =>
              <LessonBox key={p} lesson={
                weekLessons.filter(lesson => lesson.day === 5).find(lesson => lesson.period === p)
              }/>
            )}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

function LessonBox({lesson}) {
  return (
    <td> {lesson === undefined ? "HELLO" :
      lesson.group.name +
      lesson.room +
      lesson.teacher.firstName + lesson.teacher.lastName +
      lesson.subject.name
    } </td>
  )
}

export default Timetable