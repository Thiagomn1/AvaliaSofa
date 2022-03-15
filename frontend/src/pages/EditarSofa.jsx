import React, { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import Sofa from "../assets/sofa.png"

function EditarSofa() {
  const [titulo, setTitulo] = useState("")
  const [lugares, setLugares] = useState("")
  const [comprimento, setComprimento] = useState("")
  const [largura, setLargura] = useState("")
  const [profundidade, setProfundidade] = useState("")
  const [imagem, setImagem] = useState("")

  const navigate = useNavigate()
  const params = useParams()

  const user = JSON.parse(localStorage.getItem("user"))

  useEffect(() => {
    getSofaDetails()
  }, [])

  const getSofaDetails = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }

    const response = await axios.get(`/api/sofas/${params.id}`, config)

    if (response.data) {
      const { titulo, lugares, comprimento, largura, profundidade, imagem } = response.data
      setTitulo(titulo)
      setLugares(lugares)
      setComprimento(comprimento)
      setLargura(largura)
      setProfundidade(profundidade)
      setImagem(imagem)
    }
  }

  const atualizarSofa = async event => {
    event.preventDefault()

    const sofaData = {
      titulo,
      lugares,
      comprimento,
      largura,
      profundidade,
      imagem,
    }

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }

    const response = await axios.put(`/api/sofas/${params.id}/novo`, sofaData, config)

    if (response.data) {
      navigate("/")
    }
  }

  return (
    <>
      <div className="header__container">
        <section className="header__title">
          <h2>Editando {titulo}</h2>

          <form className="form__login">
            <label htmlFor="nome">Título</label>
            <input
              className="form__input"
              type="text"
              name="titulo"
              id="titulo"
              value={titulo}
              onChange={event => setTitulo(event.target.value)}
            />

            <label htmlFor="email">Lugares</label>
            <input
              className="form__input"
              type="number"
              name="lugares"
              id="lugares"
              value={lugares}
              onChange={event => setLugares(event.target.value)}
            />

            <label htmlFor="senha">Comprimento</label>
            <input
              className="form__input"
              type="number"
              name="comprimento"
              id="comprimento"
              value={comprimento}
              onChange={event => setComprimento(event.target.value)}
            />

            <label htmlFor="senha">Largura</label>
            <input
              className="form__input"
              type="number"
              name="largura"
              id="largura"
              value={largura}
              onChange={event => setLargura(event.target.value)}
            />

            <label htmlFor="senha">Profundidade</label>
            <input
              className="form__input"
              type="number"
              name="profundidade"
              id="profundidade"
              value={profundidade}
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
              <button className="btn-default" onClick={atualizarSofa}>
                Atualizar
              </button>
            </div>
          </form>
        </section>

        <section className="header__image">
          <img className="sofa__img" src={imagem ? imagem : ""} alt="" />
        </section>
      </div>
    </>
  )
}

export default EditarSofa
