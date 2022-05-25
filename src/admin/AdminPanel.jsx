import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useUserContext } from '../context/UserContext'
import Navbar from './Navbar';
import Photo from '../assets/img/oli-dale-xjSkI_seiZY-unsplash.jpg';

function AdminPanel() {

  const { user } = useUserContext()

  return (
    user.logged ?
      <div className='admin'>
        <Navbar display='unvisible' />
        <div className="content">
          <div className="image">
           <img src={Photo} alt="error" />
          </div>
          <div className="links">
            <Link className='link-to' to={'/admin/subjects'}><button>Subjects</button></Link>
            <Link className='link-to' to={'/admin/lessons'}><button>Lessons</button></Link>
            <Link className='link-to' to={'/admin/groups'}><button>Groups</button></Link>
            <Link className='link-to' to={'/admin/teachers'}><button>Teachers</button></Link>
            <Link className='link-to' to={'/admin/students'}><button>Students</button></Link>
            <Link className='link-to' to={'/admin/announces'}><button>Announces</button></Link>
            <Link className='link-to' to={'/admin/absences'}><button>Absences</button></Link>
          </div>
        </div>
      </div> : <Navigate replace to='/login' />
  )
}

export default AdminPanel