import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useUserContext } from '../context/UserContext'
import Popup from 'reactjs-popup'

/*const defaultUserSate = {
  logged: false,
  id: 0,
  email: "",
  firstName: "",
  lastName: "",
  token: ""
}*/

const Navbar = (props) => {

  const { user,clearUser } = useUserContext()

  const logout = () => {
    let confirmed = window.confirm("Are you sure you want to logout?")
    if (!confirmed) return

    clearUser()
  }



  useEffect(()=> {
    console.log(user)
  }, [user])

  return (
    <nav>
        <div className="title">
          <h1>
            <NavLink className='link-to' to={'/admin'}>UFAZ ADMIN</NavLink>
          </h1>
        </div>
        <div className="links-to-pages">
          <ul>
            <li className = {props.display}>
              <NavLink className={(navData) => navData.isActive ? "link-to active" : "link-to"} to={'/admin/subjects'}>Subjects</NavLink>
            </li>
            <li className = {props.display}>
              <NavLink className={(navData) => navData.isActive ? "link-to active" : "link-to"} to={'/admin/lessons'}>Lessons</NavLink>
            </li>
            <li className = {props.display}>
              <NavLink className={(navData) => navData.isActive ? "link-to active" : "link-to"} to={'/admin/groups'}>Groups</NavLink>
            </li>
            <li className = {props.display}>
              <NavLink className={(navData) => navData.isActive ? "link-to active" : "link-to"} to={'/admin/teachers'}>Teachers</NavLink>
            </li>
            <li className = {props.display}>
              <NavLink className={(navData) => navData.isActive ? "link-to active" : "link-to"} to={'/admin/announces'}>Announces</NavLink>
            </li>
            <li className = {props.display}>
              <NavLink className={(navData) => navData.isActive ? "link-to active" : "link-to"} to={'/admin/students'}>Students</NavLink>
            </li>
            <li className='user-info' title={user.firstName + ' '+ user.lastName}>
              <Popup  trigger={<div>{user.firstName.slice(0,1) + '' +user.lastName.slice(0,1)}</div>} position='left top'>
                  <h5>{user.email}</h5>
                  <h5 style={{margin: '20px 0'}}>{user.firstName} {user.lastName}</h5>
                  <button className="btn" onClick={logout} style={{marginBottom: '20px',width: '120px'}}>Log Out</button>
              </Popup>
            </li>
          </ul>
        </div>
      </nav>
  )
}

Navbar.defaultProps = {
  display: 'visible'
}

export default Navbar