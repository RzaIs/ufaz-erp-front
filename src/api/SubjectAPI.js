import Axios from "./Axios"

const SUBJECT_URL = 'api/subjects'

export const AddSubjectAPI = async (details, token) => {

  let result = null

  await Axios.post(SUBJECT_URL, {
    name: details.name,
    credits: details.credits,
    totalNumberOfLessons: details.nbOfLessons
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

export const GetSubjectsAPI = async (token) => {
  
  let result = null

  await Axios.get(SUBJECT_URL, {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }).then((response) => {
    result = response.data
    result.subjects.sort((a, b) => {
      return a.id - b.id
    })
  }).catch((error) => {
    console.log(error)
  })

  return result
}

export const GetSubjectAPI = async (id, token) => {

  let result = null

  await Axios.get(SUBJECT_URL + '/' + id, {
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

export const DeleteSubjectAPI = async (id, token) => {
  
  let result = null

  await Axios.delete(SUBJECT_URL + '/' + id, {
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

export const UpdateSubjectAPI = async (details, token) => {
  
  let result = null

  await Axios.put(SUBJECT_URL + '/' + details.id, {
    name: details.name,
    credits: details.credits,
    totalNumberOfLessons: details.nbOfLessons
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