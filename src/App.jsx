import Login from "./components/auth/Login";
import ContextController from "./context/ContextController";

function App() {
  return (
    <ContextController>
      <div className="App">
        <Login />
      </div>
    </ContextController>
  );
}

export default App;
