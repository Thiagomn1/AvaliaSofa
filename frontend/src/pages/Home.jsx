import React, { useLayoutEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import SofaItem from "../components/SofaItem"

function Home() {
  const [sofa, setSofa] = useState(null)

  useLayoutEffect(() => {
    getSofa()
  }, [])

  const getSofa = async () => {
    const user = JSON.parse(localStorage.getItem("user"))

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }

    const response = await axios.get("/api/sofas", config)

    if (response.data) {
      setSofa(response.data)
    }
  }

  return (
    <>
      <Navbar />
      <div className="info__container">
        <div className="info__text">
          <h3>Sofás cadastrados: {sofa ? sofa.length : 0}</h3>
        </div>
        <div className="info__avaliacao">
          <h2>Última Postagem</h2>
        </div>
        <div className="info__btn">
          <Link to="/novosofa">
            <button className="btn-default">Cadastrar Sofá</button>
          </Link>
        </div>
      </div>
      {sofa && <SofaItem sofa={sofa[0]} />}
    </>
  )
}

export default Home
