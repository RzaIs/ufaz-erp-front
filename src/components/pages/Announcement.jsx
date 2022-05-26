import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { format } from 'date-fns'
import { GetAnnouncesAPI } from '../../api/AnnounceAPI'
import { Role, useUserContext } from '../../context/UserContext'
import { AddAnnounceAPI, UpdateAnnounceAPI } from '../../api/AnnounceAPI'
import NavbarClient from '../NavbarClient'

function Announcement() {

  const { user } = useUserContext()

  const [title, setTitle] = useState("")
  const [text, setText] = useState("")
  const [announces, setAnnounces] = useState([])

  const getAnnounces = () => {
    GetAnnouncesAPI(user.token).then((response) => {
      if (response !== null) {
        response.announces.forEach((announce) => {
          announce.publishDate = format(announce.publishDate, "YYYY-MM-DD HH:mm")
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

  useEffect(getAnnounces, [user])

  return (user.logged ? user.role !== Role.admin ?
    <div className='announcement'>
      <NavbarClient />
      <div className="content">
        <div className="announce-list">
          {announces.map((announce) => 
            <AnnounceView
              key={announce.id}
              details={announce}
              updateAnnounce={updateAnnounce}
            />
          )}
        </div>
        <div className="form-container">
          <h3>Add Announcement</h3>
          <form onSubmit={addAnnounce}>
            <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter Title" />
            <textarea name="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter Announcement Text"></textarea>
            <input type="submit" value="Add" className='add-btn' />
          </form>
        </div>
      </div>
    </div> :  <Navigate replace to='/admin/announces' /> : <Navigate replace to='/login' />
  )
}

function AnnounceView({ details, userEmail, updateAnnounce }) {

  const { user } = useUserContext()

  const [editMode, setEditMode] = useState(false)

  return (
    <>{editMode ?
      <form className='edit-form' onSubmit={(e) => {
        setEditMode(false)
        updateAnnounce(e)
      }} >
        <input type="hidden" name="id" value={details.id} />
        <input type="text" name="title" defaultValue={details.title} placeholder="Enter title" />
        <textarea name="text" defaultValue={details.text} placeholder="Enter announce text"></textarea>
        <input type="submit" value="Apply Changes" className='apply-btn' />
      </form>
      :
      <div className='announce-info'>
        <h3>Author : <span>{details.author.firstName} {details.author.lastName}</span>  <span>{details.author.email}</span></h3>
        <h5>Title : <span>{details.title}</span></h5>
        <p>{details.text}</p>
        {details.author.id === user.id ?
          <>
            <button className='edit-btn' onClick={(e) => setEditMode(!editMode)}>Edit</button>
            <button className='delete-btn'>Delete</button>
          </> : <></>
        }
        <p className='date'>{details.publishDate}</p>
      </div>}

    </>
  )
}

export default Announcement