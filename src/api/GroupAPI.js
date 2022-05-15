import Axios from "./Axios"

const GROUP_URL = 'api/groups'

export const GetGroupsAPI = async (token) => {

  let result = null

  await Axios.get(GROUP_URL, {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }).then((response) => {
    result = response.data
    result.groups.sort((a, b) => {
      return a.id - b.id
    })
  }).catch((error) => {
    console.log(error)
  })

  return result
}

export const AddGroupAPI = async (details, token) => {

  let result = null

  await Axios.post(GROUP_URL, {
    name: details.name
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

export const DeleteGroupAPI = async (id, token) => {

  let result = null

  await Axios.delete(GROUP_URL + '/' + id, {
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

export const UpdateGroupAPI = async (details, token) => {

  let result = null

  await Axios.put(GROUP_URL + '/' + details.id, {
    name: details.name
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
