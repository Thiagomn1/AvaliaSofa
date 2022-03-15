import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Sofa from "../assets/sofa.png"

function Home() {
  const [email, setEmail] = useState("")
  const [nome, setNome] = useState("")
  const [senha, setSenha] = useState("")

  const navigate = useNavigate()

  const registrar = async event => {
    event.preventDefault()

    const userData = {
      nome,
      email,
      senha,
    }

    const response = await axios.post("/api/users/", userData)

    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data))
      navigate("/")
    }
  }

  return (
    <>
      <div className="header__container">
        <section className="header__title">
          <h1>Crie sua conta</h1>

          <form className="form__login">
            <label htmlFor="nome">Nome</label>
            <input
              className="form__input"
              type="nome"
              name="nome"
              id="nome"
              onChange={event => setNome(event.target.value)}
            />

            <label htmlFor="email">E-mail</label>
            <input
              className="form__input"
              type="email"
              name="email"
              id="email"
              onChange={event => setEmail(event.target.value)}
            />

            <label htmlFor="senha">Senha</label>
            <input
              className="form__input"
              type="password"
              name="password"
              id="password"
              onChange={event => setSenha(event.target.value)}
            />

            <div className="form__submit">
              <button className="btn-default" onClick={registrar}>
                Registrar
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

export default Home
