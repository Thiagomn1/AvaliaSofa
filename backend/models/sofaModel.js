const mongoose = require("mongoose")

const sofaSchema = mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    titulo: {
      type: String,
      required: true,
    },
    imagem: {
      type: String,
      required: true,
    },
    lugares: {
      type: Number,
      required: true,
    },
    comprimento: {
      type: Number,
      required: true,
    },
    largura: {
      type: Number,
      required: true,
    },
    profundidade: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["Em Avaliação", "Aprovado", "Reprovado"],
    },
    avaliador: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Sofa", sofaSchema)
