import Axios from "./Axios"

const LESSON_URL = 'api/lessons'

export const GetLessonsAPI = async (token) => {

  let result = null

  await Axios.get(LESSON_URL, {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }).then((response) => {
    result = response.data
    result.lessons.sort((a, b) => {
      return a.id - b.id
    })
  }).catch((error) => {
    console.log(error)
  })

  return result
}

export const GetLessonsOfStudentAPI = async (studentID, token) => {

  let result = null

  await Axios.get('api/students/'+ studentID +'/lessons', {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }).then((response) => {
    result = response.data
    result.lessons.sort((a, b) => {
      return a.id - b.id
    })
  }).catch((error) => {
    console.log(error)
  })

  return result
}

export const GetLessonsOfTeacherAPI = async (teacherID, token) => {

  let result = null

  await Axios.get('api/teachers/'+ teacherID +'/lessons', {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }).then((response) => {
    result = response.data
    result.lessons.sort((a, b) => {
      return a.id - b.id
    })
  }).catch((error) => {
    console.log(error)
  })

  return result
}

export const GetStudentsOfLessonAPI = async (lessonID, token) => {
  
  let result = null

  await Axios.get(LESSON_URL + '/' + lessonID + '/students', {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }).then((response) => {
    result = response.data
    result.lessons.sort((a, b) => {
      return a.id - b.id
    })
  }).catch((error) => {
    console.log(error)
  })

  return result
}

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