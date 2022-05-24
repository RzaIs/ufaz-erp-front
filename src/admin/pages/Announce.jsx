import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { Navigate } from 'react-router-dom'
import { AddAnnounceAPI, DeleteAnnounceAPI, GetAnnouncesAPI, UpdateAnnounceAPI } from '../../api/AnnounceAPI'
import { useUserContext } from '../../context/UserContext'
import Popup from 'reactjs-popup'
import Navbar from '../Navbar';

function Announce() {

  const { user } = useUserContext()

  const [title, setTitle] = useState("")
  const [text, setText] = useState("")
  const [announces, setAnnounces] = useState([])

  const getAnnounces = () => {
    GetAnnouncesAPI(user.token).then((response) => {
      if (response !== null) {
        response.announces.forEach((announce) => {
          announce.publishDate = format(announce.publishDate, "yyyy-MM-dd HH:mm")
        })
        setAnnounces(response.announces)
      }
    })
  }

  const addAnnounce = (e) => {
    e.preventDefault()

    AddAnnounceAPI({
      title: title,
      text: text
    }, user.token).then((r) => {
      getAnnounces()
      setTitle("")
      setText("")
    })
  }

  const deleteAnnounce = (id) => {
    let confirmed = window.confirm("Are you sure you want to delete this announcement?")
    if (!confirmed) return

    DeleteAnnounceAPI(id, user.token).then(getAnnounces)
  }

  const updateAnnounce = (e) => {
    e.preventDefault()
    let confirmed = window.confirm("Are you sure you want to make changes to this announcement?")
    if (!confirmed) return

    UpdateAnnounceAPI({
      id: e.target.id.value,
      title: e.target.title.value,
      text: e.target.text.value
    }, user.token).then(getAnnounces)
  }

  useEffect(getAnnounces, [user.token])

  return (user.logged ?
    <div className='admin-announce'>
      <Navbar />
      <div className="content">
        <div className="form-container">
          <h3>Add Announcement</h3>
          <form onSubmit={addAnnounce}>
            <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter announcement title" />
            <textarea name="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter announcement"></textarea>
            <input type="submit" value="add" className='add-btn' />
          </form>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>title</th>
                <th>text</th>
                <th>publishDate</th>
                <th>author</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {announces.map((announce) =>
                <tr key={announce.id} className="tr-tbody">
                  <td>{announce.title}</td>
                  <td>{announce.text}</td>
                  <td>{announce.publishDate}</td>
                  <td>{announce.author.firstName} {announce.author.lastName} ({announce.author.email})</td>
                  <td>
                    <button onClick={() => deleteAnnounce(announce.id)} title='Delete' className="delete-btn" ><i className="fa-solid fa-trash-can"></i></button>
                  </td>
                  <td>
                    <Popup trigger={<button title='Edit' className='edit-btn'><i className="fa-solid fa-pen-to-square"></i></button>} position='right center' >
                      <form onSubmit={updateAnnounce} >
                        <input type="hidden" name="id" value={announce.id} />
                        <input type="text" name="title" defaultValue={announce.title} />
                        {/* <input type="text" name="text" defaultValue={announce.text} className='delete-btn' /> */}
                        <textarea name="text" rows="10" cols='26' defaultValue={announce.text} ></textarea>
                        <input type="submit" value="Apply Changes" className='btn' />
                      </form>
                    </Popup>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div> : <Navigate replace to='/login' />
  )
}

export default Announce