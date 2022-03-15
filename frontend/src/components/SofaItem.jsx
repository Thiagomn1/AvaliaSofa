import React from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"

function SofaItem({ sofa }) {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user"))

  const excluirSofa = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      data: {
        id: sofa._id,
      },
    }

    const response = await axios.delete("/api/sofas", config)
    if (response) {
      navigate("/")
    }
  }

  return sofa ? (
    <div className="sofa__container">
      <div className="sofa__details">
        <img className="sofa__profile" src={sofa.imagem} alt="" />
        <h4>{sofa.avaliador ? `Avaliador: ${sofa.avaliador}` : ""}</h4>
        <div className={sofa.status}>{<p className="btn-text">{sofa.status}</p>}</div>
      </div>

      <div className="sofa__info">
        <h4>{sofa ? sofa.titulo : ""}</h4>
        <p>{sofa ? `${sofa.lugares} Lugares` : ""}</p>
        <p>{sofa ? `${sofa.comprimento}m de comprimento` : ""}</p>
        <p>{sofa ? `${sofa.largura}m de largura` : ""}</p>
        <p>{sofa ? `${sofa.profundidade}m de profundidade` : ""}</p>
      </div>

      {user._id == sofa.usuario && (
        <div>
          <Link to={`/editarsofa/${sofa._id}`}>
            <button className="btn-default" style={{ marginRight: "1rem" }}>
              Editar
            </button>
          </Link>
          <button className="btn-danger" onClick={excluirSofa}>
            Excluir
          </button>
        </div>
      )}
    </div>
  ) : (
    <h2>Nenhum sofá encontrado</h2>
  )
}

export default SofaItem
