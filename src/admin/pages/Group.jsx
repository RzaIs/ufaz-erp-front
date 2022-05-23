import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useUserContext } from '../../context/UserContext'
import { AddGroupAPI, DeleteGroupAPI, GetGroupsAPI, UpdateGroupAPI } from '../../api/GroupAPI'
import Navbar from '../Navbar';
import Popup from 'reactjs-popup'

function Group() {

  const { user } = useUserContext()

  const [name, setName] = useState("")
  const [groups, setGroups] = useState([])

  const getGroups = () => {
    GetGroupsAPI(user.token).then((response) => {
      if (response !== null) {
        setGroups(response.groups)
      }
    })
  }

  const addGroup = (e) => {
    e.preventDefault()

    AddGroupAPI({ name: name }, user.token).then((r) => {
      getGroups()
      setName("")
    })
  }

  const deleteGroup = (id) => {
    let confirmed = window.confirm("Are you sure you want to delete this group?")
    if (!confirmed) return

    DeleteGroupAPI(id, user.token).then(getGroups)
  }

  const updateGroup = (e) => {
    e.preventDefault()
    let confirmed = window.confirm("Are you sure you want to rename this group?")
    if (!confirmed) return

    UpdateGroupAPI({
      id: e.target.id.value,
      name: e.target.name.value
    }, user.token).then(getGroups)
  }

  useEffect(getGroups, [user.token])

  return (user.logged ?
    <div className='admin-group'>
      <Navbar />
      <div className="groups-content">
        <div className="add-group-form">
          <div className="form">
            <h3>add group</h3>
            <form onSubmit={addGroup} >
              <input type="text" name="name" value={name} placeholder="Enter Group Name" onChange={(e) => setName(e.target.value)} />
              <input type="submit" value="add" className='btn-add' />
            </form>
          </div>
        </div>
        <div className="groups-table">
          <table>
            <thead>
              <tr>
                <th>group name</th>
                <th className='th-btn'></th>
                <th className='th-btn'></th>
              </tr>
            </thead>
            <tbody>
              {groups.map((group) =>
                <tr key={group.id} className='tr-tbody'>
                  <td>{group.name}</td>
                  <td className='td-btn'>
                    <button onClick={() => deleteGroup(group.id)} className="delete-btn" title="Delete"><i className="fa-solid fa-trash-can"></i></button>
                  </td>
                  <td className='td-btn'>
                    <Popup trigger={<button className='edit-btn' title='Rename'><i className="fa-solid fa-pen-to-square"></i></button>} position='right center' >
                      <form onSubmit={updateGroup}>
                        <input type="hidden" name="id" value={group.id} />
                        <input type="text" name="name" defaultValue={group.name} />
                        <input type="submit" value="rename" className='btn' />
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

export default Group