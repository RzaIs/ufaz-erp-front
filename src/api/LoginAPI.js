import Axios from "./Axios"

const LOGIN_URL = 'api/auth/login'

const LoginAPI = async (details) => {

  let result = null

  await Axios.post(LOGIN_URL, {
    email: details.email,
    password: details.password
  }).then((response) => {
    result = response.data
  }).catch((error) => {
    console.log(error)
  })

  return result
}

export default LoginAPI;