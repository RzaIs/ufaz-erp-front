import Axios from "./Axios";

const ANNOUNCE_URL = 'api/announces'

export const GetAnnouncesAPI = async (token) => {

  let result = null

  await Axios.get(ANNOUNCE_URL, {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }).then((response) => {
    result = response.data
    result.announces.sort((a, b) => {
      return a.id - b.id
    })
  }).catch((error) => {
    console.log(error)
  })

  return result
}

export const AddAnnounceAPI = async (details, token) => {

  let result = null

  await Axios.post(ANNOUNCE_URL, {
    title: details.title,
    text: details.text
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

export const DeleteAnnounceAPI = async (id, token) => {

  let result = null

  await Axios.delete(ANNOUNCE_URL + '/' + id, {
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

export const UpdateAnnounceAPI = async (details, token) => {

  let result = null

  await Axios.put(ANNOUNCE_URL + '/' + details.id, {
    title: details.title,
    text: details.text
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