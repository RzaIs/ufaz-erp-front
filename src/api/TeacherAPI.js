import Axios from "./Axios"

export const TEACHER_URL = 'api/teachers'

export const GetTeachersAPI = async (token) => {

  let result = null

  await Axios.get(TEACHER_URL, {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }).then((response) => {
    result = response.data
    result.teachers.sort((a, b) => {
      return a.id - b.id
    })
  }).catch((error) => {
    console.log(error)
  })

  return result
}

export const AddTeacherAPI = async (details, token) => {
  
  let result = null

  await Axios.post(TEACHER_URL, {
    email: details.email,
    password: details.password,
    firstName: details.firstName,
    lastName: details.lastName
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

export const DeleteTeacherAPI = async (id, token) => {

  let result = null

  await Axios.delete(TEACHER_URL + '/' + id, {
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

export const UpdateTeacherAPI = async (details, token) => {

  let result = null

  await Axios.put(TEACHER_URL + '/' + details.id, {
    email: details.email,
    password: details.password,
    firstName: details.firstName,
    lastName: details.lastName
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