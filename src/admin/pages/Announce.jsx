import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { Navigate } from 'react-router-dom'
import { AddAnnounceAPI, DeleteAnnounceAPI, GetAnnouncesAPI, UpdateAnnounceAPI } from '../../api/AnnounceAPI'
import { useUserContext } from '../../context/UserContext'
import Popup from 'reactjs-popup'

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
    }, user.token).then((response) => {
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

    e.target.title = ""
  }

  useEffect(getAnnounces, [user.token])

  return (user.logged ?
    <div>
      <h3>Add Announcement</h3>
      <form onSubmit={addAnnounce}>
        <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" name="text" value={text} onChange={(e) => setText(e.target.value)} />
        <input type="submit" value="add Announcement" />
      </form>
      <table>
        <thead>
          <tr>
            <th>title</th>
            <th>text</th>
            <th>publishDate</th>
            <th>author</th>
          </tr>
        </thead>
        <tbody>
          {announces.map((announce) =>
            <tr key={announce.id}>
              <td>{announce.title}</td>
              <td>{announce.text}</td>
              <td>{announce.publishDate}</td>
              <td>{announce.author.firstName} {announce.author.lastName} ({announce.author.email})</td>
              <td>
                <button onClick={() => deleteAnnounce(announce.id)} >Delete announcement</button>
              </td>
              <td>
                <Popup trigger={<button>edit</button>} position='right center' >
                  <form onSubmit={updateAnnounce} >
                    <input type="hidden" name="id" value={announce.id} />
                    <input type="text" name="title" defaultValue={announce.title} />
                    <input type="text" name="text" defaultValue={announce.text} />
                    <input type="submit" value="apply changes" />
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

export default Announce