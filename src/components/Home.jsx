import React from "react";
import { Link, Navigate } from "react-router-dom";
import { Role, useUserContext } from "../context/UserContext";
import image from '../assets/img/max1920x1920trslide24.jpg'
import NavbarClient from "./NavbarClient";


function Home() {

  const { user } = useUserContext()

  return (user.logged ? user.role !== Role.admin ?
    <div>
      <NavbarClient display="unvisible" />
      <main>
        <div className="image-part">
          <img src={image} alt="error" />
        </div>
        <section>
            <Link to={'/curriculum'} className='link-to'><button className="curriculum-btn"><i className="fa-solid fa-briefcase"></i> Curriculum</button></Link>
            <Link to={'/timetable'} className='link-to'><button className="timetable-btn"><i className="fa-solid fa-calendar-days"></i> Timetable</button></Link>
            <Link to={'/attendance'} className='link-to'><button className="attendance-btn"><i className="fa-solid fa-clipboard-user"></i> Attendance</button></Link>
            <Link to={'/announcements'} className='link-to'><button className="announcement-btn"><i className="fa-solid fa-envelope"></i> Announcement</button></Link>
        </section>
      </main>
    </div> : <Navigate replace to='/admin' /> : <Navigate replace to='/login' />
  )
}

export default Home;