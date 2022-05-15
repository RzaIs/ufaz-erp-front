import ContextController from "./context/ContextController";
import Login from "./components/auth/Login";
import Home from "./components/Home";
import AdminPanel from "./admin/AdminPanel";
import Subject from "./admin/pages/Subject";
import Error from "./components/Error";
import Group from "./admin/pages/Group";
import Announce from "./admin/pages/Announce";
import Lesson from "./admin/pages/Lesson";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <ContextController>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/admin' element={<AdminPanel />} />
          <Route path='/admin/subjects' element={<Subject />} />
          <Route path='/admin/groups' element={<Group />} />
          <Route path='/admin/announces' element={<Announce />} />
          <Route path='/admin/lessons' element={<Lesson />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </Router>
    </ContextController>
  );
}

export default App;
