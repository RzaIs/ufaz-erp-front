import Axios from "./Axios"

const ABSENCE_URL = 'api/students/absences'

const GetAbsenceAPI = async (token) => {

  let result = null

  await Axios.get(ABSENCE_URL, {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }).then((response) => {
    console.log(response)
  }).catch((error) => {
    console.log(error)
  })

  return result
}

export default GetAbsenceAPI;