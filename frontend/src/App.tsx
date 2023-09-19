import { Route, Routes } from "react-router-dom"
import { Home, Login, Register } from "./pages"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/api/register" element={<Register />} />
        <Route path="/api/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
