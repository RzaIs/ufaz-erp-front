import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useUserContext } from '../context/UserContext'

function AdminPanel() {

  const { user } = useUserContext()

  return (
    user.logged ?
    <div>
      <Link className='link-to' to={'/admin/subjects'}>Subjects</Link><br /><br />
      <Link className='link-to' to={'/admin/lessons'}>Lessons</Link><br /><br />
      <Link className='link-to' to={'/admin/groups'}>Groups</Link><br /><br />
      <Link className='link-to' to={'/admin/teachers'}>Teachers</Link><br /><br />
      <Link className='link-to' to={'/admin/students'}>Students</Link><br /><br />
      <Link className='link-to' to={'/admin/announces'}>Announces</Link><br /><br />
    </div> : <Navigate replace to='/login' /> 
  )
}

export default AdminPanel