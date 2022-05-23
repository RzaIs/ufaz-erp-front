import Axios from "./Axios"

const STUDENT_URL = 'api/students'

export const GetStudentsAPI = async (token) => {

  let result = null

  await Axios.get(STUDENT_URL, {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }).then((response) => {
    result = response.data
    result.students.sort((a, b) => {
      return a.id - b.id
    })
  }).catch((error) => {
    console.log(error)
  })

  return result
}

export const AddStudentAPI = async (details, token) => {

  let result = null

  await Axios.post(STUDENT_URL, {
    email: details.email,
    password: details.password,
    firstName: details.firstName,
    lastName: details.lastName,
    groupId: details.groupId,
    admissionYear: details.admissionYear
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

export const DeleteStudentAPI = async (id, token) => {

  let result = null

  await Axios.delete(STUDENT_URL + '/' + id, {
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

export const UpdateStudentAPI = async (details, token) => {

  let result = null

  await Axios.put(STUDENT_URL + '/' + details.id, {
    email: details.email,
    password: details.password,
    firstName: details.firstName,
    lastName: details.lastName,
    groupId: details.groupId,
    admissionYear: details.admissionYear
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