import React, { useState, useEffect } from 'react'
import { GetAbsenceOfStudentAPI } from '../../api/AbsenceAPI'
import { useUserContext } from '../../context/UserContext'

function Attendance() {

  const { user } = useUserContext()

  const [absences, setAbsences] = useState([])

  const getAbsences = () => {
    GetAbsenceOfStudentAPI(user.token).then((response) => {
      if (response !== null) {
        setAbsences(response.absences)
      }
    })
  }

  useEffect(getAbsences, [user.token])

  return (
    <div>{JSON.stringify(absences)}</div>
  )
}

export default Attendance