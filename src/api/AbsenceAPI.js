import Axios from "./Axios"

const ABSENCE_URL = 'api/absences'

export const GetAbsencesAPI = async (token) => {

  let result = null

  await Axios.get(ABSENCE_URL, {
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
    result = response.data
  }).catch((error) => {
    console.log(error)
  })

  return result
}

export const GetAbsenceOfStudentAPI = async (id, token) => {

  let result = null

  await Axios.get(ABSENCE_URL + '/by/student/' + id, {
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

export const DeleteAbsenceAPI = async (id, token) => {

  let result = null

  await Axios.delete(ABSENCE_URL + '/' + id, {
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