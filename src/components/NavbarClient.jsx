import React from 'react'
import { useUserContext } from '../context/UserContext'
import { NavLink } from 'react-router-dom'
import Popup from 'reactjs-popup'

const NavbarClient = (props) => {

  const { user,clearUser } = useUserContext()

  const logout = () => {
    let confirmed = window.confirm("Are you sure you want to logout?")
    if (!confirmed) return

    clearUser()
  }

  return (
    <nav className='nav-client'>
        <div className="title">
          <h1>
            <NavLink className='link-to' to={'/'}>UFAZ EDUPAGE</NavLink>
          </h1>
        </div>
        <div className="links-to-pages">
          <ul>
            <li className = {props.display}>
              <NavLink className={(navData) => navData.isActive ? "link-to active" : "link-to"} to={'/curriculum'}>Curriculum</NavLink>
            </li>
            <li className = {props.display}>
              <NavLink className={(navData) => navData.isActive ? "link-to active" : "link-to"} to={'/timetable'}>Timetable</NavLink>
            </li>
            <li className = {props.display}>
              <NavLink className={(navData) => navData.isActive ? "link-to active" : "link-to"} to={'/attendance'}>Attendance</NavLink>
            </li>
            <li className = {props.display}>
              <NavLink className={(navData) => navData.isActive ? "link-to active" : "link-to"} to={'/announcements'}>Announcement</NavLink>
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

export default NavbarClient