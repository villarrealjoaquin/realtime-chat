import { Route, Routes } from "react-router-dom";
import { Home, Login, Register } from "./pages";
import { AuthProvider } from "./context/authContext";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route element={''}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/api/register" element={<Register />} />
          <Route path="/api/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
