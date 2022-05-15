import Axios from "./Axios"

const LESSON_URL = 'api/lessons'

export const AddLessonAPI = async (details, token) => {

  let result = null

  await Axios.post(LESSON_URL, {
    subjectId: details.subjectId,
    room: details.room,
    week: details.week,
    day: details.day,
    period: details.period,
    teacherId: details.teacherId,
    groupId: details.groupId
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