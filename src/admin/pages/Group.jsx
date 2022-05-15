import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useUserContext } from '../../context/UserContext'
import { AddGroupAPI, DeleteGroupAPI, GetGroupsAPI, UpdateGroupAPI } from '../../api/GroupAPI'
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

    AddGroupAPI({ name: name }, user.token).then((response) => {
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
    <div>
      <h3>add group</h3>
      <form onSubmit={addGroup} >
        <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="submit" value="add group" />
      </form>
      <table>
        <thead>
          <tr>
            <th>group name</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((group) =>
            <tr key={group.id}>
              <td>{group.name}</td>
              <td>
                <button onClick={() => deleteGroup(group.id)} >Delete group</button>
              </td>
              <td>
                <Popup trigger={<button>rename</button>} position='right center' >
                  <form onSubmit={updateGroup}>
                    <input type="hidden" name="id" value={group.id} />
                    <input type="text" name="name" defaultValue={group.name} />
                    <input type="submit" value="rename" />
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

export default Group