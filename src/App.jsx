import Login from "./components/auth/Login";
import ContextController from "./context/ContextController";
import Error from "./components/Error";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <ContextController>
      <Router>
        <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<Error />} />
        </Routes>
      </Router>
    </ContextController>
  );
}

export default App;
