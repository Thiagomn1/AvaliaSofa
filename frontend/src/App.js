import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import Sofas from "./pages/Sofas"
import Laudos from "./pages/Laudos"
import NovoSofa from "./pages/NovoSofa"
import AvaliarSofa from "./pages/AvaliarSofa"
import EditarSofa from "./pages/EditarSofa"
import PrivateRoute from "./components/PrivateRoute"

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/sofas" element={<PrivateRoute />}>
            <Route path="/sofas" element={<Sofas />} />
          </Route>
          <Route path="/laudos" element={<PrivateRoute />}>
            <Route path="/laudos" element={<Laudos />} />
          </Route>
          <Route path="/novosofa" element={<PrivateRoute />}>
            <Route path="/novosofa" element={<NovoSofa />} />
          </Route>
          <Route path="/avaliarsofa/:id" element={<PrivateRoute />}>
            <Route path="/avaliarsofa/:id" element={<AvaliarSofa />} />
          </Route>
          <Route path="editarsofa/:id" element={<PrivateRoute />}>
            <Route path="/editarsofa/:id" element={<EditarSofa />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
