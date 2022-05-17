import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import Popup from 'reactjs-popup'
import { AddSubjectAPI, GetSubjectsAPI, DeleteSubjectAPI, UpdateSubjectAPI } from '../../api/SubjectAPI'
import { useUserContext } from '../../context/UserContext'

function Subject() {

  const { user } = useUserContext()

  const [subjects, setSubjects] = useState([])
  const [subjectName, setSubjectName] = useState("")
  const [subjectCredits, setSubjectCredits] = useState(0)
  const [subjectNbOfLessons, setSubjectNbOfLessons] = useState(0)

  const getSubjects = () => {
    GetSubjectsAPI(user.token).then((response) => {
      if (response !== null) {
        setSubjects(response.subjects)
      }
    })
  }

  const addSubject = (e) => {
    e.preventDefault()

    AddSubjectAPI({
      name: subjectName,
      credits: subjectCredits,
      nbOfLessons: subjectNbOfLessons
    }, user.token).then(getSubjects)
  }

  const deleteSubject = (id) => {
    let confirmed = window.confirm("Are you sure you want to delete this subject?")
    if (!confirmed) return

    DeleteSubjectAPI(id, user.token).then(getSubjects)
  }

  const updateSubject = (e) => {
    e.preventDefault()
    let confirmed = window.confirm("Are you sure you want to make changes for this subject?")
    if (!confirmed) return

    UpdateSubjectAPI({
      id: e.target.id.value,
      name: e.target.name.value,
      credits: e.target.credits.value,
      nbOfLessons: e.target.nbOfLessons.value
    }, user.token).then(getSubjects)
  }

  useEffect(getSubjects, [user.token])

  return (user.logged ?
    <div>
      <form onSubmit={addSubject}>
        <input type='text' name='name' value={subjectName} onChange={(e) => setSubjectName(e.target.value)} />
        <input type='number' name='credits' value={subjectCredits} onChange={(e) => setSubjectCredits(e.target.value)} />
        <input type='number' name='nbOfLessons' value={subjectNbOfLessons} onChange={(e) => setSubjectNbOfLessons(e.target.value)} />
        <input type='submit' value='add subject' />
      </form>
      <table>
        <thead>
          <tr>
            <th>name, </th>
            <th>credits, </th>
            <th>number of lessons, </th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject) =>
            <tr key={subject.id}>
              <td>{subject.name}, </td>
              <td>{subject.credits}, </td>
              <td>{subject.totalNumberOfLessons}, </td>
              <td>
                <button onClick={() => deleteSubject(subject.id)} >delete</button>
              </td>
              <td>
                <Popup trigger={<button>edit</button>} position='right center' >
                  <form onSubmit={updateSubject}>
                    <input type="hidden" name="id" defaultValue={subject.id} />
                    <input type='text' name='name' defaultValue={subject.name} />
                    <input type='number' name='credits' defaultValue={subject.credits} />
                    <input type='number' name='nbOfLessons' defaultValue={subject.totalNumberOfLessons} />
                    <input type='submit' value='update subject' />
                  </form>
                </Popup>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div> : <Navigate replace to='/login' />
  )
}

export default Subject