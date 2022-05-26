import React, { useState, useEffect } from 'react'
import { GetAbsenceOfStudentAPI } from '../../api/AbsenceAPI'
import { useUserContext } from '../../context/UserContext'

function Attendance() {

  const { user } = useUserContext()

  const [absences, setAbsences] = useState([])

  const getAbsences = () => {
    GetAbsenceOfStudentAPI(user.id , user.token).then((response) => {
      if (response !== null) {
        setAbsences(response.absences)
      }
    })
  }

  useEffect(getAbsences, [user])

  return (
    <div>
      {absences.map(abs =>
        <div>{JSON.stringify(abs)}</div>
      )}
    </div>
  )
}

export default Attendance