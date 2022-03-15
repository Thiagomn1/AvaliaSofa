import React from "react"
import { Link } from "react-router-dom"

function SofaLaudo({ sofa }) {
  return sofa ? (
    <div className="sofa__container">
      <div className="sofa__title">
        <img className="sofa__profile" src={sofa ? sofa.imagem : ""} alt="" />
        <h4 style={{ marginLeft: "5rem" }}>{sofa ? sofa.titulo : ""}</h4>
      </div>

      <Link to={`/avaliarsofa/${sofa._id}`}>
        <div className="sofa__status">
          <div className={sofa.status}>
            {sofa ? (
              <p className="btn-text">{sofa.status === "Em Avaliação" ? "Avaliar" : sofa.status}</p>
            ) : (
              ""
            )}
          </div>
        </div>
      </Link>
    </div>
  ) : (
    <h2>Nenhum sofá encontrado</h2>
  )
}

export default SofaLaudo
