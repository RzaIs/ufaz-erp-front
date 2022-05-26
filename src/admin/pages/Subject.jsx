import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import Popup from 'reactjs-popup'
import { AddSubjectAPI, GetSubjectsAPI, DeleteSubjectAPI, UpdateSubjectAPI } from '../../api/SubjectAPI'
import { Role, useUserContext } from '../../context/UserContext'
import Navbar from '../Navbar'

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
    }, user.token).then((r) => {
      getSubjects()
      setSubjectName("")
      setSubjectCredits(0)
      setSubjectNbOfLessons(0)
    })
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

  useEffect(getSubjects, [user])

  return (user.logged ? user.role === Role.admin ?
    <div className='admin-subject'>
      <Navbar />
      <div className="content">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th className='th-top-first'>Name</th>
                <th>Credits</th>
                <th>Number of Lessons</th>
                <th></th>
                <th className='th-top-last'></th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject) =>
                <tr key={subject.id} className='tr-tbody'>
                  <td>{subject.name}</td>
                  <td className='td-center'>{subject.credits}</td>
                  <td className='td-center'>{subject.totalNumberOfLessons}</td>
                  <td>
                    <button onClick={() => deleteSubject(subject.id)} title='Delete' className='delete-btn' ><i className="fa-solid fa-trash-can"></i></button>
                  </td>
                  <td>
                    <Popup className='edit-popup' trigger={<button className='edit-btn' title='Edit'><i className="fa-solid fa-pen-to-square"></i></button>} position='right center'>
                      <form onSubmit={updateSubject}>
                        <input type="hidden" name="id" defaultValue={subject.id} />
                        <input type='text' name='name' defaultValue={subject.name} />
                        <br />
                        <input type='number' name='credits' defaultValue={subject.credits} />
                        <br />
                        <input type='number' name='nbOfLessons' defaultValue={subject.totalNumberOfLessons} />
                        <br />
                        <input type='submit' value='update subject' className='btn' />
                      </form>
                    </Popup>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="form-container">
          <form onSubmit={addSubject}>
            <label htmlFor="name">Subject Name </label> <br />
            <input type='text' name='name' value={subjectName} onChange={(e) => setSubjectName(e.target.value)} className="inp-subject-name" /> <br />
            <label htmlFor="credits">Credits </label> <br />
            <input type='number' name='credits' value={subjectCredits} onChange={(e) => setSubjectCredits(e.target.value)} className='inp-number' /> <br />
            <label htmlFor="nbOfLessons">Number of Lessons </label> <br />
            <input type='number' name='nbOfLessons' value={subjectNbOfLessons} onChange={(e) => setSubjectNbOfLessons(e.target.value)} className='inp-number' /> <br />
            <input type='submit' value='add subject' className='add-btn' />
          </form>
        </div>
      </div>
    </div> : <Navigate replace to='/unauth' /> : <Navigate replace to='/login' />
  )
}

export default Subject