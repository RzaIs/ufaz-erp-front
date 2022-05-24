import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { GetAnnouncesAPI } from '../../api/AnnounceAPI'
import { useUserContext } from '../../context/UserContext'
import { AddAnnounceAPI, UpdateAnnounceAPI } from '../../api/AnnounceAPI'

function Announcement() {

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

  return (
    <div>
      {announces.map((announce) => <AnnounceView
        key={announce.id}
        details={announce}
        updateAnnounce={updateAnnounce}
      />)}
      <h3>Add Announcement</h3>
      <form onSubmit={addAnnounce}>
        <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" name="text" value={text} onChange={(e) => setText(e.target.value)} />
        <input type="submit" value="add Announcement" />
      </form>
    </div>
  )
}

function AnnounceView({ details, userEmail, updateAnnounce }) {

  const { user } = useUserContext()

  const [editMode, setEditMode] = useState(false)

  return (
    <>{editMode ?
      <form onSubmit={(e) => {
        setEditMode(false)
        updateAnnounce(e)
      }} >
        <input type="hidden" name="id" value={details.id} />
        <input type="text" name="title" defaultValue={details.title} />
        <input type="text" name="text" defaultValue={details.text} />
        <input type="submit" value="apply changes" />
      </form>
      :
      <div>
        <div>{details.author.firstName} {details.author.lastName}</div>
        <div>{details.author.email}</div>
        <div>{details.title}</div>
        <div>{details.text}</div>
        <div>{details.publishDate}</div>
      </div>}
      {details.author.id === user.id ?
        <button onClick={(e) => setEditMode(!editMode)}>edit</button> : <></>
      } <hr />
    </>
  )
}

export default Announcement