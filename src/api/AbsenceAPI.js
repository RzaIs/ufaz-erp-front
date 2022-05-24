import Axios from "./Axios"
import { STUDENT_URL } from "./StudentAPI"

const ABSENCE_URL = 'api/absences'

const GetAbsenceAPI = async (token) => {

  let result = null

  await Axios.get(ABSENCE_URL, {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }).then((response) => {
    // console.log(response)
  }).catch((error) => {
    console.log(error)
  })

  return result
}

export const AddAbsenceAPI = async (details, token) => {
  let result = null

  await Axios.post(ABSENCE_URL, {
    lessonId: details.lessonId,
    students: details.students 
  }, {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }).then((response) => {
    result = response
  })
}

export const GetAbsenceOfStudentAPI = async (token) => {

  let result = null

  await Axios.get(STUDENT_URL + '/absences', {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }).then((response) => {
    result = response.lessons
  }).catch((error) => {
    console.log(error)
  })

  return result
}

export const GetAbsenceOfLessonAPI = async (id, token) => {

  let result = null

  await Axios.get(ABSENCE_URL + '/lesson/' + id, {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }).then((response) => {
    result = response.data
  }).catch((error) => {
    console.log(error)
  })

  return result
}

export default GetAbsenceAPI;