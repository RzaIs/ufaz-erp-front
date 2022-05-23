import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
        <div className="title">
          <h1>
            <NavLink className='link-to' to={'/admin'}>EduPage</NavLink>
          </h1>
        </div>
        <div className="links-to-pages">
          <ul>
            <li>
              <NavLink className={(navData) => navData.isActive ? "link-to active" : "link-to"} to={'/admin/subjects'}>Subjects</NavLink>
            </li>
            <li>
              <NavLink className={(navData) => navData.isActive ? "link-to active" : "link-to"} to={'/admin/lessons'}>Lessons</NavLink>
            </li>
            <li>
              <NavLink className={(navData) => navData.isActive ? "link-to active" : "link-to"} to={'/admin/groups'}>Groups</NavLink>
            </li>
            <li>
              <NavLink className={(navData) => navData.isActive ? "link-to active" : "link-to"} to={'/admin/teachers'}>Teachers</NavLink>
            </li>
            <li>
              <NavLink className={(navData) => navData.isActive ? "link-to active" : "link-to"} to={'/admin/announces'}>Announces</NavLink>
            </li>
          </ul>
        </div>
      </nav>
  )
}

export default Navbar