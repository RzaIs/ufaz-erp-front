import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import image from '../assets/img/max1920x1920trslide24.jpg'


function Home() {

  const { user, clearUser } = useUserContext()

  const logout = () => {
    let confirmed = window.confirm("Are you sure you want to logout?")
    if (!confirmed) return

    clearUser()
  }

  return (user.logged ?
    <div>
      <div className="logout-btn">
        <Link to={'/login'}><button onClick={logout}>Log Out <i className="fa-solid fa-right-from-bracket"></i></button></Link>
      </div>
      <main>
        <div className="image-part">
          <img src={image} alt="error" />
        </div>
        <section>
          <div className="row">
            <Link to={'/curriculum'}><button className="curriculum-btn"><i className="fa-solid fa-briefcase"></i> Curriculum</button></Link>
            <Link to={'/timetable'}><button className="timetable-btn"><i className="fa-solid fa-calendar-days"></i> Timetable</button></Link>
          </div>
          <div className="row">
            <Link to={'/homework'}><button className="homework-btn"><i className="fa-solid fa-clock"></i> Homework</button></Link>
            <Link to={'/attendance'}><button className="attendance-btn"><i className="fa-solid fa-clipboard-user"></i> Attendance</button></Link>
          </div>
          <div className="row">
            <Link to={'/announcement'}><button className="announcement-btn"><i className="fa-solid fa-envelope"></i> Announcement</button></Link>
            <Link to={'/grades'}><button className="grades-btn"><i className="fa-solid fa-a"></i> Grades</button></Link>
          </div>
        </section>
      </main>
    </div> : <Navigate replace to='/login' />
  )
}

export default Home;