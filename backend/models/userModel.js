const mongoose = require("mongoose")

const userSchema = mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, "Por favor insira um nome"],
    },
    email: {
      type: String,
      required: [true, "Por favor insira um email"],
      unique: true,
    },
    senha: {
      type: String,
      required: [true, "Por favor insira uma password"],
    },
    inspetor: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("User", userSchema)
