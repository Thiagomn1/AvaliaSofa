import React from "react"
import { Link, useNavigate } from "react-router-dom"

function Navbar() {
  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem("user"))

  const logout = () => {
    localStorage.removeItem("user")
    navigate("/login")
  }

  return (
    <nav>
      <ul>
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/sofas">
          <li>Sofás</li>
        </Link>
        {user.inspetor && (
          <Link to="/laudos">
            <li>Laudos</li>
          </Link>
        )}
      </ul>
      <p className="logout" onClick={logout}>
        Sair
      </p>
    </nav>
  )
}

export default Navbar
