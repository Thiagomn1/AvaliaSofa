import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import Sofa from "../assets/sofa.png"

function AvaliarSofa() {
  const [sofa, setSofa] = useState(null)

  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    getSofaDetails()
  })

  const getSofaDetails = async () => {
    const user = JSON.parse(localStorage.getItem("user"))

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }

    const response = await axios.get(`/api/sofas/${params.id}`, config)

    if (response.data) {
      setSofa(response.data)
    }
  }

  const aprovarSofa = async event => {
    event.preventDefault()

    const user = JSON.parse(localStorage.getItem("user"))

    const data = {
      avaliacao: "Aprovado",
      avaliador: user.nome,
    }

    console.log(data)

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }

    const response = await axios.put(`/api/sofas/${params.id}`, data, config)

    if (response.data) {
      navigate("/")
    }
  }

  const reprovarSofa = async event => {
    event.preventDefault()

    const user = JSON.parse(localStorage.getItem("user"))

    const data = {
      avaliacao: "Reprovado",
      avaliador: user.nome,
    }

    console.log(data)

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }

    const response = await axios.put(`/api/sofas/${params.id}`, data, config)

    if (response.data) {
      navigate("/")
    }
  }

  return (
    <>
      <div className="header__container">
        <section className="header__title">
          <h1>Avaliando</h1>

          <div className="avaliar__info">
            {sofa && (
              <>
                <h4>{sofa.titulo}</h4>
                <p>{`${sofa.lugares} Lugares`}</p>
                <p>{`${sofa.comprimento}m de comprimento`}</p>
                <p>{`${sofa.largura}m de largura`}</p>
                <p>{`${sofa.profundidade}m de profundidade`}</p>
              </>
            )}
          </div>

          <form className="form__login">
            <div>
              <button className="btn-success" onClick={aprovarSofa} style={{ marginBottom: "2rem" }}>
                Aprovar
              </button>
              <button className="btn-danger" onClick={reprovarSofa}>
                Reprovar
              </button>
            </div>
          </form>
        </section>

        <section className="header__image">
          <img className="sofa__img" src={Sofa} alt="Sofa" />
        </section>
      </div>
    </>
  )
}

export default AvaliarSofa
