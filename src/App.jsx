import ContextController from "./context/ContextController";
import Login from "./components/auth/Login";
import Home from "./components/Home";
import AdminPanel from "./admin/AdminPanel";
import Subject from "./admin/pages/Subject";
import Error from "./components/Error";
import Group from "./admin/pages/Group";
import Announce from "./admin/pages/Announce";
import Lesson from "./admin/pages/Lesson";
import Teacher from "./admin/pages/Teacher";
import Student from "./admin/pages/Student";
import Absence from "./admin/pages/Absence";
import Announcement from "./components/pages/Announcement";
import Timetable from "./components/pages/Timetable";
import Attendance from "./components/pages/Attendance";
import Curriculum from "./components/pages/Curriculum";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UnAuth from "./components/UnAuth";

function App() {
  return (
    <ContextController>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/timetable' element={<Timetable />} />
          <Route path='/attendance' element={<Attendance />} />
          <Route path='/announcements' element={<Announcement />} />
          <Route path='/curriculum' element={<Curriculum />} />
          <Route path='/admin' element={<AdminPanel />} />
          <Route path='/admin/subjects' element={<Subject />} />
          <Route path='/admin/groups' element={<Group />} />
          <Route path='/admin/announces' element={<Announce />} />
          <Route path='/admin/absences' element={<Absence />} />
          <Route path='/admin/lessons' element={<Lesson />} />
          <Route path='/admin/teachers' element={<Teacher />} />
          <Route path='/admin/students' element={<Student />} />
          <Route path='/unauth' element={<UnAuth />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </Router>
    </ContextController>
  );
}

export default App;
