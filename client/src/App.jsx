import { useState } from "react"
import { AuthProvider } from "./context/AuthContext"
import Register from "./pages/Register"
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Validator from "./pages/Validator";
import Homepage from "./pages/Homepage";

function App() {
  const [userData, setUserData] = useState(null);

  function userInit(data) {
    setUserData(data);
  }

  return (
    <AuthProvider value={{userData, userInit}}>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/validate" element={<Validator />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
