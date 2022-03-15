import React, { useLayoutEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import SofaLaudo from "../components/SofaLaudo"

function Laudos() {
  const [sofas, setSofas] = useState(null)

  useLayoutEffect(() => {
    getSofas()
  }, [])

  const getSofas = async () => {
    const user = JSON.parse(localStorage.getItem("user"))

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }

    const response = await axios.get("/api/sofas", config)

    if (response.data) {
      setSofas(response.data)
    }
  }

  return (
    <>
      <Navbar />
      <div className="info__container">
        <div className="info__text">
          <h3>Sofás cadastrados: {sofas ? sofas.length : 0}</h3>
        </div>
        <div className="info__btn">
          <Link to="/novosofa">
            <button className="btn-default">Cadastrar Sofá</button>
          </Link>
        </div>
      </div>
      {sofas && sofas.map(sofa => <SofaLaudo key={sofa._id} sofa={sofa} />)}
    </>
  )
}

export default Laudos
