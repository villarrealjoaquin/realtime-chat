import { Route, Routes } from "react-router-dom";
import { Home, Login, Register } from "./pages";
import { AuthProvider } from "./context/authContext";
import { AuthGuard } from "./guards/Auth.guard";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route element={<AuthGuard />}>
            <Route path="/home" element={<Home />} />
          </Route>
          <Route path="/api/register" element={<Register />} />
          <Route path="/api/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
