import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Sofa from "../assets/sofa.png"

function NovoSofa() {
  const [titulo, setTitulo] = useState("")
  const [lugares, setLugares] = useState("")
  const [comprimento, setComprimento] = useState("")
  const [largura, setLargura] = useState("")
  const [profundidade, setProfundidade] = useState("")
  const [imagem, setImagem] = useState("")

  const navigate = useNavigate()

  const cadastrarSofa = async event => {
    event.preventDefault()

    const sofaData = {
      titulo,
      lugares,
      comprimento,
      largura,
      profundidade,
      imagem,
    }

    const user = JSON.parse(localStorage.getItem("user"))

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }

    const response = await axios.post("/api/sofas/", sofaData, config)

    if (response.data) {
      navigate("/")
    }
  }

  return (
    <>
      <div className="header__container">
        <section className="header__title">
          <h1>Cadastre um sofá</h1>

          <form className="form__login">
            <label htmlFor="nome">Título</label>
            <input
              className="form__input"
              type="text"
              name="titulo"
              id="titulo"
              onChange={event => setTitulo(event.target.value)}
            />

            <label htmlFor="email">Lugares</label>
            <input
              className="form__input"
              type="number"
              name="lugares"
              id="lugares"
              onChange={event => setLugares(event.target.value)}
            />

            <label htmlFor="senha">Comprimento</label>
            <input
              className="form__input"
              type="number"
              name="comprimento"
              id="comprimento"
              onChange={event => setComprimento(event.target.value)}
            />

            <label htmlFor="senha">Largura</label>
            <input
              className="form__input"
              type="number"
              name="largura"
              id="largura"
              onChange={event => setLargura(event.target.value)}
            />

            <label htmlFor="senha">Profundidade</label>
            <input
              className="form__input"
              type="number"
              name="profundidade"
              id="profundidade"
              onChange={event => setProfundidade(event.target.value)}
            />

            <label htmlFor="senha">Imagem</label>
            <input
              className="form__input"
              type="imagem"
              name="imagem"
              id="imagem"
              onChange={event => setImagem(event.target.value)}
            />

            <div className="form__submit">
              <button className="btn-default" onClick={cadastrarSofa}>
                Cadastrar
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

export default NovoSofa
