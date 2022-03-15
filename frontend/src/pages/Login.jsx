import React, { useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import Sofa from "../assets/sofa.png"

function Home() {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")

  const navigate = useNavigate()

  const logar = async event => {
    event.preventDefault()

    const userData = {
      email,
      senha,
    }

    const response = await axios.post("/api/users/login", userData)

    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data))
      navigate("/")
    }
  }

  return (
    <>
      <div className="header__container">
        <section className="header__title">
          <h2>Teste do sofá</h2>
          <h1>Garantindo o seu conforto</h1>
          <p>Ajudamos pessoas a se sentirem confortáveis em seus momentos de lazer e descanso</p>

          <form className="form__login">
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
              <button className="btn-success" onClick={logar}>
                Entrar
              </button>
              <Link to="/register">
                <button className="btn-default">Nova conta</button>
              </Link>
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
