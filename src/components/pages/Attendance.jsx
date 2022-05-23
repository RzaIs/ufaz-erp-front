import React, { useState, useEffect } from 'react'
import GetAbsenceAPI from '../../api/AbsenceAPI'
import { useUserContext } from '../../context/UserContext'

function Attendance() {

  const { user } = useUserContext()

  const [absences, setAbsences] = useState([])

  const getAbsences = () => {
    GetAbsenceAPI(user.token).then((response) => {
      if (response !== null) {
        // setAbsences(response)
      }
    })
  }

  useEffect(getAbsences, [user.token])

  return (
    <div>Attendance</div>
  )
}

export default Attendance